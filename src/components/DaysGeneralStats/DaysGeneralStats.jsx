import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ day, rect, month }) => {
  console.log(rect);
  const { day: date, waterRate, percentage, consumedTimes } = day;
  let rowRect;
  switch (Math.ceil(rect)) {
    case 1037:
      rowRect = -200;
      break;
    case 1107:
      rowRect = -130;
      break;
    case 1177:
      rowRect = -60;
      break;
    case 1247:
      rowRect = 10;
      break;
    case 1317:
      rowRect = 80;
      break;
    case 1387:
      rowRect = 150;
      break;
    case 1457:
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
