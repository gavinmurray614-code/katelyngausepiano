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
                  <span className="fee-label">Additional Fees</span>
                  <span className="fee-value">+$50</span>
                  <p className="fee-desc">Applied for bookings made less than one week in advance or including more than 8 custom music requests.</p>
                </div>
              </div>
            </div>

            <button className="pricing-btn" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
              Book Katelyn
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
