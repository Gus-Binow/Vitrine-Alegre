import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { listarProdutos, listarCategorias } from '../services/api';
import CardProduto from '../components/CardProduto';
import FiltroCategorias from '../components/FiltroCategorias';
import Paginacao from '../components/Paginacao';
import EsqueletoCard from '../components/EsqueletoCard';

export default function Vitrine() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const paginaAtual = Number(searchParams.get('pagina')) || 1;
  const busca = searchParams.get('busca') || '';
  const categoriaAtiva = searchParams.get('categoria') || '';
  const ordenacao = searchParams.get('ordenacao') || '';

  const [produtos, setProdutos] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarCategorias()
      .then(data => setCategorias(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    listarProdutos({
      pagina: paginaAtual,
      limite: 12,
      busca,
      categoria: categoriaAtiva,
      ordenacao
    })
      .then(data => {
        setProdutos(data.produtos);
        setTotalProdutos(data.total);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setProdutos([]);
        setTotalProdutos(0);
        setLoading(false);
      });
  }, [paginaAtual, busca, categoriaAtiva, ordenacao]);

  const totalPaginas = Math.ceil(totalProdutos / 12);

  const handleSelectCategoria = (cat) => {
    const novosParams = new URLSearchParams(searchParams);
    if (cat === 'Todas' || cat === '') {
      novosParams.delete('categoria');
    } else {
      novosParams.set('categoria', cat);
    }
    novosParams.set('pagina', '1');
    setSearchParams(novosParams);
  };

  const handleOrdenacaoChange = (e) => {
    const novosParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      novosParams.set('ordenacao', e.target.value);
    } else {
      novosParams.delete('ordenacao');
    }
    novosParams.set('pagina', '1');
    setSearchParams(novosParams);
  };

  const handlePageChange = (novaPagina) => {
    const novosParams = new URLSearchParams(searchParams);
    novosParams.set('pagina', novaPagina.toString());
    setSearchParams(novosParams);
  };

  const handleLimparBusca = () => {
    navigate('/');
  };

  return (
    <div className="conteudo-principal">
      <div className="barras-filtros">
        <FiltroCategorias
          categorias={categorias}
          categoriaAtiva={categoriaAtiva}
          onSelectCategoria={handleSelectCategoria}
        />
        <select
          className="seletor-ordenacao"
          value={ordenacao}
          onChange={handleOrdenacaoChange}
        >
          <option value="">Ordenar: Relevância</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
          <option value="rating-desc">Melhor Avaliados</option>
        </select>
      </div>

      {!loading && produtos.length > 0 && (
        <div className="informacao-resultados">
          {totalProdutos} produtos · página {paginaAtual} de {totalPaginas}
        </div>
      )}

      {loading ? (
        <div className="grade-produtos">
          {Array.from({ length: 8 }).map((_, idx) => (
            <EsqueletoCard key={idx} />
          ))}
        </div>
      ) : produtos.length === 0 ? (
        <div className="estado-vazio-busca">
          <div className="circulo-icone-busca">🔍</div>
          <h2 className="titulo-busca-vazia">Nenhum produto encontrado</h2>
          <p className="subtitulo-busca-vazia">Tente outro termo ou limpe os filtros.</p>
          <button className="botao-limpar-busca" onClick={handleLimparBusca}>
            Limpar busca
          </button>
        </div>
      ) : (
        <>
          <div className="grade-produtos">
            {produtos.map(p => (
              <CardProduto key={p.id} produto={p} />
            ))}
          </div>

          <Paginacao
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}