import React from "react";

export default function Header({ view, onChangeView }) {
  return (
    <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
      <div>
        <h1 style={{margin:0}}>🎬 Movie Database Explorer</h1>
        <p style={{margin:0,fontSize:13}}>Search • Compare • Favorite • Cinematic</p>
      </div>

      <nav style={{display:'flex', gap:8}}>
        <button onClick={()=> onChangeView('home')} className={view==='home'?'active':''}>Home</button>
        <button onClick={()=> onChangeView('favorites')} className={view==='favorites'?'active':''}>Favorites</button>
        <button onClick={()=> onChangeView('compare')} className={view==='compare'?'active':''}>Compare</button>
      </nav>
    </header>
  );
}
