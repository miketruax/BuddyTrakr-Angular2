export interface Buddy {
  _id?: number;
  name?: string;
  species?: string;
  binomial?: string;
  owner?: string;
  dateAdded?: Date;
  description?: string;
  timesOut?: number
  checkedOut?: boolean;
  totalDaysOut?: number;
  lastOutDate?: Date;
  lastOutDays?: number;
};
