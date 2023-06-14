import React from 'react';
// import qs from 'qs';
// import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchPizzaParams, fetchPizzas } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  // ПЕРЕДАЛАТЬ НА SELECT  PIZZA DATA 21 ВИДОС ?
  const { items, status } = useSelector((state: any) => state.pizza);
  const { categoryId, sort, currentPage, reverseSort, searchValue } = useSelector((state: any) => state.filter);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  // Запрос на получения пицц
  const getPizzas = async () => {
    const search = searchValue ? `&title_like=${searchValue}` : '';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = `&_sort=${sort.sortProperty}`;
    const order = reverseSort ? '&_order=desc' : '&_order=asc';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );
  };

  // Если первого рендер был и параметры изменились, то вшиваем URL
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     // navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер то проверяем URL параметры и сохраняем в Redux
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || list[0],
  //         // ...params,
  //         // sort,
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
    // isSearch.current = false;
  }, [categoryId, sort.sortProperty, reverseSort, currentPage, searchValue]);

  const pizzasItems = items
    .filter((obj: any) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj: any) => (status === 'loading' ? <LoadingBlock /> : <PizzaBlock key={obj.id} {...obj} />));

  const skeletons = [...new Array(4)].map((_, index) => <LoadingBlock key={index} />);

  return (
    <>
      <div className='content'>
        <div className='content__top'>
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        {status === 'error' ? (
          <div className='content__error-info'>
            <h2>Произошла ошибка 😕</h2>
            <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже</p>
          </div>
        ) : (
          <div className='content__items'>{status === 'loading' ? skeletons : pizzasItems}</div>
        )}
        {searchValue ? '' : <Pagination currentPage={currentPage} onChangePage={onChangePage} />}
      </div>
    </>
  );
};

export default Home;
