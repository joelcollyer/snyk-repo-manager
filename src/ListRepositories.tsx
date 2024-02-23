import { useEffect, useState } from "react";
import AzureDevOpsClient, { AzureRepository } from "./AzureDevOpsClient";
import SnykClient, { SnykCollection } from "./SnykClient";
import { useLocalStorage } from "./CustomHooks";

function ListRepositories() {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useLocalStorage<SnykCollection[]>(
    "collections",
    []
  );
  const [repositories, setRepositories] = useLocalStorage<AzureRepository[]>(
    "repositories",
    []
  );

  const promises: Promise<void>[] = [];

  const fetchData = async () => {
    if (loading || promises.length) return;
    setLoading(true);

    if (!collections?.length) {
      promises.push(
        new SnykClient()
          .getCollections()
          .then((newCollections) => setCollections(newCollections))
      );
    }

    if (!repositories?.length) {
      promises.push(
        new AzureDevOpsClient()
          .getRepositories()
          .then((newRepositories) => setRepositories(newRepositories))
      );
    }

    await Promise.allSettled(promises);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <table>
      <thead>
        <tr>
          <td>Repository Name</td>
          <td>Snyk Collection</td>
        </tr>
      </thead>
      <tbody>
        {repositories.map(({ id, name }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>--</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListRepositories;
