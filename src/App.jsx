// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação do Contexto
import { CarrinhoProvider } from './context/CarrinhoContext';

// Importação dos Componentes Fixos
import Cabecalho from './components/Cabecalho';
import Rodape from './components/Rodape';

// Importação das Páginas
import Vitrine from './pages/Vitrine';
import DetalheProduto from './pages/DetalheProduto';
import Carrinho from './pages/Carrinho';
import NaoEncontrado from './pages/NaoEncontrado';
import PaginaLogin from './pages/PaginaLogin';

// Estilos
import './App.css';

export default function App() {
  return (
    <CarrinhoProvider>
      <BrowserRouter>
        <div className="app-container">
          <Cabecalho />
          
          <main className="conteudo-principal">
            <Routes>
              {/* Rota 1: Vitrine (Página Inicial) */}
              <Route path="/" element={<Vitrine />} />
              
              {/* Rota 2: Detalhe do Produto */}
              <Route path="/produtos/:id" element={<DetalheProduto />} />
              
              {/* Rota 3: Carrinho de Compras */}
              <Route path="/carrinho" element={<Carrinho />} />

              {/* Rota 4: Login */}
              <Route path="/login" element={<PaginaLogin />} />
              
              {/* Rota 5: Página 404 (SEMPRE POR ÚLTIMO) */}
              <Route path="*" element={<NaoEncontrado />} />
            </Routes>
          </main>

          <Rodape />
        </div>
      </BrowserRouter>
    </CarrinhoProvider>
  );
}