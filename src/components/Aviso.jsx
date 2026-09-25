import React from 'react';

export default function Aviso({ notificacoes }) {
  if (!notificacoes || notificacoes.length === 0) return null;

  return (
    <div className="aviso-container">
      {notificacoes.map((notificacao) => (
        <div key={notificacao.id} className="aviso-item">
          {notificacao.mensagem}
        </div>
      ))}
    </div>
  );
}