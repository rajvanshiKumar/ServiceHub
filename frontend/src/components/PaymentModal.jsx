import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';

export default function PaymentModal({ service, onClose }) {
  const navigate = useNavigate();
  const [step,       setStep]       = useState('summary'); // summary | qr | success | failed
  const [txnInput,   setTxnInput]   = useState('');
  const [error,      setError]      = useState('');
  const [loading,    setLoading]    = useState(false);
  const [savedTxn,   setSavedTxn]   = useState('');

  const UPI_ID    = 'yourname@ybl';           // ← replace with your UPI ID
  const UPI_NAME  = 'ServiceHub';
  const amount    = parseFloat(service.price?.replace(/[^\d.]/g, '') || 0);
  const upiLink   = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(service.title)}`;

  const handleConfirmPayment = async () => {
    if (!txnInput.trim()) { setError('Please enter your UPI Transaction ID.'); return; }
    if (txnInput.trim().length < 6) { setError('Enter a valid Transaction ID.'); return; }
    setError('');
    setLoading(true);
    try {
      await createOrder({
        service_title:    service.title,
        service_category: service.category,
        service_id:       service.id,
        price:            amount,
        transaction_id:   txnInput.trim().toUpperCase(),
      });
      setSavedTxn(txnInput.trim().toUpperCase());
      setStep('success');
    } catch (err) {
      setError(err.response?.data?.message || 'Payment confirmation failed. Try again.');
      setStep('failed');
    } finally {
      setLoading(false);
    }
  };

  const overlayStyle = {
    position: 'fixed', inset: 0, zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '16px',
  };

  const modalStyle = {
    width: '100%', maxWidth: '440px',
    backgroundColor: '#16213e',
    borderRadius: '20px',
    border: '1px solid rgba(233,69,96,0.2)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
    overflow: 'hidden',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg,rgba(233,69,96,0.15),rgba(108,99,255,0.1))',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    padding: '18px 22px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  };

  const bodyStyle = { padding: '24px 22px' };

  const btnPrimary = {
    width: '100%', padding: '13px',
    background: 'linear-gradient(135deg,#e94560,#c62a47)',
    border: 'none', borderRadius: '10px', color: 'white',
    fontSize: '15px', fontWeight: '700', cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(233,69,96,0.4)',
  };

  const btnSecondary = {
    width: '100%', padding: '11px',
    background: 'transparent',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', color: '#c8d0dc',
    fontSize: '14px', fontWeight: '600', cursor: 'pointer',
    marginTop: '10px',
  };

  // ── SUMMARY STEP ──────────────────────────────────────────
  if (step === 'summary') return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={headerStyle}>
          <div>
            <div style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>
              Confirm Purchase
            </div>
            <div style={{ color: '#8892a4', fontSize: '12px', marginTop: '2px' }}>
              Review your order before paying
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#8892a4',
            fontSize: '20px', cursor: 'pointer', lineHeight: 1,
          }}>✕</button>
        </div>

        <div style={bodyStyle}>
          {/* Service summary */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px', padding: '16px', marginBottom: '20px',
          }}>
            <div style={{ color: '#8892a4', fontSize: '11px', marginBottom: '6px' }}>
              {service.category} · {service.subcategory}
            </div>
            <div style={{ color: 'white', fontWeight: '700', fontSize: '15px', marginBottom: '10px' }}>
              {service.title}
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ color: '#8892a4', fontSize: '13px' }}>Provider</span>
              <span style={{ color: '#c8d0dc', fontSize: '13px', fontWeight: '600' }}>
                {service.provider}
              </span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: '8px', paddingTop: '8px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <span style={{ color: '#8892a4', fontSize: '13px' }}>Amount</span>
              <span style={{ color: '#2dc653', fontWeight: '800', fontSize: '20px' }}>
                {service.price}
              </span>
            </div>
          </div>

          {/* Payment method */}
          <div style={{
            backgroundColor: 'rgba(83,130,255,0.08)',
            border: '1px solid rgba(83,130,255,0.2)',
            borderRadius: '12px', padding: '14px',
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '20px',
          }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              backgroundColor: '#5382ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', flexShrink: 0,
            }}>📱</div>
            <div>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>PhonePe</div>
              <div style={{ color: '#8892a4', fontSize: '12px' }}>UPI · Instant payment</div>
            </div>
            <div style={{
              marginLeft: 'auto', backgroundColor: 'rgba(45,198,83,0.15)',
              color: '#2dc653', fontSize: '11px', fontWeight: '700',
              padding: '3px 10px', borderRadius: '20px',
            }}>Selected</div>
          </div>

          <button style={btnPrimary} onClick={() => setStep('qr')}>
            📱 Proceed to Pay {service.price}
          </button>
          <button style={btnSecondary} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );

  // ── QR STEP ───────────────────────────────────────────────
  if (step === 'qr') return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={{ ...modalStyle, maxWidth: '460px' }} onClick={e => e.stopPropagation()}>
        <div style={headerStyle}>
          <div>
            <div style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>
              Pay via PhonePe / UPI
            </div>
            <div style={{ color: '#8892a4', fontSize: '12px', marginTop: '2px' }}>
              Scan QR or use UPI ID below
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#8892a4',
            fontSize: '20px', cursor: 'pointer', lineHeight: 1,
          }}>✕</button>
        </div>

        <div style={bodyStyle}>
          {/* Amount pill */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ color: '#8892a4', fontSize: '12px', marginBottom: '4px' }}>
              Pay exactly
            </div>
            <div style={{
              color: '#2dc653', fontWeight: '800', fontSize: '32px',
              letterSpacing: '-0.5px',
            }}>{service.price}</div>
          </div>

          {/* QR placeholder — replace src with your actual QR image */}
          <div style={{
            backgroundColor: 'white', borderRadius: '16px',
            padding: '16px', textAlign: 'center', marginBottom: '18px',
          }}>
            <img
              src="/phonepe-qr.png"       // ← put your QR image in /public/phonepe-qr.png
              alt="PhonePe QR"
              style={{ width: '200px', height: '200px', objectFit: 'contain' }}
              onError={e => {
                // fallback if image missing
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{
              display: 'none', width: '200px', height: '200px',
              margin: '0 auto', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '8px',
              backgroundColor: '#f0f0f0', borderRadius: '8px',
            }}>
              <span style={{ fontSize: '36px' }}>📷</span>
              <span style={{ color: '#666', fontSize: '12px' }}>
                Add QR to /public/phonepe-qr.png
              </span>
            </div>
            <div style={{ color: '#333', fontSize: '12px', marginTop: '10px', fontWeight: '600' }}>
              Scan with PhonePe / GPay / Paytm / any UPI app
            </div>
          </div>

          {/* UPI ID copy row */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', padding: '12px 14px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginBottom: '18px',
          }}>
            <div>
              <div style={{ color: '#8892a4', fontSize: '11px', marginBottom: '2px' }}>UPI ID</div>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>{UPI_ID}</div>
            </div>
            <button onClick={() => {
              navigator.clipboard.writeText(UPI_ID);
            }} style={{
              background: 'rgba(233,69,96,0.12)',
              border: '1px solid rgba(233,69,96,0.3)',
              borderRadius: '8px', color: '#e94560',
              fontSize: '12px', fontWeight: '700',
              padding: '6px 12px', cursor: 'pointer',
            }}>Copy</button>
          </div>

          {/* Open in PhonePe button (works on mobile) */}
          <a href={upiLink} style={{
            display: 'block', width: '100%', padding: '13px',
            background: 'linear-gradient(135deg,#5f259f,#8b2fc9)',
            border: 'none', borderRadius: '10px', color: 'white',
            fontSize: '15px', fontWeight: '700', cursor: 'pointer',
            textAlign: 'center', textDecoration: 'none',
            marginBottom: '18px', boxShadow: '0 4px 20px rgba(95,37,159,0.4)',
          }}>
            Open PhonePe App →
          </a>

          {/* Divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
            <span style={{ color: '#8892a4', fontSize: '12px' }}>
              After payment, enter Transaction ID
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Transaction ID input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              color: '#8892a4', fontSize: '12px', fontWeight: '600',
              display: 'block', marginBottom: '7px',
            }}>UPI TRANSACTION ID</label>
            <input
              type="text"
              placeholder="e.g. 426781234567"
              value={txnInput}
              onChange={e => { setTxnInput(e.target.value); setError(''); }}
              style={{
                width: '100%', padding: '12px 14px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: `1.5px solid ${error ? '#e94560' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '10px', color: 'white',
                fontSize: '14px', outline: 'none',
              }}
            />
            {error && (
              <p style={{ color: '#e94560', fontSize: '11px', margin: '4px 0 0' }}>
                ⚠ {error}
              </p>
            )}
            <p style={{ color: '#8892a4', fontSize: '11px', margin: '6px 0 0' }}>
              Find this in PhonePe → History → Transaction details
            </p>
          </div>

          <button
            style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }}
            onClick={handleConfirmPayment}
            disabled={loading}
          >
            {loading ? '⏳ Confirming...' : '✅ I Have Paid — Confirm'}
          </button>
          <button style={btnSecondary} onClick={() => setStep('summary')}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );

  // ── SUCCESS STEP ──────────────────────────────────────────
  if (step === 'success') return (
    <div style={overlayStyle}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={bodyStyle}>
          <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'rgba(45,198,83,0.12)',
              border: '2px solid rgba(45,198,83,0.4)',
              display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '36px',
              marginBottom: '18px',
              boxShadow: '0 0 40px rgba(45,198,83,0.2)',
            }}>✅</div>

            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '22px', marginBottom: '6px' }}>
              Payment Confirmed!
            </h2>
            <p style={{ color: '#8892a4', fontSize: '14px', marginBottom: '20px' }}>
              Your service has been activated.
            </p>

            {/* Receipt box */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px', padding: '16px', textAlign: 'left',
              marginBottom: '22px',
            }}>
              {[
                { l: 'Service',        v: service.title },
                { l: 'Amount Paid',    v: service.price },
                { l: 'Transaction ID', v: savedTxn },
                { l: 'Payment via',    v: 'PhonePe / UPI' },
                { l: 'Status',         v: '✅ Success' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', gap: '12px',
                  padding: '8px 0',
                  borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <span style={{ color: '#8892a4', fontSize: '13px', flexShrink: 0 }}>{row.l}</span>
                  <span style={{
                    color: row.l === 'Status' ? '#2dc653' : 'white',
                    fontWeight: '600', fontSize: '13px',
                    textAlign: 'right', wordBreak: 'break-all',
                  }}>{row.v}</span>
                </div>
              ))}
            </div>

            <button style={btnPrimary} onClick={() => { onClose(); navigate('/dashboard'); }}>
              Go to Dashboard →
            </button>
            <button style={btnSecondary} onClick={onClose}>
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── FAILED STEP ───────────────────────────────────────────
  if (step === 'failed') return (
    <div style={overlayStyle}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={bodyStyle}>
          <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'rgba(233,69,96,0.12)',
              border: '2px solid rgba(233,69,96,0.3)',
              display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '36px',
              marginBottom: '18px',
            }}>❌</div>
            <h2 style={{ color: 'white', fontWeight: '800', fontSize: '22px', marginBottom: '8px' }}>
              Confirmation Failed
            </h2>
            <p style={{ color: '#8892a4', fontSize: '14px', marginBottom: '22px' }}>
              {error || 'Something went wrong. Please try again.'}
            </p>
            <button style={btnPrimary} onClick={() => { setStep('qr'); setError(''); }}>
              Try Again
            </button>
            <button style={btnSecondary} onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}