import { Document, Model } from 'mongoose';

export interface PaginateOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  select?: string | Record<string, 1 | 0>;
}

export interface PaginateResult<T> {
  data: T[];
  pagination: {
    totalItems: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export interface PaginateModel<T extends Document> extends Model<T> {
  paginate(
    query?: Record<string, any>,
    options?: PaginateOptions
  ): Promise<PaginateResult<T>>;
} 