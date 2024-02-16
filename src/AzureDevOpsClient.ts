interface IAzureDevOpsClient {
  headers: HeadersInit;
  project: string;
  url: string;
  getRepositories(): Promise<string[]>;
}

async function streamToObj<T>(stream: ReadableStream | null): Promise<T> {
  if (!stream || !stream?.getReader) return {} as T;

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = "";
  let completed = false;
  while (!completed) {
    const { done, value } = await reader.read();
    if (done) {
      completed = true;
      break;
    }
    result += decoder.decode(value, { stream: true });
  }

  console.log(result);

  return JSON.parse(result);
}

class AzureDevOpsClient implements IAzureDevOpsClient {
  headers;
  project;
  url;

  constructor() {
    const {
      VITE_AZURE_PERSONAL_ACCESS_TOKEN,
      VITE_AZURE_ORG_URL,
      VITE_AZURE_PROJECT,
    } = import.meta.env;

    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${VITE_AZURE_PERSONAL_ACCESS_TOKEN}`,
    };

    this.url = VITE_AZURE_ORG_URL;
    this.project = VITE_AZURE_PROJECT;
  }

  async getRepositories() {
    const result = await fetch(
      `${this.url}/${this.project}/_apis/git/repositories?api-version=7.1-preview.1`,
      {
        headers: this.headers,
        method: "GET",
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch from ADO");
      }
      return streamToObj(response?.body);
    });

    console.log(result);

    return ["LodgeLink-Admin", "LodgeLink", "LodgeLink-Supplier"].sort((a, b) =>
      a.localeCompare(b)
    );
  }
}

export default AzureDevOpsClient;
