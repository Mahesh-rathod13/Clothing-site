import { createState} from '@hookstate/core';

export const store = createState({
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    setPageIndex: (index) => {
        store.pageIndex.set(index);
    },
    setPageSize: (size) => {
        store.pageSize.set(size);
    },
});