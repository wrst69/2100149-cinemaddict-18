export const generateFilteredFilms = (films) => {
  const filteredFilms = {
    watchlist: [],
    history: [],
    favorites: []
  };

  films.forEach((item) => {
    const { userDetails } = item;
    if (userDetails.watchlist) {
      filteredFilms.watchlist.push(item);
    }
    if (userDetails.alreadyWatched) {
      filteredFilms.history.push(item);
    }
    if (userDetails.favorites) {
      filteredFilms.favorites.push(item);
    }
  });

  return filteredFilms;
};
