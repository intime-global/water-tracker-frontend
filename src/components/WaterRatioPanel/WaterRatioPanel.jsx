import { useSelector } from 'react-redux';
import {
  selectTodayWater,
  selectWaterRate,
} from '../../redux/water/waterSelector';
import { useState } from 'react';
import TodayListModal from '../TodayListModal/TodayListModal';
import { format } from 'date-fns';
import SpriteSvg from '../../icons/sprite.svg';
import css from './WaterRatioPanel.module.css';

const WaterRationPanel = ({ selectedDate }) => {
  const waterToday = useSelector(selectTodayWater);
  const waterRate = useSelector(selectWaterRate);

  const totalAmount = waterToday.reduce(
    (acc, curr) => acc + curr.waterVolume,
    0,
  );
  const percentage = (totalAmount / waterRate) * 100;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialAmount, setInitialAmount] = useState(0);
  const [initialTime, setInitalTime] = useState('');

  const openModal = () => {
    const now = new Date();
    const formatTime = format(now, 'HH:mm');
    setInitialAmount(0);
    setInitalTime(formatTime);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.panel}>
      <div className={css.info}>
        <div className={css.titleWrap}>
          <h3 className={css.title}>
            {selectedDate ? `Day ${selectedDate.day}` : 'Today'}
          </h3>
        </div>
        <div className={css.progressWrapper}>
          <div className={css.progressBar}>
            <div
              className={css.filled}
              style={{ width: `${percentage}%` }}
            ></div>
            <div
              className={css.indicator}
              style={{ left: `calc(${percentage}% - 6px)` }}
            >
              <span className={css.indicatorText}>{percentage}%</span>
            </div>
            <div className={css.ticks}>
              <div className={css.tick} style={{ left: '0%' }}></div>
              <div className={css.tick} style={{ left: '50%' }}></div>
              <div className={css.tick} style={{ left: '100%' }}></div>
            </div>
          </div>
          <div className={css.percentages}>
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
      <div className={css.btn}>
        <button className={css.addButton} onClick={openModal}>
          <svg className={css.icon} width="24" height="24">
            <use href={SpriteSvg + '#icon-plus-circle'} />
          </svg>
          Add Water
        </button>
      </div>
      {isModalOpen && (
        <TodayListModal
          isOpen={isModalOpen}
          onClose={closeModal}
          isEditing={false}
          initialAmount={initialAmount}
          initialTime={initialTime}
        />
      )}
    </div>
  );
};

export default WaterRationPanel;

// "yyyy-MM-dd'T'HH:mm:ss";
