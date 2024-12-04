import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Plus } from 'lucide-react';
import { AddEventModal } from './AddEventModal';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color?: string;
  textColor?: string;
  isTimeWindow?: boolean;
  className?: string;
}

interface CalendarViewProps {
  events: CalendarEvent[];
}

export function CalendarView({ events }: CalendarViewProps) {
  const [userEvents, setUserEvents] = useState<CalendarEvent[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [calendarApi, setCalendarApi] = useState<any>(null);

  const firstEvent = events[0];
  
  useEffect(() => {
    if (calendarApi && firstEvent) {
      calendarApi.gotoDate(firstEvent.start);
    }
  }, [calendarApi, firstEvent]);

  const timeWindows = events.filter(event => event.isTimeWindow).map(window => ({
    ...window,
    className: 'time-window-event'
  }));
  
  const allEvents = [...timeWindows, ...userEvents];

  const isWithinTimeWindow = (start: Date, end: Date) => {
    return timeWindows.some(window => {
      const windowStart = new Date(window.start);
      const windowEnd = new Date(window.end);
      return start >= windowStart && end <= windowEnd;
    });
  };

  const handleSelect = (selectInfo: any) => {
    const start = new Date(selectInfo.start);
    const end = new Date(selectInfo.end);

    if (!isWithinTimeWindow(start, end)) {
      selectInfo.view.calendar.unselect();
      return;
    }

    setSelectedTimeSlot({ start, end });
    setShowAddModal(true);
  };

  const handleAddButtonClick = () => {
    const timeWindow = timeWindows[0];
    if (!timeWindow) return;

    setSelectedTimeSlot({
      start: new Date(timeWindow.start),
      end: new Date(timeWindow.end)
    });
    setShowAddModal(true);
  };

  const handleEventAdd = (title: string, description: string, start: Date, end: Date) => {
    if (!isWithinTimeWindow(start, end)) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title,
      description,
      start,
      end,
      color: '#f97316',
      textColor: '#ffffff'
    };

    setUserEvents(prev => [...prev, newEvent]);
    setShowAddModal(false);
    setSelectedTimeSlot(null);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-end mb-2">
          <button
            onClick={handleAddButtonClick}
            className="button flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Evento</span>
          </button>
        </div>

        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          initialDate={firstEvent?.start || new Date()}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: ''
          }}
          events={allEvents.map(event => ({
            ...event,
            start: event.start.toISOString(),
            end: event.end.toISOString()
          }))}
          slotMinTime="07:00:00"
          slotMaxTime="23:00:00"
          allDaySlot={false}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          height="auto"
          contentHeight="auto"
          aspectRatio={1.8}
          locale="pt-br"
          titleFormat={{ month: 'long', day: 'numeric' }}
          slotLabelFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }}
          nowIndicator={true}
          select={handleSelect}
          ref={(el) => setCalendarApi(el?.getApi())}
          selectConstraint={{
            events: timeWindows.map(window => ({
              ...window,
              start: window.start.toISOString(),
              end: window.end.toISOString(),
              display: 'background',
              className: 'available-window'
            }))
          }}
        />
      </div>

      {showAddModal && selectedTimeSlot && (
        <AddEventModal
          start={selectedTimeSlot.start}
          end={selectedTimeSlot.end}
          onClose={() => {
            setShowAddModal(false);
            setSelectedTimeSlot(null);
          }}
          onAdd={handleEventAdd}
        />
      )}
    </>
  );
}