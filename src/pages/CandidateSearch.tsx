import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API'; // Removed unused searchGithubUser
import { Candidate } from '../interfaces/Candidate.interface';


// Define styles with proper typing
type Styles = {
  [key: string]: React.CSSProperties;
};

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithub();
      if (data.length > 0) {
        const candidateInfo = await fetchGithubUser(data[0].login);
        if (candidateInfo) {
          setCandidate(candidateInfo);
          console.log(candidateInfo);
        }
      } else {
        setError('No candidates found.');
      }
    } catch (err) {
      setError('Failed to fetch candidate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchGithubUser = async (username: string) => {
    try {
      const data: any = await searchGithubUser(username);
      if (data) {
        return data;
      } else {
        setError('No candidates found.');
      }
    } catch (err) {
      setError('Failed to fetch candidate. Please try again.');
    } 
  };

  const handleAccept = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      fetchCandidate();
    }
  };

  const handleReject = () => {
    fetchCandidate();
  };

  useEffect(() => {
    fetchCandidate();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!candidate) {
    return <p>No more candidates available.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Candidate Search</h1>
      <div style={styles.card}>
        <img 
          src={candidate.avatar_url} 
          alt={candidate.login} 
          style={styles.avatar} 
        />
        <h2 style={styles.name}>{candidate.name || candidate.login}</h2>
        <p style={styles.detail}><strong>Username:</strong> {candidate.login}</p>
        <p style={styles.detail}><strong>Location:</strong> {candidate.location || 'Not specified'}</p>
        <p style={styles.detail}><strong>Email:</strong> {candidate.email || 'Not specified'}</p>
        <p style={styles.detail}><strong>Company:</strong> {candidate.company || 'Not specified'}</p>
        <p style={styles.detail}>
          <strong>GitHub:</strong> 
          <a 
            href={candidate.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.link}
          >
            {candidate.html_url}
          </a>
        </p>
      </div>
      <div style={styles.buttons}>
        <button onClick={handleAccept} style={styles.acceptButton}>+ Accept</button>
        <button onClick={handleReject} style={styles.rejectButton}>- Reject</button>
      </div>
    </div>
  );
};

// Properly typed styles object
const styles: Styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
  },
  header: {
    fontSize: '24px',
    textAlign: 'center' as const,
    marginBottom: '20px',
    color: '#333',
  },
  card: {
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as const,
    color: '#fff',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '15px',
  },
  name: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#fff',
  },
  detail: {
    fontSize: '16px',
    margin: '5px 0',
    color: '#fff',
  },
  link: {
    color: '#1e90ff',
    textDecoration: 'none',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    gap: '10px',
  },
  acceptButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  rejectButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CandidateSearch;