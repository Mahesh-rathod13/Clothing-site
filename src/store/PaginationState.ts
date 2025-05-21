import { hookstate, useHookstate} from '@hookstate/core';


const storedPageIndex = localStorage.getItem('pageIndex');
const PagintationState = hookstate({
    pageIndex: storedPageIndex !== null ? parseInt(storedPageIndex) : 0,
    pageSize: 10,
    totalCount: 0,
});

export const usePaginationState = () => {
    const state = useHookstate(PagintationState);

    return{
        getState: () => state.get(),
        setPageIndex: (index : number) => {
            state.pageIndex.set(index);
            localStorage.setItem('pageIndex', String(index));
        },
        setPageSize: (size : number) => {
            state.pageSize.set(size);
            localStorage.setItem('pageSize', String(size));
        },
        setTotalCount: (count : number) => {
            state.totalCount.set(count);
        },
    }
}


//Create Protected Routes (Add to cart)       //Done
//Server side pagination and filtering (persist with session)  //Done
//Whenever loading a new page or api add loader. //Done
//Hook State for state management       //Done