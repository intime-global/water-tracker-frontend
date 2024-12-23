import { Icon } from '../Icon/Icon.jsx';
import { transformTimeToHHMM } from '../../services/hooks.js';
import css from './ListItem.module.css';

export const ListItem = ({ data: { waterVolume, time } }) => {
  function isValidTime(time) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:mm format
    return timeRegex.test(time);
  }
  if (!isValidTime(time)) {
    time = transformTimeToHHMM(time);
  }
  return (
    <div className={css.item_container}>
      <Icon
        className={css.icon_glass}
        id={'#icon-water-glass'}
        width={24}
        height={24}
      />
      <div className={css.water_amount}>{waterVolume} ml</div>
      <div className={css.water_time}>{time}</div>
    </div>
  );
};
