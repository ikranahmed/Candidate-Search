import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface GithubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

const CandidateSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [candidates, setCandidates] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);
      searchGithub(query)
        .then((data) => {
          setCandidates(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setCandidates([]); 
    }
  }, [query]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search') as string;
    setQuery(searchQuery);
  };

  const handleSaveCandidate = async (username: string) => {
    try {
      const userDetails = await searchGithubUser(username);
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(userDetails);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      alert(`${username} saved successfully!`);
    } catch (err) {
      alert(`Failed to save ${username}: ${err.message}`);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search GitHub users..."
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <img src={candidate.avatar_url} alt={candidate.login} width="50" />
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              {candidate.login}
            </a>
            <button onClick={() => handleSaveCandidate(candidate.login)}>Save</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;