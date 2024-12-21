import sprite from '../../icons/sprite.svg';
import css from './ListItem.module.css';

export const ListItem = ({ data: { waterVolume, time } }) => {
  const convertedTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };
  return (
    <div className={css.item_container}>
      <svg>
        <use href={`${sprite}#icon-glass`} width={24} height={24}></use>
      </svg>
      <p className={css.water_amount}>{waterVolume} ml</p>
      <p className={css.water_time}>{convertedTime(time)}</p>
    </div>
  );
};
