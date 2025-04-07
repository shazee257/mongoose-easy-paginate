import { PipelineStage } from 'mongoose';
import { Document } from 'mongoose';
import { AggregatedPaginateOptions, PaginateOptions, PaginateResult } from './types';

export async function getPaginatedData<T extends Document>({
    model,
    query = {},
    page = 1,
    limit = 10,
    sort = { createdAt: -1 },
    select = '-password',
    populate = ''
}: PaginateOptions<T>): Promise<PaginateResult<T>> {
    try {
        const skip = (page - 1) * limit;

        const [rawData, totalItems] = await Promise.all([
            model.find(query)
                .select(select)
                .populate(populate as any)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            model.countDocuments(query)
        ]);

        // Add id field to each document in the data array
        let data = [];
        if (rawData.length > 0) {
            data = rawData.map((doc: any) => ({
                ...doc,
                id: doc._id.toString()
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
    } catch (error: any) {
        throw new Error(`Failed to fetch paginated data: ${error.message}`);
    }
}

export async function getAggregatedPaginatedData<T extends Document>({
    model,
    query = [],
    page = 1,
    limit = 10
}: AggregatedPaginateOptions<T>): Promise<PaginateResult<T>> {
    try {
        const skip = (page - 1) * limit;

        // Add count facet to get total items in one query
        const aggregationPipeline: PipelineStage[] = [
            ...query,
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limit },
                        { $addFields: { id: '$_id' } }
                    ],
                    totalCount: [
                        { $count: 'count' }
                    ]
                }
            }
        ];

        const [result] = await model.aggregate(aggregationPipeline);

        const totalItems = result.totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalItems / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        return {
            data: result.data,
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
    } catch (error: any) {
        throw new Error(`Failed to fetch aggregated paginated data: ${error.message}`);
    }
}