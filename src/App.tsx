import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { TimeInput } from './components/TimeInput';
import { EventDetails } from './components/EventDetails';
import { TimeWindows } from './components/TimeWindows';
import { Dashboard } from './components/Dashboard';
import { PlanningPage } from './pages/PlanningPage';
import { motion } from 'framer-motion';
import { getTimeWindows } from './utils/dateUtils';
import type { EventTime } from './types';

function HomePage() {
  const [eventTime, setEventTime] = useState<EventTime | null>(() => {
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

  const [timeWindows, setTimeWindows] = useState<{
    preEventWindow: { start: Date; end: Date } | null;
    postEventWindow: { start: Date; end: Date } | null;
  } | null>(() => {
    if (eventTime) {
      return getTimeWindows(eventTime.arrival, eventTime.departure);
    }
    return null;
  });

  const handleTimeSubmit = (arrival: Date, departure: Date) => {
    const newEventTime = { arrival, departure };
    setEventTime(newEventTime);
    const windows = getTimeWindows(arrival, departure);
    setTimeWindows(windows);
    
    // Save to sessionStorage
    sessionStorage.setItem('eventTime', JSON.stringify(newEventTime));
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Dashboard
              timeWindow={timeWindows.preEventWindow || timeWindows.postEventWindow!}
            />
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planning" element={<PlanningPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;