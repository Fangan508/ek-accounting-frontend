export interface BankBookPosition {
  id?: string;
  description: string | null | undefined;
  amount: number;
  bookingDate: Date | null | undefined;
  documentNumber?: string;
  date: Date | null | undefined;
  account: string;
  text: string | null | undefined;
  credit: number;
  debit: number;
  balance: number;
  counterAccount: string;
}