import WaterConsumptionTracker from '../WaterConsumptionTracker/WaterConsumptionTracker';
import WhyDrinkWater from '../WhyDrinkWater/WhyDrinkWater';
import css from './Welcome.module.css';

const Welcome = () => {
  return (
    <div className={css.container}>
      <div className={css.containerWelcome}>
        <WaterConsumptionTracker />
        <WhyDrinkWater />
      </div>
    </div>
  );
};

export default Welcome;
