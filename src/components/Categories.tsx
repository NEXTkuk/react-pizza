import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (id: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Микс'];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
