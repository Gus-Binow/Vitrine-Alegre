import React, { createContext, useContext, useState, useEffect } from 'react';  
import Aviso from '../components/Aviso';  
  
const CarrinhoContext = createContext();  
  
export function CarrinhoProvider({ children }) {  
  const [itens, setItens] = useState(() => {  
    const salvo = localStorage.getItem('vitrine_alegre_carrinho');  
    return salvo ? JSON.parse(salvo) : [];  
  });  
  
  const [notificacoes, setNotificacoes] = useState([]);  
  
  useEffect(() => {  
    localStorage.setItem('vitrine_alegre_carrinho', JSON.stringify(itens));  
  }, [itens]);  
  
  const exibirAviso = (texto) => {  
    const id = Date.now() + Math.random();  
    const novaNotificacao = { id, mensagem: texto };  
  
    setNotificacoes(atuais => [...atuais, novaNotificacao]);  
  
    setTimeout(() => {  
      setNotificacoes(atuais => atuais.filter(item => item.id !== id));  
    }, 3000);  
  };  
  
  const adicionarAoCarrinho = (produto, quantidade = 1) => {  
    const qtdAdicionar = Number(quantidade) || 1;  
    
    // Verifica se o item já está no carrinho
    const jaExiste = itens.some(item => item.produto.id === produto.id);

    if (jaExiste) {
      exibirAviso(`"${produto.title}" já está no carrinho! Quantidade atualizada.`);
    } else {
      exibirAviso(`"${produto.title}" foi adicionado ao carrinho!`);
    }

    setItens(itensAtuais => {  
      const index = itensAtuais.findIndex(i => i.produto.id === produto.id);  
      
      if (index >= 0) {  
        return itensAtuais.map((item, idx) => {  
          if (idx === index) {  
            return { ...item, quantidade: item.quantidade + qtdAdicionar };  
          }  
          return item;  
        });  
      }  
      
      return [...itensAtuais, { produto, quantidade: qtdAdicionar }];  
    });  
  };  
  
  const removerDoCarrinho = (id) => {  
    setItens(itensAtuais => itensAtuais.filter(i => i.produto.id !== id));  
  };  
  
  const atualizarQuantidade = (id, quantidade) => {  
    if (quantidade <= 0) {  
      removerDoCarrinho(id);  
      return;  
    }  
    setItens(itensAtuais =>  
      itensAtuais.map(item =>  
        item.produto.id === id ? { ...item, quantidade } : item  
      )  
    );  
  };  
  
  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);  
  
  return (  
    <CarrinhoContext.Provider value={{ itens, adicionarAoCarrinho, removerDoCarrinho, atualizarQuantidade, totalItens }}>  
      {children}  
      <Aviso notificacoes={notificacoes} />  
    </CarrinhoContext.Provider>  
  );  
}  
  
export function useCarrinho() {  
  return useContext(CarrinhoContext);  
}