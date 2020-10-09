type TSource<TItem extends any> = {
  count: () => Promise<number>;
  items: (p: { limit: number; skip: number }) => Promise<TItem[]>;
};

type TPaginationPayloads<TItem extends any> = {
  sources: TSource<TItem>[];
  limit: number;
  skip: number;
};

type TPagination<TItem extends any> = {
  items: TItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};
