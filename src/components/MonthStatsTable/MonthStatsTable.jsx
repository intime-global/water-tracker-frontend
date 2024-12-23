import { useSelector } from 'react-redux';
import { selectMonthWater } from '../../redux/water/waterSelector.js';
import css from './MonthStatsTable.module.css';
import DayWaterItem from '../DayWaterItem/DayWaterItem.jsx';
import sprite from '../../icons/sprite.svg';
import clsx from 'clsx';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function MonthStatsTable({ selectedMonth, setMonth }) {
  const water = useSelector(selectMonthWater);
  const daysOfMonth = [];
  const initMonth = new Date().getMonth();
  const initYear = new Date().getFullYear();

  const disabled =
    selectedMonth.month === initMonth && selectedMonth.year === initYear
      ? true
      : false;

  function setPrevMonth() {
    if (selectedMonth.month === 0) {
      setMonth({
        month: 11,
        year: selectedMonth.year - 1,
      });
    } else {
      setMonth({
        month: selectedMonth.month - 1,
        year: selectedMonth.year,
      });
    }
  }

  function setNextMonth() {
    if (selectedMonth.month === 11) {
      setMonth({
        month: 0,
        year: selectedMonth.year + 1,
      });
    } else {
      setMonth({
        month: selectedMonth.month + 1,
        year: selectedMonth.year,
      });
    }
  }

  function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  const numberOfDays = getDaysInMonth(
    selectedMonth.month + 1,
    selectedMonth.year,
  );

  for (let i = 0; i < water.length; i++) {
    if (water[i]) daysOfMonth[water[i].day - 1] = water[i];
  }

  for (let i = 0; i < numberOfDays; i++) {
    if (!daysOfMonth[i]) {
      daysOfMonth[i] = {
        day: i + 1,
        month: selectedMonth.month,
        year: selectedMonth.year,
        noData: true,
      };
    }
  }

  return (
    <>
      <div className={css.titleContainer}>
        <h2 className={css.title}>Month</h2>
        <div className={css.paginator}>
          <button className={css.btnPrev} onClick={setPrevMonth}>
            <svg className={css.iconPrev} width={14} height={14}>
              <use href={`${sprite}#icon-chevron-left`} />
            </svg>
          </button>
          <p className={css.date}>{`${months[selectedMonth.month]}, ${
            selectedMonth.year
          }`}</p>
          <button
            className={css.btnNext}
            disabled={disabled}
            onClick={() => {
              setNextMonth();
            }}
          >
            <svg
              className={clsx(css.iconNext, disabled && css.hiddenBtn)}
              width={14}
              height={14}
            >
              <use href={`${sprite}#icon-chevron-left`} />
            </svg>
          </button>
        </div>
      </div>
      <ul className={css.list}>
        {daysOfMonth.map((item, index) => (
          <li className={css.item} key={index}>
            <DayWaterItem day={item} month={months[selectedMonth.month]} />
          </li>
        ))}
      </ul>
    </>
  );
}
