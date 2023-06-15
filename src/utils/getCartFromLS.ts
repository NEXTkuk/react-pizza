import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  try {
    const currentDomain: string = window.location.pathname;
    const LsDomain = localStorage.getItem('domain');

    if (currentDomain !== LsDomain) {
      localStorage.clear();
      localStorage.setItem('domain', currentDomain);
    }
  } catch {
    console.log('Ошибка с LS');
  }

  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
