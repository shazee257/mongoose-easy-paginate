import {  PopulateOptions } from 'mongoose';

export interface PaginateOptions {
    model: any;
    query?: Record<string, any>;
    page?: number;
    limit?: number;
    sort?: Record<string, 1 | -1>;
    select?: string | Record<string, 1 | 0>;
    populate?: string | string[] | PopulateOptions | PopulateOptions[];
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