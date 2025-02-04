# mongoose-easy-paginate

A lightweight and type-safe pagination plugin for Mongoose with TypeScript support.

## Installation

```bash
npm install mongoose-easy-paginate
```
or
```bash
yarn add mongoose-easy-paginate
```

## Features

- 🚀 Simple and easy-to-use pagination functions.
- 🔄 Supports sorting and field selection, populate options
- 📦 Lightweight implementation
- 💪 Full TypeScript support
- 🔄 Also added id field as replica of _id in each document


## Usage

### Standard Pagination

```typescript
import { getPaginatedData, PaginateOptions } from 'mongoose-easy-paginate';
import UserModel, { UserDocument } from './models/User';

async function fetchUsers() {
  const getPaginatedOptions: PaginateOptions<UserDocument> = { 
        model: UserModel,
        query: { role: 'user' },
        page: 1,
        limit: 10,
        sort: { createdAt: -1 },
        select: '-password',
        populate: 'profile'
     };

  const users = await getPaginatedData(getPaginatedOptions);
  return users;
}
```

### Aggregation-Based Pagination

```typescript
import { getAggregatedPaginatedData, AggregatedPaginateOptions } from 'mongoose-easy-paginate';
import OrderModel, { OrderDocument } from './models/Order';

async function fetchOrders() {
  const getAggregatedOptions: AggregatedPaginateOptions<OrderDocument> = { 
    model: OrderModel,
    query: [
      { $match: { status: 'completed' } },
      { $sort: { createdAt: -1 } }
    ],
    page: 1,
    limit: 10
  };
  const orders = await getAggregatedPaginatedData(getAggregatedOptions);
  return orders;
}
```

## Parameters

- `model`     (Mongoose Model) - The Mongoose model to query
- `query`     (Object) - Optional query filter
- `page`      (Number) - Current page number (default: 1)
- `limit`     (Number) - Number of items per page (default: 10)
- `sort`      (Object) - Sorting criteria (default: { createdAt: -1 })
- `select`    (String | Object) - Fields to select (default: -password).
- `populate`  (String | Object | Array) - Fields to populate.

## Response Format

The paginate method returns a promise that resolves to:

```typescript
{
  data: T[];  // Array of documents
  pagination: {
    totalItems: number;    // Total number of documents
    perPage: number;       // Items per page
    currentPage: number;   // Current page number
    totalPages: number;    // Total number of pages
    hasNextPage: boolean;  // If there's a next page
    hasPrevPage: boolean;  // If there's a previous page
    nextPage: number | null;  // Next page number or null
    prevPage: number | null;  // Previous page number or null
  }
}
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Number of items per page |
| sort | Record<string, 1 \| -1> | {} | MongoDB sort options |
| select | string \| Record<string, 1 \| 0> | {} | Fields to include/exclude |
| populate | string \| Record<string, 1 \| 0> | {} | Fields to populate |
| query | Object \| Array<PipelineStage> | {} | MongoDB query object or aggregation pipeline stages |

## Requirements

- Mongoose ≥ 6.0.0
- TypeScript ≥ 4.x (for TypeScript users)

## License

- MIT

## Author

[shazee257@gmail.com](mailto:shazee257@gmail.com)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/shazee257/mongoose-easy-paginate/issues).


