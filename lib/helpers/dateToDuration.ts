import { intervalToDuration } from "date-fns";

export const datesToDuration = (
  startDate?: Date | null | string,
  endDate?: Date | null | string
) => {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

  const timeElasped = end.getTime() - start.getTime();

  if (timeElasped < 1000) return { dateString: `${timeElasped}ms` };
  const duration = intervalToDuration({
    start: 0,
    end: timeElasped,
  });

  return { dateString: `${duration.minutes || 0}m ${duration.seconds || 0}s` };
};