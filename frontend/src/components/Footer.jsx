import React from 'react';
import { Link } from 'react-router-dom';

const socialLinks = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rajvanshi-kumar-8422762a0',
    color: '#0077b5'
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    label: 'GitHub',
    url: 'https://github.com/rajvanshiKumar',
    color: '#6e5494'
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
      </svg>
    ),
    label: 'Twitter',
    url: '#',
    color: '#1da1f2'
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="#1a1a2e"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Instagram',
    url: '#',
    color: '#e1306c'
  }
];

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#0d0d1a',
      borderTop: '1px solid rgba(233,69,96,0.15)',
      paddingTop: 'clamp(36px,6vw,60px)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(16px,4vw,24px)' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
          gap: 'clamp(28px,4vw,40px)', marginBottom: 'clamp(32px,5vw,48px)'
        }}>

          {/* Brand */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px'
            }}>
              <div style={{
                width: '40px', height: '40px', backgroundColor: '#e94560',
                borderRadius: '10px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: '800', color: 'white', fontSize: '18px',
                flexShrink: 0
              }}>S</div>
              <span style={{ color: 'white', fontWeight: '800', fontSize: '22px' }}>
                Service<span style={{ color: '#e94560' }}>Hub</span>
              </span>
            </div>
            <p style={{
              color: '#8892a4', fontSize: '14px',
              lineHeight: '1.8', marginBottom: '20px'
            }}>
              India's trusted platform connecting skilled professionals with people who need them.
              Quality services, verified providers, guaranteed satisfaction.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {socialLinks.map((s, i) => (
                <a key={i} href={s.url}
                  target="_blank" rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: '38px', height: '38px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', cursor: 'pointer',
                    color: '#8892a4', textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    flexShrink: 0
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = `${s.color}22`;
                    e.currentTarget.style.borderColor = `${s.color}66`;
                    e.currentTarget.style.color = s.color;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${s.color}33`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = '#8892a4';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{
              color: 'white', fontWeight: '700', fontSize: '15px',
              marginBottom: '18px', paddingBottom: '10px',
              borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}>Our Services</h4>
            {['Education & Tutoring', 'Repair & Maintenance', 'Health & Fitness',
              'Event Planning', 'Home Cleaning'].map((item, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <Link to="/" style={{
                  color: '#8892a4', fontSize: '14px', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'color 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e94560'}
                  onMouseLeave={e => e.currentTarget.style.color = '#8892a4'}>
                  <span style={{ color: '#e94560' }}>›</span> {item}
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              color: 'white', fontWeight: '700', fontSize: '15px',
              marginBottom: '18px', paddingBottom: '10px',
              borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}>Quick Links</h4>
            {[
              { label: 'Home', to: '/' },
              { label: 'Login', to: '/login' },
              { label: 'Sign Up', to: '/register' },
              { label: 'Privacy Policy', to: '/' },
              { label: 'Terms & Conditions', to: '/' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <Link to={item.to} style={{
                  color: '#8892a4', fontSize: '14px', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'color 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e94560'}
                  onMouseLeave={e => e.currentTarget.style.color = '#8892a4'}>
                  <span style={{ color: '#e94560' }}>›</span> {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              color: 'white', fontWeight: '700', fontSize: '15px',
              marginBottom: '18px', paddingBottom: '10px',
              borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}>Contact Us</h4>
            {[
              { icon: '📍', text: 'Hyderabad, Telangana, India' },
              { icon: '📧', text: 'support@servicehub.in' },
              { icon: '📞', text: '+91 98765 43210' },
              { icon: '🕐', text: 'Mon–Sat: 9AM – 7PM' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start',
                gap: '10px', marginBottom: '12px'
              }}>
                <span style={{ fontSize: '14px', marginTop: '1px', flexShrink: 0 }}>
                  {item.icon}
                </span>
                <span style={{ color: '#8892a4', fontSize: '14px', lineHeight: '1.6' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '20px', paddingBottom: '24px',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '14px'
        }}>
          <p style={{ color: '#8892a4', fontSize: '13px', margin: 0 }}>
            © 2026 ServiceHub. All rights reserved.
          </p>

          {/* Developer Credit */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            backgroundColor: 'rgba(233,69,96,0.08)',
            border: '1px solid rgba(233,69,96,0.2)',
            borderRadius: '30px', padding: '8px 18px',
            flexWrap: 'wrap', justifyContent: 'center'
          }}>
            <span style={{ fontSize: '14px' }}>💻</span>
            <span style={{ color: '#8892a4', fontSize: '13px' }}>
              Developed & Created by
            </span>
            <a href="https://www.linkedin.com/in/rajvanshi-kumar-8422762a0"
              target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}>
              <span style={{
                fontWeight: '800', fontSize: '14px',
                background: 'linear-gradient(135deg,#e94560,#ff6b6b,#ffa07a)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text', cursor: 'pointer'
              }}>
                Rajvanshi Gupta
              </span>
            </a>
            <span style={{ fontSize: '14px' }}>🚀</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;