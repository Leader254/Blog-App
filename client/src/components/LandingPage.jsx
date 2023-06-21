import './LandingPage.css';
import Navbar from './Navbar';

const LandingPage = () => {
  return (
    <>
    <Navbar />
    <div className="landing-page">
      <div className="overlay">
        <div className="container">
          <h1>Welcome to My Blog</h1>
          <p>Explore the latest articles and stories from our talented writers.</p>
          <div className="search-bar">
            <input type="text" placeholder="Search articles..." />
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LandingPage;
