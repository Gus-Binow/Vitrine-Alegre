import React from 'react';

export default function FiltroCategorias({ categorias, categoriaAtiva, onSelectCategoria }) {
  return (
    <div className="pilulas-categorias">
      <button
        className={`pilula ${categoriaAtiva === '' || categoriaAtiva === 'Todas' ? 'ativa' : ''}`}
        onClick={() => onSelectCategoria('Todas')}
      >
        Todas
      </button>
      {categorias.slice(0, 7).map((cat) => (
        <button
          key={cat}
          className={`pilula ${categoriaAtiva === cat ? 'ativa' : ''}`}
          onClick={() => onSelectCategoria(cat)}
        >
          {cat}
        </button>
      ))}
      {categorias.length > 7 && (
        <span className="pilula">+{categorias.length - 7}</span>
      )}
    </div>
  );
}