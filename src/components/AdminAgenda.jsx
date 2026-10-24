import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Check, 
  XCircle, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  CheckCircle2, 
  MessageCircle,
  Clock,
  User
} from 'lucide-react';

const normalizarData = (d) => {
  if (!d) return '';
  if (d.includes('/')) {
    const partes = d.split('/');
    if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    }
  }
  return d;
};

const formatarDataBr = (dataStr) => {
  if (!dataStr) return '';
  const iso = normalizarData(dataStr);
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
};

export default function AdminAgenda({ 
  agendamentos, 
  aoAtualizarStatus, 
  aoAbrirDetalhes 
}) {
  const [dataSelecionada, setDataSelecionada] = useState('2026-10-23');
  const [mesAtual, setMesAtual] = useState(9);
  const [anoAtual, setAnoAtual] = useState(2026);
  const [servicoSelecionado, setServicoSelecionado] = useState('Todos os serviços');
  const [statusSelecionado, setStatusSelecionado] = useState('Todos os status');
  const [modoVisualizacao, setModoVisualizacao] = useState('dia');
  const [idMenuStatusAberto, setIdMenuStatusAberto] = useState(null);
  const [alertaChamadaWhatsApp, setAlertaChamadaWhatsApp] = useState(null);

  const opcoesStatus = ['Agendado', 'Concluído', 'Cancelado'];
  const nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const metricas = useMemo(() => {
    const total = agendamentos.length;
    const agendados = agendamentos.filter(a => a.status === 'Agendado' || a.status === 'Confirmado').length;
    const concluidos = agendamentos.filter(a => a.status === 'Concluído').length;
    const cancelados = agendamentos.filter(a => a.status === 'Cancelado').length;
    return { total, agendados, concluidos, cancelados };
  }, [agendamentos]);

  const agendamentosFiltrados = useMemo(() => {
    return agendamentos.filter(app => {
      const bateServico = servicoSelecionado === 'Todos os serviços' || app.servico === servicoSelecionado;
      const bateStatus = statusSelecionado === 'Todos os status' || app.status === statusSelecionado;
      return bateServico && bateStatus;
    });
  }, [agendamentos, servicoSelecionado, statusSelecionado]);

  const agendamentosPorDia = useMemo(() => {
    const mapa = {};
    agendamentosFiltrados.forEach(app => {
      const chave = normalizarData(app.data);
      if (!mapa[chave]) mapa[chave] = [];
      mapa[chave].push(app);
    });
    return mapa;
  }, [agendamentosFiltrados]);

  const agendamentosDoDiaSelecionado = useMemo(() => {
    return agendamentosFiltrados.filter(app => normalizarData(app.data) === dataSelecionada);
  }, [agendamentosFiltrados, dataSelecionada]);

  const diasDoMes = useMemo(() => {
    const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();
    const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();
    return { primeiroDiaSemana, totalDias };
  }, [anoAtual, mesAtual]);

  const diasSemanaAtual = useMemo(() => {
    const partes = dataSelecionada.split('-');
    const base = new Date(parseInt(partes[0], 10), parseInt(partes[1], 10) - 1, parseInt(partes[2], 10));
    const diaSemana = base.getDay();
    const diffParaSegunda = diaSemana === 0 ? -6 : 1 - diaSemana;
    const segunda = new Date(base);
    segunda.setDate(base.getDate() + diffParaSegunda);

    const dias = [];
    const nomesSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    for (let i = 0; i < 6; i++) {
      const d = new Date(segunda);
      d.setDate(segunda.getDate() + i);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      dias.push({
        nome: nomesSemana[i],
        iso,
        dataFormatada: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
        diaNumero: d.getDate()
      });
    }
    return dias;
  }, [dataSelecionada]);

  const navegarMes = (direcao) => {
    if (direcao === 'anterior') {
      if (mesAtual === 0) {
        setMesAtual(11);
        setAnoAtual(prev => prev - 1);
      } else {
        setMesAtual(prev => prev - 1);
      }
    } else {
      if (mesAtual === 11) {
        setMesAtual(0);
        setAnoAtual(prev => prev + 1);
      } else {
        setMesAtual(prev => prev + 1);
      }
    }
  };

  const calcularTempoRestante = (dataStr, horaStr) => {
    if (!dataStr || !horaStr) return 'o seu horário previsto';

    try {
      let ano, mes, dia;
      if (dataStr.includes('-')) {
        const partes = dataStr.split('-');
        ano = parseInt(partes[0], 10);
        mes = parseInt(partes[1], 10) - 1;
        dia = parseInt(partes[2], 10);
      } else if (dataStr.includes('/')) {
        const partes = dataStr.split('/');
        dia = parseInt(partes[0], 10);
        mes = parseInt(partes[1], 10) - 1;
        ano = parseInt(partes[2], 10);
      } else {
        return `horário agendado para ${horaStr}`;
      }

      const apenasHora = horaStr.split('-')[0].trim();
      const partesHora = apenasHora.split(':');
      const hora = parseInt(partesHora[0], 10);
      const minuto = parseInt(partesHora[1] || '0', 10);

      const dataAlvo = new Date(ano, mes, dia, hora, minuto, 0);
      const agora = new Date();
      const diffMs = dataAlvo.getTime() - agora.getTime();

      if (isNaN(diffMs)) return `horário agendado para ${horaStr}`;

      if (diffMs <= 0) {
        const minPassados = Math.floor(Math.abs(diffMs) / (1000 * 60));
        if (minPassados <= 20) {
          return 'seu atendimento está iniciando agora na Secretaria Acadêmica';
        }
        return `horário previsto era às ${horaStr}`;
      }

      const totalMinutos = Math.floor(diffMs / (1000 * 60));
      const totalHoras = Math.floor(totalMinutos / 60);
      const totalDias = Math.floor(totalHoras / 24);

      if (totalDias >= 2) {
        return `faltam ${totalDias} dias para o atendimento`;
      } else if (totalDias === 1) {
        const hSobrando = totalHoras % 24;
        return hSobrando > 0
          ? `falta 1 dia e ${hSobrando}h para o atendimento`
          : 'falta 1 dia para o atendimento';
      } else if (totalHoras >= 1) {
        const minSobrando = totalMinutos % 60;
        return minSobrando > 0
          ? `faltam ${totalHoras}h e ${minSobrando}min para o atendimento`
          : `falta ${totalHoras} hora${totalHoras > 1 ? 's' : ''} para o atendimento`;
      } else if (totalMinutos > 1) {
        return `faltam ${totalMinutos} minutos para o atendimento`;
      } else if (totalMinutos === 1) {
        return 'falta 1 minuto para o atendimento';
      } else {
        return 'falta menos de 1 minuto para o atendimento';
      }
    } catch {
      return `horário agendado para ${horaStr}`;
    }
  };

  const chamarNoWhatsApp = (e, app) => {
    if (e && e.stopPropagation) e.stopPropagation();
    
    const numeroLimpo = (app.telefone || '(11) 95321-2324').replace(/\D/g, '');
    const telefoneFinal = numeroLimpo.length === 11 ? `55${numeroLimpo}` : '5511953212324';
    const tempoInfo = calcularTempoRestante(app.data, app.horario);

    const mensagemPreDefinida = 
      `Olá ${app.aluno}! A Secretaria Acadêmica da Etec Antônio Furlan informa sobre o seu agendamento para "${app.servico}".\n\n` +
      `📅 Horário marcado: ${app.horario} (${app.data || 'Hoje'})\n` +
      `⏳ Previsão: ${tempoInfo}!\n\n` +
      `Por favor, compareça à Secretaria Acadêmica com documento original com foto.\n` +
      `RM: ${app.rm}`;

    const textoMensagem = encodeURIComponent(mensagemPreDefinida);
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${telefoneFinal}&text=${textoMensagem}`;
    
    window.open(urlWhatsApp, '_blank');
    aoAtualizarStatus(app.id, 'Agendado');

    setAlertaChamadaWhatsApp({
      aluno: app.aluno,
      telefone: app.telefone || '(11) 95321-2324',
      tempoInfo
    });

    setTimeout(() => {
      setAlertaChamadaWhatsApp(null);
    }, 4500);
  };

  const renderizarBadgeStatus = (status, idAgendamento) => {
    let estilo = "bg-red-50 dark:bg-red-950/60 text-[#b91c1c] dark:text-red-300 border-red-300 dark:border-red-800";
    let icone = <CheckCircle2 size={16} className="text-[#b91c1c] dark:text-red-400" />;

    const statusNorm = status === 'Confirmado' || status === 'Em atendimento' || status === 'Aguardando'
      ? 'Agendado'
      : status;

    if (statusNorm === 'Concluído') {
      estilo = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700";
      icone = <Check size={16} className="text-slate-600 dark:text-slate-400" />;
    } else if (statusNorm === 'Cancelado') {
      estilo = "bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800";
      icone = <XCircle size={16} className="text-[#b91c1c] dark:text-red-400" />;
    }

    return (
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIdMenuStatusAberto(idMenuStatusAberto === idAgendamento ? null : idAgendamento);
          }}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold border-2 ${estilo} hover:opacity-90 transition cursor-pointer`}
        >
          {icone}
          <span>{statusNorm}</span>
          <ChevronDown size={14} className="ml-1 opacity-80" />
        </button>

        {idMenuStatusAberto === idAgendamento && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={(e) => { e.stopPropagation(); setIdMenuStatusAberto(null); }}
            />
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-40 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Mudar status para:
              </div>
              {opcoesStatus.map((opt) => (
                <button
                  key={opt}
                  onClick={(e) => {
                    e.stopPropagation();
                    aoAtualizarStatus(idAgendamento, opt);
                    setIdMenuStatusAberto(null);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center space-x-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer ${
                    opt === statusNorm ? 'font-bold text-[#b91c1c] dark:text-red-400 bg-red-50 dark:bg-red-950/40' : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {alertaChamadaWhatsApp && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold flex-shrink-0">
              <MessageCircle size={22} />
            </div>
            <div>
              <p className="font-extrabold text-sm sm:text-base">Mensagem pré-definida de WhatsApp aberta!</p>
              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-medium">
                Mensagem preparada para <strong>{alertaChamadaWhatsApp.aluno}</strong> ({alertaChamadaWhatsApp.telefone}) com o aviso: <em>"{alertaChamadaWhatsApp.tempoInfo}"</em>.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setAlertaChamadaWhatsApp(null)}
            className="self-end sm:self-auto text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline px-3 py-1 cursor-pointer"
          >
            Dispensar
          </button>
        </div>
      )}

      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Painel da Secretaria Acadêmica
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg mt-1 font-medium">
            Gerencie os atendimentos e a fila de espera da unidade
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-[#b91c1c] dark:text-red-300 px-4 py-2 rounded-xl text-sm font-bold">
          <CalendarIcon size={18} />
          <span>Data de referência: {formatarDataBr(dataSelecionada)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-6 sm:mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border-2 border-red-200 dark:border-red-900 shadow-sm transition hover:shadow-md">
          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold mb-2 sm:mb-3">
            <CalendarIcon size={18} className="text-[#b91c1c] dark:text-red-400 flex-shrink-0" />
            <span className="truncate">Agendados</span>
          </div>
          <div className="text-3xl sm:text-5xl font-extrabold text-[#b91c1c] dark:text-red-400">
            {metricas.agendados}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition hover:shadow-md">
          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold mb-2 sm:mb-3">
            <Check size={18} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
            <span className="truncate">Concluídos</span>
          </div>
          <div className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
            {metricas.concluidos}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition hover:shadow-md">
          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold mb-2 sm:mb-3">
            <XCircle size={18} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
            <span className="truncate">Cancelados</span>
          </div>
          <div className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
            {metricas.cancelados}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
              Data selecionada
            </label>
            <div className="relative">
              <input
                type="date"
                value={dataSelecionada}
                onChange={(e) => setDataSelecionada(e.target.value)}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-[#b91c1c] cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
              Filtrar por serviço
            </label>
            <div className="relative">
              <select
                value={servicoSelecionado}
                onChange={(e) => setServicoSelecionado(e.target.value)}
                className="w-full appearance-none px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-[#b91c1c] pr-10 sm:pr-12 cursor-pointer"
              >
                <option value="Todos os serviços">Todos os serviços</option>
                <option value="Cancelamento da Matrícula">Cancelamento da Matrícula</option>
                <option value="Solicitação de Declaração Escolar">Solicitação de Declaração Escolar</option>
                <option value="Reconsideração de Nota">Reconsideração de Nota</option>
                <option value="Reunião com a Secretaria">Reunião com a Secretaria</option>
                <option value="Histórico e Certificado">Histórico e Certificado</option>
              </select>
              <ChevronDown size={18} className="absolute right-3.5 top-3 sm:top-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 sm:mb-2">
              Filtrar por status
            </label>
            <div className="relative">
              <select
                value={statusSelecionado}
                onChange={(e) => setStatusSelecionado(e.target.value)}
                className="w-full appearance-none px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-[#b91c1c] pr-10 sm:pr-12 cursor-pointer"
              >
                <option value="Todos os status">Todos os status</option>
                <option value="Agendado">Agendado</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              <ChevronDown size={18} className="absolute right-3.5 top-3 sm:top-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-fit grid grid-cols-3 sm:flex items-center gap-1 sm:gap-2 bg-slate-100 dark:bg-slate-800 p-1 sm:p-1.5 rounded-2xl mb-6 border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setModoVisualizacao('dia')}
          className={`py-2 px-3 sm:px-6 rounded-xl text-xs sm:text-sm md:text-base font-bold text-center transition cursor-pointer ${
            modoVisualizacao === 'dia'
              ? 'bg-white dark:bg-slate-900 text-[#b91c1c] dark:text-red-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          Dia
        </button>
        <button
          onClick={() => setModoVisualizacao('semana')}
          className={`py-2 px-3 sm:px-6 rounded-xl text-xs sm:text-sm md:text-base font-bold text-center transition cursor-pointer ${
            modoVisualizacao === 'semana'
              ? 'bg-white dark:bg-slate-900 text-[#b91c1c] dark:text-red-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          Semana
        </button>
        <button
          onClick={() => setModoVisualizacao('calendario')}
          className={`py-2 px-3 sm:px-6 rounded-xl text-xs sm:text-sm md:text-base font-bold text-center transition cursor-pointer ${
            modoVisualizacao === 'calendario'
              ? 'bg-white dark:bg-slate-900 text-[#b91c1c] dark:text-red-400 shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          Calendário
        </button>
      </div>

      {modoVisualizacao === 'calendario' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="text-[#b91c1c] dark:text-red-400" size={24} />
                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {nomesMeses[mesAtual]} de {anoAtual}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => navegarMes('anterior')}
                  className="p-2 sm:px-3 sm:py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 transition font-bold flex items-center space-x-1 cursor-pointer"
                  title="Mês anterior"
                >
                  <ChevronLeft size={18} />
                  <span className="hidden sm:inline text-xs">Anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMesAtual(9);
                    setAnoAtual(2026);
                    setDataSelecionada('2026-10-23');
                  }}
                  className="px-3 py-2 bg-red-50 dark:bg-red-950/60 hover:bg-red-100 text-[#b91c1c] dark:text-red-300 rounded-xl transition text-xs font-bold cursor-pointer"
                >
                  Hoje
                </button>
                <button
                  type="button"
                  onClick={() => navegarMes('proximo')}
                  className="p-2 sm:px-3 sm:py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 transition font-bold flex items-center space-x-1 cursor-pointer"
                  title="Próximo mês"
                >
                  <span className="hidden sm:inline text-xs">Próximo</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-3 text-center mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(dia => (
                <div key={dia} className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider py-1">
                  {dia}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
              {Array.from({ length: diasDoMes.primeiroDiaSemana }).map((_, idx) => (
                <div key={`vazio-${idx}`} className="h-16 sm:h-24 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 border border-transparent opacity-30" />
              ))}

              {Array.from({ length: diasDoMes.totalDias }).map((_, idx) => {
                const dia = idx + 1;
                const diaStr = String(dia).padStart(2, '0');
                const mesStr = String(mesAtual + 1).padStart(2, '0');
                const isoData = `${anoAtual}-${mesStr}-${diaStr}`;
                const atendimentosNesteDia = agendamentosPorDia[isoData] || [];
                const estaSelecionado = dataSelecionada === isoData;
                const eHoje = isoData === '2026-10-23';

                return (
                  <button
                    key={isoData}
                    type="button"
                    onClick={() => setDataSelecionada(isoData)}
                    className={`h-16 sm:h-24 p-1.5 sm:p-2.5 rounded-2xl border text-left flex flex-col justify-between transition cursor-pointer relative ${
                      estaSelecionado
                        ? 'border-[#b91c1c] bg-red-50/60 dark:bg-red-950/40 ring-2 ring-[#b91c1c]'
                        : eHoje
                        ? 'border-red-300 dark:border-red-800 bg-red-50/20 dark:bg-red-950/20'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-base font-extrabold ${
                        estaSelecionado 
                          ? 'text-[#b91c1c] dark:text-red-400' 
                          : eHoje 
                          ? 'text-[#b91c1c] font-black' 
                          : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        {dia}
                      </span>
                      {eHoje && (
                        <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-[#b91c1c] text-white px-1.5 py-0.5 rounded-md">
                          Hoje
                        </span>
                      )}
                    </div>

                    {atendimentosNesteDia.length > 0 && (
                      <div className="mt-auto">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-bold bg-[#b91c1c] text-white dark:bg-red-700 truncate max-w-full">
                          {atendimentosNesteDia.length} {atendimentosNesteDia.length === 1 ? 'agendamento' : 'agendamentos'}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                <Clock size={20} className="text-[#b91c1c] dark:text-red-400" />
                <span>Atendimentos em {formatarDataBr(dataSelecionada)}</span>
              </h4>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                {agendamentosDoDiaSelecionado.length} atendimento(s)
              </span>
            </div>

            {agendamentosDoDiaSelecionado.length === 0 ? (
              <div className="py-8 text-center text-slate-500 font-medium text-sm sm:text-base">
                Nenhum agendamento cadastrado para o dia {formatarDataBr(dataSelecionada)}.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {agendamentosDoDiaSelecionado.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => aoAbrirDetalhes && aoAbrirDetalhes(app)}
                    className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-800 transition cursor-pointer bg-slate-50/50 dark:bg-slate-800/40 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#b91c1c] dark:text-red-400 text-sm">{app.horario}</span>
                      {renderizarBadgeStatus(app.status, app.id)}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm truncate">{app.aluno}</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{app.curso} • RM: {app.rm}</p>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">{app.servico}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => chamarNoWhatsApp(e, app)}
                        className="inline-flex items-center space-x-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        <MessageCircle size={14} />
                        <span>Chamar WhatsApp</span>
                      </button>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:underline">
                        Ver detalhes
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {modoVisualizacao === 'semana' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Visualização Semanal
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                De {diasSemanaAtual[0]?.dataFormatada} até {diasSemanaAtual[diasSemanaAtual.length - 1]?.dataFormatada}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  const p = dataSelecionada.split('-');
                  const d = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
                  d.setDate(d.getDate() - 7);
                  setDataSelecionada(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
                }}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition flex items-center space-x-1"
              >
                <ChevronLeft size={16} />
                <span>Semana Anterior</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const p = dataSelecionada.split('-');
                  const d = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
                  d.setDate(d.getDate() + 7);
                  setDataSelecionada(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
                }}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition flex items-center space-x-1"
              >
                <span>Próxima Semana</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {diasSemanaAtual.map(dia => {
              const atendimentosDoDia = agendamentosPorDia[dia.iso] || [];
              const eHoje = dia.iso === '2026-10-23';

              return (
                <div
                  key={dia.iso}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border-2 p-3 flex flex-col min-h-[300px] ${
                    eHoje 
                      ? 'border-[#b91c1c] dark:border-red-800 shadow-sm' 
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="pb-3 mb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h5 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{dia.nome}</h5>
                      <span className="text-xs text-slate-500 font-medium">{dia.dataFormatada}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      atendimentosDoDia.length > 0 
                        ? 'bg-red-50 dark:bg-red-950/60 text-[#b91c1c] dark:text-red-300' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {atendimentosDoDia.length}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1 overflow-y-auto">
                    {atendimentosDoDia.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center p-4 text-xs text-slate-400 font-medium">
                        Sem atendimentos
                      </div>
                    ) : (
                      atendimentosDoDia.map(app => (
                        <div
                          key={app.id}
                          onClick={() => aoAbrirDetalhes && aoAbrirDetalhes(app)}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-700 bg-slate-50/60 dark:bg-slate-800/50 transition cursor-pointer space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs text-[#b91c1c] dark:text-red-400">{app.horario}</span>
                            <span className="text-[10px] font-bold text-slate-500">{app.status}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{app.aluno}</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate">{app.servico}</div>
                          <button
                            type="button"
                            onClick={(e) => chamarNoWhatsApp(e, app)}
                            className="w-full mt-1 flex items-center justify-center space-x-1 py-1 rounded-lg bg-[#25D366] text-white text-[11px] font-bold hover:bg-[#20ba59] transition cursor-pointer"
                          >
                            <MessageCircle size={12} />
                            <span>Chamar</span>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {modoVisualizacao === 'dia' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
              Agenda do dia ({formatarDataBr(dataSelecionada)})
            </h3>
            <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
              {agendamentosDoDiaSelecionado.length} atendimento(s)
            </span>
          </div>

          <div className="block md:hidden space-y-3">
            {agendamentosDoDiaSelecionado.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500 font-medium">
                Nenhum agendamento encontrado para os filtros e data selecionados.
              </div>
            ) : (
              agendamentosDoDiaSelecionado.map((app) => (
                <div
                  key={app.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#b91c1c] dark:text-red-400 text-base">{app.horario}</span>
                    {renderizarBadgeStatus(app.status, app.id)}
                  </div>

                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">{app.aluno}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      {app.curso} • RM: {app.rm}
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">{app.servico}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => chamarNoWhatsApp(e, app)}
                      className="flex-1 inline-flex items-center justify-center space-x-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-3 py-2.5 rounded-xl text-xs font-bold shadow-xs transition active:scale-[0.98] cursor-pointer"
                    >
                      <MessageCircle size={16} />
                      <span>Chamar no WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => aoAbrirDetalhes && aoAbrirDetalhes(app)}
                      className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      Detalhes
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-sm font-bold text-slate-700 dark:text-slate-300">
                    <th className="py-4 px-6">Horário</th>
                    <th className="py-4 px-6">Aluno</th>
                    <th className="py-4 px-6">RM</th>
                    <th className="py-4 px-6">Serviço</th>
                    <th className="py-4 px-6">Ação Rápida</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-base">
                  {agendamentosDoDiaSelecionado.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-500 font-medium">
                        Nenhum atendimento encontrado para a data e filtros selecionados.
                      </td>
                    </tr>
                  ) : (
                    agendamentosDoDiaSelecionado.map((app) => (
                      <tr 
                        key={app.id} 
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition cursor-pointer"
                        onClick={() => aoAbrirDetalhes && aoAbrirDetalhes(app)}
                      >
                        <td className="py-5 px-6 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap text-base">
                          {app.horario}
                        </td>

                        <td className="py-5 px-6">
                          <div className="font-bold text-slate-900 dark:text-slate-100 text-base">
                            {app.aluno}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium flex items-center space-x-2">
                            <span>{app.curso}</span>
                            {app.requerResponsavel && (
                              <span className="inline-flex items-center text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                                + Responsável
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-5 px-6 text-slate-700 dark:text-slate-300 font-medium">
                          {app.rm}
                        </td>

                        <td className="py-5 px-6 text-slate-900 dark:text-slate-100 font-semibold">
                          {app.servico}
                        </td>

                        <td className="py-5 px-6 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => chamarNoWhatsApp(e, app)}
                            className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition active:scale-[0.98] cursor-pointer"
                            title="Enviar mensagem pré-definida no WhatsApp"
                          >
                            <MessageCircle size={16} />
                            <span>Chamar</span>
                          </button>
                        </td>

                        <td className="py-5 px-6 whitespace-nowrap">
                          {renderizarBadgeStatus(app.status, app.id)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}