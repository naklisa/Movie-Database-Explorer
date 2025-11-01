import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import DataTable from "./components/DataTable";
import DetailCard from "./components/DetailCard";
import Pagination from "./components/Pagination";
import FavoritesPage from "./components/FavoritesPage";
import ComparePage from "./components/ComparePage";

const API_URL = "https://www.omdbapi.com/";

export default function App() {
  const [view, setView] = useState("home"); // home | favorites | compare
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("relevance"); // title, year-asc, year-desc, rating-desc
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favorites") || "[]"); } catch { return []; }
  });
  const [compareList, setCompareList] = useState(() => {
    try { return JSON.parse(localStorage.getItem("compare") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("compare", JSON.stringify(compareList));
  }, [compareList]);

  async function searchMovies(q, p = 1, y = "") {
    if (!q) return;
    setLoading(true); setError(null);
    try {
      const key = import.meta.env.VITE_OMDB_API_KEY;
      const params = new URLSearchParams({ apikey: key, s: q, page: String(p) });
      if (y) params.set("y", y);
      const res = await fetch(`${API_URL}?${params.toString()}`);
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search || []);
        setTotalResults(Number(data.totalResults) || 0);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || "Tidak ada hasil");
      }
    } catch (e) {
      setError("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }

  async function fetchDetail(imdbID) {
    setLoading(true);
    try {
      const key = import.meta.env.VITE_OMDB_API_KEY;
      const res = await fetch(`${API_URL}?apikey=${key}&i=${imdbID}&plot=full`);
      const data = await res.json();
      if (data.Response === "True") setSelected(data);
    } catch {
      setError("Gagal memuat detail.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(q, y, sort) {
    setQuery(q);
    setYearFilter(y || "");
    setSortBy(sort || "relevance");
    setPage(1);
    setSelected(null);
    searchMovies(q, 1, y);
  }

  function toggleFavorite(movie) {
    const exists = favorites.find((m) => m.imdbID === movie.imdbID);
    if (exists) setFavorites((f) => f.filter((x) => x.imdbID !== movie.imdbID));
    else setFavorites((f) => [movie, ...f]);
  }

  function toggleCompare(movie) {
    const exists = compareList.find((m) => m.imdbID === movie.imdbID);
    if (exists) setCompareList((c) => c.filter((x) => x.imdbID !== movie.imdbID));
    else {
      if (compareList.length >= 2) {
        // keep only last two
        setCompareList((c) => [c[1], movie]);
      } else setCompareList((c) => [...c, movie]);
    }
  }

  // Pagination effect: fetch when page changes
  useEffect(() => {
    if (query) searchMovies(query, page, yearFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // client-side sorting (simple)
  function sortedMovies(list) {
    const copy = [...list];
    if (sortBy === "title-asc") copy.sort((a,b)=> a.Title.localeCompare(b.Title));
    if (sortBy === "title-desc") copy.sort((a,b)=> b.Title.localeCompare(a.Title));
    if (sortBy === "year-asc") copy.sort((a,b)=> (a.Year||"").localeCompare(b.Year||""));
    if (sortBy === "year-desc") copy.sort((a,b)=> (b.Year||"").localeCompare(a.Year||""));
    // rating-desc not reliable because search doesn't include rating; DataTable will show rating when available
    return copy;
  }

  return (
    <div className="container">
      <Header
        view={view}
        onChangeView={(v)=> setView(v)}
      />
      {view === "home" && (
        <>
          <SearchForm onSearch={handleSearch} currentSort={sortBy} />
          <div className="meta-row">
            <div className="fav-count">Favorites: {favorites.length}</div>
            {totalResults > 0 && <div className="results-count">{totalResults} results</div>}
          </div>

          {loading && <p className="info">Loading...</p>}
          {error && <p className="error">{error}</p>}

          {!selected ? (
            <>
              <DataTable
                data={sortedMovies(movies)}
                onSelect={fetchDetail}
                onToggleFavorite={toggleFavorite}
                favorites={favorites}
                onToggleCompare={toggleCompare}
                compareList={compareList}
              />
              {totalResults > 0 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalResults={totalResults}
                />
              )}
            </>
          ) : (
            <DetailCard
              movie={selected}
              onBack={() => setSelected(null)}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          )}
        </>
      )}

      {view === "favorites" && (
        <FavoritesPage
          favorites={favorites}
          onRemove={(m)=> toggleFavorite(m)}
          onSelect={(id)=> fetchDetail(id)}
          onCompare={(m)=> toggleCompare(m)}
          compareList={compareList}
        />
      )}

      {view === "compare" && (
        <ComparePage
          items={compareList}
          onSelect={(id)=> fetchDetail(id)}
          onRemove={(m)=> toggleCompare(m)}
        />
      )}
    </div>
  );
}
