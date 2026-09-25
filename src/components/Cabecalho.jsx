import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext";

export default function Cabecalho() {
  const { totalItens } = useCarrinho();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const busca = searchParams.get("busca") || "";

  const handleBuscaChange = (e) => {
    const valor = e.target.value;
    const novosParams = new URLSearchParams(searchParams);
    if (valor) {
      novosParams.set("busca", valor);
      novosParams.set("pagina", "1");
    } else {
      novosParams.delete("busca");
    }
    setSearchParams(novosParams);
    if (window.location.pathname !== "/") {
      navigate(`/?${novosParams.toString()}`);
    }
  };

  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        <div className="cabecalho-linha-superior">
          <button className="menu-hamburguer-mobile" aria-label="Abrir menu">
            ☰
          </button>

          <Link to="/" className="logo">
            <span className="logo-icone">V</span>
            <span>Vitrine Alegre</span>
          </Link>

          <div className="cabecalho-acoes">
            <Link to="/login" className="link-entrar">Entrar</Link>
            <Link
              to="/carrinho"
              className="botao-carrinho-pill"
              title="Carrinho de compras"
            >
              <div className="icone-carrinho-wrapper">
                🛒
                {totalItens > 0 && (
                  <span className="contador-carrinho">{totalItens}</span>
                )}
              </div>
              <span className="texto-carrinho">Carrinho</span>
            </Link>
          </div>
        </div>

        <div className="busca-container">
          <span className="busca-icone">🔍</span>
          <input
            type="text"
            className="busca-input"
            placeholder="Buscar produtos..."
            value={busca}
            onChange={handleBuscaChange}
          />
        </div>
      </div>
    </header>
  );
}
