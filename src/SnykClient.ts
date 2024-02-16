interface ISnykClient {
  headers: HeadersInit;
  project: string;
  getCollections(): Promise<SnykCollection[]>;
}

export interface SnykCollection {
  id: string;
  name: string;
}

class SnykClient implements ISnykClient {
  headers;
  project;
  url;

  constructor() {
    const { VITE_SNYK_ACCESS_TOKEN, VITE_SNYK_PROJECT, VITE_SNYK_URL } =
      import.meta.env;
    this.headers = {
      Authorization: `Token ${VITE_SNYK_ACCESS_TOKEN}`,
      "Content-Type": "application/vnd.api+json",
    };
    this.project = VITE_SNYK_PROJECT;
    this.url = VITE_SNYK_URL;
  }

  async getCollections() {
    const path = `${this.url}/orgs/${this.project}/collections`;
    const collections = await fetch(path, {
      headers: this.headers,
      method: "GET",
    }).then((response) => {
      console.log(response);

      return [];
    });

    return collections;
  }
}

export default SnykClient;
