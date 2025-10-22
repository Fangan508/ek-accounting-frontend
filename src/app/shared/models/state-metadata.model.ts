export interface StateMetadata<T> {
  loading: boolean;
  metadata: T;
  total?: number;
}