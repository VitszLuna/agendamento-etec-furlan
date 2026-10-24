import React, { useState, useEffect, useRef } from 'react';
import Cabecalho from './components/Cabecalho';
import TelaLogin from './components/TelaLogin';
import AdminAgenda from './components/AdminAgenda';
import AdminDisponibilidade from './components/AdminDisponibilidade';
import AdminConfiguracoes from './components/AdminConfiguracoes';
import AlunoInicio from './components/AlunoInicio';
import AlunoCatalogoServicos from './components/AlunoCatalogoServicos';
import AlunoDetalhesServico from './components/AlunoDetalhesServico';
import AlunoAgendamentoEtapas from './components/AlunoAgendamentoEtapas';
import AlunoMeusAgendamentos from './components/AlunoMeusAgendamentos';
import AlunoAjuda from './components/AlunoAjuda';
import AlunoPerfil from './components/AlunoPerfil';
import ModalDetalhesAtendimento from './components/ModalDetalhesAtendimento';

import {
  INITIAL_APPOINTMENTS,
  INITIAL_AVAILABILITY,
  INITIAL_BLOCKED_PERIODS,
  INITIAL_STUDENT_NEXT_APPOINTMENT,
  INITIAL_STUDENT_PROFILE,
  INITIAL_GUARDIAN_PROFILE,
  INITIAL_SETTINGS,
  ALL_SERVICES
} from './data/mockData';

export default function App() {
  const [perfilUsuario, setPerfilUsuario] = useState('guest');
  const [abaAtiva, setAbaAtiva] = useState('inicio');
  const [subTelaAluno, setSubTelaAluno] = useState('inicio');
  const [servicoSelecionado, setServicoSelecionado] = useState(ALL_SERVICES[0]);

  const [agendamentosGerais, setAgendamentosGerais] = useState(INITIAL_APPOINTMENTS);
  const [disponibilidadeSemanal, setDisponibilidadeSemanal] = useState(INITIAL_AVAILABILITY);
  const [periodosBloqueados, setPeriodosBloqueados] = useState(INITIAL_BLOCKED_PERIODS);
  const [configuracoesSistema, setConfiguracoesSistema] = useState(INITIAL_SETTINGS);
  const [dadosAluno, setDadosAluno] = useState(INITIAL_STUDENT_PROFILE);
  const [dadosResponsavel, setDadosResponsavel] = useState(INITIAL_GUARDIAN_PROFILE);
  const [proximoAgendamento, setProximoAgendamento] = useState(INITIAL_STUDENT_NEXT_APPOINTMENT);
  const [agendamentosDoAluno, setAgendamentosDoAluno] = useState([INITIAL_STUDENT_NEXT_APPOINTMENT]);
  const [atendimentoDetalhes, setAtendimentoDetalhes] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('etec-dark') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const rootEl = document.documentElement;
    const bodyEl = document.body;
    if (darkMode) {
      rootEl.classList.add('dark');
      bodyEl.classList.add('dark');
      rootEl.setAttribute('data-theme', 'dark');
    } else {
      rootEl.classList.remove('dark');
      bodyEl.classList.remove('dark');
      rootEl.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('etec-dark', darkMode ? 'true' : 'false');
  }, [darkMode]);

  const mainRef = useRef(null);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };

  const aoLogar = (papel) => {
    setPerfilUsuario(papel);
    if (papel === 'admin') {
      setAbaAtiva('agenda');
    } else {
      setAbaAtiva('inicio');
      setSubTelaAluno('inicio');
    }
    scrollToTop();
  };

  const aoDeslogar = () => {
    setPerfilUsuario('guest');
    setAbaAtiva('inicio');
    setSubTelaAluno('inicio');
    scrollToTop();
  };

  const aoAlternarPerfil = (novoPapel) => {
    setPerfilUsuario(novoPapel);
    if (novoPapel === 'admin') {
      setAbaAtiva('agenda');
    } else {
      setAbaAtiva('inicio');
      setSubTelaAluno('inicio');
    }
    scrollToTop();
  };

  const aoAbrirConfiguracoes = () => {
    if (perfilUsuario !== 'admin') setPerfilUsuario('admin');
    setAbaAtiva('configuracoes');
    scrollToTop();
  };

  const aoMudarAba = (aba) => {
    setAbaAtiva(aba);
    if (perfilUsuario === 'student' || perfilUsuario === 'guardian') {
      if (aba === 'inicio') setSubTelaAluno('inicio');
      else if (aba === 'agendar') setSubTelaAluno('catalogo');
      else if (aba === 'meus-agendamentos') setSubTelaAluno('meus-agendamentos');
      else if (aba === 'ajuda') setSubTelaAluno('ajuda');
    }
    scrollToTop();
  };

  const aoAtualizarStatus = (idAgendamento, novoStatus) => {
    setAgendamentosGerais((prev) =>
      prev.map((app) =>
        app.id === idAgendamento ? { ...app, status: novoStatus } : app
      )
    );
    if (proximoAgendamento && proximoAgendamento.id === idAgendamento) {
      setProximoAgendamento((prev) => ({ ...prev, status: novoStatus }));
    }
    setAgendamentosDoAluno((prev) =>
      prev.map((app) =>
        app.id === idAgendamento ? { ...app, status: novoStatus } : app
      )
    );
  };

  const aoSelecionarServico = (servico) => {
    setServicoSelecionado(servico);
    setAbaAtiva('agendar');
    setSubTelaAluno('detalhes-servico');
    scrollToTop();
  };

  const aoIniciarAgendamento = (tituloServico = '') => {
    setAbaAtiva('agendar');
    if (tituloServico) {
      const s = ALL_SERVICES.find(
        (sv) => sv.title.toLowerCase() === tituloServico.toLowerCase()
      );
      if (s) {
        setServicoSelecionado(s);
        setSubTelaAluno('detalhes-servico');
        scrollToTop();
        return;
      }
    }
    setSubTelaAluno('catalogo');
    scrollToTop();
  };

  const aoAvancarParaEtapas = (servico) => {
    setServicoSelecionado(servico);
    setSubTelaAluno('wizard-etapas');
    scrollToTop();
  };

  const aoConcluirAgendamento = (novoAtendimento) => {
    setProximoAgendamento(novoAtendimento);
    setAgendamentosDoAluno((prev) => [novoAtendimento, ...prev]);
    setAgendamentosGerais((prev) => [
      {
        id: novoAtendimento.id,
        horario: novoAtendimento.horario,
        aluno: novoAtendimento.aluno,
        curso: novoAtendimento.curso,
        rm: novoAtendimento.rm,
        servico: novoAtendimento.servico,
        status: novoAtendimento.status,
        data: novoAtendimento.data,
        observacao: novoAtendimento.observacao
      },
      ...prev
    ]);
    scrollToTop();
  };

  const aoCancelarAgendamento = (idAgendamento) => {
    aoAtualizarStatus(idAgendamento, 'Cancelado');
    if (proximoAgendamento && proximoAgendamento.id === idAgendamento) {
      setProximoAgendamento(null);
    }
  };

  const aoSalvarPerfil = (novosDados) => {
    setDadosAluno(novosDados);
  };

  if (perfilUsuario === 'guest') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <TelaLogin aoLogar={aoLogar} darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    );
  }

  const dadosParaAgendamento =
    perfilUsuario === 'guardian'
      ? {
          nome: dadosResponsavel.alunoVinculado.nome,
          rm: dadosResponsavel.alunoVinculado.rm,
          turma: dadosResponsavel.alunoVinculado.turma,
          curso: dadosResponsavel.alunoVinculado.curso,
          email: dadosAluno.email,
          telefone: dadosAluno.telefone,
          nomeResponsavel: dadosResponsavel.nome,
          cinResponsavel: dadosResponsavel.cin,
          parentescoResponsavel: dadosResponsavel.parentesco,
          telefoneResponsavel: dadosResponsavel.telefone
        }
      : dadosAluno;

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-['Inter',sans-serif] text-base w-full max-w-full overflow-x-hidden transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <Cabecalho
        perfilUsuario={perfilUsuario}
        abaAtiva={abaAtiva}
        aoMudarAba={aoMudarAba}
        aoDeslogar={aoDeslogar}
        aoAlternarPerfil={aoAlternarPerfil}
        aoAbrirPerfil={() => { setSubTelaAluno('perfil'); scrollToTop(); }}
        aoAbrirConfiguracoes={aoAbrirConfiguracoes}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main ref={mainRef} className="flex-1 pb-16 sm:pb-20 w-full max-w-full overflow-x-hidden">
        {perfilUsuario === 'admin' && (
          <>
            {abaAtiva === 'agenda' && (
              <AdminAgenda
                agendamentos={agendamentosGerais}
                aoAtualizarStatus={aoAtualizarStatus}
                aoAbrirDetalhes={(app) => setAtendimentoDetalhes(app)}
              />
            )}
            {abaAtiva === 'disponibilidade' && (
              <AdminDisponibilidade
                disponibilidade={disponibilidadeSemanal}
                aoAtualizarDisponibilidade={setDisponibilidadeSemanal}
                periodosBloqueados={periodosBloqueados}
                aoAtualizarPeriodosBloqueados={setPeriodosBloqueados}
              />
            )}
            {abaAtiva === 'configuracoes' && (
              <AdminConfiguracoes
                configuracoes={configuracoesSistema}
                aoSalvarConfiguracoes={setConfiguracoesSistema}
                aoAlternarPerfil={aoAlternarPerfil}
              />
            )}
          </>
        )}

        {(perfilUsuario === 'student' || perfilUsuario === 'guardian') && (
          <>
            {subTelaAluno === 'inicio' && (
              <AlunoInicio
                proximoAtendimento={proximoAgendamento}
                aoIniciarAgendamento={aoIniciarAgendamento}
                aoAbrirDetalhes={(app) => setAtendimentoDetalhes(app)}
                aoNavegarAba={(aba) => {
                  if (aba === 'agendar') aoIniciarAgendamento();
                  else aoMudarAba(aba);
                }}
                isGuardian={perfilUsuario === 'guardian'}
                alunoVinculado={dadosResponsavel.alunoVinculado}
                dadosAluno={dadosAluno}
                dadosResponsavel={dadosResponsavel}
              />
            )}
            {subTelaAluno === 'catalogo' && (
              <AlunoCatalogoServicos
                aoSelecionarServico={aoSelecionarServico}
                aoNavegarParaInicio={() => {
                  setAbaAtiva('inicio');
                  setSubTelaAluno('inicio');
                  scrollToTop();
                }}
              />
            )}
            {subTelaAluno === 'detalhes-servico' && (
              <AlunoDetalhesServico
                servico={servicoSelecionado}
                aoVoltarParaCatalogo={() => { setSubTelaAluno('catalogo'); scrollToTop(); }}
                aoAvancarParaAgendamento={aoAvancarParaEtapas}
              />
            )}
            {subTelaAluno === 'wizard-etapas' && (
              <AlunoAgendamentoEtapas
                servico={servicoSelecionado}
                dadosAluno={dadosParaAgendamento}
                aoCancelar={() => { setSubTelaAluno('detalhes-servico'); scrollToTop(); }}
                aoConcluirAgendamento={aoConcluirAgendamento}
                aoMudarAba={(aba) => {
                  setAbaAtiva(aba);
                  if (aba === 'inicio') setSubTelaAluno('inicio');
                  else if (aba === 'meus-agendamentos') setSubTelaAluno('meus-agendamentos');
                  scrollToTop();
                }}
              />
            )}
            {subTelaAluno === 'meus-agendamentos' && (
              <AlunoMeusAgendamentos
                agendamentos={agendamentosDoAluno}
                aoIniciarAgendamento={aoIniciarAgendamento}
                aoAbrirDetalhes={(app) => setAtendimentoDetalhes(app)}
                aoCancelarAgendamento={aoCancelarAgendamento}
              />
            )}
            {subTelaAluno === 'ajuda' && <AlunoAjuda />}
            {subTelaAluno === 'perfil' && (
              <AlunoPerfil
                dadosPerfil={dadosAluno}
                aoSalvarPerfil={aoSalvarPerfil}
                aoVoltar={() => { setSubTelaAluno('inicio'); scrollToTop(); }}
              />
            )}
          </>
        )}
      </main>

      <ModalDetalhesAtendimento
        estaAberto={Boolean(atendimentoDetalhes)}
        atendimento={atendimentoDetalhes}
        aoFechar={() => setAtendimentoDetalhes(null)}
        aoCancelarAtendimento={aoCancelarAgendamento}
      />

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 w-full max-w-full">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <img src="/etec.png" alt="Etec Antônio Furlan" className="h-6 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
            <span className="h-4 w-px bg-slate-200"></span>
            <img src="/cps.png" alt="Centro Paula Souza" className="h-6 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
          </div>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-center">
            Etec Antônio Furlan — Secretaria Acadêmica
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Rua João Batista Soares, 440 - Novo Centro Comercial de Barueri - Barueri/SP - CEP: 06401-135
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Atendimento presencial: Secretaria Acadêmica — Seg a Sex, 08h às 16h
          </p>
          <div className="mt-1 pt-3 border-t border-slate-100 dark:border-slate-800 w-full text-center">
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              © 2026 LV2PL · Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
