import DailyNorma from '../../components/DailyNorma/DailyNorma';
// import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
// import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
// import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';

import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.background}>
      <div className={css.home}>
        <div className={css.bottleSection}>
          <DailyNorma />
          {/* <WaterRatioPanel /> */}
          <div>WaterRatioPanel</div>
        </div>

        <div className={css.statisticsSection}>
          {/* <TodayWaterList className={css.todayWaterList} /> */}
          <div className={css.todayWaterList}>TodayWaterList</div>
          {/* <MonthStatsTable /> */}
          <div>MonthStatsTable</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
