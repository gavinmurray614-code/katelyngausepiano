import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>Katelyn Gause</h1>
          <h2>Utah County Wedding & Event Pianist</h2>
          <p className="hero-description">
            Elegant live piano for weddings, receptions, and special events throughout Utah County.
          </p>
          <div className="hero-cta">
            <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
              Book a Performance
            </button>
          </div>
        </div>
        <div className="hero-decoration">
          {/* High-Resolution Musical Mosaic Treble Clef Image */}
          <img 
            src="/treble-clef-mosaic-transparent.png" 
            alt="Musical Mosaic Treble Clef" 
            className="treble-clef-img"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
