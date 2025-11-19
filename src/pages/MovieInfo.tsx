import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tools } from "../proxy/tools";
import type { Movie } from "../interface/movie";

export function MovieInfo() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    async function fetchMovie() {
      setLoading(true);
      setError(null);

      try {
        const result = await tools(
          `http://omdbapi.com/?apikey=eb198056&i=${id}`
        );
        if (result.Response === "False") {
          setError(result.Error || "Film introuvable");
        } else {
          setMovie(result);
        }
      } catch (err) {
        setError("Erreur lors du chargement du film");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Film introuvable.</p>;

  return (
    <div
      style={{
        maxWidth: "500px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "16px",
          padding: "8px 12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          backgroundColor: "black",
          cursor: "pointer",
        }}
      >
        ← Retour
      </button>

      <img
        src={movie.Poster}
        alt={`${movie.Title} Poster`}
        style={{
          width: "100%",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      />

      <h1 style={{ margin: "0 0 10px 0" }}>{movie.Title}</h1>

      <p style={{ margin: "4px 0" }}>
        <strong>Type :</strong> {movie.Type}
      </p>

      <p style={{ margin: "4px 0" }}>
        <strong>Année :</strong> {movie.Year}
      </p>

      <p style={{ margin: "4px 0" }}>
        <strong>IMDB :</strong> {movie.imdbID}
      </p>
    </div>
  );
}
