import { Search } from "../component/Search";
import { useState } from "react";
import type { Movie } from "../interface/movie";

export function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const stored = localStorage.getItem("favoris");
  const favoris = stored ? JSON.parse(stored) : [];

  console.log(stored);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMovies = (result: any) => {
    setMovies(result);
  };

  const handleFavoris = (result: Movie) => {
    const exists = favoris.some(
      (movie: Movie) => movie.imdbID === result.imdbID
    );

    if (!exists) {
      // Ajouter seulement s'il n'existe pas
      favoris.push(result);
      localStorage.setItem("favoris", JSON.stringify(favoris));
    } else {
      console.log("Le film est déjà dans les favoris !");
    }

    localStorage.setItem("favoris", JSON.stringify([result]));
  };

  return (
    <>
      <div>
        <h1>Recherche de films</h1>
        <Search onResult={handleMovies} />
        <h2>Résultats :</h2>
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
              <a href={movie.Poster} target="_blank" rel="noopener noreferrer">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{ width: "150px", borderRadius: "4px" }}
                />
              </a>
              <p>{movie.Year}</p>
              <button
                onClick={(e) => {
                  e.preventDefault(); // si c'est dans un <form>
                  handleFavoris(movie);
                }}
              >
                Ajouter aux favoris
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
