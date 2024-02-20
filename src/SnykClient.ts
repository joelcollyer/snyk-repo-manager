interface ISnykClient {
  headers: HeadersInit;
  project: string;
  version: string;
  url: string;
  getCollections(): Promise<SnykCollection[]>;
}

export interface SnykCollection {
  id: string;
  name: string;
}

class SnykClient implements ISnykClient {
  headers;
  project;
  version;
  url;

  constructor() {
    const { VITE_SNYK_ACCESS_TOKEN, VITE_SNYK_PROJECT, VITE_SNYK_URL } =
      import.meta.env;

    // Validation token information is from: https://apidocs.snyk.io/?version=2024-01-23#overview
    this.headers = {
      Authorization: `token ${VITE_SNYK_ACCESS_TOKEN}`,
      "Content-Type": "application/vnd.api+json",
    };
    this.project = VITE_SNYK_PROJECT;
    this.url = VITE_SNYK_URL;
    this.version = "?version=2024-01-23";
  }

  /**
   * https://apidocs.snyk.io/?version=2024-01-23#get-/orgs/-org_id-/collections
   */
  async getCollections() {
    const path = `${this.url}/orgs/${this.project}/collections${this.version}`;
    const collections = await fetch(path, {
      headers: this.headers,
      mode: "no-cors",
      method: "GET",
    }).then((response) => {
      console.log(response);

      return [];
    });

    return collections;
  }
}

export default SnykClient;
