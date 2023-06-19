import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: Sort;
  reverseSort: boolean;
}

const initialState: FilterSliceState = {
  searchValue: '',
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING,
  },
  reverseSort: false,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = Number(action.payload.currentPage);
      state.searchValue = action.payload.searchValue;
      state.reverseSort = action.payload.reverseSort;
    },
    setReverseSort(state, action: PayloadAction<boolean>) {
      state.reverseSort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const selectSort = (state: RootState) => state.filter;
// export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setReverseSort, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
