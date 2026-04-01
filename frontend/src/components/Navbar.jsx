import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout  } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav style={{
        backgroundColor: '#1a1a2e',
        borderBottom: '1px solid rgba(233,69,96,0.15)',
        padding: '0 clamp(16px,4vw,24px)',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 20px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          maxWidth: '1300px', margin: '0 auto',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px'
        }}>

          {/* Logo */}
          <Link to="/" style={{
            display: 'flex', alignItems: 'center',
            gap: '10px', textDecoration: 'none', flexShrink: 0
          }}>
            <div style={{
              width: '38px', height: '38px', backgroundColor: '#e94560',
              borderRadius: '8px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontWeight: 'bold',
              color: 'white', fontSize: '18px', flexShrink: 0
            }}>S</div>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '22px' }}>
              Service<span style={{ color: '#e94560' }}>Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            className="desktop-nav">
            <Link to="/" style={{
              color: '#ccc', fontWeight: '500', textDecoration: 'none',
              padding: '8px 16px', borderRadius: '8px',
              transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = '#ccc'}>
              Home
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn-login" style={{
                  color: '#e94560', border: '2px solid #e94560',
                  borderRadius: '8px', padding: '8px 20px',
                  fontWeight: '600', textDecoration: 'none',
                  fontSize: '14px', transition: 'all 0.3s ease'
                }}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = '#e94560';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#e94560';
                  }}>Login</Link>

                <Link to="/register" style={{
                  color: 'white', padding: '8px 20px',
                  background: 'linear-gradient(135deg,#e94560,#c62a47)',
                  borderRadius: '8px', fontWeight: '600',
                  textDecoration: 'none', fontSize: '14px',
                  boxShadow: '0 4px 15px rgba(233,69,96,0.3)',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={e => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(233,69,96,0.5)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(233,69,96,0.3)';
                  }}>Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" style={{
                  color: '#ccc', fontWeight: '500', textDecoration: 'none',
                  padding: '8px 16px'
                }}>Dashboard</Link>
                <button onClick={handleLogout} style={{
                  backgroundColor: '#e94560', border: 'none',
                  color: 'white', padding: '8px 20px',
                  borderRadius: '8px', fontWeight: '600',
                  cursor: 'pointer', fontSize: '14px'
                }}>Logout</button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger"
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer', padding: '8px',
              display: 'none', flexDirection: 'column',
              gap: '5px'
            }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '24px', height: '2px',
                backgroundColor: '#e94560', borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                    : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                      : 'opacity 0 scale(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1
              }} />
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '16px 0 20px',
            display: 'flex', flexDirection: 'column', gap: '4px'
          }} className="mobile-menu">
            <Link to="/" onClick={() => setMenuOpen(false)} style={{
              color: '#ccc', fontWeight: '500', textDecoration: 'none',
              padding: '12px 16px', borderRadius: '8px',
              fontSize: '15px', display: 'block'
            }}>🏠 Home</Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} style={{
                  color: '#e94560', fontWeight: '600', textDecoration: 'none',
                  padding: '12px 16px', borderRadius: '8px',
                  border: '1px solid rgba(233,69,96,0.3)',
                  fontSize: '15px', display: 'block',
                  margin: '4px 0'
                }}>🔐 Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} style={{
                  color: 'white', fontWeight: '600', textDecoration: 'none',
                  padding: '12px 16px', borderRadius: '8px',
                  background: 'linear-gradient(135deg,#e94560,#c62a47)',
                  fontSize: '15px', display: 'block',
                  textAlign: 'center'
                }}>🚀 Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} style={{
                  color: '#ccc', fontWeight: '500', textDecoration: 'none',
                  padding: '12px 16px', fontSize: '15px', display: 'block'
                }}>📊 Dashboard</Link>
                <button onClick={handleLogout} style={{
                  backgroundColor: '#e94560', border: 'none', color: 'white',
                  padding: '12px 16px', borderRadius: '8px', fontWeight: '600',
                  cursor: 'pointer', fontSize: '15px', textAlign: 'left',
                  width: '100%'
                }}>🚪 Logout</button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Global Responsive CSS */}
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }

        /* Navbar */
        .desktop-nav { display: flex !important; }
        .hamburger { display: none !important; }
        .mobile-menu { display: none; }

        /* Sidebar */
        .desktop-sidebar { display: block !important; }
        .mobile-filter-btn { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu { display: flex !important; }
          .desktop-sidebar { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
        }

        /* Smooth scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a2e; }
        ::-webkit-scrollbar-thumb { background: #e9456044; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #e94560; }

        input::placeholder { color: #8892a4; }
        select option { background-color: #16213e; color: white; }
      `}</style>
    </>
  );
}

export default Navbar;