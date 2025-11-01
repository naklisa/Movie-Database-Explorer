import React from "react";
import StarRating from "./StarRating";

export default function ComparePage({ items = [], onSelect, onRemove }) {
  if (!items || items.length === 0) return <p>Select two movies to compare (use the Compare checkbox).</p>;
  if (items.length === 1) return <p>Pick one more movie to compare.</p>;
  const [a,b] = items;
  return (
    <section className="compare-section">
      <h2>Compare Movies</h2>
      <div className="compare-grid">
        {[a,b].map((m)=> (
          <div className="compare-card" key={m.imdbID}>
            <img src={m.Poster !== "N/A" ? m.Poster : "/placeholder.png"} alt={m.Title} onClick={()=> onSelect(m.imdbID)} />
            <h3>{m.Title} ({m.Year})</h3>
            <StarRating imdbID={m.imdbID} />
            <p><strong>Type:</strong> {m.Type}</p>
            <p><strong>IMDB ID:</strong> {m.imdbID}</p>
            <button onClick={()=> onRemove(m)}>Remove</button>
          </div>
        ))}
      </div>
    </section>
  );
}
