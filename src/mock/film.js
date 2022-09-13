import { getRandomInteger } from '../utils.js';
import { nanoid } from 'nanoid';

const titles = [
  'Made For Each Other',
  'Sagebrush Trail',
  'Santa Claus Conquers The Martian',
  'The Dance of Life'
];

const posters = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.'
];

const getRandomValue = (items) => {
  const randomIndex = getRandomInteger(0, items.length - 1);
  return items[randomIndex];
};

export const generateFilm = () => ({
  id: nanoid(),
  comments: ['1', '2'],
  filmInfo: {
    title: getRandomValue(titles),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: 5.3,
    poster: `images/posters/${getRandomValue(posters)}`,
    ageRating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano'
    ],
    actors: [
      'Morgan Freeman'
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: 'Finland'
    },
    runtime: 77,
    genre: [
      'Comedy',
      'Mystic'
    ],
    description:  getRandomValue(descriptions)
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false
  }
});
