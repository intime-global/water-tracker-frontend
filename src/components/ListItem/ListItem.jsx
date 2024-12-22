import { Icon } from '../Icon/Icon.jsx';
import css from './ListItem.module.css';

export const ListItem = ({ data: { waterVolume, time } }) => {
  const convertedTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };
  return (
    <div className={css.item_container}>
      <Icon
        className={css.icon_glass}
        id={'#icon-water-glass'}
        width={24}
        height={24}
      />
      <div className={css.water_amount}>{waterVolume} ml</div>
      <div className={css.water_time}>{convertedTime(time)}</div>
    </div>
  );
};
