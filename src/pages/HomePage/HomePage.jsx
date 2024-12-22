import { useDispatch, useSelector } from 'react-redux';
import { selectWaterIsLoading } from '../../redux/water/waterSelector.js';

import DailyNorma from '../../components/DailyNorma/DailyNorma';
// import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';

import { TodayList } from '../../components/TodayWaterList/TodayWaterList.jsx';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';

import Loader from '../../components/Loader/Loader';

import css from './HomePage.module.css';

import { useEffect, useState } from 'react';
import { getWaterMonth } from '../../redux/water/waterThunk.js';

const HomePage = () => {
  const dispatch = useDispatch();
  const initMonth = new Date().getMonth();
  const initYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState({
    month: initMonth,
    year: initYear,
  });

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
            {/* <WaterRatioPanel /> */}
            <div>WaterRatioPanel</div>
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
