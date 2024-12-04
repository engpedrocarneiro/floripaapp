import React, { useState } from 'react';
import { format, addHours, isBefore, isAfter, differenceInMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, GripVertical, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface ScheduledActivity {
  id: string;
  title: string;
  startTime: Date;
  duration: number;
  category: string;
}

interface TimelineViewProps {
  timeWindow: {
    start: Date;
    end: Date;
  };
}

function TimeSlot({ time, isHour }: { time: Date; isHour: boolean }) {
  return (
    <div
      className={`relative flex items-center py-2 ${
        isHour ? 'border-t border-dark-700' : ''
      }`}
    >
      <div className="w-16 text-right pr-4">
        <span className={`text-sm ${isHour ? 'text-dark-200' : 'text-dark-400'}`}>
          {format(time, 'HH:mm')}
        </span>
      </div>
      <div className="flex-1 h-px bg-dark-800"></div>
    </div>
  );
}

function SortableActivityItem({ activity }: { activity: ScheduledActivity }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: activity.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    zIndex: isDragging ? 1 : 0
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`relative bg-dark-700 rounded-lg p-3 mb-2 cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div {...attributes} {...listeners}>
            <GripVertical className="w-4 h-4 text-dark-400" />
          </div>
          <div>
            <h4 className="font-medium text-dark-100">{activity.title}</h4>
            <div className="flex items-center text-sm text-dark-400">
              <Clock className="w-3 h-3 mr-1" />
              <span>
                {format(activity.startTime, 'HH:mm')} -{' '}
                {format(
                  addHours(activity.startTime, activity.duration / 60),
                  'HH:mm'
                )}
              </span>
            </div>
          </div>
        </div>
        <button
          className="p-1 hover:bg-dark-600 rounded-md transition-colors"
          onClick={() => {/* TODO: Implement remove activity */}}
        >
          <X className="w-4 h-4 text-dark-400" />
        </button>
      </div>
    </motion.div>
  );
}

export function TimelineView({ timeWindow }: TimelineViewProps) {
  const [activities, setActivities] = useState<ScheduledActivity[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const timeSlots = [];
  let currentTime = new Date(timeWindow.start);
  
  while (isBefore(currentTime, timeWindow.end)) {
    timeSlots.push({
      time: new Date(currentTime),
      isHour: currentTime.getMinutes() === 0
    });
    currentTime = addHours(currentTime, 0.5);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setActivities((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dark-50">Linha do Tempo</h2>
        <div className="text-sm text-dark-300">
          {format(timeWindow.start, "dd 'de' MMMM", { locale: ptBR })}
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full">
          {timeSlots.map(({ time, isHour }) => (
            <TimeSlot key={time.toISOString()} time={time} isHour={isHour} />
          ))}
        </div>

        <div className="relative ml-20 z-10">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={activities}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence>
                {activities.map((activity) => (
                  <SortableActivityItem
                    key={activity.id}
                    activity={activity}
                  />
                ))}
              </AnimatePresence>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}