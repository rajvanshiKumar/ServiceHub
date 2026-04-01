import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services, categoryColors } from '../data/servicesData';
import { useAuth } from '../context/AuthContext';          // ✅ ADD
import PaymentModal from '../components/PaymentModal';     // ✅ ADD

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();                        // ✅ ADD
  const [activeTab, setActiveTab] = useState('overview');
  const [showPayment, setShowPayment] = useState(false);   // ✅ ADD

  const service = services.find(s => s.id === parseInt(id));

  if (!service) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#1a1a2e,#16213e)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
        <h2 style={{ color: 'white', marginBottom: '12px' }}>Service not found</h2>
        <button onClick={() => navigate('/')} style={{
          padding: '12px 28px',
          background: 'linear-gradient(135deg,#e94560,#c62a47)',
          border: 'none', borderRadius: '10px', color: 'white',
          fontSize: '15px', fontWeight: '700', cursor: 'pointer'
        }}>Go Back Home</button>
      </div>
    </div>
  );

  const color = categoryColors[service.categoryValue] || '#e94560';
  const tabs = ['overview', 'highlights', 'provider', 'reviews'];

  // ✅ ADD this handler
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate(`/login?next=/service/${service.id}`);
    } else {
      setShowPayment(true);
    }
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{
        color: i < Math.floor(rating) ? '#ffb703' : 'rgba(255,255,255,0.2)',
        fontSize: '18px'
      }}>★</span>
    ));

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)'
    }}>

      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(135deg,${color}22,${color}08)`,
        borderBottom: `1px solid ${color}33`,
        padding: 'clamp(28px,5vw,48px) clamp(16px,4vw,20px) clamp(24px,4vw,40px)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            marginBottom: '20px', flexWrap: 'wrap'
          }}>
            {['Home', service.category, service.subcategory].map((crumb, i, arr) => (
              <React.Fragment key={i}>
                <span
                  onClick={() => i < 2 && navigate('/')}
                  style={{
                    color: i === arr.length - 1 ? color : '#8892a4',
                    fontSize: '13px',
                    cursor: i < 2 ? 'pointer' : 'default',
                    fontWeight: i === arr.length - 1 ? '600' : '400'
                  }}>
                  {crumb}
                </span>
                {i < arr.length - 1 && (
                  <span style={{ color: '#8892a4', fontSize: '13px' }}>›</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Main Detail Layout */}
          <div style={{
            display: 'flex', gap: 'clamp(20px,4vw,40px)',
            flexWrap: 'wrap', alignItems: 'flex-start'
          }}>

            {/* Left Info */}
            <div style={{ flex: 1, minWidth: 'min(100%, 280px)' }}>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span style={{
                  backgroundColor: `${color}22`, color: color,
                  fontSize: '12px', fontWeight: '700',
                  padding: '4px 14px', borderRadius: '20px',
                  border: `1px solid ${color}44`
                }}>{service.category}</span>
                <span style={{
                  backgroundColor: 'rgba(255,255,255,0.08)', color: '#c8d0dc',
                  fontSize: '12px', fontWeight: '600',
                  padding: '4px 14px', borderRadius: '20px'
                }}>📌 {service.subcategory}</span>
              </div>

              {/* Facility Name */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '16px' }}>🏫</span>
                <span style={{
                  color: '#e94560', fontWeight: '800',
                  fontSize: 'clamp(14px,2vw,18px)', letterSpacing: '0.3px'
                }}>{service.facilityName}</span>
              </div>

              <h1 style={{
                color: 'white', fontWeight: '800',
                fontSize: 'clamp(20px,3vw,36px)',
                lineHeight: '1.3', marginBottom: '14px'
              }}>{service.title}</h1>

              <p style={{
                color: '#8892a4', fontSize: 'clamp(14px,2vw,16px)',
                lineHeight: '1.8', marginBottom: '20px'
              }}>{service.description}</p>

              {/* Rating Row */}
              <div style={{
                display: 'flex', alignItems: 'center',
                gap: '10px', marginBottom: '20px', flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex' }}>{renderStars(service.rating)}</div>
                <span style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>
                  {service.rating}
                </span>
                <span style={{ color: '#8892a4', fontSize: '14px' }}>
                  ({service.reviews} reviews)
                </span>
                <span style={{
                  backgroundColor: 'rgba(45,198,83,0.15)', color: '#2dc653',
                  fontSize: '12px', fontWeight: '700',
                  padding: '3px 10px', borderRadius: '20px'
                }}>✓ Verified</span>
              </div>

              {/* Meta Pills */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  { icon: '📍', text: service.location },
                  { icon: '⏱️', text: service.duration },
                  { icon: '🏆', text: `${service.experience} Exp.` },
                  ...(service.students ? [{ icon: '👥', text: `${service.students}+ Enrolled` }] : [])
                ].map((pill, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '30px', padding: '5px 12px'
                  }}>
                    <span style={{ fontSize: '12px' }}>{pill.icon}</span>
                    <span style={{ color: '#c8d0dc', fontSize: '12px', fontWeight: '500' }}>
                      {pill.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Card */}
            <div style={{
              width: 'min(100%, 300px)',
              backgroundColor: '#16213e',
              border: `1px solid ${color}44`,
              borderRadius: '20px', padding: 'clamp(20px,4vw,28px)',
              boxShadow: `0 20px 60px rgba(0,0,0,0.4),0 0 0 1px ${color}22`,
              flexShrink: 0
            }}>
              <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                <div style={{ fontSize: '12px', color: '#8892a4', marginBottom: '4px' }}>
                  Starting from
                </div>
                <div style={{
                  fontSize: 'clamp(32px,5vw,42px)', fontWeight: '800',
                  background: `linear-gradient(135deg,${color},${color}aa)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text', lineHeight: '1.1'
                }}>{service.price}</div>
              </div>

              {/* Performance Bar */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', marginBottom: '6px'
                }}>
                  <span style={{ color: '#8892a4', fontSize: '12px' }}>Performance</span>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: '700' }}>
                    {service.performance}%
                  </span>
                </div>
                <div style={{
                  height: '6px', backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px', overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%', width: `${service.performance}%`,
                    background: `linear-gradient(90deg,${color},${color}aa)`,
                    borderRadius: '10px'
                  }} />
                </div>
              </div>

              {/* Provider Mini */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '12px', marginBottom: '18px'
              }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg,${color},${color}88)`,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: '800',
                  color: 'white', fontSize: '16px'
                }}>
                  {service.provider.charAt(0)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    color: 'white', fontWeight: '700', fontSize: '14px',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}>
                    {service.provider}
                  </div>
                  <div style={{ color: '#8892a4', fontSize: '12px' }}>
                    {service.providerTitle}
                  </div>
                </div>
              </div>

              {/* ✅ CHANGED: was navigate('/login'), now handleBuyNow */}
              <button onClick={handleBuyNow} style={{
                width: '100%', padding: '13px',
                background: `linear-gradient(135deg,${color},${color}cc)`,
                border: 'none', borderRadius: '12px', color: 'white',
                fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                marginBottom: '10px',
                boxShadow: `0 4px 20px ${color}44`
              }}>
                {isLoggedIn ? '🛒 Buy Now' : '🔒 Login to Buy'}
              </button>

              <button onClick={() => navigate('/')} style={{
                width: '100%', padding: '11px',
                background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.12)',
                borderRadius: '12px', color: '#c8d0dc',
                fontSize: '14px', fontWeight: '600', cursor: 'pointer'
              }}>
                ← Back to Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs — completely unchanged */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(24px,4vw,40px) 16px' }}>
        <div style={{
          display: 'flex', gap: '4px', overflowX: 'auto',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '28px', paddingBottom: '0'
        }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: 'clamp(10px,2vw,12px) clamp(14px,3vw,24px)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === tab ? color : '#8892a4',
              fontWeight: activeTab === tab ? '700' : '500',
              fontSize: 'clamp(13px,2vw,15px)',
              borderBottom: activeTab === tab ? `2px solid ${color}` : '2px solid transparent',
              transition: 'all 0.2s ease', whiteSpace: 'nowrap', textTransform: 'capitalize'
            }}>
              {tab === 'overview' ? '📋 Overview'
                : tab === 'highlights' ? '✨ Highlights'
                  : tab === 'provider' ? '👤 Provider'
                    : '⭐ Reviews'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))',
            gap: '14px'
          }}>
            {[
              { icon: '🏫', label: 'Facility',     value: service.facilityName },
              { icon: '🏆', label: 'Experience',   value: service.experience },
              { icon: '⭐', label: 'Rating',       value: `${service.rating} / 5.0` },
              { icon: '💰', label: 'Price',        value: service.price },
              { icon: '⏱️', label: 'Duration',     value: service.duration },
              { icon: '📍', label: 'Location',     value: service.location },
              { icon: '📊', label: 'Performance',  value: `${service.performance}%` },
              { icon: '💬', label: 'Reviews',      value: `${service.reviews}+` },
              ...(service.students ? [{ icon: '👥', label: 'Students', value: `${service.students}+` }] : [])
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: `1px solid ${color}22`,
                borderRadius: '14px', padding: '18px 14px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '26px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ color: '#8892a4', fontSize: '11px', marginBottom: '4px' }}>
                  {item.label}
                </div>
                <div style={{
                  color: 'white', fontWeight: '700', fontSize: '14px',
                  wordBreak: 'break-word', lineHeight: '1.3'
                }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'highlights' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
            gap: '14px'
          }}>
            {service.highlights.map((h, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: `1px solid ${color}22`,
                borderRadius: '14px', padding: '16px 18px'
              }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg,${color}33,${color}11)`,
                  border: `1px solid ${color}44`,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '14px', color: color, fontWeight: '700'
                }}>✓</div>
                <span style={{ color: '#c8d0dc', fontWeight: '600', fontSize: '14px' }}>{h}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'provider' && (
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: `1px solid ${color}33`,
            borderRadius: '20px', padding: 'clamp(20px,4vw,36px)',
            maxWidth: '600px'
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              backgroundColor: 'rgba(233,69,96,0.1)',
              border: '1px solid rgba(233,69,96,0.2)',
              borderRadius: '30px', padding: '6px 14px',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '14px' }}>🏫</span>
              <span style={{ color: '#e94560', fontSize: '13px', fontWeight: '700' }}>
                {service.facilityName}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{
                width: 'clamp(60px,10vw,80px)', height: 'clamp(60px,10vw,80px)',
                borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg,${color},${color}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'clamp(24px,4vw,32px)', fontWeight: '800', color: 'white',
                border: `3px solid ${color}44`
              }}>{service.provider.charAt(0)}</div>
              <div>
                <h3 style={{ color: 'white', fontWeight: '800', fontSize: 'clamp(18px,3vw,22px)', marginBottom: '4px' }}>
                  {service.provider}
                </h3>
                <p style={{ color: color, fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>
                  {service.providerTitle}
                </p>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {renderStars(service.rating)}
                  <span style={{ color: '#8892a4', fontSize: '13px', marginLeft: '6px' }}>
                    {service.rating}
                  </span>
                </div>
              </div>
            </div>

            <p style={{ color: '#8892a4', fontSize: '15px', lineHeight: '1.8', marginBottom: '20px' }}>
              {service.about}
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Experience',  value: service.experience },
                { label: 'Performance', value: `${service.performance}%` },
                { label: 'Reviews',     value: `${service.reviews}+` }
              ].map((stat, i) => (
                <div key={i} style={{
                  backgroundColor: `${color}11`, border: `1px solid ${color}33`,
                  borderRadius: '12px', padding: '12px 20px', textAlign: 'center'
                }}>
                  <div style={{ color: color, fontWeight: '800', fontSize: '20px' }}>
                    {stat.value}
                  </div>
                  <div style={{ color: '#8892a4', fontSize: '12px' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '700px' }}>
            {[
              { name: 'Rajvanshi gupta.',  rating: 5, comment: 'Excellent service! Highly professional and knowledgeable. Totally worth the price.', date: '2 weeks ago' },
              { name: 'Rabindra nath tagor.',  rating: 5, comment: 'Amazing experience. The provider was very patient and explained everything clearly.', date: '1 month ago' },
              { name: 'Paramanand yadav.',   rating: 4, comment: 'Very good overall. Learned a lot. Could be slightly more detailed in some areas.', date: '1 month ago' },
              { name: 'Muskan',  rating: 5, comment: 'Best investment I made this year. Already seeing results in my work.', date: '2 months ago' },
            ].map((review, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px', padding: 'clamp(14px,3vw,20px)'
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg,${color},${color}88)`,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', color: 'white',
                      fontWeight: '700', fontSize: '15px'
                    }}>{review.name.charAt(0)}</div>
                    <div>
                      <div style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>
                        {review.name}
                      </div>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {Array.from({ length: 5 }, (_, j) => (
                          <span key={j} style={{
                            color: j < review.rating ? '#ffb703' : 'rgba(255,255,255,0.2)',
                            fontSize: '12px'
                          }}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span style={{ color: '#8892a4', fontSize: '12px' }}>{review.date}</span>
                </div>
                <p style={{ color: '#8892a4', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ ADD: Payment modal at bottom of return */}
      {showPayment && (
        <PaymentModal
          service={service}
          onClose={() => setShowPayment(false)}
        />
      )}

    </div>
  );
}

export default ServiceDetail;