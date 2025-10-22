export interface BankBooksFilter {
  bookingDate?: string;
}

export interface BankBooksRequest {
  offset: number;
  limit: number;
  filter: BankBooksFilter;
  searchText?: string;
  sort: Array<{ colId: string; sort: 'asc' | 'desc'}>;
}