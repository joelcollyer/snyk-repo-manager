import { useEffect } from "react";
import AzureDevOpsClient, { AzureRepository } from "./AzureDevOpsClient";
import SnykClient, { SnykCollection } from "./SnykClient";
import { useLocalStorage } from "./CustomHooks";

function ListRepositories() {
  const [collections, setCollections] = useLocalStorage<SnykCollection[]>(
    "collections",
    []
  );
  const [repositories, setRepositories] = useLocalStorage<AzureRepository[]>(
    "repositories",
    []
  );

  // TODO: De-dupe this as each respose changes state and re-renders, triggering this effect
  useEffect(() => {
    if (!collections?.length) {
      new SnykClient()
        .getCollections()
        .then((collections) => setCollections(collections));
    }

    if (!repositories?.length) {
      new AzureDevOpsClient()
        .getRepositories()
        .then((repos) => setRepositories(repos));
    }
  }, []);

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
