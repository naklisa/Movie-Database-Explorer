import React, { useState } from "react";
import StarRating from "./StarRating";

export default function DetailCard({ movie, onBack, onToggleFavorite, favorites = [] }) {
  if (!movie) return null;
  const isFav = favorites.some((f) => f.imdbID === movie.imdbID);
  const [cinematic, setCinematic] = useState(false);

  return (
    <>
      <article className={`detail ${cinematic ? 'cinematic' : ''}`} aria-live="polite">
        <div>
          <button className="back-btn" onClick={() => { if(cinematic) setCinematic(false); else onBack(); }}>
            {cinematic ? 'Close Cinematic' : '← Kembali'}
          </button>
          <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"} alt={movie.Title} />
        </div>
        <div>
          <h2>{movie.Title} ({movie.Year})</h2>
          <StarRating imdbID={movie.imdbID} />
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <div style={{marginTop:12, display:'flex', gap:8}}>
            <button onClick={() => onToggleFavorite(movie)}>{isFav ? "Remove from Favorites" : "Add to Favorites"}</button>
            <button onClick={() => setCinematic((c)=>!c)}>{cinematic ? "Exit Cinematic" : "Cinematic Mode"}</button>
          </div>
        </div>
      </article>

      {/* Cinematic overlay styling is handled in CSS (App.css) */}
      {cinematic && (
        <div className="cinematic-overlay" onClick={()=> setCinematic(false)}>
          <div className="cinematic-content" onClick={(e)=> e.stopPropagation()}>
            <img src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"} alt={movie.Title} />
            <div className="cinematic-info">
              <h2>{movie.Title} ({movie.Year})</h2>
              <p>{movie.Plot}</p>
              <StarRating imdbID={movie.imdbID} />
            </div>
            <button className="cinematic-close" onClick={()=> setCinematic(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
