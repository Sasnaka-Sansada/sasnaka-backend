const calcCurrentTime = (offset) => {
  // create Date object for current location
  const d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // create new Date object for different city
  // using supplied offset
  const nd = new Date(utc + (3600000 * offset));

  // return time as a string
  return nd;
};

const calcLocalTime = (date, offset) => {
  // create Date object for current location
  const d = new Date(date);

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // create new Date object for different city
  // using supplied offset
  const nd = new Date(utc + (3600000 * offset));

  // return time as a string
  return nd;
};

module.exports = { calcCurrentTime, calcLocalTime };
