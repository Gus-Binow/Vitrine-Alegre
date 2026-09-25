import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PaginaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && senha) {
      alert('Bem-vindo(a) de volta!');
      navigate('/');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      width: '100%'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        padding: '32px 28px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Topo do Card */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#1a1d2e',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            <span style={{
              backgroundColor: '#9333ea',
              color: '#ffffff',
              width: '28px',
              height: '28px',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800'
            }}>V</span>
            <span>Vitrine Alegre</span>
          </Link>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 6px 0' }}>
            Acesse sua conta
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Informe seus dados para continuar suas compras
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="email" style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                height: '42px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                padding: '0 14px',
                fontSize: '14px',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="senha" style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
              Senha
            </label>
            <input
              type="password"
              id="senha"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{
                height: '42px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                padding: '0 14px',
                fontSize: '14px',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', cursor: 'pointer' }}>
              <input type="checkbox" />
              <span>Lembrar de mim</span>
            </label>
            <a href="#esqueci" style={{ color: '#9333ea', textDecoration: 'none', fontWeight: '500' }}>
              Esqueceu a senha?
            </a>
          </div>

          <button type="submit" style={{
            height: '44px',
            backgroundColor: '#a3e635',
            color: '#1e293b',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            fontSize: '15px',
            cursor: 'pointer',
            marginTop: '8px'
          }}>
            Entrar
          </button>
        </form>

        {/* Rodapé */}
        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center',
          fontSize: '13px',
          color: '#64748b'
        }}>
          <span>Ainda não tem uma conta?</span>{' '}
          <Link to="/cadastro" style={{ color: '#9333ea', fontWeight: '700', textDecoration: 'none' }}>
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}