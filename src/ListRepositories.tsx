import { useState, useEffect } from "react";
import AzureDevOpsClient from "./AzureDevOpsClient";

function ListRepositories() {
  const [repositories, setRepositories] = useState<string[]>([]);

  useEffect(() => {
    new AzureDevOpsClient().getRepositories().then((repos) => {
      setRepositories(repos);
    });
  }, []);

  return (
    <ol>
      {repositories.map((name) => (
        <li>{name}</li>
      ))}
    </ol>
  );
}

export default ListRepositories;
