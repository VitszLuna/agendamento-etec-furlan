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
  GraduationCap, 
  Users, 
  Settings, 
  Moon, 
  Sun 
} from 'lucide-react';

export default function Cabecalho({ 
  perfilUsuario, 
  abaAtiva, 
  aoMudarAba, 
  aoDeslogar, 
  aoAlternarPerfil, 
  aoAbrirPerfil, 
  aoAbrirConfiguracoes, 
  darkMode, 
  setDarkMode 
}) {
  const [menuAberto, setMenuAberto] = useState(false);

  const obterDadosUsuario = () => {
    switch (perfilUsuario) {
      case 'admin':
        return {
          nome: 'Pietro Rossi',
          emailExibicao: 'pietro@etec...',
          emailCompleto: 'pietro.rossi@etec.sp.gov.br',
          etiqueta: 'Secretaria Acadêmica',
          papelBadge: 'Secretaria / Admin',
          badgeEstilo: 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900',
          inicial: 'P'
        };
      case 'guardian':
        return {
          nome: 'Vitoria Mendes',
          emailExibicao: 'vitoria@email...',
          emailCompleto: 'vitoria.mendes@email.com',
          etiqueta: 'Área do Responsável',
          papelBadge: 'Responsável Legal',
          badgeEstilo: 'bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-700',
          inicial: 'V'
        };
      case 'student':
      default:
        return {
          nome: 'Laura Ferreira',
          emailExibicao: 'laura@etec...',
          emailCompleto: 'laura.ferreira@etec.sp.gov.br',
          etiqueta: 'Área do Aluno',
          papelBadge: 'Aluna da Etec',
          badgeEstilo: 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800',
          inicial: 'L'
        };
    }
  };

  const dadosUsuario = obterDadosUsuario();

  const tabCls = (aba) =>
    `flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 py-3 sm:py-3.5 text-xs sm:text-sm font-bold border-b-4 transition cursor-pointer whitespace-nowrap ${
      abaAtiva === aba
        ? 'border-[#b91c1c] text-[#b91c1c]'
        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700'
    }`;

  const alternarTema = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm w-full max-w-full transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <div className="flex items-center gap-2.5 bg-white px-3 py-1.5 rounded-xl shadow-xs border border-slate-200 flex-shrink-0">
              <img
                src="/etec.png"
                alt="Etec Antônio Furlan"
                className="h-6 sm:h-8 object-contain"
                onError={(e) => {
                  if (!e.target.dataset.triedWebp) {
                    e.target.dataset.triedWebp = 'true';
                    e.target.src = '/etec.webp';
                  }
                }}
              />
              <span className="h-4 w-px bg-slate-300"></span>
              <img
                src="/cps.png"
                alt="Centro Paula Souza"
                className="h-6 sm:h-8 object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block flex-shrink-0" />

            <div className="min-w-0 hidden sm:block">
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 leading-tight truncate">
                Agendamento de Atendimento
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-semibold truncate">
                Etec Antônio Furlan · {dadosUsuario.etiqueta}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={alternarTema}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer bg-slate-50 dark:bg-slate-800/80 shadow-xs"
              title={darkMode ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
              aria-label="Alternar modo escuro"
            >
              {darkMode ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} className="text-slate-700 dark:text-slate-300" />}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuAberto(!menuAberto)}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:text-slate-950 focus:outline-none p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                aria-label="Menu do usuário"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#b91c1c] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm flex-shrink-0">
                  {dadosUsuario.inicial}
                </div>
                <div className="hidden sm:flex flex-col text-left max-w-[120px]">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-xs leading-tight truncate">
                    {dadosUsuario.nome.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                    {dadosUsuario.etiqueta}
                  </span>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${menuAberto ? 'rotate-180' : ''}`} />
              </button>

              {menuAberto && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuAberto(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#b91c1c] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {dadosUsuario.inicial}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{dadosUsuario.nome}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{dadosUsuario.emailCompleto}</p>
                          <span className={`inline-block mt-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${dadosUsuario.badgeEstilo}`}>
                            {dadosUsuario.papelBadge}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-1.5 text-xs sm:text-sm">
                      {perfilUsuario !== 'admin' && (
                        <button
                          type="button"
                          onClick={() => { setMenuAberto(false); aoAbrirPerfil(); }}
                          className="w-full text-left px-4 py-2.5 font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition cursor-pointer"
                        >
                          <User size={16} className="text-slate-500" />
                          <span>Meu Perfil</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => { setMenuAberto(false); aoAbrirConfiguracoes(); }}
                        className="w-full text-left px-4 py-2.5 font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition cursor-pointer"
                      >
                        <Settings size={16} className="text-[#b91c1c]" />
                        <span>Configurações da Secretaria</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { alternarTema(); setMenuAberto(false); }}
                        className="w-full text-left px-4 py-2.5 font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition cursor-pointer"
                      >
                        {darkMode
                          ? <Sun size={16} className="text-amber-400" />
                          : <Moon size={16} className="text-slate-700" />
                        }
                        <span>{darkMode ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}</span>
                      </button>

                      <div className="my-1.5 border-t border-slate-100 dark:border-slate-800 px-4 pt-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        Trocar perfil de teste:
                      </div>

                      {perfilUsuario !== 'student' && (
                        <button
                          type="button"
                          onClick={() => { aoAlternarPerfil('student'); setMenuAberto(false); }}
                          className="w-full text-left px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition cursor-pointer"
                        >
                          <GraduationCap size={15} className="text-[#b91c1c]" />
                          <span>Aluna — <strong>Laura</strong></span>
                        </button>
                      )}
                      {perfilUsuario !== 'guardian' && (
                        <button
                          type="button"
                          onClick={() => { aoAlternarPerfil('guardian'); setMenuAberto(false); }}
                          className="w-full text-left px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition cursor-pointer"
                        >
                          <Users size={15} className="text-amber-600" />
                          <span>Responsável — <strong>Vitoria</strong></span>
                        </button>
                      )}
                      {perfilUsuario !== 'admin' && (
                        <button
                          type="button"
                          onClick={() => { aoAlternarPerfil('admin'); setMenuAberto(false); }}
                          className="w-full text-left px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 transition cursor-pointer"
                        >
                          <ShieldCheck size={15} className="text-slate-600 dark:text-slate-400" />
                          <span>Secretaria — <strong>Pietro</strong></span>
                        </button>
                      )}

                      <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />
                      <button
                        type="button"
                        onClick={() => { setMenuAberto(false); aoDeslogar(); }}
                        className="w-full text-left px-4 py-2.5 font-bold text-red-700 hover:bg-red-50 dark:hover:bg-red-950 flex items-center gap-2.5 transition cursor-pointer"
                      >
                        <LogOut size={16} />
                        <span>Sair do sistema</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800">
        <nav className="flex items-center justify-between sm:justify-start sm:gap-6 -mb-px w-full overflow-hidden">
          {perfilUsuario === 'admin' && (
            <>
              <button type="button" onClick={() => aoMudarAba('agenda')} className={tabCls('agenda')}>
                <LayoutGrid size={15} />
                <span>Agenda</span>
              </button>
              <button type="button" onClick={() => aoMudarAba('disponibilidade')} className={tabCls('disponibilidade')}>
                <Clock size={15} />
                <span>Horários</span>
              </button>
              <button type="button" onClick={() => aoMudarAba('configuracoes')} className={tabCls('configuracoes')}>
                <Settings size={15} />
                <span>Config.</span>
              </button>
            </>
          )}

          {perfilUsuario === 'guardian' && (
            <>
              <button type="button" onClick={() => aoMudarAba('inicio')} className={tabCls('inicio')}>
                <Home size={15} />
                <span>Início</span>
              </button>
              <button type="button" onClick={() => aoMudarAba('agendar')} className={tabCls('agendar')}>
                <Calendar size={15} />
                <span>Agendar</span>
              </button>
              <button type="button" onClick={() => aoMudarAba('meus-agendamentos')} className={tabCls('meus-agendamentos')}>
                <CalendarDays size={15} />
                <span>Atendimentos</span>
              </button>
              <button type="button" onClick={() => aoMudarAba('ajuda')} className={tabCls('ajuda')}>
                <HelpCircle size={15} />
                <span>Ajuda</span>
              </button>
            </>
          )}

          {perfilUsuario === 'student' && (
            <>
              <button type="button" onClick={() => aoMudarAba('inicio')} className={tabCls('inicio')}>
                <Home size={15} />
                <span>Início</span>
              </button>
              <button type="button" onClick={() => aoMudarAba('agendar')} className={tabCls('agendar')}>
                <Calendar size={15} />
                <span>Agendar</span>
              </button>
              <button type="button" onClick={() => aoMudarAba('meus-agendamentos')} className={tabCls('meus-agendamentos')}>
                <CalendarDays size={15} />
                <span>Agendados</span>
              </button>
              <button type="button" onClick={() => aoMudarAba('ajuda')} className={tabCls('ajuda')}>
                <HelpCircle size={15} />
                <span>Ajuda</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
