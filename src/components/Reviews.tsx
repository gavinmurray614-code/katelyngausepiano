import { useState, useEffect, useCallback, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Reviews.css';

const reviewsData = [
  { id: 1, name: "Gavin M.", text: "Katelyn did a wonderful job, we were all very impressed. 2 thumbs up would book again!" },
  { id: 2, name: "Michael Thompson", text: "An absolute professional. The atmosphere Katelyn created at our corporate gala was exactly what we were looking for." },
  { id: 3, name: "Emily Rogers", text: "We requested a custom piece for my daughter's reception and Katelyn learned it perfectly. Highly recommended!" },
  { id: 4, name: "David Wilson", text: "Stunning performance. Her touch on the keys is delicate yet powerful. A true artist." },
  { id: 5, name: "Hayden L.", text: "I really enjoyed Katelyn's performance. We threw her a few curve balls last minute with some song requests and she adapted very quickly. She didn't demand attention but she set the tone for our event. I strongly recommend her!" },
  { id: 6, name: "Esther B.", text: "Katelyn is an incredible pianist with impressive talent. She is hard working, professional, very organized, and passionate about her skills. I highly recommend hiring her. You won't regret it!" }
];

const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const nextReview = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  }, []);

  const prevReview = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const handleNextClick = () => {
    setIsAutoPlaying(false);
    nextReview();
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  useEffect(() => {
    let timer: number | undefined;
    if (isAutoPlaying) {
      timer = window.setInterval(nextReview, 5000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoPlaying, nextReview]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    const templateParams = {
      user_name: formRef.current.review_name.value,
      message: formRef.current.review_text.value,
      form_type: 'Review Submission'
    };

    emailjs.send(
      'service_jnp9vy5', 
      'template_xisrxdq', 
      templateParams, 
      'ctnQ_z9rINc-x-dfT'
    )
      .then(() => {
        setStatus('success');
        setTimeout(() => {
          setIsFormOpen(false);
          setStatus('idle');
        }, 3000);
      }, (error) => {
        console.error('EmailJS Error:', error);
        setStatus('error');
      });
  };

  // Determine which 3 reviews to show (showing 3 sequential cards)
  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviewsData[(currentIndex + i) % reviewsData.length]);
    }
    return visible;
  };

  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <h1 className="section-title centered">Client Testimonials</h1>
        <div className="reviews-carousel-container">
          <button className="carousel-btn prev" onClick={prevReview}>&#8249;</button>
          
          <div className="reviews-viewport">
            <div className="reviews-list">
              {getVisibleReviews().map((review) => (
                <div key={`${review.id}-${currentIndex}`} className="review-card">
                  <div className="quote-mark">“</div>
                  <p className="review-text">{review.text}</p>
                  <h4 className="review-author">{review.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn next" onClick={handleNextClick}>&#8250;</button>
        </div>
        
        <div className="carousel-dots">
          {reviewsData.map((_, idx) => (
            <span 
              key={idx} 
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(idx)}
            ></span>
          ))}
        </div>

        <div className="leave-review-container centered">
          <button className="leave-review-btn" onClick={() => setIsFormOpen(true)}>
            Leave A Review
          </button>
        </div>

        {isFormOpen && (
          <div className="review-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="review-modal" style={{ backgroundColor: '#fff', padding: '40px', maxWidth: '500px', width: '90%', position: 'relative', borderRadius: '4px' }}>
              <button 
                className="close-modal" 
                onClick={() => setIsFormOpen(false)}
                style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', color: '#d4af37', lineHeight: 1 }}
              >
                &times;
              </button>
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Leave a Review</h3>
              
              {status === 'success' ? (
                <div className="status-message success">
                  <p>Thank you! Your review has been sent to Katelyn for approval.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleReviewSubmit}>
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="review_name" style={{ display: 'block', marginBottom: '5px', color: '#d4af37', textTransform: 'uppercase', fontSize: '12px' }}>Your Name</label>
                    <input 
                      type="text" 
                      id="review_name" 
                      name="review_name" 
                      required 
                      placeholder="Name" 
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', color: '#000', backgroundColor: '#fff' }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label htmlFor="review_text" style={{ display: 'block', marginBottom: '5px', color: '#d4af37', textTransform: 'uppercase', fontSize: '12px' }}>Your Review</label>
                    <textarea 
                      id="review_text" 
                      name="review_text" 
                      rows={5} 
                      required 
                      placeholder="Write your review here..." 
                      style={{ width: '100%', padding: '10px', border: '1px solid #ccc', color: '#000', backgroundColor: '#fff' }}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="submit-review-btn" 
                    disabled={status === 'sending'}
                    style={{ width: '100%', padding: '12px', backgroundColor: '#d4af37', color: '#fff', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}
                  >
                    {status === 'sending' ? 'Submitting...' : 'Submit Review'}
                  </button>
                  {status === 'error' && (
                    <p className="status-message error" style={{ color: 'red', marginTop: '10px' }}>Failed to send. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
