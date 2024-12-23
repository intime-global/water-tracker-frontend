import { useEffect, useRef, useState } from 'react';
import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ day, rect, month, listLeft }) => {
  const { day: date, waterRate, percentage, consumedTimes } = day;
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const { height } = containerRef.current.getBoundingClientRect();
      setContainerHeight(height);
    }
  }, []);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      style={{
        top: rect - containerHeight - 5,
        left: listLeft - 8,
      }}
    >
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
