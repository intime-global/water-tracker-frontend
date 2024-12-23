import { useDispatch, useSelector } from 'react-redux';
import { selectWaterIsLoading } from '../../redux/water/waterSelector.js';

import DailyNorma from '../../components/DailyNorma/DailyNorma';
// import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
// import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
// import AuthContainer from '../../components/AuthContainer/AuthContainer';
import Loader from '../../components/Loader/Loader';

import css from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { getWaterMonth, getWaterToday } from '../../redux/water/waterThunk.js';
import WaterRationPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';

const HomePage = () => {
  const dispatch = useDispatch();
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
  }, [dispatch, selectedMonth]);

  const isLoading = useSelector(selectWaterIsLoading);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className={css.background}>
        <div className={css.home}>
          <div className={css.bottleSection}>
            <DailyNorma />
            <WaterRationPanel selectedDate={selectedDate} />
            {/* <div>WaterRatioPanel</div> */}
          </div>

          <div className={css.statisticsSection}>
            {/* <TodayWaterList className={css.todayWaterList} /> */}
            <div className={css.todayWaterList}>TodayWaterList</div>
            <MonthStatsTable
              selectedDate={selectedMonth}
              setDate={setSelectedMonth}
              onDaySelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
