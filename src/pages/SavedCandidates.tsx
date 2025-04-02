import { useState, useEffect } from 'react';
import type { Candidate } from '../interfaces/Candidate.interface';
import { FaTrashAlt, FaMapMarkerAlt, FaEnvelope, FaBuilding } from 'react-icons/fa';

// Define type for styles with hover support
type Styles = {
  [key: string]: React.CSSProperties & {
    ':hover'?: React.CSSProperties;
  };
};

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  const handleRemove = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p>No potential candidates have been accepted.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Potential Candidates</h1>
      <div style={styles.candidatesList}>
        {savedCandidates.map((candidate) => (
          <div key={candidate.id} style={styles.candidateCard}>
            <div style={styles.cardContent}>
              <div style={styles.leftSection}>
                <img 
                  src={candidate.avatar_url} 
                  alt={candidate.login} 
                  style={styles.avatar} 
                />
              </div>
              <div style={styles.rightSection}>
                <h2 style={styles.name}>{candidate.name || candidate.login}</h2>
                <div style={styles.details}>
                  <div style={styles.detailRow}>
                    <FaMapMarkerAlt style={styles.icon} />
                    <span>{candidate.location || 'Location not specified'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <FaEnvelope style={styles.icon} />
                    <span>{candidate.email || 'Email not specified'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <FaBuilding style={styles.icon} />
                    <span>{candidate.company || 'Company not specified'}</span>
                  </div>
                </div>
              </div>
              <div style={styles.actionSection}>
                <button 
                  onClick={() => handleRemove(candidate.id)} 
                  style={styles.removeButton}
                >
                  <FaTrashAlt style={styles.trashIcon} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Styles = {
  container: {
    padding: '2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#2d3748',
    fontWeight: 600, // Changed from string to number
    textAlign: 'center' as const,
  },
  candidatesList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  candidateCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    width: '100%',
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  leftSection: {
    flexShrink: 0,
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover' as const,
  },
  rightSection: {
    flexGrow: 1,
  },
  name: {
    fontSize: '1.25rem',
    margin: '0 0 0.5rem 0',
    color: '#2d3748',
  },
  details: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    color: '#4a5568',
  },
  icon: {
    color: '#718096',
    fontSize: '1rem',
  },
  actionSection: {
    alignSelf: 'flex-start',
  },
  removeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#fff',
    color: '#e53e3e',
    border: '1px solid #e53e3e',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.9rem',
    ':hover': {
      backgroundColor: '#fff5f5',
    },
  },
  trashIcon: {
    fontSize: '1rem',
  },
  emptyState: {
    padding: '2rem',
    textAlign: 'center' as const,
    color: '#718096',
    fontSize: '1rem',
  },
};

export default SavedCandidates;