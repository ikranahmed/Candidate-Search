import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <section style={styles.container}>
      <h1 style={styles.heading}>404: Page Not Found</h1>
      <h1 style={styles.emoji}>¯\_(ツ)_/¯</h1>
      <p style={styles.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <button style={styles.button} onClick={handleGoHome}>
        Go Back Home
      </button>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  emoji: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
};

export default ErrorPage;