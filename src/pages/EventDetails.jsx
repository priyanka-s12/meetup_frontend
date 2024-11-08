import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import dateFormat from 'dateformat';

const EventDetails = () => {
  const { data, loading, error } = useFetch('http://localhost:3000/events');
  const eventId = useParams();

  //   console.log(data);

  const eventData = data?.find((event) => event._id === eventId.eventId);
  //   console.log(eventData);
  return (
    <div className="bg-body-tertiary py-3">
      <Header />
      <main className="container">
        <hr />

        <div className="d-flex justify-content-between">
          {/* left col */}
          <div className="col-md-8">
            <h2 className="mb-3">{eventData?.eventTitle}</h2>
            <h6 className="text-body-secondary">Hosted By:</h6>
            <h5 className="mb-5">{eventData?.eventHostedBy}</h5>
            <img src={eventData?.coverImageUrl} className="w-75 mb-3" />

            <h3 className="mb-3">Details: </h3>
            <p>{eventData?.eventDescription}</p>

            <h3 className="mb-3">Additional Information: </h3>
            <p>
              <strong>Dress Code: </strong>
              {eventData?.dressCode}
            </p>
            <p>
              <strong>Age Restrictions: </strong>
              {eventData?.age}
            </p>

            <h3 className="mb-3">Event Tags: </h3>
            {eventData?.eventTags.map((tag) => (
              <button className="btn btn-danger me-2">{tag}</button>
            ))}
          </div>

          {/* right col */}
          <div className="col-md-4 p-3">
            <div className="card mb-3">
              <div className="card-body">
                {/* 1st row */}
                <div className="d-flex mb-3">
                  <i class="bi bi-clock"></i>
                  <p className="ms-2">
                    {dateFormat(
                      eventData?.eventStartTime,
                      'ddd, mmmm dS, yyyy, h:MM TT'
                    )}{' '}
                    to <br />
                    {dateFormat(
                      eventData?.eventEndTime,
                      'ddd, mmmm dS, yyyy, h:MM TT'
                    )}
                  </p>
                </div>

                {/* 2nd row */}
                <div className="d-flex mb-3">
                  <i class="bi bi-geo-alt"></i>
                  <p className="ms-2">
                    {eventData?.eventVenue}
                    <br />
                    {eventData?.eventAddress}
                  </p>
                </div>
                {/* 3rd row */}
                <div className="d-flex">
                  <i class="bi bi-currency-rupee"></i>
                  <p className="ms-2">
                    {eventData?.pricing === 0
                      ? 'Free'
                      : `${eventData?.pricing}`}
                  </p>
                </div>
              </div>
            </div>

            {/* speakers */}
            <h3 className="mb-3">
              Speaker{eventData?.speakers.length > 1 ? 's' : ''}: (
              {eventData?.speakers.length})
            </h3>
            <div className="row">
              {eventData?.speakers.map((speaker) => (
                <div className="col-md-6 mb-3">
                  <div className="d-flex justify-content-between">
                    <div className="card">
                      <div className="card-body text-center">
                        <img
                          src={speaker.profileImgUrl}
                          className="rounded-circle mb-3"
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
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
