export type Payment = {
  id: string;
  name: string | null;
  person: string | null;
  image?: string | null;
  updated?: number | null;
  datetime: number | null;
};
