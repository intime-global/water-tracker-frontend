import sprite from '../../icons/sprite.svg';
import css from './ListItem.module.css';

export const ListItem = ({ data: { amount, time } }) => {
  return (
    <div className={css.item_container}>
      <svg>
        <use href={`${sprite}#icon-glass`}></use>
      </svg>
      <p className={css.water_amount}>{amount} ml</p>
      <p className={css.water_time}>{time} AM</p>
    </div>
  );
};
