import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, categoryColors, services } from '../data/servicesData';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredServices = services.filter(s => {
    const matchSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.facilityName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === 'all' || s.categoryValue === selectedCategory;
    return matchSearch && matchCategory;
  });

  const activeCat = categories.find(c => c.value === selectedCategory);

  const SidebarContent = () => (
    <>
      <h3 style={{
        color: 'white', fontWeight: '700', fontSize: '15px',
        marginBottom: '16px', paddingBottom: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>🗂️ Explore Categories</h3>
      {[{ icon: '🌟', label: 'All Services', value: 'all' }, ...categories].map(cat => {
        const count = cat.value === 'all'
          ? services.length
          : services.filter(s => s.categoryValue === cat.value).length;
        const isActive = selectedCategory === cat.value;
        const isHov = hoveredCategory === cat.value;
        const color = categoryColors[cat.value] || '#e94560';
        return (
          <div key={cat.value}
            onClick={() => { setSelectedCategory(cat.value); setSidebarOpen(false); }}
            onMouseEnter={() => setHoveredCategory(cat.value)}
            onMouseLeave={() => setHoveredCategory(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '10px',
              cursor: 'pointer', marginBottom: '4px',
              backgroundColor: isActive ? `${color}18`
                : isHov ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: isActive ? `1px solid ${color}44` : '1px solid transparent',
              transition: 'all 0.2s ease'
            }}>
            <span style={{ fontSize: '17px' }}>{cat.icon}</span>
            <span style={{
              color: isActive ? color : '#c8d0dc',
              fontSize: '13px', fontWeight: '500', flex: 1, lineHeight: '1.3'
            }}>{cat.label}</span>
            <span style={{
              backgroundColor: isActive ? `${color}33` : 'rgba(255,255,255,0.08)',
              color: isActive ? color : '#8892a4',
              fontSize: '11px', padding: '2px 7px',
              borderRadius: '20px', fontWeight: '600'
            }}>{count}</span>
          </div>
        );
      })}
    </>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
    }}>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 200
          }}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: '280px',
        backgroundColor: '#16213e',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '24px',
        zIndex: 300,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '20px'
        }}>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>
            Categories
          </span>
          <button onClick={() => setSidebarOpen(false)} style={{
            background: 'none', border: 'none', color: '#8892a4',
            fontSize: '22px', cursor: 'pointer', lineHeight: 1
          }}>✕</button>
        </div>
        <SidebarContent />
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', padding: 'clamp(40px,8vw,70px) 20px 40px',
        textAlign: 'center', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(233,69,96,0.1) 0%,transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          backgroundColor: 'rgba(233,69,96,0.12)',
          border: '1px solid rgba(233,69,96,0.3)',
          borderRadius: '50px', padding: '7px 18px', marginBottom: '24px'
        }}>
          <span style={{ fontSize: '13px' }}>⚡</span>
          <span style={{ color: '#e94560', fontSize: '12px', fontWeight: '600' }}>
            {services.length}+ Services Available
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(28px,6vw,64px)', fontWeight: '800',
          color: 'white', lineHeight: '1.1', marginBottom: '8px'
        }}>Discover the</h1>
        <h1 style={{
          fontSize: 'clamp(28px,6vw,64px)', fontWeight: '800',
          lineHeight: '1.1', marginBottom: '18px',
          background: 'linear-gradient(135deg,#e94560 0%,#ff6b6b 50%,#ffa07a 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Right Service ✦</h1>

        <p style={{
          fontSize: 'clamp(14px,2vw,17px)', color: '#8892a4',
          maxWidth: '520px', margin: '0 auto 32px', lineHeight: '1.8'
        }}>
          <span style={{ color: '#c8d0dc', fontWeight: '500' }}>Effortlessly</span> connect
          with trusted, top-rated professionals for any task,{' '}
          <span style={{ color: '#c8d0dc', fontWeight: '500' }}>anytime and anywhere.</span>
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 8px' }}>
          <div style={{
            display: 'flex',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1.5px solid rgba(233,69,96,0.3)',
            borderRadius: '14px',
            padding: '6px 6px 6px 16px',
            gap: '6px', alignItems: 'center',
            boxShadow: '0 8px 40px rgba(233,69,96,0.15)'
          }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>🔍</span>
            <input
              type="text"
              placeholder="Search services, courses, facilities..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                flex: 1, background: 'transparent', border: 'none',
                outline: 'none', color: 'white',
                fontSize: 'clamp(13px,2vw,16px)',
                padding: '8px 0', minWidth: 0
              }}
            />
            <button style={{
              padding: 'clamp(8px,2vw,12px) clamp(14px,3vw,24px)',
              background: 'linear-gradient(135deg,#e94560,#c62a47)',
              border: 'none', borderRadius: '10px', color: 'white',
              fontSize: 'clamp(13px,2vw,15px)', fontWeight: '700',
              cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0
            }}>Search</button>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ──────────────────────────────────────── */}
      <div style={{
        maxWidth: '1300px', margin: '0 auto',
        padding: '0 16px 60px',
        display: 'flex', gap: '24px', alignItems: 'flex-start'
      }}>

        {/* Desktop Sidebar */}
        <div style={{
          width: '240px', flexShrink: 0,
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '20px',
          position: 'sticky', top: '90px',
          display: 'none'
        }}
          className="desktop-sidebar">
          <SidebarContent />
        </div>

        {/* Right Content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Top Bar */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px', flexWrap: 'wrap', gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Mobile Filter Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px', color: '#c8d0dc',
                  fontSize: '13px', cursor: 'pointer',
                  fontWeight: '600'
                }}
                className="mobile-filter-btn">
                ☰ Categories
              </button>
              <div>
                <h2 style={{
                  color: 'white', fontWeight: '700',
                  fontSize: 'clamp(16px,3vw,20px)', marginBottom: '2px'
                }}>
                  {selectedCategory === 'all' ? 'All Services' : activeCat?.label}
                </h2>
                <p style={{ color: '#8892a4', fontSize: '12px', margin: 0 }}>
                  {filteredServices.length} services found
                </p>
              </div>
            </div>

            {/* Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '9px 14px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '10px', color: 'white',
                  fontSize: '13px', cursor: 'pointer',
                  justifyContent: 'space-between', minWidth: '170px'
                }}>
                <span>
                  {selectedCategory === 'all' ? '🌟 All Services'
                    : `${activeCat?.icon} ${activeCat?.label}`}
                </span>
                <span style={{
                  transition: 'transform 0.2s',
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                  fontSize: '10px'
                }}>▼</span>
              </button>

              {dropdownOpen && (
                <div style={{
                  position: 'absolute', top: '110%', right: 0,
                  backgroundColor: '#16213e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', padding: '8px',
                  zIndex: 100, minWidth: '220px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                }}>
                  {[{ icon: '🌟', label: 'All Services', value: 'all' }, ...categories].map(cat => (
                    <div key={cat.value}
                      onClick={() => { setSelectedCategory(cat.value); setDropdownOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 14px', borderRadius: '8px', cursor: 'pointer',
                        color: selectedCategory === cat.value ? '#e94560' : '#c8d0dc',
                        backgroundColor: selectedCategory === cat.value
                          ? 'rgba(233,69,96,0.1)' : 'transparent',
                        fontSize: '14px', transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={e =>
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={e =>
                        e.currentTarget.style.backgroundColor =
                        selectedCategory === cat.value ? 'rgba(233,69,96,0.1)' : 'transparent'}>
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CARDS GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
            gap: '16px'
          }}>
            {filteredServices.length > 0 ? filteredServices.map(service => {
              const isHov = hoveredCard === service.id;
              const color = categoryColors[service.categoryValue] || '#e94560';
              return (
                <div key={service.id}
                  onMouseEnter={() => setHoveredCard(service.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: isHov
                      ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                    border: isHov
                      ? `1px solid ${color}55` : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px', padding: '20px', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: isHov ? 'translateY(-5px)' : 'translateY(0)',
                    boxShadow: isHov
                      ? `0 16px 40px rgba(0,0,0,0.3),0 0 0 1px ${color}33`
                      : '0 4px 16px rgba(0,0,0,0.2)',
                    position: 'relative', overflow: 'hidden'
                  }}>

                  {/* Top accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: `linear-gradient(90deg,${color},transparent)`,
                    borderRadius: '16px 16px 0 0'
                  }} />

                  {/* Category + Price */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '10px'
                  }}>
                    <span style={{
                      backgroundColor: `${color}22`, color: color,
                      fontSize: '11px', fontWeight: '700',
                      padding: '3px 10px', borderRadius: '20px',
                      border: `1px solid ${color}44`
                    }}>{service.category}</span>
                    <span style={{
                      color: '#2dc653', fontWeight: '800', fontSize: '15px'
                    }}>{service.price}</span>
                  </div>

                  {/* Facility Name */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    marginBottom: '6px'
                  }}>
                    <span style={{ fontSize: '12px' }}>🏫</span>
                    <span style={{
                      color: '#e94560', fontSize: '12px',
                      fontWeight: '700', letterSpacing: '0.2px'
                    }}>{service.facilityName}</span>
                  </div>

                  {/* Subcategory */}
                  <div style={{
                    fontSize: '11px', color: '#8892a4',
                    marginBottom: '8px', fontWeight: '500'
                  }}>📌 {service.subcategory}</div>

                  {/* Title */}
                  <h3 style={{
                    color: 'white', fontWeight: '700',
                    fontSize: '15px', marginBottom: '8px', lineHeight: '1.4'
                  }}>{service.title}</h3>

                  {/* Description */}
                  <p style={{
                    color: '#8892a4', fontSize: '13px',
                    lineHeight: '1.6', marginBottom: '12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                  }}>{service.description}</p>

                  {/* Rating */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    gap: '6px', marginBottom: '12px'
                  }}>
                    <span style={{ color: '#ffb703', fontSize: '12px' }}>★★★★★</span>
                    <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>
                      {service.rating}
                    </span>
                    <span style={{ color: '#8892a4', fontSize: '12px' }}>
                      ({service.reviews} reviews)
                    </span>
                  </div>

                  {/* Bottom */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255,255,255,0.06)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '12px' }}>📍</span>
                      <span style={{ color: '#8892a4', fontSize: '12px' }}>
                        {service.location}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/service/${service.id}`)}
                      style={{
                        padding: '7px 14px',
                        background: isHov
                          ? `linear-gradient(135deg,${color},${color}cc)` : 'transparent',
                        border: `1.5px solid ${color}`,
                        borderRadius: '8px',
                        color: isHov ? 'white' : color,
                        fontSize: '12px', fontWeight: '700',
                        cursor: 'pointer', transition: 'all 0.3s ease'
                      }}>
                      View Details →
                    </button>
                  </div>
                </div>
              );
            }) : (
              <div style={{
                gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                <h3 style={{ color: 'white', marginBottom: '8px' }}>No services found</h3>
                <p style={{ color: '#8892a4' }}>Try a different search or category</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        .desktop-sidebar { display: block !important; }
        .mobile-filter-btn { display: none !important; }

        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

export default Home;