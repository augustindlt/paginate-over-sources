const positiveNumber = (n: number) => (n < 0 ? 0 : n);

const paginate = async <TItem = any>(
  payloads: TPaginationPayloads<TItem>
): Promise<TPagination<TItem>> => {
  const { sources, limit, skip } = payloads;
  const { items, totalItems } = await sources.reduce(
    async (acc, { count, items }) => {
      const { items: previousItems, skip: currentSkip, totalItems } = await acc;
      const itemsCount = await count();
      const newSkip = currentSkip - itemsCount;
      const newTotalItems = totalItems + itemsCount;

      if (itemsCount <= currentSkip || previousItems.length >= limit) {
        return {
          items: previousItems,
          skip: newSkip,
          totalItems: newTotalItems,
        };
      }

      return {
        items: [
          ...previousItems,
          ...(await items({
            skip: positiveNumber(currentSkip),
            limit: limit - previousItems.length,
          })),
        ],
        skip: positiveNumber(newSkip),
        totalItems: newTotalItems,
      };
    },
    Promise.resolve({ items: [] as any[], skip, totalItems: 0 })
  );

  return {
    items,
    currentPage: Math.ceil(skip / limit) + 1,
    totalPages: Math.ceil(totalItems / limit),
    totalItems,
  };
};

export default paginate;
