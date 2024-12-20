import { useSelector, useDispatch } from 'react-redux';
import { selectMonthWater } from '../../redux/Water/waterSelector.js';
import css from './MonthStatsTable.module.css';
import DayWaterItem from '../DayWaterItem/DayWaterItem.jsx';
import sprite from '../../icons/sprite.svg';
import { getWaterMonth } from '../../redux/Water/waterThunk.js';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader.jsx';

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
const water = [
  {
    day: 1,
    month: 12,
    year: 2024,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 100,
  },
  {
    day: 2,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 110,
  },
  {
    day: 3,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 4,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 5,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 6,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },

  {
    day: 7,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 110,
  },
  {
    day: 8,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 9,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 10,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 11,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },

  {
    day: 12,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 13,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 14,
    month: 12,
    year: 2024,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 100,
  },
  {
    day: 15,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 110,
  },
  {
    day: 16,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 17,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 18,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 19,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },

  {
    day: 20,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 110,
  },
  {
    day: 21,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 22,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 23,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 24,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },

  {
    day: 25,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
  {
    day: 26,
    month: 12,
    waterVolume: 900,
    waterRate: 1500,
    consumedTimes: 5,
    percentage: 60,
  },
];

export default function MonthStatsTable() {
  // const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  // const water = useSelector(selectMonthWater);

  // useEffect(() => {
  //   if (water) {
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //   }
  // }, [water]);

  // useEffect(() => {
  //   dispatch(
  //     getWaterMonth({
  //       month: new Date().getMonth() + 1,
  //       year: new Date().getFullYear(),
  //     }),
  //   );
  // }, [dispatch]);

  // let month = water[0].month;
  // let year = water[0].year;

  // useEffect(() => {
  //   dispatch(getWaterMonth({ month, year }));
  // }, [dispatch, month, year]);

  function setPrevMonth() {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }

  function setNextMonth() {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }

  // if (loading) {
  //   return <Loader />;
  // }

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
          <p className={css.date}>
            {months[month - 1]}, {year}
          </p>
          <button
            className={css.btnNext}
            onClick={() => {
              setNextMonth();
            }}
          >
            <svg className={css.iconNext} width={14} height={14}>
              <use href={`${sprite}#icon-chevron-left`} />
            </svg>
          </button>
        </div>
      </div>
      <ul className={css.list}>
        {water.map((item, index) => (
          <li className={css.item} key={index}>
            <DayWaterItem day={item} month={months[month - 1]} />
          </li>
        ))}
      </ul>
    </>
  );
}
