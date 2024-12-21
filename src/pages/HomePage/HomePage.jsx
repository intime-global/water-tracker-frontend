// import DailyNorma from '../../components/DailyNorma/DailyNorma';
// import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
// import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import { useSelector } from 'react-redux';
import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
// import AuthContainer from '../../components/AuthContainer/AuthContainer';

import css from './HomePage.module.css';
import { selectIsLoading } from '../../redux/user/selectors.js';
import { selectMonthWater } from '../../redux/Water/waterSelector.js';

const HomePage = () => {
  // const water = useSelector(selectMonthWater);
  // console.log(water, 'water');
  return (
    <>
      {/* Розмітка для перевірки */}
      <div className={css.background}>
        <div className={css.home}>
          <div className={css.bottleSection}>
            <DailyNorma className={css.dailyNorma} />
            <div className={css.bottle}></div>
            <div>WaterRatioPanel</div>
          </div>

          <div className={css.statisticsSection}>
            <div className={css.todayWaterList}>TodayWaterList</div>
            <div>MonthStatsTable</div>
          </div>
        </div>
      </div>
      {/*
      <div className={css.background}>
      <div className={css.home}>
        <div className={css.bottleSection}>
          <DailyNorma className={css.dailyNorma} />
          <div className={css.bottle}></div>
          <WaterRatioPanel />
        </div> */}

        <div className={css.statisticsSection}>
          {/* <TodayWaterList className={css.todayWaterList} /> */}
          <MonthStatsTable />
        </div>
      </div>
      </div>*/}
    </>
  );
};

export default HomePage;
