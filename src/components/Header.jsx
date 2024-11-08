import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header>
      <div className="container d-flex justify-content-between">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <h1
            className="text-danger fst-italic fw-normal"
            style={{ fontFamily: 'cursive' }}
          >
            meetup
          </h1>
        </Link>
        <div>
          <input
            type="search"
            placeholder="Search by title and tags..."
            className="form-control mt-3"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
