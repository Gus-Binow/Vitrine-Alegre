import React from "react";
import { Link } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext";

const COTACAO = 5.2;

export default function Carrinho() {
  const { itens, removerDoCarrinho, atualizarQuantidade } = useCarrinho();

  if (itens.length === 0) {
    return (
      <div className="conteudo-principal">
        <h1 className="carrinho-titulo-pagina" style={{ marginBottom: "40px" }}>
          Seu carrinho
        </h1>

        <div className="estado-vazio-carrinho">
          <div className="circulo-icone-carrinho">🛒</div>
          <h2 className="titulo-carrinho-vazio">Seu carrinho está vazio</h2>
          <p className="subtitulo-carrinho-vazio">
            Escolha um produto na vitrine para começar.
          </p>
          <Link to="/" className="botao-ir-vitrine">
            Ir para a vitrine
          </Link>
        </div>
      </div>
    );
  }

  // Quantidade total de unidades e de produtos diferentes
  const totalUnidades = itens.reduce((acc, item) => acc + item.quantidade, 0);
  const totalProdutos = itens.length;

  // Cálculos financeiros
  const subtotalCheio = itens.reduce((acc, item) => {
    return acc + item.produto.price * COTACAO * item.quantidade;
  }, 0);

  const totalDescontos = itens.reduce((acc, item) => {
    if (item.produto.discountPercentage >= 5) {
      const descontoPorUnidade =
        item.produto.price * COTACAO * (item.produto.discountPercentage / 100);
      return acc + descontoPorUnidade * item.quantidade;
    }
    return acc;
  }, 0);

  const valorTotal = subtotalCheio - totalDescontos;
  const valorParcela = valorTotal / 12;

  const formatarMoeda = (val) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);

  return (
    <div className="conteudo-principal">
      <div className="carrinho-cabecalho-pagina">
        <div>
          <h1 className="carrinho-titulo-pagina">Seu carrinho</h1>
          <span className="carrinho-subtitulo-pagina">
            {totalProdutos} {totalProdutos === 1 ? "produto" : "produtos"} ·{" "}
            {totalUnidades} {totalUnidades === 1 ? "unidade" : "unidades"}
          </span>
        </div>
        <Link to="/" className="link-continuar-comprando">
          Continuar comprando ›
        </Link>
      </div>

      <div className="carrinho-grid">
        <div className="carrinho-card-itens">
          {itens.map(({ produto, quantidade }) => {
            const precoCheioUnidade = produto.price * COTACAO;
            const temDesconto = produto.discountPercentage >= 5;
            const precoFinalUnidade = temDesconto
              ? precoCheioUnidade * (1 - produto.discountPercentage / 100)
              : precoCheioUnidade;
            const subtotalLinha = precoFinalUnidade * quantidade;

            return (
              <div key={produto.id} className="carrinho-item-linha">
                <div className="carrinho-item-thumb-container">
                  <img
                    src={produto.thumbnail}
                    alt={produto.title}
                    className="carrinho-item-thumb"
                  />
                </div>

                <div className="carrinho-item-info">
                  <span className="categoria-produto">{produto.category}</span>
                  <Link
                    to={`/produtos/${produto.id}`}
                    className="carrinho-item-titulo"
                  >
                    {produto.title}
                  </Link>
                  <span className="carrinho-item-preco-unitario">
                    {formatarMoeda(precoFinalUnidade)} cada
                  </span>
                </div>

                <div className="carrinho-seletor-qtd">
                  <button
                    onClick={() =>
                      atualizarQuantidade(produto.id, quantidade - 1)
                    }
                  >
                    −
                  </button>
                  <span>{quantidade}</span>
                  <button
                    onClick={() =>
                      atualizarQuantidade(produto.id, quantidade + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="carrinho-item-subtotal">
                  {formatarMoeda(subtotalLinha)}
                </div>

                <button
                  className="carrinho-botao-remover"
                  onClick={() => removerDoCarrinho(produto.id)}
                  title="Remover item"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        <div className="carrinho-card-resumo">
          <h2 className="resumo-titulo">Resumo do pedido</h2>

          <div className="resumo-linha">
            <span>
              Subtotal ({totalUnidades} {totalUnidades === 1 ? "item" : "itens"}
              )
            </span>
            <strong>{formatarMoeda(subtotalCheio)}</strong>
          </div>

          <div className="resumo-linha desconto">
            <span>Descontos</span>
            <strong>− {formatarMoeda(totalDescontos)}</strong>
          </div>

          <div className="resumo-linha frete">
            <span>Frete</span>
            <strong>Grátis</strong>
          </div>

          <div className="resumo-divisor"></div>

          <div className="resumo-linha total">
            <span>Total</span>
            <div className="resumo-total-bloco">
              <strong className="resumo-total-valor">
                {formatarMoeda(valorTotal)}
              </strong>
              <small className="resumo-parcelas">
                em 12x de {formatarMoeda(valorParcela)}
              </small>
            </div>
          </div>

          <button className="botao-finalizar-compra">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
}
