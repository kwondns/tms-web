export type PastCountType = { id: string; date: string; count: number; titles: string[] | null; titles_count: number };

export type PastType = {
  id: string;
  title: string;
  content: string;
  startTime: string;
  endTime: string;
};
