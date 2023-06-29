import '../css/NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound-404">
        <h1>Oops!</h1>
      </div>
      <h2>404 - Page not found</h2>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <a href="#">Go To Homepage</a>
    </div>
  );
};

export default NotFound;
