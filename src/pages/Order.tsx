import React from 'react';
import { Link } from 'react-router-dom';

import cartOrderImg from '../assets/img/delivery.png';

const Order: React.FC = () => (
  <div className='content'>
    <div className='cart cart--empty'>
      <h2>
        Заказ оформлен <span>👍</span>
      </h2>
      <p>Уже начинаем готовить, ожидайте курьера</p>
      <img src={cartOrderImg} alt='Order cart' />
      <Link to='/' className='button button--black'>
        <span>Вернуться назад</span>
      </Link>
    </div>
  </div>
);

export default Order;
