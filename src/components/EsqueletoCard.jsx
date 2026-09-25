import React from 'react';

export default function EsqueletoCard() {
  return (
    <div className="card-produto esqueleto-card">
      <div className="esqueleto-imagem"></div>
      <div className="card-produto-conteudo">
        <div className="esqueleto-linha esqueleto-categoria"></div>
        <div className="esqueleto-linha esqueleto-titulo"></div>
        <div className="esqueleto-linha esqueleto-avaliacao"></div>
        <div className="esqueleto-linha esqueleto-preco"></div>
        <div className="esqueleto-botao"></div>
      </div>
    </div>
  );
}