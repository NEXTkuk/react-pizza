import React from 'react';
import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

import { Categories, Sort, PizzaBlock, LoadingBlock, Pagination } from '../components';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, reverseSort, searchValue } = useSelector((state: any) => state.filter);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
    onChangePage(1);
  }, []);

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

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    // if (isMounted.current) {
    window.scrollTo(0, 0);
    getPizzas();
    // }

    // isMounted.current = true;
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
          <Sort sort={sort} reverseSort={reverseSort} />
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
        {searchValue || (pizzasItems.length < 4 && categoryId !== 0) ? (
          ''
        ) : (
          <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        )}
      </div>
    </>
  );
};

export default Home;
