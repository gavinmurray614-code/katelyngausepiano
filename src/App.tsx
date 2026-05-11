import Hero from './components/Hero';
import About from './components/About';
// import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Reviews from './components/Reviews';
import Repertoire from './components/Repertoire';
import Booking from './components/Booking';
import './App.css';

function App() {
  return (
    <main className="app-container">
      <nav className="main-nav">
        <div className="container nav-content">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>KG</div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#repertoire">Repertoire</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><button className="nav-btn" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
              Book Now
            </button></li>
          </ul>
        </div>
      </nav>

      <Hero />
      <About />
      <Repertoire />
      {/* <Gallery /> */}
      <Pricing />
      <Reviews />
      <Booking />

      <footer className="main-footer">
        <div className="container footer-content">
          <p>&copy; {new Date().getFullYear()} Katelyn Gause. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="https://www.youtube.com/@katelyngausepiano" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
