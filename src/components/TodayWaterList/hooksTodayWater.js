

const getConvertedTime = date => {
  const currentTime = new Date();
  const [hours, minutes] = date.split(':');
  currentTime.setHours(hours, minutes, 0);
  return currentTime;
};
