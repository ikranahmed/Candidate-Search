import { NavLink } from 'react-router-dom';
import { FaUserFriends, FaHome } from 'react-icons/fa';

const Nav = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <div style={styles.navLinks}>
          <NavLink 
            to="/" 
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {})
            })}
          >
            <FaHome style={styles.icon} />
            <span>Home</span>
          </NavLink>
          
          <NavLink 
            to="/saved-candidates" 
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.activeNavLink : {})
            })}
          >
            <FaUserFriends style={styles.icon} />
            <span>Potential Candidates</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#2d3748',
    padding: '0 2rem',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid #4a5568'
  },
  navContainer: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
  navLinks: {
    display: 'flex',
    gap: '3rem',
  },
  navLink: {
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    padding: '0.75rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s ease',
    borderBottom: '2px solid transparent',
    ':hover': {
      color: '#ffffff',
      borderBottom: '2px solid #4299e1'
    },
  },
  activeNavLink: {
    color: '#ffffff',
    borderBottom: '2px solid #4299e1'
  },
  icon: {
    fontSize: '1.1rem',
  },
};

export default Nav;