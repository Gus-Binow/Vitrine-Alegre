import React from 'react';
import { Link } from 'react-router-dom';

export default function NaoEncontrado() {
  return (
    <div className="conteudo-principal">
      <div className="estado-container">
        <h1 style={{ fontSize: '48px', marginBottom: '8px' }}>404</h1>
        <h2 className="titulo-estado">Página não encontrada</h2>
        <p className="subtitulo-estado">O caminho digitado não existe.</p>
        <Link to="/" className="botao-acao-estado">Voltar para a vitrine</Link>
      </div>
    </div>
  );
}