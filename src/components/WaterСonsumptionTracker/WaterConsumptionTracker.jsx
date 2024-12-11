import { useNavigate } from 'react-router-dom';

const WaterConsumptionTracker = () => {
  const navigate = useNavigate();

  const handleTryTrackerClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h1>Water consumption tracker</h1>
      <h2>Record daily water intake and track</h2>
      <h3>Tracker Benefits</h3>
      <ul>
        <li>Habit drive</li>
        <li>View statistics</li>
        <li>Personal rate setting</li>
      </ul>
      <div onClick={handleTryTrackerClick}>Try tracker</div>
    </div>
  );
};

export default WaterConsumptionTracker;
