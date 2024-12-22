import { useCallback, useEffect, useRef, useState } from 'react';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';
import css from './DayWaterItem.module.css';
import clsx from 'clsx';

export default function DayWaterItem({ day, month }) {
  const [isClicked, setIsClicked] = useState(false);
  const [rect, setRect] = useState(0);
  const daysForReversedStat = [1, 2, 3, 4, 11, 12, 13, 14, 21, 22, 23, 24, 31];
  const rowRect = useRef(null);

  const openModal = () => {
    if (rowRect.current) {
      const rect = rowRect.current.getBoundingClientRect();
      setRect(rect.top + window.scrollY);
    }
    setIsClicked(true);
  };

  const closeModal = useCallback(() => {
    setIsClicked(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isClicked &&
        rowRect.current &&
        !rowRect.current.contains(event.target)
      ) {
        closeModal();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isClicked, closeModal]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const clsxDay = clsx(
    css.day,
    day.percentage < 100 && css.border,
    day.noData && css.empty,
  );

  return (
    <>
      <div className={clsxDay} onClick={() => openModal()} ref={rowRect}>
        {day.day}
        {isClicked && (
          <div
            className={
              daysForReversedStat.includes(Number(day.day))
                ? css.dayReversedComponent
                : css.dayComponent
            }
          >
            {!day.noData && (
              <DaysGeneralStats day={day} rect={rect} month={month} />
            )}
          </div>
        )}
      </div>
      <p className={css.percentage}>{day.percentage}</p>
    </>
  );
}
