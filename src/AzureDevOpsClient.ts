interface IAzureDevOpsClient {
  headers: HeadersInit;
  project: string;
  url: string;
  getRepositories(): Promise<AzureRepository[]>;
}

export interface AzureRepository {
  id: string;
  name: string;
  url: string;
  webUrl: string;
}

class AzureDevOpsClient implements IAzureDevOpsClient {
  headers;
  project;
  url;

  constructor() {
    const {
      VITE_AZURE_ORG_URL,
      VITE_AZURE_PROJECT,
      VITE_AZURE_PERSONAL_ACCESS_TOKEN,
    } = import.meta.env;

    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`:${VITE_AZURE_PERSONAL_ACCESS_TOKEN}`)}`,
    };
    this.project = VITE_AZURE_PROJECT;
    this.url = VITE_AZURE_ORG_URL;
  }

  async getRepositories() {
    const path = `${this.url}/${this.project}/_apis/git/repositories?api-version=7.1-preview.1`;

    const repositories = await fetch(path, {
      headers: this.headers,
      method: "GET",
    })
      .then((response) => response.json())
      .then(({ value }) => value as AzureRepository[]);

    return repositories.sort(({ name: nameA }, { name: nameB }) =>
      nameA.localeCompare(nameB)
    );
  }
}

export default AzureDevOpsClient;
