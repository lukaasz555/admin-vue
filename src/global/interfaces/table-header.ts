export interface TableHeader<T> {
  key: keyof T | 'actions';
  title: string;
  align: 'start' | 'center' | 'end';
  width?: number;
  value?: (item: Record<string, any>, fallback?: any) => any;
}
