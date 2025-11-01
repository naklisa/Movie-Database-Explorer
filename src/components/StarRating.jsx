import React, { useEffect, useState } from "react";

const API_URL = "https://www.omdbapi.com/";

export default function StarRating({ imdbID }) {
  const [rating, setRating] = useState(null);
  useEffect(()=> {
    let mounted = true;
    async function load() {
      try {
        const key = import.meta.env.VITE_OMDB_API_KEY;
        const res = await fetch(`${API_URL}?apikey=${key}&i=${imdbID}&plot=short`);
        const data = await res.json();
        if (!mounted) return;
        if (data.Response === "True") {
          const r = parseFloat(data.imdbRating);
          setRating(Number.isFinite(r) ? r : null);
        }
      } catch {}
    }
    load();
    return ()=> { mounted = false; }
  }, [imdbID]);

  if (rating == null) return <div style={{height:20}} />;

  // convert 0-10 to 0-5 stars
  const stars = Math.round((rating / 10) * 5 * 2) / 2; // half-star precision
  const full = Math.floor(stars);
  const half = stars - full >= 0.5;
  const empty = 5 - full - (half?1:0);

  return (
    <div className="star-rating" aria-label={`IMDB ${rating}`}>
      {Array.from({length: full}).map((_,i)=>(<span key={'f'+i}>★</span>))}
      {half && <span>☆</span>}
      {Array.from({length: empty}).map((_,i)=>(<span key={'e'+i}>✩</span>))}
      <small style={{marginLeft:6, color:'#555'}}>{rating}</small>
    </div>
  );
}
