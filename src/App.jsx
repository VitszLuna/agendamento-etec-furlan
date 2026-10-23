import React, { useState } from 'react';
import Cabecalho from './components/Cabecalho';
import TelaLogin from './components/TelaLogin';
import AdminAgenda from './components/AdminAgenda';
import AdminDisponibilidade from './components/AdminDisponibilidade';
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
  ALL_SERVICES
} from './data/mockData';

/**
 * Componente Principal da Aplicação
 * Gerencia o estado e navegação completa do sistema.
 * Código 100% em Português com validações e acessibilidade.
 */
export default function App() {
  // Perfil autenticado: 'guest' (login), 'admin' (funcionário) ou 'student' (aluno)
  const [perfilUsuario, setPerfilUsuario] = useState('guest');

  // Aba selecionada no menu superior: 'inicio' | 'agenda' | 'disponibilidade' | 'agendar' | 'meus-agendamentos' | 'ajuda'
  const [abaAtiva, setAbaAtiva] = useState('inicio');

  // Subtela interna da área do aluno: 'inicio' | 'catalogo' | 'detalhes-servico' | 'wizard-etapas' | 'meus-agendamentos' | 'ajuda' | 'perfil'
  const [subTelaAluno, setSubTelaAluno] = useState('inicio');

  // Serviço em foco para consulta ou agendamento
  const [servicoSelecionado, setServicoSelecionado] = useState(ALL_SERVICES[0]);

  // Lista geral de agendamentos da Secretaria (Admin)
  const [agendamentosGerais, setAgendamentosGerais] = useState(INITIAL_APPOINTMENTS);

  // Disponibilidade configurada pela Secretaria
  const [disponibilidadeSemanal, setDisponibilidadeSemanal] = useState(INITIAL_AVAILABILITY);

  // Períodos e datas bloqueados pela administração
  const [periodosBloqueados, setPeriodosBloqueados] = useState(INITIAL_BLOCKED_PERIODS);

  // Dados do perfil do aluno (editável e com validação)
  const [dadosAluno, setDadosAluno] = useState(INITIAL_STUDENT_PROFILE);

  // Próximo agendamento ativo da aluna Débora
  const [proximoAgendamento, setProximoAgendamento] = useState(INITIAL_STUDENT_NEXT_APPOINTMENT);

  // Lista de agendamentos do aluno
  const [agendamentosDoAluno, setAgendamentosDoAluno] = useState([
    INITIAL_STUDENT_NEXT_APPOINTMENT
  ]);

  // Agendamento aberto no modal de detalhes
  const [atendimentoDetalhes, setAtendimentoDetalhes] = useState(null);

  // Manipulador de Login
  const aoLogar = (papel) => {
    setPerfilUsuario(papel);
    if (papel === 'admin') {
      setAbaAtiva('agenda');
    } else {
      setAbaAtiva('inicio');
      setSubTelaAluno('inicio');
    }
  };

  // Manipulador de Logout
  const aoDeslogar = () => {
    setPerfilUsuario('guest');
    setAbaAtiva('inicio');
    setSubTelaAluno('inicio');
  };

  // Alternar diretamente entre perfis
  const aoAlternarPerfil = (novoPapel) => {
    setPerfilUsuario(novoPapel);
    if (novoPapel === 'admin') {
      setAbaAtiva('agenda');
    } else {
      setAbaAtiva('inicio');
      setSubTelaAluno('inicio');
    }
  };

  // Navegação entre abas principais
  const aoMudarAba = (aba) => {
    setAbaAtiva(aba);
    if (perfilUsuario === 'student') {
      if (aba === 'inicio') setSubTelaAluno('inicio');
      else if (aba === 'agendar') setSubTelaAluno('catalogo');
      else if (aba === 'meus-agendamentos') setSubTelaAluno('meus-agendamentos');
      else if (aba === 'ajuda') setSubTelaAluno('ajuda');
    }
  };

  // Atualizar o status de um atendimento pelo administrador
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

  // Selecionar serviço para ver tela de detalhes
  const aoSelecionarServico = (servico) => {
    setServicoSelecionado(servico);
    setAbaAtiva('agendar');
    setSubTelaAluno('detalhes-servico');
  };

  // Iniciar agendamento
  const aoIniciarAgendamento = (tituloServico = '') => {
    setAbaAtiva('agendar');
    if (tituloServico) {
      const servicoEncontrado = ALL_SERVICES.find(
        (s) => s.title.toLowerCase() === tituloServico.toLowerCase()
      );
      if (servicoEncontrado) {
        setServicoSelecionado(servicoEncontrado);
        setSubTelaAluno('detalhes-servico');
        return;
      }
    }
    setSubTelaAluno('catalogo');
  };

  // Avançar para o wizard de agendamento em etapas
  const aoAvancarParaEtapas = (servico) => {
    setServicoSelecionado(servico);
    setSubTelaAluno('wizard-etapas');
  };

  // Concluir agendamento no wizard
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
  };

  // Cancelar atendimento agendado
  const aoCancelarAgendamento = (idAgendamento) => {
    aoAtualizarStatus(idAgendamento, 'Cancelado');
    if (proximoAgendamento && proximoAgendamento.id === idAgendamento) {
      setProximoAgendamento(null);
    }
  };

  // Salvar perfil do aluno com validação
  const aoSalvarPerfil = (novosDados) => {
    setDadosAluno(novosDados);
  };

  // Se o usuário não estiver autenticado, exibe a tela de login
  if (perfilUsuario === 'guest') {
    return <TelaLogin aoLogar={aoLogar} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-['Inter',sans-serif] text-base">
      
      {/* Cabeçalho da Aplicação */}
      <Cabecalho
        perfilUsuario={perfilUsuario}
        abaAtiva={abaAtiva}
        aoMudarAba={aoMudarAba}
        aoDeslogar={aoDeslogar}
        aoAlternarPerfil={aoAlternarPerfil}
        aoAbrirPerfil={() => setSubTelaAluno('perfil')}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 pb-20">
        
        {/* ======================= ÁREA DO ADMINISTRADOR ======================= */}
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
          </>
        )}

        {/* ======================= ÁREA DO ALUNO ======================= */}
        {perfilUsuario === 'student' && (
          <>
            {/* 1. Tela Inicial do Aluno */}
            {subTelaAluno === 'inicio' && (
              <AlunoInicio
                proximoAtendimento={proximoAgendamento}
                aoIniciarAgendamento={aoIniciarAgendamento}
                aoAbrirDetalhes={(app) => setAtendimentoDetalhes(app)}
                aoNavegarAba={(aba) => {
                  if (aba === 'agendar') aoIniciarAgendamento();
                  else aoMudarAba(aba);
                }}
              />
            )}

            {/* 2. Catálogo de Serviços */}
            {subTelaAluno === 'catalogo' && (
              <AlunoCatalogoServicos
                aoSelecionarServico={aoSelecionarServico}
                aoNavegarParaInicio={() => {
                  setAbaAtiva('inicio');
                  setSubTelaAluno('inicio');
                }}
              />
            )}

            {/* 3. Detalhes do Serviço Selecionado */}
            {subTelaAluno === 'detalhes-servico' && (
              <AlunoDetalhesServico
                servico={servicoSelecionado}
                aoVoltarParaCatalogo={() => setSubTelaAluno('catalogo')}
                aoAvancarParaAgendamento={aoAvancarParaEtapas}
              />
            )}

            {/* 4. Wizard em Etapas de Agendamento */}
            {subTelaAluno === 'wizard-etapas' && (
              <AlunoAgendamentoEtapas
                servico={servicoSelecionado}
                dadosAluno={dadosAluno}
                aoCancelar={() => setSubTelaAluno('detalhes-servico')}
                aoConcluirAgendamento={aoConcluirAgendamento}
                aoMudarAba={(aba) => {
                  setAbaAtiva(aba);
                  if (aba === 'inicio') setSubTelaAluno('inicio');
                  else if (aba === 'meus-agendamentos') setSubTelaAluno('meus-agendamentos');
                }}
              />
            )}

            {/* 5. Meus Agendamentos */}
            {subTelaAluno === 'meus-agendamentos' && (
              <AlunoMeusAgendamentos
                agendamentos={agendamentosDoAluno}
                aoIniciarAgendamento={aoIniciarAgendamento}
                aoAbrirDetalhes={(app) => setAtendimentoDetalhes(app)}
                aoCancelarAgendamento={aoCancelarAgendamento}
              />
            )}

            {/* 6. Ajuda e Dúvidas Frequentes */}
            {subTelaAluno === 'ajuda' && <AlunoAjuda />}

            {/* 7. Meu Perfil de Aluno */}
            {subTelaAluno === 'perfil' && (
              <AlunoPerfil
                dadosPerfil={dadosAluno}
                aoSalvarPerfil={aoSalvarPerfil}
                aoVoltar={() => setSubTelaAluno('inicio')}
              />
            )}
          </>
        )}

      </main>

      {/* Modal de Detalhes de Atendimento */}
      <ModalDetalhesAtendimento
        estaAberto={Boolean(atendimentoDetalhes)}
        atendimento={atendimentoDetalhes}
        aoFechar={() => setAtendimentoDetalhes(null)}
        aoCancelarAtendimento={aoCancelarAgendamento}
      />

      {/* Rodapé Acessível */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm font-medium text-slate-500">
        Etec Antônio Furlan • Centro Paula Souza — Sistema de Agendamento de Atendimento
      </footer>
    </div>
  );
}
