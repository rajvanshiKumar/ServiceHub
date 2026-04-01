import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getDashboardStats, getUserOrders,
  getPaymentHistory, updateProfile, changePassword,
} from '../services/api';



const TABS = [
  { key:'overview',  icon:'📊', label:'Overview'         },
  { key:'services',  icon:'🛒', label:'My Services'      },
  { key:'payments',  icon:'💳', label:'Payment History'  },
  { key:'settings',  icon:'⚙️', label:'Account Settings' },
];

const STATUS_STYLE = {
  active:    { bg:'rgba(45,198,83,0.15)',   text:'#2dc653', border:'rgba(45,198,83,0.3)'   },
  completed: { bg:'rgba(108,99,255,0.15)',  text:'#6c63ff', border:'rgba(108,99,255,0.3)'  },
  pending:   { bg:'rgba(255,183,3,0.15)',   text:'#ffb703', border:'rgba(255,183,3,0.3)'   },
  cancelled: { bg:'rgba(233,69,96,0.15)',   text:'#e94560', border:'rgba(233,69,96,0.3)'   },
  success:   { bg:'rgba(45,198,83,0.15)',   text:'#2dc653', border:'rgba(45,198,83,0.3)'   },
  failed:    { bg:'rgba(233,69,96,0.15)',   text:'#e94560', border:'rgba(233,69,96,0.3)'   },
  refunded:  { bg:'rgba(255,183,3,0.15)',   text:'#ffb703', border:'rgba(255,183,3,0.3)'   },
};

const fmt  = (d) => new Date(d).toLocaleDateString('en-IN',
  { day:'2-digit', month:'short', year:'numeric' });
const fmtC = (n) => `₹${parseFloat(n||0).toLocaleString('en-IN')}`;

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, login } = useAuth();

  const [tab,         setTab]         = useState('overview');
  const [drawer,      setDrawer]      = useState(false);
  const [stats,       setStats]       = useState(null);
  const [orders,      setOrders]      = useState([]);
  const [payments,    setPayments]    = useState([]);
  const [loading,     setLoading]     = useState(true);

  // Profile form
  const [pForm,       setPForm]       = useState({ name: user?.name || '' });
  const [pMsg,        setPMsg]        = useState('');
  const [pErr,        setPErr]        = useState('');
  const [pLoad,       setPLoad]       = useState(false);

  // Password form
  const [wForm,       setWForm]       = useState({ old:'', new_p:'', confirm:'' });
  const [wMsg,        setWMsg]        = useState('');
  const [wErr,        setWErr]        = useState('');
  const [wLoad,       setWLoad]       = useState(false);
  const [showOld,     setShowOld]     = useState(false);
  const [showNew,     setShowNew]     = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // 1. Define fetchAll FIRST
const fetchAll = async () => {
  setLoading(true);
  try {
    const [s, o, p] = await Promise.all([
      getDashboardStats(),
      getUserOrders(),
      getPaymentHistory(),
    ]);
    setStats(s.data.stats);
    setOrders(o.data.orders);
    setPayments(p.data.payments);
  } catch (err) {
    if (err.response?.status === 401) { logout(); navigate('/login'); }
  } finally {
    setLoading(false);
  }
};

// 2. Then useEffect AFTER
useEffect(() => { fetchAll(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleUpdateProfile = async e => {
    e.preventDefault();
    setPLoad(true); setPMsg(''); setPErr('');
    try {
      const res = await updateProfile({ name: pForm.name });
      setPMsg(res.data.message);
      login(res.data.user, {
        access:  localStorage.getItem('access_token'),
        refresh: localStorage.getItem('refresh_token'),
      });
    } catch (err) {
      setPErr(err.response?.data?.message || 'Update failed.');
    } finally { setPLoad(false); }
  };

  const handleChangePassword = async e => {
    e.preventDefault();
    if (wForm.new_p !== wForm.confirm) { setWErr('Passwords do not match.'); return; }
    setWLoad(true); setWMsg(''); setWErr('');
    try {
      const res = await changePassword({ old_password: wForm.old, new_password: wForm.new_p });
      setWMsg(res.data.message);
      setWForm({ old:'', new_p:'', confirm:'' });
    } catch (err) {
      setWErr(err.response?.data?.message || 'Failed.');
    } finally { setWLoad(false); }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  // ── Shared styles ──────────────────────────────────────────
  const card = {
    backgroundColor:'rgba(255,255,255,0.03)',
    border:'1px solid rgba(255,255,255,0.08)',
    borderRadius:'16px', padding:'24px',
  };

  const inp = {
    width:'100%', padding:'11px 14px',
    backgroundColor:'rgba(255,255,255,0.05)',
    border:'1.5px solid rgba(255,255,255,0.1)',
    borderRadius:'10px', color:'white',
    fontSize:'14px', outline:'none',
  };

  const lbl = {
    color:'#8892a4', fontSize:'12px', fontWeight:'600',
    marginBottom:'6px', display:'block', letterSpacing:'0.4px',
  };

  // ── Loading ────────────────────────────────────────────────
  if (loading) return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(135deg,#1a1a2e,#16213e)',
      display:'flex', alignItems:'center',
      justifyContent:'center', flexDirection:'column', gap:'14px'
    }}>
      <div style={{
        width:'44px', height:'44px', borderRadius:'50%',
        border:'3px solid rgba(233,69,96,0.2)',
        borderTop:'3px solid #e94560',
        animation:'spin 0.8s linear infinite'
      }}/>
      <p style={{ color:'#8892a4', fontSize:'14px' }}>Loading dashboard...</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)',
      display:'flex'
    }}>

      {/* Overlay */}
      {drawer && (
        <div onClick={() => setDrawer(false)} style={{
          position:'fixed', inset:0,
          backgroundColor:'rgba(0,0,0,0.6)', zIndex:200
        }}/>
      )}

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <aside style={{
        width:'250px', flexShrink:0,
        backgroundColor:'#0d0d1a',
        borderRight:'1px solid rgba(255,255,255,0.06)',
        display:'flex', flexDirection:'column',
        height:'100vh', position:'sticky', top:0,
      }} className="db-sidebar">

        {/* Brand */}
        <div style={{ padding:'22px 18px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'18px' }}>
            <div style={{
              width:'34px', height:'34px', backgroundColor:'#e94560',
              borderRadius:'8px', display:'flex', alignItems:'center',
              justifyContent:'center', fontWeight:'800',
              color:'white', fontSize:'15px', flexShrink:0
            }}>S</div>
            <span style={{ color:'white', fontWeight:'800', fontSize:'17px' }}>
              Service<span style={{ color:'#e94560' }}>Hub</span>
            </span>
          </div>

          {/* Avatar */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{
              width:'44px', height:'44px', borderRadius:'50%', flexShrink:0,
              background:'linear-gradient(135deg,#e94560,#c62a47)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontWeight:'800', color:'white', fontSize:'18px',
              border:'2px solid rgba(233,69,96,0.4)'
            }}>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
            <div style={{ minWidth:0 }}>
              <div style={{
                color:'white', fontWeight:'700', fontSize:'13px',
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'
              }}>{user?.name}</div>
              <div style={{ color:'#8892a4', fontSize:'11px' }}>
                {user?.role === 'provider' ? '💼 Provider' : '🛒 Receiver'}
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'14px 10px', overflowY:'auto' }}>
          {TABS.map(t => (
            <div key={t.key}
              onClick={() => { setTab(t.key); setDrawer(false); }}
              style={{
                display:'flex', alignItems:'center', gap:'10px',
                padding:'11px 12px', borderRadius:'10px',
                cursor:'pointer', marginBottom:'3px',
                backgroundColor: tab === t.key
                  ? 'rgba(233,69,96,0.15)' : 'transparent',
                border: tab === t.key
                  ? '1px solid rgba(233,69,96,0.25)' : '1px solid transparent',
                transition:'all 0.2s ease'
              }}>
              <span style={{ fontSize:'17px' }}>{t.icon}</span>
              <span style={{
                color: tab === t.key ? '#e94560' : '#c8d0dc',
                fontWeight: tab === t.key ? '700' : '500',
                fontSize:'13px'
              }}>{t.label}</span>
              {tab === t.key && (
                <div style={{
                  marginLeft:'auto', width:'6px', height:'6px',
                  borderRadius:'50%', backgroundColor:'#e94560'
                }}/>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding:'14px 10px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={handleLogout} style={{
            width:'100%', padding:'10px',
            backgroundColor:'rgba(233,69,96,0.08)',
            border:'1px solid rgba(233,69,96,0.2)',
            borderRadius:'10px', color:'#e94560',
            fontSize:'13px', fontWeight:'600',
            cursor:'pointer', transition:'all 0.2s',
            display:'flex', alignItems:'center',
            justifyContent:'center', gap:'6px'
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor='rgba(233,69,96,0.18)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor='rgba(233,69,96,0.08)'}
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <aside style={{
        width:'250px', flexShrink:0,
        backgroundColor:'#0d0d1a',
        borderRight:'1px solid rgba(255,255,255,0.06)',
        display:'flex', flexDirection:'column',
        position:'fixed', top:0, left:0, bottom:0,
        zIndex:300, transform: drawer ? 'translateX(0)' : 'translateX(-100%)',
        transition:'transform 0.3s ease'
      }} className="db-drawer">
        <div style={{ padding:'20px 18px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
            <span style={{ color:'white', fontWeight:'800', fontSize:'17px' }}>
              Service<span style={{ color:'#e94560' }}>Hub</span>
            </span>
            <button onClick={() => setDrawer(false)} style={{
              background:'none', border:'none', color:'#8892a4',
              fontSize:'20px', cursor:'pointer', lineHeight:1
            }}>✕</button>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{
              width:'40px', height:'40px', borderRadius:'50%',
              background:'linear-gradient(135deg,#e94560,#c62a47)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontWeight:'800', color:'white', fontSize:'16px'
            }}>{user?.name?.charAt(0)?.toUpperCase()}</div>
            <div>
              <div style={{ color:'white', fontWeight:'700', fontSize:'13px' }}>{user?.name}</div>
              <div style={{ color:'#8892a4', fontSize:'11px' }}>{user?.email}</div>
            </div>
          </div>
        </div>
        <nav style={{ flex:1, padding:'14px 10px' }}>
          {TABS.map(t => (
            <div key={t.key}
              onClick={() => { setTab(t.key); setDrawer(false); }}
              style={{
                display:'flex', alignItems:'center', gap:'10px',
                padding:'11px 12px', borderRadius:'10px',
                cursor:'pointer', marginBottom:'3px',
                backgroundColor: tab === t.key ? 'rgba(233,69,96,0.15)' : 'transparent',
                color: tab === t.key ? '#e94560' : '#c8d0dc',
                transition:'all 0.2s ease'
              }}>
              <span style={{ fontSize:'17px' }}>{t.icon}</span>
              <span style={{ fontWeight: tab===t.key ? '700':'500', fontSize:'13px' }}>
                {t.label}
              </span>
            </div>
          ))}
        </nav>
        <div style={{ padding:'14px 10px', borderTop:'1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={handleLogout} style={{
            width:'100%', padding:'10px',
            backgroundColor:'rgba(233,69,96,0.08)',
            border:'1px solid rgba(233,69,96,0.2)',
            borderRadius:'10px', color:'#e94560',
            fontSize:'13px', fontWeight:'600', cursor:'pointer'
          }}>🚪 Logout</button>
        </div>
      </aside>

      {/* ── MAIN ────────────────────────────────────────────── */}
      <main style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>

        {/* Top Bar */}
        <header style={{
          backgroundColor:'rgba(13,13,26,0.85)',
          borderBottom:'1px solid rgba(255,255,255,0.06)',
          padding:'14px clamp(14px,3vw,28px)',
          display:'flex', alignItems:'center',
          justifyContent:'space-between', gap:'14px',
          position:'sticky', top:0, zIndex:100,
          backdropFilter:'blur(12px)'
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <button onClick={() => setDrawer(true)}
              className="hamburger-btn"
              style={{
                background:'none', border:'none', cursor:'pointer',
                display:'none', flexDirection:'column',
                gap:'5px', padding:'4px'
              }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display:'block', width:'22px', height:'2px',
                  backgroundColor:'#e94560', borderRadius:'2px'
                }}/>
              ))}
            </button>
            <div>
              <h1 style={{
                color:'white', fontWeight:'800',
                fontSize:'clamp(16px,3vw,20px)', margin:0
              }}>
                {TABS.find(t => t.key===tab)?.icon}{' '}
                {TABS.find(t => t.key===tab)?.label}
              </h1>
            </div>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ color:'#8892a4', fontSize:'13px' }} className="welcome-msg">
              Welcome,{' '}
              <span style={{ color:'#e94560', fontWeight:'700' }}>
                {user?.name?.split(' ')[0]}
              </span>{' '}👋
            </span>
            <div style={{
              width:'36px', height:'36px', borderRadius:'50%',
              background:'linear-gradient(135deg,#e94560,#c62a47)',
              display:'flex', alignItems:'center',
              justifyContent:'center', fontWeight:'800',
              color:'white', fontSize:'14px',
              border:'2px solid rgba(233,69,96,0.4)'
            }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ flex:1, padding:'clamp(14px,3vw,28px)', overflowY:'auto' }}>

          {/* ════ OVERVIEW ════ */}
          {tab === 'overview' && (
            <div>
              {/* Welcome Banner */}
              <div style={{
                background:'linear-gradient(135deg,rgba(233,69,96,0.12),rgba(108,99,255,0.08))',
                border:'1px solid rgba(233,69,96,0.18)',
                borderRadius:'18px',
                padding:'clamp(18px,3vw,28px)',
                marginBottom:'22px',
                display:'flex', alignItems:'center',
                justifyContent:'space-between', flexWrap:'wrap', gap:'12px'
              }}>
                <div>
                  <h2 style={{
                    color:'white', fontWeight:'800',
                    fontSize:'clamp(18px,3vw,26px)', marginBottom:'6px'
                  }}>
                    Welcome back, {user?.name?.split(' ')[0]} 👋
                  </h2>
                  <p style={{ color:'#8892a4', fontSize:'14px', margin:0 }}>
                    Here's your ServiceHub activity at a glance.
                  </p>
                </div>
                <div style={{ fontSize:'56px', opacity:0.7 }}>🚀</div>
              </div>

              {/* Profile Card */}
              <div style={{ ...card, marginBottom:'20px' }}>
                <h3 style={{ color:'white', fontWeight:'700', fontSize:'15px', marginBottom:'16px' }}>
                  👤 Profile Information
                </h3>
                <div style={{
                  display:'flex', alignItems:'center',
                  gap:'18px', flexWrap:'wrap'
                }}>
                  <div style={{
                    width:'66px', height:'66px', borderRadius:'50%', flexShrink:0,
                    background:'linear-gradient(135deg,#e94560,#c62a47)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'26px', fontWeight:'800', color:'white',
                    border:'3px solid rgba(233,69,96,0.3)',
                    boxShadow:'0 6px 20px rgba(233,69,96,0.25)'
                  }}>{user?.name?.charAt(0)?.toUpperCase()}</div>
                  <div>
                    <h3 style={{ color:'white', fontWeight:'800', fontSize:'18px', marginBottom:'3px' }}>
                      {user?.name}
                    </h3>
                    <p style={{ color:'#8892a4', fontSize:'13px', marginBottom:'6px' }}>
                      ✉️ {user?.email}
                    </p>
                    <span style={{
                      backgroundColor:'rgba(233,69,96,0.12)',
                      color:'#e94560', fontSize:'11px', fontWeight:'700',
                      padding:'3px 10px', borderRadius:'20px',
                      border:'1px solid rgba(233,69,96,0.25)'
                    }}>
                      {user?.role === 'provider' ? '💼 Provider' : '🛒 Receiver'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',
                gap:'14px', marginBottom:'22px'
              }}>
                {[
                  { icon:'🛒', label:'Total Services',  val: stats?.total_services  || 0,        color:'#6c63ff' },
                  { icon:'💰', label:'Total Spent',      val: fmtC(stats?.total_spent || 0),      color:'#e94560' },
                  { icon:'⚡', label:'Active Services',  val: stats?.active_services || 0,        color:'#2dc653' },
                  { icon:'✅', label:'Completed',        val: stats?.completed       || 0,        color:'#ffb703' },
                ].map((c,i) => (
                  <div key={i} style={{
                    backgroundColor:'rgba(255,255,255,0.03)',
                    border:`1px solid ${c.color}22`,
                    borderRadius:'14px', padding:'20px',
                    position:'relative', overflow:'hidden'
                  }}>
                    <div style={{
                      position:'absolute', top:0, left:0, right:0, height:'3px',
                      background:`linear-gradient(90deg,${c.color},transparent)`
                    }}/>
                    <div style={{ fontSize:'26px', marginBottom:'10px' }}>{c.icon}</div>
                    <div style={{ color:'#8892a4', fontSize:'12px', marginBottom:'4px' }}>
                      {c.label}
                    </div>
                    <div style={{
                      color:'white', fontWeight:'800',
                      fontSize:'clamp(18px,3vw,24px)'
                    }}>{c.val}</div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div style={card}>
                <div style={{
                  display:'flex', justifyContent:'space-between',
                  alignItems:'center', marginBottom:'16px', flexWrap:'wrap', gap:'8px'
                }}>
                  <h3 style={{ color:'white', fontWeight:'700', fontSize:'15px', margin:0 }}>
                    🕐 Recent Services
                  </h3>
                  <button onClick={() => setTab('services')} style={{
                    background:'none',
                    border:'1px solid rgba(233,69,96,0.3)',
                    borderRadius:'8px', color:'#e94560',
                    fontSize:'12px', fontWeight:'600',
                    cursor:'pointer', padding:'5px 12px'
                  }}>View All →</button>
                </div>

                {orders.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'28px', color:'#8892a4' }}>
                    <div style={{ fontSize:'36px', marginBottom:'10px' }}>🛒</div>
                    <p style={{ marginBottom:'14px' }}>No services purchased yet.</p>
                    <button onClick={() => navigate('/')} style={{
                      padding:'9px 22px',
                      background:'linear-gradient(135deg,#e94560,#c62a47)',
                      border:'none', borderRadius:'10px',
                      color:'white', fontWeight:'700',
                      cursor:'pointer', fontSize:'13px'
                    }}>Browse Services</button>
                  </div>
                ) : orders.slice(0,4).map((o,i) => (
                  <div key={o.id} style={{
                    display:'flex', alignItems:'center',
                    justifyContent:'space-between',
                    flexWrap:'wrap', gap:'8px',
                    padding:'12px 0',
                    borderBottom: i<3 ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}>
                    <div>
                      <div style={{ color:'white', fontWeight:'600', fontSize:'13px', marginBottom:'2px' }}>
                        {o.service_title}
                      </div>
                      <div style={{ color:'#8892a4', fontSize:'11px' }}>
                        {o.service_category} · {fmt(o.purchased_at)}
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <span style={{ color:'#2dc653', fontWeight:'700', fontSize:'14px' }}>
                        {fmtC(o.price)}
                      </span>
                      <span style={{
                        backgroundColor: STATUS_STYLE[o.status]?.bg,
                        color:           STATUS_STYLE[o.status]?.text,
                        border:         `1px solid ${STATUS_STYLE[o.status]?.border}`,
                        fontSize:'11px', fontWeight:'700',
                        padding:'2px 8px', borderRadius:'20px'
                      }}>{o.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ MY SERVICES ════ */}
          {tab === 'services' && (
            <div>
              <div style={{
                display:'flex', justifyContent:'space-between',
                alignItems:'center', marginBottom:'18px',
                flexWrap:'wrap', gap:'10px'
              }}>
                <h2 style={{ color:'white', fontWeight:'700', fontSize:'18px', margin:0 }}>
                  My Purchased Services
                </h2>
                <button onClick={() => navigate('/')} style={{
                  padding:'9px 18px',
                  background:'linear-gradient(135deg,#e94560,#c62a47)',
                  border:'none', borderRadius:'10px',
                  color:'white', fontWeight:'700',
                  cursor:'pointer', fontSize:'13px'
                }}>+ Browse More</button>
              </div>

              {orders.length === 0 ? (
                <div style={{ ...card, textAlign:'center', padding:'52px 20px' }}>
                  <div style={{ fontSize:'48px', marginBottom:'14px' }}>🛒</div>
                  <h3 style={{ color:'white', marginBottom:'8px' }}>No services yet</h3>
                  <p style={{ color:'#8892a4', marginBottom:'18px' }}>
                    Purchase services to see them here.
                  </p>
                  <button onClick={() => navigate('/')} style={{
                    padding:'11px 28px',
                    background:'linear-gradient(135deg,#e94560,#c62a47)',
                    border:'none', borderRadius:'10px',
                    color:'white', fontWeight:'700', cursor:'pointer'
                  }}>Browse Services</button>
                </div>
              ) : (
                <div style={{
                  display:'grid',
                  gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',
                  gap:'14px'
                }}>
                  {orders.map(o => (
                    <div key={o.id} style={{
                      ...card, position:'relative', overflow:'hidden'
                    }}>
                      <div style={{
                        position:'absolute', top:0, left:0, right:0, height:'3px',
                        background:'linear-gradient(90deg,#e94560,transparent)'
                      }}/>
                      <div style={{
                        display:'flex', justifyContent:'space-between',
                        alignItems:'center', marginBottom:'10px'
                      }}>
                        <span style={{
                          backgroundColor:'rgba(108,99,255,0.15)',
                          color:'#6c63ff', fontSize:'11px', fontWeight:'700',
                          padding:'3px 10px', borderRadius:'20px',
                          border:'1px solid rgba(108,99,255,0.3)'
                        }}>{o.service_category}</span>
                        <span style={{
                          backgroundColor: STATUS_STYLE[o.status]?.bg,
                          color:           STATUS_STYLE[o.status]?.text,
                          border:         `1px solid ${STATUS_STYLE[o.status]?.border}`,
                          fontSize:'11px', fontWeight:'700',
                          padding:'3px 10px', borderRadius:'20px'
                        }}>{o.status}</span>
                      </div>

                      <h3 style={{
                        color:'white', fontWeight:'700',
                        fontSize:'14px', marginBottom:'10px', lineHeight:'1.4'
                      }}>{o.service_title}</h3>

                      <div style={{
                        display:'flex', justifyContent:'space-between',
                        alignItems:'center', marginBottom:'14px'
                      }}>
                        <span style={{ color:'#2dc653', fontWeight:'800', fontSize:'16px' }}>
                          {fmtC(o.price)}
                        </span>
                        <span style={{ color:'#8892a4', fontSize:'11px' }}>
                          📅 {fmt(o.purchased_at)}
                        </span>
                      </div>

                      <div style={{ display:'flex', gap:'8px' }}>
                        <button onClick={() => navigate(`/service/${o.service_id}`)} style={{
                          flex:1, padding:'8px',
                          background:'transparent',
                          border:'1.5px solid rgba(233,69,96,0.35)',
                          borderRadius:'8px', color:'#e94560',
                          fontSize:'12px', fontWeight:'600', cursor:'pointer'
                        }}>👁 View Details</button>
                        <button style={{
                          flex:1, padding:'8px',
                          background:'linear-gradient(135deg,#e94560,#c62a47)',
                          border:'none', borderRadius:'8px',
                          color:'white', fontSize:'12px',
                          fontWeight:'600', cursor:'pointer'
                        }}>📞 Contact</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════ PAYMENTS ════ */}
          {tab === 'payments' && (
            <div>
              <h2 style={{ color:'white', fontWeight:'700', fontSize:'18px', marginBottom:'18px' }}>
                Payment History
              </h2>

              {payments.length === 0 ? (
                <div style={{ ...card, textAlign:'center', padding:'52px 20px' }}>
                  <div style={{ fontSize:'48px', marginBottom:'14px' }}>💳</div>
                  <h3 style={{ color:'white', marginBottom:'8px' }}>No transactions yet</h3>
                  <p style={{ color:'#8892a4' }}>Payment history will appear here.</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div style={{ ...card, overflowX:'auto' }} className="pay-table">
                    <table style={{ width:'100%', borderCollapse:'collapse' }}>
                      <thead>
                        <tr>
                          {['Transaction ID','Service','Amount','Status','Date'].map(h => (
                            <th key={h} style={{
                              color:'#8892a4', fontSize:'12px', fontWeight:'700',
                              padding:'10px 12px', textAlign:'left',
                              borderBottom:'1px solid rgba(255,255,255,0.08)',
                              whiteSpace:'nowrap'
                            }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((p,i) => (
                          <tr key={p.id} style={{
                            borderBottom: i<payments.length-1
                              ? '1px solid rgba(255,255,255,0.04)' : 'none'
                          }}>
                            <td style={{ padding:'13px 12px' }}>
                              <span style={{
                                color:'#6c63ff', fontSize:'12px',
                                fontFamily:'monospace', fontWeight:'600'
                              }}>{p.transaction_id}</span>
                            </td>
                            <td style={{ padding:'13px 12px' }}>
                              <span style={{
                                color:'white', fontSize:'13px',
                                fontWeight:'500'
                              }}>{p.service_name}</span>
                            </td>
                            <td style={{ padding:'13px 12px' }}>
                              <span style={{ color:'#2dc653', fontWeight:'700', fontSize:'14px' }}>
                                {fmtC(p.amount)}
                              </span>
                            </td>
                            <td style={{ padding:'13px 12px' }}>
                              <span style={{
                                backgroundColor: STATUS_STYLE[p.status]?.bg,
                                color:           STATUS_STYLE[p.status]?.text,
                                border:         `1px solid ${STATUS_STYLE[p.status]?.border}`,
                                fontSize:'11px', fontWeight:'700',
                                padding:'3px 10px', borderRadius:'20px',
                                whiteSpace:'nowrap'
                              }}>{p.status}</span>
                            </td>
                            <td style={{ padding:'13px 12px' }}>
                              <span style={{ color:'#8892a4', fontSize:'12px' }}>
                                {fmt(p.paid_at)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="pay-cards" style={{ display:'none' }}>
                    {payments.map(p => (
                      <div key={p.id} style={{ ...card, marginBottom:'10px' }}>
                        <div style={{
                          display:'flex', justifyContent:'space-between',
                          marginBottom:'8px'
                        }}>
                          <span style={{
                            color:'#6c63ff', fontSize:'11px', fontFamily:'monospace'
                          }}>{p.transaction_id}</span>
                          <span style={{
                            backgroundColor: STATUS_STYLE[p.status]?.bg,
                            color:           STATUS_STYLE[p.status]?.text,
                            fontSize:'11px', fontWeight:'700',
                            padding:'2px 8px', borderRadius:'20px'
                          }}>{p.status}</span>
                        </div>
                        <div style={{ color:'white', fontWeight:'600', fontSize:'13px', marginBottom:'4px' }}>
                          {p.service_name}
                        </div>
                        <div style={{ display:'flex', justifyContent:'space-between' }}>
                          <span style={{ color:'#2dc653', fontWeight:'700' }}>
                            {fmtC(p.amount)}
                          </span>
                          <span style={{ color:'#8892a4', fontSize:'12px' }}>
                            {fmt(p.paid_at)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ════ SETTINGS ════ */}
          {tab === 'settings' && (
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',
              gap:'18px'
            }}>

              {/* Update Profile */}
              <div style={card}>
                <h3 style={{ color:'white', fontWeight:'700', fontSize:'15px', marginBottom:'18px' }}>
                  ✏️ Update Profile
                </h3>
                {pMsg && (
                  <div style={{
                    backgroundColor:'rgba(45,198,83,0.1)',
                    border:'1px solid rgba(45,198,83,0.3)',
                    borderRadius:'10px', padding:'10px 13px',
                    color:'#2dc653', fontSize:'13px', marginBottom:'12px'
                  }}>✅ {pMsg}</div>
                )}
                {pErr && (
                  <div style={{
                    backgroundColor:'rgba(233,69,96,0.1)',
                    border:'1px solid rgba(233,69,96,0.3)',
                    borderRadius:'10px', padding:'10px 13px',
                    color:'#e94560', fontSize:'13px', marginBottom:'12px'
                  }}>⚠️ {pErr}</div>
                )}
                <form onSubmit={handleUpdateProfile}>
                  <div style={{ marginBottom:'12px' }}>
                    <label style={lbl}>FULL NAME</label>
                    <input type="text" value={pForm.name}
                      onChange={e => setPForm({ name: e.target.value })}
                      style={inp} placeholder="Your name"
                    />
                  </div>
                  <div style={{ marginBottom:'18px' }}>
                    <label style={lbl}>EMAIL (read-only)</label>
                    <input type="email" value={user?.email} disabled
                      style={{ ...inp, opacity:0.5, cursor:'not-allowed' }}
                    />
                  </div>
                  <button type="submit" disabled={pLoad} style={{
                    width:'100%', padding:'11px',
                    background:'linear-gradient(135deg,#e94560,#c62a47)',
                    border:'none', borderRadius:'10px',
                    color:'white', fontWeight:'700',
                    cursor:'pointer', fontSize:'14px'
                  }}>
                    {pLoad ? '⏳ Saving...' : '💾 Save Changes'}
                  </button>
                </form>
              </div>

              {/* Change Password */}
              <div style={card}>
                <h3 style={{ color:'white', fontWeight:'700', fontSize:'15px', marginBottom:'18px' }}>
                  🔒 Change Password
                </h3>
                {wMsg && (
                  <div style={{
                    backgroundColor:'rgba(45,198,83,0.1)',
                    border:'1px solid rgba(45,198,83,0.3)',
                    borderRadius:'10px', padding:'10px 13px',
                    color:'#2dc653', fontSize:'13px', marginBottom:'12px'
                  }}>✅ {wMsg}</div>
                )}
                {wErr && (
                  <div style={{
                    backgroundColor:'rgba(233,69,96,0.1)',
                    border:'1px solid rgba(233,69,96,0.3)',
                    borderRadius:'10px', padding:'10px 13px',
                    color:'#e94560', fontSize:'13px', marginBottom:'12px'
                  }}>⚠️ {wErr}</div>
                )}
                <form onSubmit={handleChangePassword}>
                  {[
                    { label:'CURRENT PASSWORD', k:'old',     show:showOld, tog:()=>setShowOld(!showOld) },
                    { label:'NEW PASSWORD',      k:'new_p',  show:showNew, tog:()=>setShowNew(!showNew) },
                    { label:'CONFIRM PASSWORD',  k:'confirm',show:showNew, tog:null },
                  ].map(f => (
                    <div key={f.k} style={{ marginBottom:'12px' }}>
                      <label style={lbl}>{f.label}</label>
                      <div style={{ position:'relative' }}>
                        <input
                          type={f.show ? 'text' : 'password'}
                          value={wForm[f.k]}
                          onChange={e => setWForm({ ...wForm, [f.k]: e.target.value })}
                          style={{ ...inp, paddingRight: f.tog ? '38px' : '14px' }}
                          placeholder="••••••••"
                        />
                        {f.tog && (
                          <span onClick={f.tog} style={{
                            position:'absolute', right:'11px', top:'50%',
                            transform:'translateY(-50%)',
                            cursor:'pointer', fontSize:'13px'
                          }}>{f.show ? '🙈' : '👁️'}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  <button type="submit" disabled={wLoad} style={{
                    width:'100%', padding:'11px', marginTop:'6px',
                    background:'linear-gradient(135deg,#e94560,#c62a47)',
                    border:'none', borderRadius:'10px',
                    color:'white', fontWeight:'700',
                    cursor:'pointer', fontSize:'14px'
                  }}>
                    {wLoad ? '⏳ Changing...' : '🔐 Change Password'}
                  </button>
                </form>
              </div>

              {/* Account Info */}
              <div style={card}>
                <h3 style={{ color:'white', fontWeight:'700', fontSize:'15px', marginBottom:'18px' }}>
                  ℹ️ Account Info
                </h3>
                {[
                  { l:'Full Name',    v: user?.name   },
                  { l:'Email',        v: user?.email  },
                  { l:'Role',         v: user?.role   },
                  { l:'Total Orders', v: stats?.total_services || 0 },
                  { l:'Total Spent',  v: fmtC(stats?.total_spent || 0) },
                ].map((row,i,arr) => (
                  <div key={i} style={{
                    display:'flex', justifyContent:'space-between',
                    alignItems:'center', padding:'10px 0',
                    borderBottom: i < arr.length-1
                      ? '1px solid rgba(255,255,255,0.05)' : 'none'
                  }}>
                    <span style={{ color:'#8892a4', fontSize:'13px' }}>{row.l}</span>
                    <span style={{ color:'white', fontWeight:'600', fontSize:'13px' }}>
                      {row.v}
                    </span>
                  </div>
                ))}
                <button onClick={handleLogout} style={{
                  width:'100%', padding:'11px', marginTop:'18px',
                  backgroundColor:'rgba(233,69,96,0.08)',
                  border:'1px solid rgba(233,69,96,0.25)',
                  borderRadius:'10px', color:'#e94560',
                  fontWeight:'700', cursor:'pointer', fontSize:'13px'
                }}>🚪 Logout from ServiceHub</button>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Global CSS */}
      <style>{`
        * { box-sizing: border-box; }

        .db-sidebar  { display: flex !important; }
        .db-drawer   { display: flex !important; }
        .hamburger-btn { display: none !important; }
        .welcome-msg   { display: inline !important; }

        @media (min-width: 900px) {
          .db-drawer { transform: translateX(-100%) !important; }
        }
        @media (max-width: 899px) {
          .db-sidebar    { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .welcome-msg   { display: none !important; }
        }
        @media (max-width: 580px) {
          .pay-table { display: none !important; }
          .pay-cards { display: block !important; }
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        input::placeholder { color: #8892a4; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #1a1a2e; }
        ::-webkit-scrollbar-thumb { background: #e9456044; border-radius: 10px; }
      `}</style>
    </div>
  );
}