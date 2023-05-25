import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import pizzas from '../assets/db.json';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const [isReverseSort, setIsReverseSort] = React.useState(false);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));

  //     // const sorter = list.find((obj) => obj.sortProperty === params.sortProperty);

  //     dispatch(
  //       setFilters({
  //         ...params,
  //       })
  //     );
  //   }
  // }, []);

  React.useEffect(() => {
    setIsLoading(true);

    // Костыль под осуждением
    const getPage = () => {
      if (currentPage === 1) {
        return pizzas.slice(0, 4);
      }
      if (currentPage === 2) {
        return pizzas.slice(4, 8);
      }
      if (currentPage === 3) {
        return pizzas.slice(8, 10);
      }
      return pizzas;
    };

    const pizzaPage = getPage();

    const filteredItems = pizzaPage.filter((item) => (categoryId > 0 ? item.category === categoryId : item));

    filteredItems.sort(function (a, b) {
      // По популярности
      if (sort.sortProperty === 'rating') {
        if (isReverseSort) {
          return b.rating - a.rating;
        }
        return a.rating - b.rating;
      }

      // По цене
      if (sort.sortProperty === 'price') {
        if (isReverseSort) {
          return b.price - a.price;
        }
        return a.price - b.price;
      }

      // По Алфавиту
      if (sort.sortProperty === 'title') {
        if (isReverseSort) {
          return b.title - a.title;
        }
        return a.title - b.title;
      }
      return 0;
    });
    // console.log(afterSort);

    // Замена fetch API
    // Фикс поиска
    if (searchValue) {
      setItems(pizzas);
    } else {
      setItems(filteredItems);
    }
    setIsLoading(false);

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, isReverseSort, currentPage, searchValue]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzasItems = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => (isLoading ? <LoadingBlock /> : <PizzaBlock key={obj.id} {...obj} />));
  const skeletons = [...new Array(6)].map((_, index) => <LoadingBlock key={index} />);

  return (
    <>
      <div className='content'>
        <div className='content__top'>
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort isReverseSort={isReverseSort} onClickReverse={(i) => setIsReverseSort(i)} />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items'>{isLoading ? skeletons : pizzasItems}</div>

        {searchValue ? '' : <Pagination currentPage={currentPage} onChangePage={onChangePage} />}
      </div>
    </>
  );
};

export default Home;
