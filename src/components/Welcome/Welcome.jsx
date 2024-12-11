import WaterConsumptionTracker from '../WaterСonsumptionTracker/WaterConsumptionTracker';
import WhyDrinkWater from '../WhyDrinkWater/WhyDrinkWater';

const WelcomePage = () => {
  return (
    <div>
      <div>
        <WaterConsumptionTracker />
      </div>
      <div>
        <WhyDrinkWater />
      </div>
    </div>
  );
};

export default WelcomePage;
