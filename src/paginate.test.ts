import { paginate } from "./paginate";
import { mockSources } from "./paginate.mocks";

describe("paginate", () => {
  it("should return the good pagination for 5 as limit", async () => {
    const basePaginationData = {
      totalPages: 2,
      totalItems: 8,
    };
    expect(await paginate({ sources: mockSources, skip: 0, limit: 5 })).toEqual(
      {
        ...basePaginationData,
        items: [1, 2, 3, 4, 5],
        currentPage: 1,
      }
    );
    expect(await paginate({ sources: mockSources, skip: 5, limit: 5 })).toEqual(
      {
        ...basePaginationData,
        items: [6, 7, 8],
        currentPage: 2,
      }
    );
  });

  it("should return good items for 2 as limit", async () => {
    const basePaginationData = {
      totalPages: 4,
      totalItems: 8,
    };
    expect(await paginate({ sources: mockSources, skip: 0, limit: 2 })).toEqual(
      {
        ...basePaginationData,
        items: [1, 2],
        currentPage: 1,
      }
    );
    expect(await paginate({ sources: mockSources, skip: 2, limit: 2 })).toEqual(
      {
        ...basePaginationData,
        items: [3, 4],
        currentPage: 2,
      }
    );
    expect(await paginate({ sources: mockSources, skip: 4, limit: 2 })).toEqual(
      {
        ...basePaginationData,
        items: [5, 6],
        currentPage: 3,
      }
    );
    expect(await paginate({ sources: mockSources, skip: 6, limit: 2 })).toEqual(
      {
        ...basePaginationData,
        items: [7, 8],
        currentPage: 4,
      }
    );
    expect(await paginate({ sources: mockSources, skip: 8, limit: 2 })).toEqual(
      {
        ...basePaginationData,
        items: [],
        currentPage: 5,
      }
    );
  });

  it("should not call items of the next pages", async () => {
    const sourceA = {
      count: () => Promise.resolve(2),
      items: jest.fn().mockResolvedValue([1, 2]),
    };
    const sourceB = {
      count: () => Promise.resolve(1),
      items: jest.fn().mockResolvedValue([1]),
    };
    await paginate({ sources: [sourceA, sourceB], skip: 0, limit: 2 });
    expect(sourceA.items).toHaveBeenCalled();
    expect(sourceB.items).not.toHaveBeenCalled();
  });
});
