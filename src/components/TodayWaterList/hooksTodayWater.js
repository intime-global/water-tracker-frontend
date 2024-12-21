export const getConvertedTime = (time) => {
  const currentTime = new Date();
  const [hours, minutes] = time.split(':');
  currentTime.setHours(hours, minutes, 0);
  return currentTime;
};
