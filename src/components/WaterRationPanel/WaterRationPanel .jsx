const WaterRationPanel = ({ percentage, onAddWater }) => {
  return (
    <div className="">
      <h3>Today</h3>
      <div>
        <span>0%</span>
        <div>
          <div style={{ width: `${percentage}%` }}></div>
          <div style={{ left: `calc(${percentage}% - 10px)` }}>
            <span>{percentage}%</span>
          </div>
        </div>
        <span>100%</span>
      </div>
      <button onClick={onAddWater}>Add Woter</button>
    </div>
  );
};

export default WaterRationPanel;
