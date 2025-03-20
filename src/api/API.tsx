interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  location?: string;
  email?: string;
  company?: string;
  bio?: string;
}

interface GithubSearchResponse {
  items: GithubUser[];
}

const searchGithub = async (query: string): Promise<GithubUser[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data: GithubSearchResponse = await response.json();
    return data.items; // Return the `items` array
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};

const searchGithubUser = async (username: string): Promise<GithubUser> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data: GithubUser = await response.json();
    return data;
  } catch (err) {
    console.error('An error occurred:', err);
    return {} as GithubUser;
  }
};

export { searchGithub, searchGithubUser };