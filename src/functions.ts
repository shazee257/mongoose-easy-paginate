import { Schema, Document } from 'mongoose';
import { PaginateOptions, PaginateResult, PaginateModel } from './types';

function paginate<T extends Document>(schema: Schema): void {
    schema.statics.paginate =
        async function (query: Record<string, any> = {}, options: PaginateOptions = {}): Promise<PaginateResult<T>> {
            const { page = 1, limit = 10, sort = {}, select = {} } = options;
            const skip = (page - 1) * limit;

            const [data, totalItems] = await Promise.all([
                this.find(query)
                    .select(select)
                    .sort(sort)
                    .skip(skip)
                    .limit(limit)
                    .exec(),
                this.countDocuments(query)
            ]);

            const totalPages = Math.ceil(totalItems / limit);
            const hasNextPage = page < totalPages;
            const hasPrevPage = page > 1;

            return {
                data,
                pagination: {
                    totalItems,
                    perPage: limit,
                    currentPage: page,
                    totalPages,
                    hasNextPage,
                    hasPrevPage,
                    nextPage: hasNextPage ? page + 1 : null,
                    prevPage: hasPrevPage ? page - 1 : null
                }
            };
        };
}

export default paginate;