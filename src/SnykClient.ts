import { requestsManager } from "snyk-request-manager";

global.__filename = "snykClient";

interface ISnykClient {
  requestManager: requestsManager;
  headers: HeadersInit;
  project: string;
  version: string;
  url: string;
  getCollections(): Promise<SnykCollection[]>;
}

export interface SnykCollection {
  id: string;
  attributes: {
    name: string;
  };
}

class SnykClient implements ISnykClient {
  requestManager: requestsManager;
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

    this.requestManager = new requestsManager({
      snykToken: VITE_SNYK_ACCESS_TOKEN,
      maxRetryCount: 1,
    });
  }

  /**
   * https://apidocs.snyk.io/?version=2024-01-23#get-/orgs/-org_id-/collections
   */
  async getCollections() {
    const url = `/orgs/${this.project}/collections${this.version}`;
    const collections = await this.requestManager
      .request({ verb: "GET", url, useRESTApi: true })
      .then((response) => response.json())
      .then(({ data }) => data as SnykCollection[])
      .catch((error) => {
        console.error(error);
        return [] as SnykCollection[];
      });

    return collections;
  }
}

export default SnykClient;
