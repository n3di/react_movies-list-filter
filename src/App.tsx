import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

const movies: Movie[] = moviesFromServer;

export const App: React.FC = () => {
  const [query, setQuery] = useState('');

  // przygotowanie przefiltrowanej listy filmów
  const visibleMovies = movies.filter(movie => {
    const lowerQuery = query.toLowerCase();

    return (
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.description.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {visibleMovies.length > 0 ? (
          <MoviesList movies={visibleMovies} />
        ) : (
          <p>No movies found</p>
        )}
      </div>

      <div className="sidebar">Sidebar goes here</div>
    </div>
  );
};
