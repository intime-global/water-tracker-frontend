import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ date, dailyNorm, fulfillment, serviangs }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{date}</h2>
      <p className={styles.text}>
        Daily norma: <span>{dailyNorm} L</span>
      </p>
      <p className={styles.text}>
        Fulfillment of the daily norm: <span>{fulfillment}%</span>
      </p>
      <p className={styles.text}>
        How many serviangs of water: <span>{serviangs}</span>
      </p>
    </div>
  );
};

export default DaysGeneralStats;
