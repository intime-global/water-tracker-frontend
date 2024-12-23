import { useDispatch, useSelector } from 'react-redux';
import {
  selectTodayWater,
  selectWaterRate,
} from '../../redux/water/waterSelector.js';
import DailyNorma from '../../components/DailyNorma/DailyNorma';
import { TodayList } from '../../components/TodayWaterList/TodayWaterList.jsx';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
import css from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { getWaterMonth, getWaterToday } from '../../redux/water/waterThunk.js';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';

const HomePage = () => {
  const dispatch = useDispatch();
  const todayWater = useSelector(selectTodayWater);
  const waterRate = useSelector(selectWaterRate);
  const initDay = new Date().getDate();
  const initMonth = new Date().getMonth();
  const initYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState({
    day: initDay,
    month: initMonth,
    year: initYear,
  });
  const [selectedMonth, setSelectedMonth] = useState({
    month: initMonth,
    year: initYear,
  });

  useEffect(() => {
    dispatch(getWaterToday(selectedDate));
  }, [dispatch, selectedDate]);

  useEffect(() => {
    dispatch(getWaterMonth(selectedMonth));
  }, [dispatch, selectedMonth, todayWater, waterRate]);

  return (
    <>
      <div className={css.background}>
        <div className={css.home}>
          <div className={css.bottleSection}>
            <DailyNorma />
            <WaterRatioPanel />
          </div>
          <div className={css.statisticsSection}>
            <TodayList />
            <MonthStatsTable
              selectedMonth={selectedMonth}
              setMonth={setSelectedMonth}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
