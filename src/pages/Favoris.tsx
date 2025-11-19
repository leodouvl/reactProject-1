import type { Movie } from "../interface/movie";
import { useState } from "react";

export function Favoris() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const stored = localStorage.getItem("favoris");
  const favoris = stored ? JSON.parse(stored) : [];
  console.log(favoris);

  const handleRemoveFavoris = (result: Movie) => {
    const newFavoris = favoris.filter(
      (movie: Movie) => movie.imdbID !== result.imdbID
    );

    // Réécriture dans localStorage
    localStorage.setItem("favoris", JSON.stringify(newFavoris));
    setMovies(newFavoris);
    console.log(movies);
  };

  return (
    <>
      <div>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {favoris.map((movie: Movie) => (
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
                  handleRemoveFavoris(movie);
                }}
              >
                Supprimer des favoris
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
