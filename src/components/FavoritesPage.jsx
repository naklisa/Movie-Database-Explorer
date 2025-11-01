import React from "react";
import StarRating from "./StarRating";

export default function FavoritesPage({ favorites = [], onRemove, onSelect, onCompare, compareList=[] }) {
  if (!favorites || favorites.length === 0) return <p>No favorites yet.</p>;
  return (
    <section>
      <h2>Your Favorites</h2>
      <div className="fav-grid">
        {favorites.map(f => {
          const isCompare = compareList.some(c => c.imdbID === f.imdbID);
          return (
            <div className="card" key={f.imdbID}>
              <img src={f.Poster !== "N/A" ? f.Poster : "/placeholder.png"} alt={f.Title} onClick={()=> onSelect(f.imdbID)} />
              <div className="card-meta">
                <h4>{f.Title}</h4>
                <p>{f.Year}</p>
                <StarRating imdbID={f.imdbID} />
                <div style={{display:'flex', gap:8, marginTop:8}}>
                  <button onClick={()=> onRemove(f)}>Remove</button>
                  <label style={{display:'flex', alignItems:'center', gap:6}}>
                    <input type="checkbox" checked={isCompare} onChange={()=> onCompare(f)} /> Compare
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
