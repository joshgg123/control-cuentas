// types.ts
export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  description?: string;
  category?: string;
  tipo: string;
  payed: boolean;
}
