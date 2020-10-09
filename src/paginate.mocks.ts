/* istanbul ignore file */
import { TSource } from "./paginate.types";

const withPagination = (payloads: {
  limit: number;
  skip: number;
  data: number[];
}) => {
  const paginated = [...payloads.data].slice(
    payloads.skip,
    payloads.skip + payloads.limit
  );
  return Promise.resolve(paginated);
};

export const mockSources: TSource[] = [
  {
    count: () => Promise.resolve(2),
    items: ({ limit, skip }) => withPagination({ data: [1, 2], limit, skip }),
  },
  {
    count: () => Promise.resolve(0),
    items: ({ limit, skip }) => Promise.resolve([]),
  },
  {
    count: () => Promise.resolve(4),
    items: ({ limit, skip }) =>
      withPagination({ data: [3, 4, 5, 6], limit, skip }),
  },
  {
    count: () => Promise.resolve(2),
    items: ({ limit, skip }) => withPagination({ data: [7, 8], limit, skip }),
  },
];
