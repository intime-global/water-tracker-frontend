import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ day, rect, month }) => {
  const { day: date, waterRate, percentage, consumedTimes } = day;
  let rowRect;
  switch (Math.ceil(rect)) {
    case 829:
      rowRect = -200;
      break;
    case 899:
      rowRect = -130;
      break;
    case 969:
      rowRect = -60;
      break;
    case 1039:
      rowRect = 10;
      break;
    case 1109:
      rowRect = 80;
      break;
    case 1179:
      rowRect = 150;
      break;
    case 1249:
      rowRect = 220;
      break;
    default:
      rowRect = -200;
  }

  return (
    <div className={styles.container} style={{ top: rowRect }}>
      <h2 className={styles.subtitle}>{`${date}, ${month}`}</h2>
      <p className={styles.text}>
        Daily norma: <span>{waterRate} L</span>
      </p>
      <p className={styles.text}>
        Fulfillment of the daily norm: <span>{percentage}%</span>
      </p>
      <p className={styles.text}>
        How many serviangs of water: <span>{consumedTimes}</span>
      </p>
    </div>
  );
};

export default DaysGeneralStats;
