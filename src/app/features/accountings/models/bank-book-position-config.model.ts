export interface BankBookPositionConfig {
  documentNumber: number;
  bookingdate: Date | null | undefined;
  description: string;
  credit: number;
  debit: number;
}