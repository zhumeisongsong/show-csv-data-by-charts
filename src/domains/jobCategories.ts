export type DetailItem = {
  id: number;
  name: string;
  score: number;
  type: "cat" | "kd" | "eng";
};

export type AverageDataItem = {
  id: number;
  name: string;
  score: number;
};

export type DetailData = {
  id: number;
  name: string;
  data: DetailItem[];
};
