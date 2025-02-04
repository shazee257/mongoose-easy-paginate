import { AggregatedPaginateOptions, PaginateOptions, PaginateResult } from './types';

export async function getPaginatedData({
    model,
    query = {},
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    select = '-password',
    populate = ''
}: PaginateOptions): Promise<PaginateResult<any>> {
    const skip = (page - 1) * limit;

    const [rawData, totalItems] = await Promise.all([
        model.find(query)
            .select(select)
            .populate(populate)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean()
            .exec(),
        model.countDocuments(query)
    ]);

    let data = [];

    // Add id field to each document in the data array
    if (rawData.length > 0) {
        data = rawData.map((doc: any) => ({
            ...doc,
            id: doc._id.toString(),
        }));
    }

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
}

export async function getAggregatedPaginatedData({
    model,
    query = [],
    page = 1,
    limit = 10
}: AggregatedPaginateOptions): Promise<PaginateResult<any>> {
    const skip = (page - 1) * limit;

    const [rawData, totalItems] = await Promise.all([
        model.aggregate(query).skip(skip).limit(limit).exec(),
        model.countDocuments(query)
    ]);

    let data = [];

    if (rawData.length > 0) {
        data = rawData.map((doc: any) => ({
            ...doc,
            id: doc._id.toString(),
        }));
    }

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
        data,
        pagination: {
            totalItems,
            perPage: limit,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            nextPage: hasNextPage ? page + 1 : null,
            prevPage: hasPrevPage ? page - 1 : null
        }
    };
}