import ModalContainer from '../ModalContainer/ModalContainer.jsx';
import styles from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ day, onClose, position: { top, left } }) => {
  const { day: date, month, waterRate, percentage, consumedTimes } = day;
  console.log(top, left);
  return (
    <ModalContainer
      onClose={onClose}
      isTransparent={true}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <div
        className={styles.container}
        // style={{ top: `${top}px`, left: `${left}px` }}
      >
        <h2 className={styles.subtitle}>
          `{date}-{month}-2024`
        </h2>
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
    </ModalContainer>
  );
};

export default DaysGeneralStats;
