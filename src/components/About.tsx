import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-container">
            <img 
              src="/katelyn-4.jpg" 
              alt="Katelyn Gause - Professional Pianist" 
              className="about-portrait"
            />
            <div className="image-accent-border"></div>
          </div>
          <div className="about-content">
            <h2 className="section-title">Musical Artistry</h2>
            <h3 className="expertise-tag">Piano Performance Major</h3>
            <p className="about-text">
              With a deep passion for classical and contemporary piano, Katelyn Gause brings a refined touch to every event. Her repertoire spans from timeless classical masterpieces to modern favorites, tailored to create the perfect atmosphere for your special day.
            </p>
            <div className="experience-stats">
              <div className="stat-item">
                <span className="stat-number">12+</span>
                <span className="stat-label">Years of Study</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Events Performed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
