import { format } from "date-fns";
import { parseISO } from 'date-fns/parseISO';

export const dateFormat = (datetime: string | number | Date): Date => {
  return parseISO(format(datetime, "yyyy-MM-dd'T'HH:mm:ss'Z'"));
};