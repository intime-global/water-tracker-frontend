import css from './WhyDrinkWater.module.css';

const WhyDrinkWater = () => {
  return (
    <div className={css.reasons}>
      <h3 className={css.title3}>Why drink water</h3>
      <ul className={css.reasonsList}>
        <li className={css.listItem}>
          <p className={css.listText}>Supply of nutrients to all organs</p>
        </li>
        <li className={css.listItem}>
          <p className={css.listText}>Providing oxygen to the lungs</p>
        </li>
        <li className={css.listItem}>
          <p className={css.listText}>Maintaining the work of the heart</p>
        </li>
        <li className={css.listItem}>
          <p className={css.listText}>Release of processed substances</p>
        </li>
        <li className={css.listItem}>
          <p className={css.listText}>
            Ensuring the stability of the internal environment
          </p>
        </li>
        <li className={css.listItem}>
          <p className={css.listText}>
            Maintaining within the normal temperature
          </p>
        </li>
        <li className={css.listItem}>
          <p className={css.listText}>
            Maintaining an immune system capable of resisting disease
          </p>
        </li>
      </ul>
    </div>
  );
};

export default WhyDrinkWater;
