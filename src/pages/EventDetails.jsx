import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import dateFormat from 'dateformat';

const EventDetails = () => {
  const { eventId } = useParams();
  console.log(eventId);
  const { data, loading, error } = useFetch(
    `https://meetup-backend-chi.vercel.app/events/${eventId}`
  );

  // console.log(data);

  return (
    <div className="bg-body-tertiary py-3">
      <Header />
      <main className="container">
        <hr />

        {data ? (
          <div className="d-flex justify-content-between">
            {/* left col */}
            <div className="col-md-8">
              <h2 className="mb-3">{data?.eventTitle}</h2>
              <h6 className="text-body-secondary">Hosted By:</h6>
              <h5 className="mb-5">{data?.eventHostedBy}</h5>
              <img
                src={data?.coverImageUrl}
                className="w-75 mb-3 img-fluid"
                alt={`${data?.eventTitle} cover image`}
              />

              <h3 className="mb-3">Details: </h3>
              <p>{data?.eventDescription}</p>

              <h3 className="mb-3">Additional Information: </h3>
              <p>
                <strong>Dress Code: </strong>
                {data?.dressCode}
              </p>
              <p>
                <strong>Age Restrictions: </strong>
                {data?.age}
              </p>

              <h3 className="mb-3">Event Tags: </h3>
              {data?.eventTags.map((tag) => (
                <button className="btn btn-danger me-2" key={tag}>
                  {tag}
                </button>
              ))}
            </div>

            {/* right col */}
            <div className="col-md-4 p-3">
              <div className="card mb-3">
                <div className="card-body">
                  {/* 1st row */}
                  <div className="d-flex mb-3">
                    <i className="bi bi-clock"></i>
                    <p className="ms-2">
                      {dateFormat(
                        data?.eventStartTime,
                        'ddd, mmmm dS, yyyy, h:MM TT'
                      )}{' '}
                      to <br />
                      {dateFormat(
                        data?.eventEndTime,
                        'ddd, mmmm dS, yyyy, h:MM TT'
                      )}
                    </p>
                  </div>

                  {/* 2nd row */}
                  <div className="d-flex mb-3">
                    <i className="bi bi-geo-alt"></i>
                    <p className="ms-2">
                      {data?.eventVenue}
                      <br />
                      {data?.eventAddress}
                    </p>
                  </div>
                  {/* 3rd row */}
                  <div className="d-flex">
                    <i className="bi bi-currency-rupee"></i>
                    <p className="ms-2">
                      {data?.pricing === 0 ? 'Free' : `${data?.pricing}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* speakers */}
              <h3 className="mb-3">
                Speaker{data?.speakers.length > 1 ? 's' : ''}: (
                {data?.speakers.length})
              </h3>
              <div className="row">
                {data?.speakers.map((speaker) => (
                  <div className="col-md-6 mb-3 p-3" key={speaker._id}>
                    <div className="d-flex justify-content-between">
                      <div className="card">
                        <div className="card-body text-center">
                          <img
                            src={speaker.profileImgUrl}
                            className="rounded-circle mb-3 img-fluid"
                          />
                          <h6>{speaker.name}</h6>
                          <p>{speaker.designation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          loading && <p className="alert alert-primary">Loading...</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
