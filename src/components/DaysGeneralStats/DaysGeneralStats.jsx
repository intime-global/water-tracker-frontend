import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ day, rect, month }) => {
  const { day: date, waterRate, percentage, consumedTimes } = day;
  let rowRect;
  switch (Math.ceil(rect)) {
    case 583:
      rowRect = -200;
      break;
    case 653:
      rowRect = -130;
      break;
    case 723:
      rowRect = -60;
      break;
    case 793:
      rowRect = 10;
      break;
    case 863:
      rowRect = 80;
      break;
    case 933:
      rowRect = 150;
      break;
    case 1003:
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
        How many servings of water: <span>{consumedTimes}</span>
      </p>
    </div>
  );
};

export default DaysGeneralStats;
