// helpers.ts

export const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('ar', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };
  
  export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ar', {
      weekday: 'short',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };
  