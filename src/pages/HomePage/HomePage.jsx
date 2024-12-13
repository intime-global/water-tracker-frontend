import DailyNorma from '../../components/WaterRatioPanel/WaterRatioPanel';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel';
import TodayWaterList from '../../components/TodayWaterList/TodayWaterList';
import MonthStatsTable from '../../components/Calendar/Month/Month';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.background}>
      <div className={css.content}>
        <DailyNorma className={css.dialyNorma} />
        <div className={css.bottleSection}>
          <div className={css.bottle}></div>
          <WaterRatioPanel />
        </div>

        <div className={css.statisticsSection}>
          <TodayWaterList className={css.todayWaterList} />
          <MonthStatsTable />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
