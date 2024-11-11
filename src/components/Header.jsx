import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = ({ setSquery }) => {
  //as include() is case-sensitive and user may type in lowercase so use toLowerCase()
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
            type="text"
            placeholder="Search by title and tags..."
            className="form-control mt-3"
            onChange={(event) => setSquery(event.target.value.toLowerCase())}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
