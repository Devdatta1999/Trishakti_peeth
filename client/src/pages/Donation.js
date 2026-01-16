import React, { useState } from 'react';
import { indianStates, districts } from '../data/indianStatesDistricts';
import { getApiUrl } from '../config/api';

const Donation = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    district: '',
    state: '',
    country: 'India',
    email: '',
    phone: '',
    aadhar: '',
    pan: '',
    amount: ''
  });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMode, setPaymentMode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Phone number validation - must be exactly 10 digits
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Email validation - optional but if provided, must be valid
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // State validation
    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    // District validation
    if (!formData.district) {
      newErrors.district = 'District is required';
    }

    // Aadhar validation - must be exactly 12 digits
    if (!formData.aadhar) {
      newErrors.aadhar = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhar number must be exactly 12 digits';
    }

    // PAN validation - optional but if provided, must be in format ABCDE1234F
    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())) {
      newErrors.pan = 'PAN number must be in format ABCDE1234F';
    }

    // Amount validation
    if (!formData.amount) {
      newErrors.amount = 'Donation amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Donation amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' && { district: '' }) // Reset district when state changes
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors in the form.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(getApiUrl('/api/donation'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          paymentMode: null, // Will be set after payment mode selection
          paymentStatus: 'pending'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowPayment(true);
        setSubmitStatus({ type: 'success', message: 'Please select your payment mode to complete the donation.' });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentModeSelect = async (mode) => {
    setPaymentMode(mode);
    // Update donation with payment mode
    try {
      await fetch(getApiUrl('/api/donation/update-payment'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          paymentMode: mode
        }),
      });
    } catch (err) {
      console.error('Error updating payment mode:', err);
    }
  };

  return (
    <>
      {/* Hero Image Section */}
      <section className="about-hero-section">
        <div className="about-hero-image">
          <img src="/images/temple_image.png" alt="Temple" className="about-hero-img" />
          <div className="about-hero-overlay">
            <h1 className="about-hero-title">Donation</h1>
          </div>
        </div>
      </section>

      {!showPayment ? (
        /* Donation Form Section */
        <section className="donation-form-section">
          <div className="container">
            <h2 className="form-section-title">Donation Form</h2>
            <p className="form-section-description">
              Your generous contribution helps us maintain the temple, organize festivals, and serve the community. 
              All donations are used for the temple's development and spiritual activities.
            </p>
            <form className="donation-form" onSubmit={handleProceedToPayment}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email (optional)"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter 10-digit phone number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    readOnly
                    className="readonly-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className={errors.state ? 'error' : ''}
                  >
                    <option value="">Select State</option>
                    {indianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="district">District *</label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                    disabled={!formData.state}
                    className={errors.district ? 'error' : ''}
                  >
                    <option value="">Select District</option>
                    {formData.state && districts[formData.state]?.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  {errors.district && <span className="error-message">{errors.district}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Enter your complete address"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="aadhar">Aadhar Number *</label>
                  <input
                    type="text"
                    id="aadhar"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                    required
                    placeholder="Enter 12-digit Aadhar number"
                    pattern="[0-9]{12}"
                    maxLength="12"
                    className={errors.aadhar ? 'error' : ''}
                  />
                  {errors.aadhar && <span className="error-message">{errors.aadhar}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="pan">PAN Number</label>
                  <input
                    type="text"
                    id="pan"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    placeholder="Enter PAN number (e.g., ABCDE1234F)"
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    maxLength="10"
                    style={{ textTransform: 'uppercase' }}
                    className={errors.pan ? 'error' : ''}
                  />
                  {errors.pan && <span className="error-message">{errors.pan}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="amount">Donation Amount (₹) *</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Enter donation amount"
                  className={errors.amount ? 'error' : ''}
                />
                {errors.amount && <span className="error-message">{errors.amount}</span>}
              </div>

              {submitStatus && (
                <div className={`submit-message ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </section>
      ) : (
        /* Payment Mode Selection */
        <section className="payment-section">
          <div className="container">
            <button 
              className="back-btn" 
              onClick={() => {
                setShowPayment(false);
                setPaymentMode('');
                setSubmitStatus(null);
              }}
            >
              ← Back to Form
            </button>
            <h2 className="form-section-title">Select Payment Mode</h2>
            <div className="payment-modes">
              <button
                className={`payment-mode-btn ${paymentMode === 'UPI' ? 'active' : ''}`}
                onClick={() => handlePaymentModeSelect('UPI')}
              >
                UPI
              </button>
              <button
                className={`payment-mode-btn ${paymentMode === 'NEFT' ? 'active' : ''}`}
                onClick={() => handlePaymentModeSelect('NEFT')}
              >
                NEFT
              </button>
            </div>

            {paymentMode === 'UPI' && (
              <div className="payment-details">
                <button 
                  className="change-payment-btn" 
                  onClick={() => setPaymentMode('')}
                >
                  Change Payment Mode
                </button>
                <h3>Scan QR Code to Pay</h3>
                <div className="qr-code-container">
                  <img src="/images/QR_final.png" alt="UPI QR Code" className="qr-code" />
                </div>
                <p className="payment-instruction">
                  Scan this QR code with any UPI app (Google Pay, PhonePe, Paytm, etc.) to complete your payment.
                </p>
              </div>
            )}

            {paymentMode === 'NEFT' && (
              <div className="payment-details">
                <button 
                  className="change-payment-btn" 
                  onClick={() => setPaymentMode('')}
                >
                  Change Payment Mode
                </button>
                <h3>Bank Details for NEFT Transfer</h3>
                <div className="bank-details">
                  <div className="bank-detail-item">
                    <span className="bank-label">Bank:</span>
                    <span className="bank-value">HDFC Bank</span>
                  </div>
                  <div className="bank-detail-item">
                    <span className="bank-label">A/C No:</span>
                    <span className="bank-value">50200115976846</span>
                  </div>
                  <div className="bank-detail-item">
                    <span className="bank-label">IFSC Code:</span>
                    <span className="bank-value">HDFC0004726</span>
                  </div>
                  <div className="bank-detail-item">
                    <span className="bank-label">Account Name:</span>
                    <span className="bank-value">ADIMATA SHAKTI PRATISHTHAN</span>
                  </div>
                </div>
                <p className="payment-instruction">
                  Please transfer the amount of ₹{formData.amount} to the above account details via NEFT. 
                  After successful transfer, your payment will be verified manually.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Donation;

