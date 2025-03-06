import './App.scss';
import { Component } from 'react';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    const { query } = this.state;

    const visibleMovies = moviesFromServer.filter(movie => {
      const normalizedQuery = query.trim().toLowerCase();

      return (
        movie.title.toLowerCase().includes(normalizedQuery) ||
        movie.description.toLowerCase().includes(normalizedQuery)
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
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>

          <MoviesList movies={visibleMovies} />
        </div>

        <div className="sidebar">Sidebar goes here</div>
      </div>
    );
  }
}
