import Icons from '../../icons/sprite.svg';

export const Icon = ({ className, id, width, height }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={Icons + id}></use>
    </svg>
  );
};
