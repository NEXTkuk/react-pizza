import pizzas from '../assets/db.json';

const Test = () => {
  pizzas.map((obj) => console.log(obj));

  return pizzas;
};

export default Test;
