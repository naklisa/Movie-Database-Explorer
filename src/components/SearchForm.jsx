import React, { useState } from "react";

export default function SearchForm({ onSearch, currentSort }) {
  const [q, setQ] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState(currentSort || "relevance");

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim(), year.trim(), sort);
  }

  return (
    <form className="search-form" onSubmit={submit} noValidate>
      <input
        type="text"
        placeholder="Masukkan judul film..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        required
        minLength={2}
      />
      <input
        type="number"
        placeholder="Tahun (optional)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        min="1900"
        max={new Date().getFullYear()}
      />

      <select value={sort} onChange={(e)=> setSort(e.target.value)}>
        <option value="relevance">Relevance</option>
        <option value="title-asc">Title A→Z</option>
        <option value="title-desc">Title Z→A</option>
        <option value="year-desc">Year ↓</option>
        <option value="year-asc">Year ↑</option>
      </select>

      <button type="submit">Cari</button>
    </form>
  );
}
