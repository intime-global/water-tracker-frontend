const isoDate = new Date();
const date = isoDate.toISOString().split('T')[0];
console.log(date);
