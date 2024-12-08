import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PlanningPage } from './pages/PlanningPage';
import { Dashboard } from './components/Dashboard';
import { TimeWindows } from './components/TimeWindows';
import { EventDetails } from './components/EventDetails';
import { TimeInput } from './components/TimeInput';
import { Header } from './components/Header';

function AppPage() {
  const [eventTime, setEventTime] = React.useState<{
    arrival: Date;
    departure: Date;
  } | null>(() => {
    const saved = sessionStorage.getItem('eventTime');
    if (saved) {
      const { arrival, departure } = JSON.parse(saved);
      return {
        arrival: new Date(arrival),
        departure: new Date(departure)
      };
    }
    return null;
  });

  const [timeWindows, setTimeWindows] = React.useState<{
    preEventWindow: { start: Date; end: Date } | null;
    postEventWindow: { start: Date; end: Date } | null;
  } | null>(() => {
    if (eventTime) {
      return {
        preEventWindow: {
          start: new Date(eventTime.arrival.getTime() - 3 * 60 * 60 * 1000),
          end: eventTime.arrival
        },
        postEventWindow: {
          start: eventTime.departure,
          end: new Date(eventTime.departure.getTime() + 3 * 60 * 60 * 1000)
        }
      };
    }
    return null;
  });

  const handleTimeSubmit = (arrival: Date, departure: Date) => {
    const newEventTime = { arrival, departure };
    setEventTime(newEventTime);
    const windows = {
      preEventWindow: {
        start: new Date(arrival.getTime() - 3 * 60 * 60 * 1000),
        end: arrival
      },
      postEventWindow: {
        start: departure,
        end: new Date(departure.getTime() + 3 * 60 * 60 * 1000)
      }
    };
    setTimeWindows(windows);
    sessionStorage.setItem('eventTime', JSON.stringify(newEventTime));
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EventDetails />
        <TimeInput 
          onTimeSubmit={handleTimeSubmit}
          initialValues={eventTime || undefined}
        />
        {timeWindows && (
          <TimeWindows 
            {...timeWindows}
            activeWindow={null}
            onWindowSelect={() => {}}
          />
        )}
        {timeWindows && (
          <div className="mt-6">
            <Dashboard
              timeWindow={timeWindows.preEventWindow || timeWindows.postEventWindow!}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;