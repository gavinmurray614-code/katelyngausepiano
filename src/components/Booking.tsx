import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Booking.css';

const Booking: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [eventType, setEventType] = useState<string>('wedding');
  const [otherText, setOtherText] = useState<string>('');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setStatus('sending');

    // Prepare template parameters
    const templateParams = {
      user_name: formRef.current.user_name.value,
      user_email: formRef.current.user_email.value,
      event_date: formRef.current.event_date.value,
      start_time: formRef.current.start_time.value,
      end_time: formRef.current.end_time.value,
      event_location: formRef.current.event_location.value,
      venue_setting: formRef.current.venue_setting.value,
      piano_provision: formRef.current.piano_provision.value,
      event_type: eventType === 'other' ? `Other: ${otherText}` : eventType,
      message: formRef.current.message.value,
    };

    emailjs.send(
      'service_jnp9vy5', 
      'template_xisrxdq', 
      templateParams, 
      'ctnQ_z9rINc-x-dfT'
    )
      .then(() => {
        setStatus('success');
        setEventType('wedding');
        setOtherText('');
      }, (error) => {
        console.error('EmailJS Error:', error);
        setStatus('error');
      });
  };

  const eventOptions = [
    { id: 'wedding', label: 'Wedding' },
    { id: 'reception', label: 'Reception' },
    { id: 'corporate', label: 'Corporate Event' },
    { id: 'other', label: 'Other:' },
  ];

  return (
    <section id="booking" className="booking">
      <div className="container">
        <div className="booking-card">
          <div className="booking-header">
            <h2 className="section-title">Reserve a Date</h2>
            <p>Fill out the form below to inquire about availability for your event.</p>
          </div>
          
          {status === 'success' ? (
            <div className="status-message success">
              <h3>Inquiry Sent!</h3>
              <p>Thank you, Katelyn will get back to you soon.</p>
              <button onClick={() => setStatus('idle')}>Send Another</button>
            </div>
          ) : (
            <form className="booking-form" ref={formRef} onSubmit={sendEmail}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="user_name" required placeholder="Enter your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="user_email" required placeholder="email@example.com" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="date">Event Date *</label>
                <input type="date" id="date" name="event_date" required className="date-input" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="start_time">Approximate Start Time *</label>
                  <input type="time" id="start_time" name="start_time" required />
                </div>
                <div className="form-group">
                  <label htmlFor="end_time">Approximate End Time *</label>
                  <input type="time" id="end_time" name="end_time" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Event Location *</label>
                <input type="text" id="location" name="event_location" required placeholder="Venue street address, city, state" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="venue_setting">Indoor or Outdoor *</label>
                  <select id="venue_setting" name="venue_setting" required className="select-with-arrow">
                    <option value="" disabled selected>Select</option>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="piano_provision">Piano On-Site or Keyboard Needed *</label>
                  <select id="piano_provision" name="piano_provision" required className="select-with-arrow">
                    <option value="" disabled selected>Select</option>
                    <option value="on-site">Piano On-Site</option>
                    <option value="keyboard-needed">Keyboard Needed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Event Type *</label>
                <div className="event-type-grid">
                  {eventOptions.map((option) => (
                    <label 
                      key={option.id} 
                      className={`event-type-option ${eventType === option.id ? 'selected' : ''}`}
                    >
                      <input 
                        type="radio" 
                        name="event_type_radio" 
                        value={option.id}
                        checked={eventType === option.id}
                        onChange={(e) => setEventType(e.target.value)}
                        className="hidden-radio"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                {eventType === 'other' && (
                  <input 
                    type="text" 
                    placeholder="Please specify..." 
                    className="other-input"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    required
                  />
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Event Details</label>
                <textarea id="message" name="message" rows={4} required placeholder="Tell me more about your event, custom music requests, etc."></textarea>
              </div>
              <div className="form-submit">
                <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>
              {status === 'error' && (
                <p className="status-message error">Something went wrong. Please try again or email Katelyn directly.</p>
              )}
            </form>
          )}

          <div className="contact-info-footer">
            <p>(801) 874-8090</p>
            <p>kgause99@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
