import { useState, useEffect } from "react";
import AzureDevOpsClient, { AzureRepository } from "./AzureDevOpsClient";

function ListRepositories() {
  const [repositories, setRepositories] = useState<AzureRepository[]>([]);

  useEffect(() => {
    new AzureDevOpsClient()
      .getRepositories()
      .then((repos) => setRepositories(repos));
  }, []);

  return (
    <ol>
      {repositories.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ol>
  );
}

export default ListRepositories;
