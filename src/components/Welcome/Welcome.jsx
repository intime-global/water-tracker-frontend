import WaterConsumptionTracker from '../WaterСonsumptionTracker/WaterConsumptionTracker';
import WhyDrinkWater from '../WhyDrinkWater/WhyDrinkWater';
import css from './Welcome.module.css';

const Welcome = () => {
  return (
    <div className={css.containerWelcome}>
      <WaterConsumptionTracker />
      <WhyDrinkWater />
    </div>
  );
};

export default Welcome;
