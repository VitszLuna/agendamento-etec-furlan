import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Home, 
  HelpCircle, 
  CalendarDays, 
  LayoutGrid, 
  ChevronDown, 
  LogOut,
  User,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

/**
 * Componente do Cabeçalho e Barra de Navegação Superior
 * Adaptado com foco em acessibilidade: abas amplas, fontes legíveis e ícones bem dimensionados.
 */
export default function Cabecalho({ 
  perfilUsuario, 
  abaAtiva, 
  aoMudarAba, 
  aoDeslogar, 
  aoAlternarPerfil,
  aoAbrirPerfil
}) {
  const [menuAberto, setMenuAberto] = useState(false);

  const dadosUsuario = perfilUsuario === 'admin' 
    ? {
        nome: 'Débora (Administradora)',
        emailExibicao: 'deboraadmin@em...',
        emailCompleto: 'deboraadmin@etec.sp.gov.br',
        etiqueta: 'Área do funcionário',
        inicial: 'D'
      }
    : {
        nome: 'Débora Oliveira',
        emailExibicao: 'debora@email.com',
        emailCompleto: 'debora@email.com',
        etiqueta: 'Área do aluno',
        inicial: 'D'
      };

  return (
    <header className="bg-white border-b-2 border-slate-200 sticky top-0 z-30 shadow-xs">
      
      {/* Linha Superior: Logos, Título e Menu do Usuário */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Lado Esquerdo: Logos Oficiais Etec e CPS */}
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-4">
              <img 
                src="/etec.png" 
                alt="Etec Antônio Furlan Barueri" 
                className="h-10 md:h-11 object-contain"
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
                className="h-10 md:h-11 object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            <div className="h-8 w-[2px] bg-slate-300 hidden sm:block"></div>

            {/* Título do Sistema */}
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                Agendamento de Atendimento
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                {dadosUsuario.etiqueta}
              </p>
            </div>
          </div>

          {/* Lado Direito: Perfil do Usuário */}
          <div className="relative">
            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="flex items-center space-x-3 text-sm sm:text-base text-slate-800 hover:text-slate-950 focus:outline-none p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              aria-label="Menu do usuário"
            >
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
                {dadosUsuario.inicial}
              </div>
              <span className="hidden md:inline font-bold text-slate-800 text-base">
                {dadosUsuario.emailExibicao}
              </span>
              <ChevronDown size={20} className={`text-slate-600 transition-transform ${menuAberto ? 'rotate-180' : ''}`} />
            </button>

            {menuAberto && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setMenuAberto(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border-2 border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-5 py-3 border-b border-slate-100">
                    <p className="text-base font-bold text-slate-900">{dadosUsuario.nome}</p>
                    <p className="text-xs text-slate-500 font-medium truncate">{dadosUsuario.emailCompleto}</p>
                    <span className="inline-block mt-1.5 text-xs font-bold px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                      {perfilUsuario === 'admin' ? 'Administrador / Funcionário' : 'Aluno da Etec'}
                    </span>
                  </div>

                  <div className="py-2">
                    {perfilUsuario === 'student' && (
                      <button
                        onClick={() => {
                          setMenuAberto(false);
                          aoAbrirPerfil();
                        }}
                        className="w-full text-left px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-100 flex items-center space-x-3 transition cursor-pointer"
                      >
                        <User size={18} className="text-slate-600" />
                        <span>Meu Perfil de Aluno</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        aoAlternarPerfil(perfilUsuario === 'admin' ? 'student' : 'admin');
                        setMenuAberto(false);
                      }}
                      className="w-full text-left px-5 py-3 text-sm font-bold text-slate-800 hover:bg-slate-100 flex items-center space-x-3 transition cursor-pointer"
                    >
                      {perfilUsuario === 'admin' ? (
                        <>
                          <GraduationCap size={18} className="text-red-700" />
                          <span>Alternar para <strong>Área do Aluno</strong></span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={18} className="text-red-700" />
                          <span>Alternar para <strong>Área do Funcionário</strong></span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setMenuAberto(false);
                        aoDeslogar();
                      }}
                      className="w-full text-left px-5 py-3 text-sm font-bold text-red-700 hover:bg-red-50 flex items-center space-x-3 transition cursor-pointer"
                    >
                      <LogOut size={18} />
                      <span>Sair do sistema</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Linha Inferior: Abas de Navegação Acessíveis */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8 sm:space-x-10 -mb-px">
          {perfilUsuario === 'admin' ? (
            <>
              <button
                onClick={() => aoMudarAba('agenda')}
                className={`flex items-center space-x-2.5 py-4 text-base font-bold border-b-4 transition-colors cursor-pointer ${
                  abaAtiva === 'agenda'
                    ? 'border-[#b91c1c] text-[#b91c1c]'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <LayoutGrid size={20} />
                <span>Agenda</span>
              </button>

              <button
                onClick={() => aoMudarAba('disponibilidade')}
                className={`flex items-center space-x-2.5 py-4 text-base font-bold border-b-4 transition-colors cursor-pointer ${
                  abaAtiva === 'disponibilidade'
                    ? 'border-[#b91c1c] text-[#b91c1c]'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Clock size={20} />
                <span>Disponibilidade</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => aoMudarAba('inicio')}
                className={`flex items-center space-x-2.5 py-4 text-base font-bold border-b-4 transition-colors cursor-pointer ${
                  abaAtiva === 'inicio'
                    ? 'border-[#b91c1c] text-[#b91c1c]'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Home size={20} />
                <span>Início</span>
              </button>

              <button
                onClick={() => aoMudarAba('agendar')}
                className={`flex items-center space-x-2.5 py-4 text-base font-bold border-b-4 transition-colors cursor-pointer ${
                  abaAtiva === 'agendar'
                    ? 'border-[#b91c1c] text-[#b91c1c]'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Calendar size={20} />
                <span>Agendar</span>
              </button>

              <button
                onClick={() => aoMudarAba('meus-agendamentos')}
                className={`flex items-center space-x-2.5 py-4 text-base font-bold border-b-4 transition-colors cursor-pointer ${
                  abaAtiva === 'meus-agendamentos'
                    ? 'border-[#b91c1c] text-[#b91c1c]'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <CalendarDays size={20} />
                <span>Meus Agendamentos</span>
              </button>

              <button
                onClick={() => aoMudarAba('ajuda')}
                className={`flex items-center space-x-2.5 py-4 text-base font-bold border-b-4 transition-colors cursor-pointer ${
                  abaAtiva === 'ajuda'
                    ? 'border-[#b91c1c] text-[#b91c1c]'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <HelpCircle size={20} />
                <span>Ajuda</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
