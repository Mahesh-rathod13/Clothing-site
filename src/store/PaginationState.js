import { hookstate, useHookstate} from '@hookstate/core';

const PagintationState= hookstate({
    pageIndex: localStorage.getItem('pageIndex') ? parseInt(localStorage.getItem('pageIndex')) :  0,
    pageSize: 10,
    totalCount: 0,
});

export const usePaginationState = () => {
    const state = useHookstate(PagintationState);

    return{
        getState: () => state.get(),
        setPageIndex: (index) => {
            console.log('Setting page index to:', index.getIte);
            state.pageIndex.set(index);
            localStorage.setItem('pageIndex', index);
        },
        setPageSize: (size) => {
            state.pageSize.set(size);
            localStorage.setItem('pageSize', size);
        },
        setTotalCount: (count) => {
            state.totalCount.set(count);
        },
    }
}


//Create Protected Routes (Add to cart)
//Server side pagination and filtering (persist with session)
//Whenever loading a new page or api add loader.
//Hook State for state management