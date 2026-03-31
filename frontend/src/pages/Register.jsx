import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate    = useNavigate();
  const { login }   = useAuth();

  const [form,      setForm]      = useState({ name: '', email: '', password: '' });
  const [role,      setRole]      = useState('receiver');
  const [errors,    setErrors]    = useState({});
  const [touched,   setTouched]   = useState({});
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [apiError,  setApiError]  = useState('');
  const [success,   setSuccess]   = useState(false);

  // Validation rules
  const validate = (name, value) => {
    if (name === 'name') {
      if (!value)             return 'Name is required';
      if (value.trim().length < 2) return 'Minimum 2 characters';
      if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only alphabets allowed';
    }
    if (name === 'email') {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
    }
    if (name === 'password') {
      if (!value)          return 'Password is required';
      if (value.length < 8) return 'Minimum 8 characters';
      if (!/[A-Z]/.test(value)) return 'Add uppercase letter';
      if (!/[a-z]/.test(value)) return 'Add lowercase letter';
      if (!/[0-9]/.test(value)) return 'Add a number';
      if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(value)) return 'Add special character';
    }
    return '';
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors(er => ({ ...er, [name]: validate(name, value) }));
    }
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(er => ({ ...er, [name]: validate(name, value) }));
  };

  const isValid = () =>
    !validate('name',     form.name)  &&
    !validate('email',    form.email) &&
    !validate('password', form.password);

  // Password strength
  const strength = [
    form.password.length >= 8,
    /[A-Z]/.test(form.password),
    /[a-z]/.test(form.password),
    /[0-9]/.test(form.password),
    /[!@#$%^&*(),.?":{}|<>_\-]/.test(form.password),
  ];
  const strengthScore = strength.filter(Boolean).length;
  const strengthColor = strengthScore <= 2 ? '#e94560'
    : strengthScore <= 3 ? '#ffb703' : '#2dc653';
  const strengthLabel = strengthScore <= 2 ? 'Weak'
    : strengthScore <= 3 ? 'Medium' : 'Strong';

  const handleSubmit = async e => {
    e.preventDefault();
    // Touch all fields
    setTouched({ name: true, email: true, password: true });
    setErrors({
      name:     validate('name',     form.name),
      email:    validate('email',    form.email),
      password: validate('password', form.password),
    });
    if (!isValid()) return;

    setLoading(true);
    setApiError('');
    try {
      const res = await registerUser({ ...form, role });
      // Auto login after register
      login(res.data.user, res.data.tokens);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      const data = err.response?.data;
      if (data?.message) {
        setApiError(data.message);
      } else if (data?.errors) {
        const msgs = Object.values(data.errors).flat();
        setApiError(msgs[0] || 'Registration failed.');
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const iStyle = (field) => ({
    width: '100%',
    padding: '12px 14px 12px 42px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: `1.5px solid ${
      touched[field] && errors[field]   ? '#e94560'
      : touched[field] && !errors[field] ? '#2dc653'
      : 'rgba(255,255,255,0.1)'
    }`,
    borderRadius: '10px', color: 'white',
    fontSize: '15px', outline: 'none',
    transition: 'border-color 0.3s',
  });

  if (success) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'rgba(45,198,83,0.15)',
          border: '2px solid #2dc653',
          display: 'inline-flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '36px',
          marginBottom: '20px',
          boxShadow: '0 0 40px rgba(45,198,83,0.3)'
        }}>✅</div>
        <h2 style={{ color: 'white', fontWeight: '800', marginBottom: '8px' }}>
          Account Created!
        </h2>
        <p style={{ color: '#2dc653', fontWeight: '600' }}>
          Redirecting to dashboard...
        </p>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          border: '3px solid rgba(45,198,83,0.2)',
          borderTop: '3px solid #2dc653',
          animation: 'spin 0.8s linear infinite',
          margin: '20px auto 0'
        }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px 16px'
    }}>
      {/* BG blobs */}
      <div style={{
        position:'fixed',top:'-100px',right:'-100px',
        width:'400px',height:'400px',borderRadius:'50%',
        background:'radial-gradient(circle,rgba(233,69,96,0.08) 0%,transparent 70%)',
        pointerEvents:'none'
      }}/>
      <div style={{
        position:'fixed',bottom:'-80px',left:'-80px',
        width:'300px',height:'300px',borderRadius:'50%',
        background:'radial-gradient(circle,rgba(108,99,255,0.08) 0%,transparent 70%)',
        pointerEvents:'none'
      }}/>

      <div style={{
        width:'100%', maxWidth:'480px',
        backgroundColor:'#16213e',
        borderRadius:'20px',
        padding:'clamp(28px,5vw,44px) clamp(20px,5vw,36px)',
        boxShadow:'0 25px 60px rgba(0,0,0,0.5)',
        border:'1px solid rgba(233,69,96,0.15)',
        position:'relative', zIndex:1
      }}>

        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:'24px' }}>
          <div style={{
            width:'52px',height:'52px',backgroundColor:'#e94560',
            borderRadius:'14px',display:'inline-flex',
            alignItems:'center',justifyContent:'center',
            fontSize:'22px',fontWeight:'800',color:'white',
            boxShadow:'0 8px 20px rgba(233,69,96,0.4)',marginBottom:'12px'
          }}>S</div>
          <h2 style={{ color:'white',fontWeight:'700',fontSize:'24px',marginBottom:'4px' }}>
            Create an Account
          </h2>
          <p style={{ color:'#8892a4',fontSize:'13px' }}>
            Join ServiceHub today — it's free!
          </p>
        </div>

        {/* API Error */}
        {apiError && (
          <div style={{
            backgroundColor:'rgba(233,69,96,0.1)',
            border:'1px solid rgba(233,69,96,0.3)',
            borderRadius:'10px',padding:'11px 14px',
            color:'#e94560',fontSize:'13px',marginBottom:'16px',
            display:'flex',alignItems:'center',gap:'8px'
          }}>
            <span>⚠️</span> {apiError}
          </div>
        )}

        {/* Role Toggle */}
        <div style={{ marginBottom:'18px' }}>
          <label style={{
            color:'#8892a4',fontSize:'12px',fontWeight:'600',
            letterSpacing:'0.5px',marginBottom:'8px',display:'block'
          }}>I WANT TO...</label>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px' }}>
            {[
              { v:'receiver', icon:'🛒', l:'Hire Services',  s:'Receiver' },
              { v:'provider', icon:'💼', l:'Offer Services', s:'Provider' },
            ].map(r => (
              <div key={r.v} onClick={() => setRole(r.v)} style={{
                padding:'12px 8px',borderRadius:'12px',cursor:'pointer',
                border:`2px solid ${role===r.v ? '#e94560' : 'rgba(255,255,255,0.08)'}`,
                backgroundColor: role===r.v
                  ? 'rgba(233,69,96,0.1)' : 'rgba(255,255,255,0.02)',
                textAlign:'center',transition:'all 0.25s ease'
              }}>
                <div style={{ fontSize:'20px',marginBottom:'4px' }}>{r.icon}</div>
                <div style={{
                  color: role===r.v ? '#e94560' : '#ccc',
                  fontWeight:'600',fontSize:'12px'
                }}>{r.l}</div>
                <div style={{ color:'#8892a4',fontSize:'11px' }}>{r.s}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Name */}
          <div style={{ marginBottom:'14px' }}>
            <label style={{
              color:'#8892a4',fontSize:'12px',fontWeight:'600',
              marginBottom:'6px',display:'block'
            }}>FULL NAME</label>
            <div style={{ position:'relative' }}>
              <span style={{
                position:'absolute',left:'13px',top:'50%',
                transform:'translateY(-50%)',fontSize:'14px'
              }}>👤</span>
              <input
                type="text" name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={iStyle('name')}
              />
              {touched.name && !errors.name && form.name && (
                <span style={{
                  position:'absolute',right:'12px',top:'50%',
                  transform:'translateY(-50%)',color:'#2dc653',fontSize:'14px'
                }}>✓</span>
              )}
            </div>
            {touched.name && errors.name && (
              <p style={{ color:'#e94560',fontSize:'11px',margin:'4px 0 0' }}>
                ⚠ {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div style={{ marginBottom:'14px' }}>
            <label style={{
              color:'#8892a4',fontSize:'12px',fontWeight:'600',
              marginBottom:'6px',display:'block'
            }}>EMAIL ADDRESS</label>
            <div style={{ position:'relative' }}>
              <span style={{
                position:'absolute',left:'13px',top:'50%',
                transform:'translateY(-50%)',fontSize:'14px'
              }}>✉️</span>
              <input
                type="email" name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={iStyle('email')}
              />
              {touched.email && !errors.email && form.email && (
                <span style={{
                  position:'absolute',right:'12px',top:'50%',
                  transform:'translateY(-50%)',color:'#2dc653',fontSize:'14px'
                }}>✓</span>
              )}
            </div>
            {touched.email && errors.email && (
              <p style={{ color:'#e94560',fontSize:'11px',margin:'4px 0 0' }}>
                ⚠ {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom:'6px' }}>
            <label style={{
              color:'#8892a4',fontSize:'12px',fontWeight:'600',
              marginBottom:'6px',display:'block'
            }}>PASSWORD</label>
            <div style={{ position:'relative' }}>
              <span style={{
                position:'absolute',left:'13px',top:'50%',
                transform:'translateY(-50%)',fontSize:'14px'
              }}>🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Min 8 chars, A-Z, a-z, 0-9, @#$"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ ...iStyle('password'), paddingRight:'42px' }}
              />
              <span onClick={() => setShowPass(!showPass)} style={{
                position:'absolute',right:'12px',top:'50%',
                transform:'translateY(-50%)',
                cursor:'pointer',fontSize:'14px'
              }}>
                {showPass ? '🙈' : '👁️'}
              </span>
            </div>
            {touched.password && errors.password && (
              <p style={{ color:'#e94560',fontSize:'11px',margin:'4px 0 0' }}>
                ⚠ {errors.password}
              </p>
            )}
          </div>

          {/* Password Strength */}
          {form.password && (
            <div style={{ marginBottom:'18px', marginTop:'8px' }}>
              <div style={{ display:'flex',gap:'4px',marginBottom:'4px' }}>
                {strength.map((met,i) => (
                  <div key={i} style={{
                    flex:1, height:'4px', borderRadius:'4px',
                    backgroundColor: met ? strengthColor : 'rgba(255,255,255,0.1)',
                    transition:'all 0.3s'
                  }}/>
                ))}
              </div>
              <div style={{
                display:'flex',justifyContent:'space-between',
                alignItems:'center'
              }}>
                <span style={{ color:'#8892a4',fontSize:'11px' }}>
                  Password Strength
                </span>
                <span style={{
                  color: strengthColor,
                  fontSize:'11px',fontWeight:'700'
                }}>{strengthLabel}</span>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width:'100%',padding:'13px',
              background: !loading
                ? 'linear-gradient(135deg,#e94560,#c62a47)'
                : 'rgba(255,255,255,0.08)',
              border:'none',borderRadius:'10px',color:'white',
              fontSize:'15px',fontWeight:'700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition:'all 0.3s ease',
              boxShadow: !loading ? '0 4px 20px rgba(233,69,96,0.4)' : 'none'
            }}
            onMouseEnter={e => {
              if (!loading) {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 8px 28px rgba(233,69,96,0.6)';
              }
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 20px rgba(233,69,96,0.4)';
            }}
          >
            {loading ? '⏳ Creating Account...' : '🚀 Create Account'}
          </button>

        </form>

        {/* Login Link */}
        <div style={{ textAlign:'center',marginTop:'18px' }}>
          <p style={{ color:'#8892a4',fontSize:'13px',margin:0 }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color:'#e94560',fontWeight:'700',textDecoration:'none'
            }}>Login</Link>
          </p>
        </div>

      </div>
    </div>
  );
}