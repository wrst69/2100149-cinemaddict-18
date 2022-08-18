import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeDate = (date, format) => dayjs(date).format(format);

const humanizeFilmRuntime = (minutes) => {
  const hourDuration = 60;
  let filmRuntime = `${minutes}m`;

  if (minutes >= hourDuration) {
    const hours = Math.trunc(minutes / hourDuration);
    minutes = minutes % hourDuration;
    filmRuntime = `${hours}h ${minutes}m`;
  }

  return filmRuntime;
};

export { getRandomInteger, humanizeDate, humanizeFilmRuntime };
