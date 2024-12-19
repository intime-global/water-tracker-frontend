import Icons from '../../icons/sprite.svg';

export const Icon = ({ id, width, height }) => {
  return (
    <svg width={width} height={height}>
      <use href={Icons + id}></use>
    </svg>
  );
};
