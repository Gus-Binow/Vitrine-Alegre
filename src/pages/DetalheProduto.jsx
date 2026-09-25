import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { buscarProduto } from "../services/api";
import { useCarrinho } from "../context/CarrinhoContext";

const COTACAO = 5.2;

export default function DetalheProduto() {
  const { id } = useParams();
  const { adicionarAoCarrinho } = useCarrinho();

  const [produto, setProduto] = useState(null);
  const [imagemAtiva, setImagemAtiva] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    setErro(null);

    buscarProduto(id)
      .then((data) => {
        if (ativo) {
          setProduto(data);
          setImagemAtiva(data.images?.[0] || data.thumbnail);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (ativo) {
          setErro(err.message);
          setLoading(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="conteudo-principal">
        <div className="esqueleto-card" style={{ height: "500px" }}>
          <div className="esqueleto-bloco" style={{ height: "100%" }}></div>
        </div>
      </div>
    );
  }

  if (erro || !produto) {
    return (
      <div className="conteudo-principal">
        <div className="estado-container">
          <div className="icone-estado">!</div>
          <h2 className="titulo-estado">Não foi possível carregar o produto</h2>
          <p className="subtitulo-estado">
            Verifique a conexão ou se o produto existe.
          </p>
          <Link to="/" className="botao-acao-estado">
            Voltar para a vitrine
          </Link>
        </div>
      </div>
    );
  }

  // Cálculos financeiros conforme especificação do PDF
  const precoCheioReal = produto.price * COTACAO;
  const temDescontoRelevante = produto.discountPercentage >= 5;
  const precoFinalReal = temDescontoRelevante
    ? precoCheioReal * (1 - produto.discountPercentage / 100)
    : precoCheioReal;
  const valorEconomizado = precoCheioReal - precoFinalReal;
  const valorParcela = precoFinalReal / 12;

  const formatarMoeda = (val) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  const renderEstrelas = (rating) =>
    "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));

  return (
    <div className="conteudo-principal">
      {/* Trilha de navegação (Breadcrumb) */}
      <nav className="breadcrumb">
        <Link to="/">Início</Link>
        <span>›</span>
        <Link to={`/?categoria=${produto.category}`}>{produto.category}</Link>
        <span>›</span>
        <span className="breadcrumb-ativo">{produto.title}</span>
      </nav>

      {/* Bloco Superior: Galeria + Compra */}
      <div className="detalhe-card-principal">
        {/* Galeria de Fotos */}
        <div className="galeria-secao">
          <div className="imagem-destaque-container">
            <img
              src={imagemAtiva}
              alt={produto.title}
              className="imagem-destaque"
            />
          </div>
          <div className="miniaturas-container">
            {produto.images?.map((img, idx) => (
              <button
                key={idx}
                className={`miniatura-item ${imagemAtiva === img ? "ativa" : ""}`}
                onClick={() => setImagemAtiva(img)}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Informações e Compra */}
        <div className="compra-secao">
          <span className="categoria-produto">{produto.category}</span>
          <h1 className="detalhe-titulo">{produto.title}</h1>

          <p className="detalhe-meta">
            Marca: <strong>{produto.brand || "Marca Genérica"}</strong> · SKU:{" "}
            <strong>{produto.sku || `SKU-${produto.id}`}</strong>
          </p>

          <div className="avaliacao-container">
            <span className="estrelas">{renderEstrelas(produto.rating)}</span>
            <span>
              {produto.rating} · {produto.reviews?.length || 0} avaliações
            </span>
          </div>

          <div className="bloco-preco">
            {temDescontoRelevante && (
              <div className="preco-linha-antiga">
                <span className="preco-antigo">
                  {formatarMoeda(precoCheioReal)}
                </span>
                <span className="economize-tag">
                  economize {formatarMoeda(valorEconomizado)}
                </span>
              </div>
            )}

            <div className="preco-destaque-container">
              <span className="detalhe-preco-final">
                {formatarMoeda(precoFinalReal)}
              </span>
              {temDescontoRelevante && (
                <span className="selo-desconto-detalhe">
                  -{Math.round(produto.discountPercentage)}%
                </span>
              )}
            </div>

            <p className="parcelamento-texto">
              em até 12x de {formatarMoeda(valorParcela)} sem juros
            </p>
          </div>

          <p className="estoque-status">
            <span className="ponto-status">●</span> {produto.stock} em estoque ·{" "}
            <span>{produto.availabilityStatus || "In Stock"}</span>
          </p>

          <div className="secao-acoes-compra">
            <div className="seletor-quantidade">
              <button
                onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
              >
                -
              </button>
              <span>{quantidade}</span>
              <button onClick={() => setQuantidade(quantidade + 1)}>+</button>
            </div>

            <button
              className="botao-adicionar-detalhe"
              onClick={() => adicionarAoCarrinho(produto, quantidade)}
            >
              Adicionar ao carrinho
            </button>
          </div>

          {/* Três pílulas de informação de serviço */}
        </div>
      </div>

      {/* Bloco Meio: Descrição e Especificações */}
      <div className="grid-detalhes-tecnicos">
        <div className="caixa-informacao">
          <h2>Descrição</h2>
          <p className="descricao-texto">{produto.description}</p>
          <div className="tags-container">
            {produto.tags?.map((tag, idx) => (
              <span key={idx} className="tag-item">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="caixa-informacao">
          <h2>Especificações</h2>
          <table className="tabela-especificacoes">
            <tbody>
              <tr>
                <td>Peso</td>
                <td>
                  <strong>{produto.weight || 2} kg</strong>
                </td>
              </tr>
              <tr>
                <td>Dimensões</td>
                <td>
                  <strong>
                    {produto.dimensions
                      ? `${produto.dimensions.width} x ${produto.dimensions.height} x ${produto.dimensions.depth} cm`
                      : "5.29 x 18.38 x 17.72 cm"}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Estoque</td>
                <td>
                  <strong>{produto.stock} unidades</strong>
                </td>
              </tr>
              <tr>
                <td>Pedido mínimo</td>
                <td>
                  <strong>{produto.minimumOrderQuantity || 1} unidades</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bloco Inferior: Avaliações */}
      <div className="secao-avaliacoes">
        <h2>Avaliações ({produto.reviews?.length || 0})</h2>
        <div className="grid-avaliacoes">
          {produto.reviews?.map((rev, idx) => (
            <div key={idx} className="card-avaliacao">
              <div className="cabecalho-avaliacao">
                <div className="avatar-usuario">
                  {rev.reviewerName?.charAt(0) || "U"}
                </div>
                <div className="info-usuario">
                  <strong>{rev.reviewerName}</strong>
                  <div className="estrelas">{renderEstrelas(rev.rating)}</div>
                </div>
                <span className="data-avaliacao">
                  {new Date(rev.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <p className="comentario-avaliacao">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
