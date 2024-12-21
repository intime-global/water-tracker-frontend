import { useEffect, useRef, useState } from 'react';
import DaysGeneralStats2 from '../DaysGeneralStats/DaysGeneralStats2.jsx';
import css from './DayWaterItem.module.css';
import clsx from 'clsx';

export default function DayWaterItem({ day }) {
  const [isClicked, setIsClicked] = useState(false);
  const [rowPosition, setRowPosition] = useState({});
  const daysForReversedStat = [1, 2, 3, 4, 11, 12, 13, 14, 21, 22, 23, 24, 31];
  const closeModal = () => {
    setIsClicked(false);
  };
  const dayRow = useRef(null);
  const openModal = () => {
    if (dayRow.current) {
      const rect = dayRow.current.getBoundingClientRect();
      setRowPosition({
        top: rect.top + rect.height + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setIsClicked(true);
  };

  return (
    <>
      <div
        className={day.percentage < 100 ? clsx(css.day, css.border) : css.day}
        onClick={() => openModal()}
        ref={dayRow}
      >
        {day.day}
        {isClicked && (
          <DaysGeneralStats2
            day={day}
            position={rowPosition}
            onClose={closeModal}
          />
        )}
      </div>
      <p className={css.percentage}>{day.percentage}</p>
    </>
  );
}
