import DailyNorma from '../../components/DialyNorma/DialyNorma';
// import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
// import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
// import MonthStatsTable from '../../components/MonthStatsTable/MonthStatsTable';
// import AuthContainer from '../../components/AuthContainer/AuthContainer';

import css from './HomePage.module.css';

const HomePage = () => {
  return (
   <>
      {/* Розмітка для перевірки */}
      <div className={css.home}>
        <div className={css.bottleSection}>
          <div className={css.dailyNorma}><DailyNorma/></div>
          <div className={css.bottle}></div>
          <div>WaterRatioPanel</div>
        </div>

        <div className={css.statisticsSection}>
          <div className={css.todayWaterList}>TodayWaterList</div>
          <div>MonthStatsTable</div>
        </div>
      </div>

      {/* <div className={css.home}>
        <div className={css.bottleSection}>
          <DailyNorma className={css.dialyNorma} />
          <div className={css.bottle}></div>
          <WaterRatioPanel />
        </div>

        <div className={css.statisticsSection}>
          <TodayWaterList className={css.todayWaterList} />
          <MonthStatsTable />
        </div>
      </div> */}
    </>
  );
};

export default HomePage;
