import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Hourglass, 
  Check, 
  XCircle, 
  ChevronDown, 
  User, 
  CheckCircle2, 
  Search,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  Users
} from 'lucide-react';

/**
 * Componente da Visão da Agenda do Administrador (Foto 2)
 * Inclui o recurso inovador "Chamar no WhatsApp" para chamar o aluno na fila da secretaria.
 */
export default function AdminAgenda({ 
  agendamentos, 
  aoAtualizarStatus, 
  aoAbrirDetalhes 
}) {
  const [dataSelecionada, setDataSelecionada] = useState('2026-10-23');
  const [servicoSelecionado, setServicoSelecionado] = useState('Todos os serviços');
  const [statusSelecionado, setStatusSelecionado] = useState('Todos os status');
  const [modoVisualizacao, setModoVisualizacao] = useState('dia');
  const [idMenuStatusAberto, setIdMenuStatusAberto] = useState(null);
  const [alertaChamadaWhatsApp, setAlertaChamadaWhatsApp] = useState(null);

  const opcoesStatus = ['Confirmado', 'Em atendimento', 'Concluído', 'Cancelado', 'Aguardando'];

  // Métricas calculadas dinamicamente
  const metricas = useMemo(() => {
    const total = agendamentos.length;
    const aguardando = agendamentos.filter(a => a.status === 'Aguardando' || a.status === 'Confirmado').length;
    const concluidos = agendamentos.filter(a => a.status === 'Concluído').length;
    const cancelados = agendamentos.filter(a => a.status === 'Cancelado').length;
    return { total, aguardando, concluidos, cancelados };
  }, [agendamentos]);

  // Filtragem
  const agendamentosFiltrados = useMemo(() => {
    return agendamentos.filter(app => {
      const bateServico = servicoSelecionado === 'Todos os serviços' || app.servico === servicoSelecionado;
      const bateStatus = statusSelecionado === 'Todos os status' || app.status === statusSelecionado;
      return bateServico && bateStatus;
    });
  }, [agendamentos, servicoSelecionado, statusSelecionado]);

  // Função para chamar o aluno diretamente no WhatsApp
  const chamarNoWhatsApp = (e, app) => {
    e.stopPropagation();
    
    const numeroLimpo = (app.telefone || '(11) 95321-2324').replace(/\D/g, '');
    const telefoneFinal = numeroLimpo.length === 11 ? `55${numeroLimpo}` : `5511953212324`;

    const textoMensagem = encodeURIComponent(
      `Olá ${app.aluno}! A Secretaria Acadêmica da Etec Antônio Furlan informa que o seu atendimento para "${app.servico}" foi chamado!\n\nPor favor, dirija-se ao Guichê de Atendimento agora.\nRM: ${app.rm}`
    );

    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${telefoneFinal}&text=${textoMensagem}`;
    
    // Abre o WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');

    // Atualiza automaticamente o status para "Em atendimento"
    aoAtualizarStatus(app.id, 'Em atendimento');

    // Exibe toast de sucesso
    setAlertaChamadaWhatsApp({
      aluno: app.aluno,
      telefone: app.telefone || '(11) 95321-2324'
    });

    setTimeout(() => {
      setAlertaChamadaWhatsApp(null);
    }, 4500);
  };

  // Renderizador do Badge de Status
  const renderizarBadgeStatus = (status, idAgendamento) => {
    let estilo = "bg-slate-100 text-slate-800 border-slate-300";
    let icone = <Check size={18} className="text-slate-700" />;

    if (status === 'Concluído') {
      estilo = "bg-slate-100 text-slate-800 border-slate-300";
      icone = <Check size={18} className="text-slate-700" />;
    } else if (status === 'Cancelado') {
      estilo = "bg-red-50 text-red-700 border-red-300";
      icone = <XCircle size={18} className="text-red-600" />;
    } else if (status === 'Em atendimento') {
      estilo = "bg-amber-50 text-amber-800 border-amber-300";
      icone = <User size={18} className="text-amber-700" />;
    } else if (status === 'Confirmado') {
      estilo = "bg-emerald-50 text-emerald-800 border-emerald-300";
      icone = <CheckCircle2 size={18} className="text-emerald-700" />;
    } else if (status === 'Aguardando') {
      estilo = "bg-blue-50 text-blue-800 border-blue-300";
      icone = <Hourglass size={18} className="text-blue-700" />;
    }

    return (
      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIdMenuStatusAberto(idMenuStatusAberto === idAgendamento ? null : idAgendamento);
          }}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold border-2 ${estilo} hover:opacity-90 transition cursor-pointer`}
        >
          {icone}
          <span>{status}</span>
          <ChevronDown size={14} className="ml-1 opacity-80" />
        </button>

        {idMenuStatusAberto === idAgendamento && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={(e) => { e.stopPropagation(); setIdMenuStatusAberto(null); }}
            />
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20 animate-in fade-in zoom-in-95 duration-100">
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
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center space-x-2 hover:bg-slate-100 transition cursor-pointer ${
                    opt === status ? 'font-bold text-red-700 bg-red-50' : 'text-slate-800'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Alerta de Chamada WhatsApp Enviada */}
      {alertaChamadaWhatsApp && (
        <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-400 text-emerald-950 rounded-2xl flex items-center justify-between shadow-md animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold">
              <MessageCircle size={22} />
            </div>
            <div>
              <p className="font-extrabold text-base">Chamada no WhatsApp disparada!</p>
              <p className="text-sm text-emerald-800 font-medium">
                Notificação enviada para <strong>{alertaChamadaWhatsApp.aluno}</strong> ({alertaChamadaWhatsApp.telefone}). O status foi atualizado para "Em atendimento".
              </p>
            </div>
          </div>
          <button 
            onClick={() => setAlertaChamadaWhatsApp(null)}
            className="text-xs font-bold text-emerald-800 hover:underline px-3 py-1 cursor-pointer"
          >
            Dispensar
          </button>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Atendimentos de hoje
        </h2>
        <p className="text-slate-600 text-base sm:text-lg mt-1 font-medium">
          Sexta-feira, 23 de outubro de 2026
        </p>
      </div>

      {/* 4 Cards de Métricas / KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-2xl p-6 border-2 border-red-200 shadow-sm transition hover:shadow-md">
          <div className="flex items-center space-x-2.5 text-slate-700 text-sm font-bold mb-3">
            <CalendarIcon size={20} className="text-red-700" />
            <span>Total agendado</span>
          </div>
          <div className="text-5xl font-extrabold text-red-700">
            {metricas.total}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition hover:shadow-md">
          <div className="flex items-center space-x-2.5 text-slate-700 text-sm font-bold mb-3">
            <Hourglass size={20} className="text-slate-500" />
            <span>Aguardando</span>
          </div>
          <div className="text-5xl font-extrabold text-slate-900">
            {metricas.aguardando}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition hover:shadow-md">
          <div className="flex items-center space-x-2.5 text-slate-700 text-sm font-bold mb-3">
            <Check size={20} className="text-slate-500" />
            <span>Concluídos</span>
          </div>
          <div className="text-5xl font-extrabold text-slate-900">
            {metricas.concluidos}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition hover:shadow-md">
          <div className="flex items-center space-x-2.5 text-slate-700 text-sm font-bold mb-3">
            <XCircle size={20} className="text-slate-500" />
            <span>Cancelados</span>
          </div>
          <div className="text-5xl font-extrabold text-slate-900">
            {metricas.cancelados}
          </div>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Data
            </label>
            <div className="relative">
              <input
                type="text"
                value="23/10/2026"
                readOnly
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-base text-slate-900 font-semibold focus:outline-none cursor-default pr-12"
              />
              <CalendarIcon size={20} className="absolute right-4 top-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Serviço
            </label>
            <div className="relative">
              <select
                value={servicoSelecionado}
                onChange={(e) => setServicoSelecionado(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-white border border-slate-300 rounded-xl text-base text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 pr-12 cursor-pointer"
              >
                <option value="Todos os serviços">Todos os serviços</option>
                <option value="Transporte">Transporte</option>
                <option value="Reconsideração de Nota">Reconsideração de Nota</option>
                <option value="Transferência">Transferência</option>
                <option value="Reunião com a Secretaria">Reunião com a Secretaria</option>
                <option value="Histórico e Certificado">Histórico e Certificado</option>
              </select>
              <ChevronDown size={20} className="absolute right-4 top-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Status
            </label>
            <div className="relative">
              <select
                value={statusSelecionado}
                onChange={(e) => setStatusSelecionado(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-white border border-slate-300 rounded-xl text-base text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 pr-12 cursor-pointer"
              >
                <option value="Todos os status">Todos os status</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Em atendimento">Em atendimento</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Aguardando">Aguardando</option>
              </select>
              <ChevronDown size={20} className="absolute right-4 top-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Alternador de Visualização */}
      <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-2xl w-fit mb-6 border border-slate-200">
        <button
          onClick={() => setModoVisualizacao('dia')}
          className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-bold transition cursor-pointer ${
            modoVisualizacao === 'dia'
              ? 'bg-white text-red-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dia
        </button>
        <button
          onClick={() => setModoVisualizacao('semana')}
          className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-bold transition cursor-pointer ${
            modoVisualizacao === 'semana'
              ? 'bg-white text-red-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Semana
        </button>
        <button
          onClick={() => setModoVisualizacao('calendario')}
          className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-bold transition cursor-pointer ${
            modoVisualizacao === 'calendario'
              ? 'bg-white text-red-700 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Calendário
        </button>
      </div>

      {/* Tabela de Agendamentos */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
        Agenda de hoje
      </h3>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-sm font-bold text-slate-700">
                <th className="py-4 px-6">Horário</th>
                <th className="py-4 px-6">Aluno</th>
                <th className="py-4 px-6">RM</th>
                <th className="py-4 px-6">Serviço</th>
                <th className="py-4 px-6">Ação Rápida</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-base">
              {agendamentosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500 text-base font-medium">
                    Nenhum atendimento encontrado para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                agendamentosFiltrados.map((app) => (
                  <tr 
                    key={app.id} 
                    className="hover:bg-slate-50/80 transition cursor-pointer"
                    onClick={() => aoAbrirDetalhes && aoAbrirDetalhes(app)}
                  >
                    <td className="py-5 px-6 font-bold text-slate-900 whitespace-nowrap text-base">
                      {app.horario}
                    </td>

                    <td className="py-5 px-6">
                      <div className="font-bold text-slate-900 text-base">
                        {app.aluno}
                      </div>
                      <div className="text-sm text-slate-500 font-medium flex items-center space-x-2">
                        <span>{app.curso}</span>
                        {app.requerResponsavel && (
                          <span className="inline-flex items-center text-[11px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            + Responsável
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-5 px-6 text-slate-700 font-medium">
                      {app.rm}
                    </td>

                    <td className="py-5 px-6 text-slate-900 font-semibold">
                      {app.servico}
                    </td>

                    {/* Botão de Chamar no WhatsApp (Inovação Solicitada) */}
                    <td className="py-5 px-6 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => chamarNoWhatsApp(e, app)}
                        className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition active:scale-[0.98] cursor-pointer"
                        title="Disparar mensagem no WhatsApp para chamar o aluno ao guichê"
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
  );
}
