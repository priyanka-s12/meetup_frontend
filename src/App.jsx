import Header from './components/Header';
import Footer from './components/Footer';
import EventsList from './pages/EventsList';
import { useState } from 'react';
function App() {
  const [query, setSquery] = useState('');

  return (
    <div className="bg-body-tertiary py-3">
      <Header setSquery={setSquery} />
      <EventsList query={query} />
      <Footer />
    </div>
  );
}

export default App;
