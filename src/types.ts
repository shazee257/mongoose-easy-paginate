import { Model, Document, PipelineStage, PopulateOptions } from 'mongoose';

export interface PaginateOptions<T extends Document> {
    model: Model<T>;
    query?: Record<string, any>;
    page?: number;
    limit?: number;
    sort?: Record<string, 1 | -1>;
    select?: string | Record<string, 1 | 0>;
    populate?: string | string[] | PopulateOptions | PopulateOptions[];
}

export interface AggregatedPaginateOptions<T extends Document> {
    model: Model<T>;
    query?: PipelineStage[];
    page?: number;
    limit?: number;
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