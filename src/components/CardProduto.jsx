import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';

const COTACAO = 5.20;

export default function CardProduto({ produto }) {
  const { adicionarAoCarrinho } = useCarrinho();

  const precoCheioReal = produto.price * COTACAO;
  const temDescontoRelevante = produto.discountPercentage >= 5;
  const precoFinalReal = temDescontoRelevante
    ? precoCheioReal * (1 - produto.discountPercentage / 100)
    : precoCheioReal;

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  const renderEstrelas = (rating) => {
    const nota = Math.round(rating);
    return '★'.repeat(nota) + '☆'.repeat(5 - nota);
  };

  return (
    <div className="card-produto">
      {temDescontoRelevante && (
        <span className="selo-desconto">-{Math.round(produto.discountPercentage)}%</span>
      )}
      
      {/* Topo do Cartão: Área da Imagem */}
      <Link to={`/produtos/${produto.id}`} className="imagem-container">
        <img src={produto.thumbnail} alt={produto.title} className="imagem-produto" />
      </Link>

      {/* Corpo do Cartão: Texto e Ações */}
      <div className="card-produto-conteudo">
        <span className="categoria-produto">{produto.category}</span>
        <Link to={`/produtos/${produto.id}`}>
          <h3 className="titulo-produto">{produto.title}</h3>
        </Link>
        <div className="avaliacao-container">
          <span className="estrelas">{renderEstrelas(produto.rating)}</span>
          <span>{produto.rating}</span>
        </div>
        <div className="precos-container">
          {temDescontoRelevante && (
            <div className="preco-antigo">{formatarMoeda(precoCheioReal)}</div>
          )}
          <div className="preco-final">{formatarMoeda(precoFinalReal)}</div>
        </div>
        <button 
          className="botao-adicionar" 
          onClick={() => adicionarAoCarrinho(produto)}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}