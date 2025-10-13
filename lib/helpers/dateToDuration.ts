import { intervalToDuration } from "date-fns";

export const datesToDuration = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (!startDate || !endDate?.getTime()) return null;
  
    const timeElasped = endDate.getTime() - startDate.getTime();
  
    if (timeElasped < 1000) return { dateString: `${timeElasped}ms` };
    const duration = intervalToDuration({
      start: 0,
      end: timeElasped,
    });
  
    return { dateString: `${duration.minutes || 0}m ${duration.seconds || 0}s` };
  };