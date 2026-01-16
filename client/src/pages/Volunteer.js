import React, { useState } from 'react';
import { indianStates, districts } from '../data/indianStatesDistricts';
import { getApiUrl } from '../config/api';

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    district: '',
    state: '',
    country: 'India',
    email: '',
    phone: ''
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors in the form.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(getApiUrl('/api/volunteer'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you for volunteering! Your information has been saved successfully.' });
        setFormData({
          name: '',
          address: '',
          district: '',
          state: '',
          country: 'India',
          email: '',
          phone: ''
        });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Image Section */}
      <section className="about-hero-section">
        <div className="about-hero-image">
          <img src="/images/temple_image.png" alt="Temple" className="about-hero-img" />
          <div className="about-hero-overlay">
            <h1 className="about-hero-title">Volunteer</h1>
          </div>
        </div>
      </section>

      {/* Volunteer Info Section */}
      <section className="volunteer-info-section">
        <div className="container">
          <div className="volunteer-content">
            <h2 className="section-title">Join Us as a Volunteer</h2>
            <p className="section-description">
              Volunteering at Trishakti Peeth is a sacred opportunity to serve the divine and contribute to the spiritual community. 
              As a volunteer, you become an integral part of our temple's daily operations and special events. Your service helps 
              maintain the sanctity of the temple, assists devotees in their spiritual journey, and supports various cultural and 
              religious activities. Whether you help with daily rituals, festival preparations, or community service, your dedication 
              strengthens our mission of spreading divine blessings and preserving our rich cultural heritage.
            </p>
            <p className="section-description">
              Volunteers play a crucial role in organizing events, managing temple activities, and ensuring a welcoming environment 
              for all devotees. Your time and effort contribute to the temple's growth and help us serve the community better. 
              Join us in this noble cause and experience the joy of selfless service.
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section className="volunteer-form-section">
        <div className="container">
          <h2 className="form-section-title">Volunteer Registration Form</h2>
          <form className="volunteer-form" onSubmit={handleSubmit}>
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

            {submitStatus && (
              <div className={`submit-message ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Volunteer;

