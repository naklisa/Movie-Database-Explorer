import React from "react";
import StarRating from "./StarRating";

/**
 * DataTable expects:
 * - data: array from OMDb search (each item has imdbID, Title, Year, Poster)
 * - onSelect(imdbID)
 * - onToggleFavorite(movie)
 * - favorites: array
 * - onToggleCompare(movie)
 * - compareList: array
 */
export default function DataTable({ data = [], onSelect, onToggleFavorite, favorites = [], onToggleCompare, compareList = [] }) {
  if (!data || data.length === 0) return <p>Tidak ada hasil.</p>;

  return (
    <div className="table" role="list">
      {data.map((movie) => {
        const isFav = favorites.some((f) => f.imdbID === movie.imdbID);
        const isCompare = compareList.some((c) => c.imdbID === movie.imdbID);
        return (
          <article className="card" key={movie.imdbID} role="listitem">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={`${movie.Title} poster`}
              onClick={() => onSelect(movie.imdbID)}
            />
            <div className="card-meta">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>

              {/* Rating: fetched lazily inside child StarRating */}
              <StarRating imdbID={movie.imdbID} />

              <div className="row" style={{marginTop:8}}>
                <button onClick={() => onSelect(movie.imdbID)}>Detail</button>
                <button className={isFav ? "remove" : ""} onClick={() => onToggleFavorite(movie)}>
                  {isFav ? "Remove" : "Fav"}
                </button>
                <label style={{display:'flex', alignItems:'center', gap:6}}>
                  <input type="checkbox" checked={isCompare} onChange={() => onToggleCompare(movie)} />
                  Compare
                </label>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
