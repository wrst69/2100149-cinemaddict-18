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

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

const sortByRating = (filmA, filmB) => filmA.filmInfo.totalRating - filmB.filmInfo.totalRating;

export { getRandomInteger, humanizeDate, humanizeFilmRuntime, updateItem, sortByDate, sortByRating};
