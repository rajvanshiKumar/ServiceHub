// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { loginUser } from '../services/api';
// import { useAuth } from '../context/AuthContext';

// export default function Login() {
//   const navigate    = useNavigate();
//   const { login }   = useAuth();

//   const [form,      setForm]      = useState({ email:'', password:'' });
//   const [errors,    setErrors]    = useState({});
//   const [touched,   setTouched]   = useState({});
//   const [showPass,  setShowPass]  = useState(false);
//   const [loading,   setLoading]   = useState(false);
//   const [apiError,  setApiError]  = useState('');

//   const validate = (name, value) => {
//     if (name === 'email') {
//       if (!value) return 'Email is required';
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
//     }
//     if (name === 'password') {
//       if (!value) return 'Password is required';
//     }
//     return '';
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(f => ({ ...f, [name]: value }));
//     if (touched[name])
//       setErrors(er => ({ ...er, [name]: validate(name, value) }));
//   };

//   const handleBlur = e => {
//     const { name, value } = e.target;
//     setTouched(t => ({ ...t, [name]: true }));
//     setErrors(er => ({ ...er, [name]: validate(name, value) }));
//   };

//   const isValid = () => form.email && form.password &&
//     !validate('email', form.email) && !validate('password', form.password);

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setTouched({ email: true, password: true });
//     const errs = {
//       email:    validate('email',    form.email),
//       password: validate('password', form.password),
//     };
//     setErrors(errs);
//     if (errs.email || errs.password) return;

//     setLoading(true);
//     setApiError('');
//     try {
//       const res = await loginUser(form);
//       login(res.data.user, res.data.tokens);
//       navigate('/dashboard');
//     } catch (err) {
//       setApiError(
//         err.response?.data?.message || 'Invalid email or password.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const iStyle = field => ({
//     width:'100%',
//     padding:'13px 14px 13px 42px',
//     backgroundColor:'rgba(255,255,255,0.05)',
//     border:`1.5px solid ${
//       touched[field] && errors[field]    ? '#e94560'
//       : touched[field] && !errors[field] ? '#2dc653'
//       : 'rgba(255,255,255,0.1)'
//     }`,
//     borderRadius:'10px',color:'white',
//     fontSize:'15px',outline:'none',transition:'border-color 0.3s',
//   });

//   return (
//     <div style={{
//       minHeight:'100vh',
//       background:'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
//       display:'flex',alignItems:'center',
//       justifyContent:'center',padding:'40px 16px'
//     }}>
//       <div style={{
//         position:'fixed',top:'-100px',right:'-100px',
//         width:'400px',height:'400px',borderRadius:'50%',
//         background:'radial-gradient(circle,rgba(233,69,96,0.08) 0%,transparent 70%)',
//         pointerEvents:'none'
//       }}/>

//       <div style={{
//         width:'100%',maxWidth:'440px',
//         backgroundColor:'#16213e',borderRadius:'20px',
//         padding:'clamp(28px,5vw,48px) clamp(20px,5vw,40px)',
//         boxShadow:'0 25px 60px rgba(0,0,0,0.5)',
//         border:'1px solid rgba(233,69,96,0.15)',
//         position:'relative',zIndex:1
//       }}>

//         {/* Logo */}
//         <div style={{ textAlign:'center',marginBottom:'28px' }}>
//           <div style={{
//             width:'52px',height:'52px',backgroundColor:'#e94560',
//             borderRadius:'14px',display:'inline-flex',
//             alignItems:'center',justifyContent:'center',
//             fontSize:'22px',fontWeight:'800',color:'white',
//             boxShadow:'0 8px 20px rgba(233,69,96,0.4)',marginBottom:'12px'
//           }}>S</div>
//           <h2 style={{ color:'white',fontWeight:'700',fontSize:'26px',marginBottom:'4px' }}>
//             Welcome Back
//           </h2>
//           <p style={{ color:'#8892a4',fontSize:'13px' }}>
//             Login to your ServiceHub account
//           </p>
//         </div>

//         {apiError && (
//           <div style={{
//             backgroundColor:'rgba(233,69,96,0.1)',
//             border:'1px solid rgba(233,69,96,0.3)',
//             borderRadius:'10px',padding:'11px 14px',
//             color:'#e94560',fontSize:'13px',marginBottom:'16px',
//             display:'flex',alignItems:'center',gap:'8px'
//           }}>
//             <span>⚠️</span> {apiError}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} noValidate>

//           {/* Email */}
//           <div style={{ marginBottom:'16px' }}>
//             <label style={{
//               color:'#8892a4',fontSize:'12px',fontWeight:'600',
//               marginBottom:'7px',display:'block'
//             }}>EMAIL ADDRESS</label>
//             <div style={{ position:'relative' }}>
//               <span style={{
//                 position:'absolute',left:'13px',top:'50%',
//                 transform:'translateY(-50%)',fontSize:'14px'
//               }}>✉️</span>
//               <input
//                 type="email" name="email"
//                 placeholder="Enter your email"
//                 value={form.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 style={iStyle('email')}
//               />
//               {touched.email && !errors.email && (
//                 <span style={{
//                   position:'absolute',right:'12px',top:'50%',
//                   transform:'translateY(-50%)',color:'#2dc653'
//                 }}>✓</span>
//               )}
//             </div>
//             {touched.email && errors.email && (
//               <p style={{ color:'#e94560',fontSize:'11px',margin:'4px 0 0' }}>
//                 ⚠ {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div style={{ marginBottom:'24px' }}>
//             <label style={{
//               color:'#8892a4',fontSize:'12px',fontWeight:'600',
//               marginBottom:'7px',display:'block'
//             }}>PASSWORD</label>
//             <div style={{ position:'relative' }}>
//               <span style={{
//                 position:'absolute',left:'13px',top:'50%',
//                 transform:'translateY(-50%)',fontSize:'14px'
//               }}>🔒</span>
//               <input
//                 type={showPass ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Enter your password"
//                 value={form.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 style={{ ...iStyle('password'), paddingRight:'42px' }}
//               />
//               <span onClick={() => setShowPass(!showPass)} style={{
//                 position:'absolute',right:'12px',top:'50%',
//                 transform:'translateY(-50%)',
//                 cursor:'pointer',fontSize:'14px'
//               }}>
//                 {showPass ? '🙈' : '👁️'}
//               </span>
//             </div>
//             {touched.password && errors.password && (
//               <p style={{ color:'#e94560',fontSize:'11px',margin:'4px 0 0' }}>
//                 ⚠ {errors.password}
//               </p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width:'100%',padding:'14px',
//               background: !loading
//                 ? 'linear-gradient(135deg,#e94560,#c62a47)'
//                 : 'rgba(255,255,255,0.08)',
//               border:'none',borderRadius:'10px',color:'white',
//               fontSize:'16px',fontWeight:'700',
//               cursor: loading ? 'not-allowed' : 'pointer',
//               transition:'all 0.3s ease',
//               boxShadow: !loading ? '0 4px 20px rgba(233,69,96,0.4)' : 'none'
//             }}
//             onMouseEnter={e => {
//               if (!loading) {
//                 e.target.style.transform = 'translateY(-1px)';
//                 e.target.style.boxShadow = '0 8px 28px rgba(233,69,96,0.6)';
//               }
//             }}
//             onMouseLeave={e => {
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = '0 4px 20px rgba(233,69,96,0.4)';
//             }}
//           >
//             {loading ? '⏳ Logging in...' : '🔐 Login'}
//           </button>

//         </form>

//         <div style={{ textAlign:'center',marginTop:'20px' }}>
//           <p style={{ color:'#8892a4',fontSize:'13px',margin:0 }}>
//             Don't have an account?{' '}
//             <Link to="/register" style={{
//               color:'#e94560',fontWeight:'700',textDecoration:'none'
//             }}>Sign Up</Link>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate   = useNavigate();
  const { login }  = useAuth();

  const [form,     setForm]     = useState({ email: '', password: '' });
  const [errors,   setErrors]   = useState({});
  const [touched,  setTouched]  = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = (name, value) => {
    if (name === 'email') {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
    }
    if (name === 'password') {
      if (!value) return 'Password is required';
    }
    return '';
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name])
      setErrors(er => ({ ...er, [name]: validate(name, value) }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setErrors(er => ({ ...er, [name]: validate(name, value) }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errs = {
      email:    validate('email',    form.email),
      password: validate('password', form.password),
    };
    setErrors(errs);
    if (errs.email || errs.password) return;  // ✅ single unified check

    setLoading(true);
    setApiError('');
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.tokens);
      const params = new URLSearchParams(window.location.search);
      const next = params.get('next') || '/dashboard';
      navigate(next);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const iStyle = field => ({
    width: '100%',
    padding: '13px 14px 13px 42px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: `1.5px solid ${
      touched[field] && errors[field]    ? '#e94560'
      : touched[field] && !errors[field] ? '#2dc653'
      : 'rgba(255,255,255,0.1)'
    }`,
    borderRadius: '10px', color: 'white',
    fontSize: '15px', outline: 'none', transition: 'border-color 0.3s',
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px 16px'
    }}>
      <div style={{
        position: 'fixed', top: '-100px', right: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(233,69,96,0.08) 0%,transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%', maxWidth: '440px',
        backgroundColor: '#16213e', borderRadius: '20px',
        padding: 'clamp(28px,5vw,48px) clamp(20px,5vw,40px)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        border: '1px solid rgba(233,69,96,0.15)',
        position: 'relative', zIndex: 1
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '52px', height: '52px', backgroundColor: '#e94560',
            borderRadius: '14px', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', fontWeight: '800', color: 'white',
            boxShadow: '0 8px 20px rgba(233,69,96,0.4)', marginBottom: '12px'
          }}>S</div>
          <h2 style={{ color: 'white', fontWeight: '700', fontSize: '26px', marginBottom: '4px' }}>
            Welcome Back
          </h2>
          <p style={{ color: '#8892a4', fontSize: '13px' }}>
            Login to your ServiceHub account
          </p>
        </div>

        {apiError && (
          <div style={{
            backgroundColor: 'rgba(233,69,96,0.1)',
            border: '1px solid rgba(233,69,96,0.3)',
            borderRadius: '10px', padding: '11px 14px',
            color: '#e94560', fontSize: '13px', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span>⚠️</span> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              color: '#8892a4', fontSize: '12px', fontWeight: '600',
              marginBottom: '7px', display: 'block'
            }}>EMAIL ADDRESS</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '13px', top: '50%',
                transform: 'translateY(-50%)', fontSize: '14px'
              }}>✉️</span>
              <input
                type="email" name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={iStyle('email')}
              />
              {touched.email && !errors.email && (
                <span style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)', color: '#2dc653'
                }}>✓</span>
              )}
            </div>
            {touched.email && errors.email && (
              <p style={{ color: '#e94560', fontSize: '11px', margin: '4px 0 0' }}>
                ⚠ {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{
              color: '#8892a4', fontSize: '12px', fontWeight: '600',
              marginBottom: '7px', display: 'block'
            }}>PASSWORD</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '13px', top: '50%',
                transform: 'translateY(-50%)', fontSize: '14px'
              }}>🔒</span>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ ...iStyle('password'), paddingRight: '42px' }}
              />
              <span onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer', fontSize: '14px'
              }}>
                {showPass ? '🙈' : '👁️'}
              </span>
            </div>
            {touched.password && errors.password && (
              <p style={{ color: '#e94560', fontSize: '11px', margin: '4px 0 0' }}>
                ⚠ {errors.password}
              </p>
            )}
          </div>

          {/* ✅ Added: Forgot password link */}
          <div style={{ textAlign: 'right', marginBottom: '24px' }}>
            <Link to="/forgot-password" style={{
              color: '#8892a4', fontSize: '12px', textDecoration: 'none'
            }}>Forgot password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: !loading
                ? 'linear-gradient(135deg,#e94560,#c62a47)'
                : 'rgba(255,255,255,0.08)',
              border: 'none', borderRadius: '10px', color: 'white',
              fontSize: '16px', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
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
              // ✅ Fixed: only reset shadow when not loading
              e.target.style.boxShadow = loading ? 'none' : '0 4px 20px rgba(233,69,96,0.4)';
            }}
          >
            {loading ? '⏳ Logging in...' : '🔐 Login'}
          </button>

        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#8892a4', fontSize: '13px', margin: 0 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: '#e94560', fontWeight: '700', textDecoration: 'none'
            }}>Sign Up</Link>
          </p>
        </div>

      </div>
    </div>
  );
}