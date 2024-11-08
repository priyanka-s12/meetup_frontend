import Header from './components/Header';
import Footer from './components/Footer';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';

function App() {
  const eventTypes = ['Both', 'Online', 'Offline'];

  const { data, loading, error } = useFetch('http://localhost:3000/events');
  // console.log(data);

  return (
    <div className="bg-body-tertiary py-3">
      <Header />
      <main className="container">
        <hr />
        <div className="d-flex justify-content-between mb-3">
          <h2>Meetup Events</h2>
          <select className="form-select w-25">
            <option>Search Event Type</option>
            {eventTypes.map((event, index) => (
              <option key={index}>{event}</option>
            ))}
          </select>
        </div>

        {loading && <div className="alert alert-primary">Loading...</div>}
        {data?.error && <p>{data?.error}</p>}

        <div className="row">
          {data?.map((event) => (
            <div className="col-md-4" key={event._id}>
              <Link
                to={`/events/${event._id}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="card mb-3 border-light">
                  <div>
                    <img
                      src={event.coverImageUrl}
                      className="object-fit-cover border rounded w-100 position-relative"
                      style={{ height: '300px' }}
                      alt="Event cover image"
                    />
                    <span class="badge text-bg-info position-absolute top-0 start-0 m-3 px-3">
                      {event.eventType}
                    </span>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      {dateFormat(
                        event.eventStartTime,
                        'ddd, mmmm dS, yyyy, h:MM TT'
                      )}
                    </p>
                    <h5 className="card-title">{event.eventTitle}</h5>
                    <h6 className="text-body-secondary">
                      Hosted by: {event.eventHostedBy}
                    </h6>
                    <p>
                      {event.pricing === 0 ? 'Free' : `Rs. ${event.pricing}`}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
