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

- 🚀 Simple and intuitive API
- 📦 Lightweight implementation
- 💪 Full TypeScript support
- 🔧 Customizable pagination options
- 🔄 Supports sorting and field selection

## Usage

### 1. Apply the Plugin to Your Schema

```ts
import mongoose from 'mongoose';
import paginate from 'mongoose-easy-paginate';

mongoose.plugin(paginate);
```

### 2. Use the Paginate Method

```typescript
const User = mongoose.model('User', new mongoose.Schema({ name: String }));

const users = await User.paginate({});
```

### 3. Customize Pagination Options & Access Pagination Data

```ts
const users = await User.paginate({}, { page: 2, limit: 10, sort: { name: 1 } });
console.log(users.pagination);
```

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

## Requirements

- Mongoose ≥ 6.0.0
- TypeScript ≥ 4.x (for TypeScript users)

## License

ISC

## Author

[shazee257@gmail.com](mailto:shazee257@gmail.com)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/shazee257/mongoose-easy-paginate/issues).


