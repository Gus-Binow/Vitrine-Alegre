import React from 'react';

export default function Paginacao({ paginaAtual, totalPaginas, onPageChange }) {
  if (totalPaginas <= 1) return null;

  const gerarPaginas = () => {
    const paginas = [];
    paginas.push(1);

    if (paginaAtual > 3) {
      paginas.push('...');
    }

    for (let i = Math.max(2, paginaAtual - 1); i <= Math.min(totalPaginas - 1, paginaAtual + 1); i++) {
      if (!paginas.includes(i)) {
        paginas.push(i);
      }
    }

    if (paginaAtual < totalPaginas - 2) {
      paginas.push('...');
    }

    if (totalPaginas > 1 && !paginas.includes(totalPaginas)) {
      paginas.push(totalPaginas);
    }

    return paginas;
  };

  return (
    <div className="paginacao">
      <button 
        className="botao-pagina" 
        disabled={paginaAtual === 1}
        onClick={() => onPageChange(paginaAtual - 1)}
      >
        ‹
      </button>
      {gerarPaginas().map((p, idx) => 
        typeof p === 'number' ? (
          <button
            key={idx}
            className={`botao-pagina ${p === paginaAtual ? 'ativa' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ) : (
          <span key={idx} style={{ padding: '0 4px', color: '#687280' }}>{p}</span>
        )
      )}
      <button 
        className="botao-pagina" 
        disabled={paginaAtual === totalPaginas}
        onClick={() => onPageChange(paginaAtual + 1)}
      >
        ›
      </button>
    </div>
  );
}