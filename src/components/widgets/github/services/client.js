import axios from "axios";

function fetchReceivedEvents(githubConfig, page = 1) {
  const client = axios.create({
    baseURL: `https://api.github.com/users/${githubConfig.username}`,
    headers: {
      authorization: `token ${githubConfig.token}`
    }
  });

  return client.get("/received_events", { page }).then(response => response.data);
}

export { fetchReceivedEvents };
