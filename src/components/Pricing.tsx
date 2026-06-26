import './Pricing.css';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <h1 className="section-title centered">Pricing</h1>
        <div className="pricing-container">
          <div className="pricing-card main-pricing">
            <h3>Standard Performance Rate</h3>
            <p className="price">$100 / Hour</p>
            </div>
            
            <div className="pricing-details">
              <div className="pricing-item">

              <div className="pricing-grid-fees">
                <div className="fee-item">
                  <span className="fee-label">No Piano On-Site</span>
                  <span className="fee-value">+$50</span>
                  <p className="fee-desc">Applied if Katelyn needs to provide her own professional keyboard and equipment.</p>
                </div>
                
                <div className="fee-item">
                  <span className="fee-label">Travel Fee</span>
                  <span className="fee-value">+$50</span>
                  <p className="fee-desc">Applied for any events located outside of Utah County.</p>
                </div>

                <div className="fee-item">
                  <span className="fee-label">Rush Booking</span>
                  <span className="fee-value">+$50</span>
                  <p className="fee-desc">For bookings made less than one week in advance.</p>
                </div>

                <div className="fee-item">
                  <span className="fee-label">Custom Song Requests</span>
                  <span className="fee-value">+$20</span>
                  <p className="fee-desc">For each 2 extra custom songs beyond the 2 included.</p>
                </div>
              </div>
            </div>

            <button className="pricing-btn" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
