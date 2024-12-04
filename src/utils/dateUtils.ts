import { isWithinInterval, format, isBefore, isAfter } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EVENT } from '../constants/event';

export function validateTimeWindow(arrival: Date, departure: Date): string | null {
  if (!isBefore(arrival, EVENT.startDate)) {
    return 'A chegada deve ser anterior ao início do evento';
  }
  
  if (!isAfter(departure, EVENT.endDate)) {
    return 'A partida deve ser posterior ao término do evento';
  }
  
  if (!isBefore(arrival, departure)) {
    return 'A chegada deve ser anterior à partida';
  }
  
  return null;
}

export function getTimeWindows(arrival: Date, departure: Date) {
  // Pre-event window: from arrival until event start
  const preEventWindow = {
    start: arrival,
    end: EVENT.startDate
  };

  // Post-event window: from event end until departure
  const postEventWindow = {
    start: EVENT.endDate,
    end: departure
  };

  return {
    preEventWindow,
    postEventWindow
  };
}

export function formatTimeWindow(start: Date, end: Date): string {
  return `${format(start, "dd 'de' MMMM', às' HH:mm", { locale: ptBR })} até ${format(
    end,
    "dd 'de' MMMM', às' HH:mm",
    { locale: ptBR }
  )}`;
}