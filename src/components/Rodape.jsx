import React from 'react';

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape-conteudo">
        <div className="rodape-info-esquerda">
          <div className="logo-rodape">
            <span className="logo-icone">V</span>
            <strong>Vitrine Alegre</strong>
          </div>
          <p>Projeto acadêmico · Ifes Campus de Alegre · TADS</p>
        </div>
        <div className="rodape-info-direita">
          <p>Dados: dummyjson.com</p>
          <p>Imagens e produtos são fictícios</p>
        </div>
      </div>
    </footer>
  );
}