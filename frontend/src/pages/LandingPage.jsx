import { Link } from 'react-router-dom';
import '../css/LandingPage.css';

const LandingPage = () => {

  return (
    <div className="landing-container">
        <main>
          <section className="hero-section">
            <div className="hero-content">
              <h2>Welcome & Let's Blog Together</h2>
              <p>Explore a world of captivating stories and insightful articles written by different people from all corners of the globe.</p>
              <div className="button">
                  <Link to="/register" className="cta-button">Register</Link>
                  <Link to="/login" className="cta-button">Login</Link>
              </div>
            </div>
          </section>
        </main>
    </div>
  );
}

export default LandingPage;
