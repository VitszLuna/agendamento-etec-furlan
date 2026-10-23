import React, { useState } from 'react';
import { Lock, GraduationCap, ShieldCheck, AlertCircle } from 'lucide-react';

/**
 * Componente da Tela de Login (Foto 1)
 * Adaptado para acessibilidade com campos de entrada amplos, letras grandes e botões táteis.
 */
export default function TelaLogin({ aoLogar }) {
  const [rm, setRm] = useState('244080');
  const [senha, setSenha] = useState('12345678');
  const [papelSelecionado, setPapelSelecionado] = useState('student');
  const [erros, setErros] = useState({});

  const validarFormulario = () => {
    const novosErros = {};

    if (!rm.trim()) {
      novosErros.rm = 'O RM é obrigatório.';
    } else if (!/^\d+$/.test(rm.trim())) {
      novosErros.rm = 'O RM deve conter apenas números.';
    } else if (rm.trim().length < 4) {
      novosErros.rm = 'O RM deve ter no mínimo 4 dígitos.';
    }

    if (!senha) {
      novosErros.senha = 'A senha é obrigatória.';
    } else if (senha.length < 4) {
      novosErros.senha = 'A senha deve ter no mínimo 4 caracteres.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const manipularSubmissao = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      aoLogar(papelSelecionado, { rm, senha });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center px-4 py-12">
      
      {/* Logos Oficiais Ampliados */}
      <div className="flex items-center justify-center space-x-8 mb-8">
        <img 
          src="/etec.png" 
          alt="Etec Antônio Furlan" 
          className="h-14 md:h-16 object-contain"
          onError={(e) => { 
            if (!e.target.dataset.triedWebp) {
              e.target.dataset.triedWebp = 'true';
              e.target.src = '/etec.webp';
            }
          }}
        />
        <img 
          src="/cps.png" 
          alt="Centro Paula Souza" 
          className="h-14 md:h-16 object-contain"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Título e Subtítulo Acessíveis */}
      <div className="text-center mb-10 max-w-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Agendamento de Atendimento
        </h1>
        <p className="text-slate-600 text-base md:text-lg mt-2 font-medium">
          Secretaria Escolar e Orientação Pedagógica
        </p>
      </div>

      {/* Cartão de Login Branco Centralizado (Foto 1) */}
      <div className="bg-white rounded-2xl shadow-sm border-2 border-slate-200/90 p-8 sm:p-10 w-full max-w-[480px]">
        <form onSubmit={manipularSubmissao} className="space-y-6">
          
          {/* Campo RM */}
          <div>
            <label className="block text-base font-bold text-slate-800 mb-2">
              RM (Registro de Matrícula)
            </label>
            <input
              type="text"
              value={rm}
              onChange={(e) => {
                setRm(e.target.value);
                if (erros.rm) setErros({ ...erros, rm: null });
              }}
              placeholder="Digite seu RM"
              className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl text-slate-900 text-base font-medium focus:outline-none focus:ring-2 transition ${
                erros.rm 
                  ? 'border-red-400 focus:ring-red-500' 
                  : 'border-slate-300 focus:ring-red-500'
              }`}
            />
            {erros.rm && (
              <p className="text-sm font-semibold text-red-600 mt-1.5 flex items-center space-x-1.5">
                <AlertCircle size={16} />
                <span>{erros.rm}</span>
              </p>
            )}
          </div>

          {/* Campo Senha */}
          <div>
            <label className="block text-base font-bold text-slate-800 mb-2">
              Senha de Acesso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={22} className="text-slate-400" />
              </div>
              <input
                type="password"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  if (erros.senha) setErros({ ...erros, senha: null });
                }}
                placeholder="••••••••"
                className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-slate-900 text-base font-medium focus:outline-none focus:ring-2 transition ${
                  erros.senha 
                    ? 'border-red-400 focus:ring-red-500' 
                    : 'border-slate-300 focus:ring-red-500'
                }`}
              />
            </div>
            {erros.senha && (
              <p className="text-sm font-semibold text-red-600 mt-1.5 flex items-center space-x-1.5">
                <AlertCircle size={16} />
                <span>{erros.senha}</span>
              </p>
            )}
          </div>

          {/* Botão Entrar Vermelho Grande */}
          <button
            type="submit"
            className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold py-4 px-6 rounded-xl transition duration-150 shadow-sm text-base sm:text-lg active:scale-[0.99] mt-2 cursor-pointer"
          >
            Entrar
          </button>
        </form>

        {/* Seletor Rápido de Perfil */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center mb-4 font-bold">
            Entrar no modo de teste:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setPapelSelecionado('student');
                aoLogar('student', { rm });
              }}
              className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold border-2 transition cursor-pointer ${
                papelSelecionado === 'student'
                  ? 'bg-red-50 text-red-700 border-red-300 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <GraduationCap size={18} />
              <span>Área do Aluno</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setPapelSelecionado('admin');
                aoLogar('admin', { rm });
              }}
              className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold border-2 transition cursor-pointer ${
                papelSelecionado === 'admin'
                  ? 'bg-red-50 text-red-700 border-red-300 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck size={18} />
              <span>Área do Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rodapé informativo */}
      <footer className="mt-12 text-center text-sm font-medium text-slate-500">
        Centro Paula Souza • Etec Antônio Furlan — Barueri/SP
      </footer>
    </div>
  );
}
