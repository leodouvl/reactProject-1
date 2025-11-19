import { Search } from "../component/Search";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Movie } from "../interface/movie";
import { tools } from "../proxy/tools";

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const stored = localStorage.getItem("favoris");
  const favoris = stored ? JSON.parse(stored) : [];
  const navigate = useNavigate();

  const [fewMovies, setFewMovies] = useState<Movie[]>([]);

  const getMovie = async () => {
    const result = await tools(
      `https://www.omdbapi.com/?apikey=eb198056&s=avengers&y=2025&page=1`
    );

    if (result?.Search) {
      setFewMovies(result.Search);
    } else {
      setMovies([]);
    }
  };

  const handleDetail = (movie: Movie) => {
    navigate(`/movie-info/${movie.imdbID}`);
  };

  useEffect(() => {
    getMovie();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMovies = (result: any) => {
    setMovies(result);
  };

  const handleFavoris = (result: Movie) => {
    const exists = favoris.some(
      (movie: Movie) => movie.imdbID === result.imdbID
    );

    if (!exists) {
      favoris.push(result);
      console.log(favoris);
      localStorage.setItem("favoris", JSON.stringify(favoris));
    } else {
      console.log("Le film est déjà dans les favoris !");
    }
  };

  return (
    <>
      <div>
        <h1>Recherche de films</h1>
        <Search onResult={handleMovies} />
        {!movies && <p>Aucun film trouvé.</p>}
        {movies && movies.length > 0 ? (
          <>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {movies.map((movie: Movie) => (
                <li
                  key={movie.imdbID}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    margin: "10px",
                    padding: "10px",
                    width: "180px",
                    textAlign: "center",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3 style={{ fontSize: "16px" }}>{movie.Title}</h3>
                  <a
                    href={movie.Poster}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      style={{ width: "150px", borderRadius: "4px" }}
                    />
                  </a>
                  <p>{movie.Year}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavoris(movie);
                    }}
                  >
                    Ajouter aux favoris
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3>Suggestion</h3>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {fewMovies?.map((movie: Movie) => (
                <li
                  key={movie?.imdbID}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    margin: "10px",
                    padding: "10px",
                    width: "180px",
                    textAlign: "center",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3 style={{ fontSize: "16px" }}>{movie?.Title}</h3>
                  <a
                    href={movie?.Poster}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={movie?.Poster}
                      alt={movie?.Title}
                      style={{ width: "150px", borderRadius: "4px" }}
                    />
                  </a>
                  <p>{movie?.Year}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavoris(movie);
                    }}
                  >
                    Ajouter aux favoris
                  </button>
                  <button onClick={() => handleDetail(movie)}>Detail</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
