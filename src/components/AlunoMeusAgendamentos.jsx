import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileText,
  CalendarX
} from 'lucide-react';

/**
 * Componente Meus Agendamentos do Aluno (Foto 2 da 3ª remessa)
 * Totalmente adaptado para acessibilidade: textos ampliados, badges nítidos e botões confortáveis.
 */
export default function AlunoMeusAgendamentos({
  agendamentos,
  aoIniciarAgendamento,
  aoAbrirDetalhes,
  aoCancelarAgendamento
}) {
  const [filtroAba, setFiltroAba] = useState('proximos');

  // Separa agendamentos futuros e histórico
  const { listaProximos, listaHistorico } = useMemo(() => {
    const proximos = agendamentos.filter(
      (a) => a.status === 'Confirmado' || a.status === 'Aguardando' || a.status === 'Em atendimento'
    );
    const historico = agendamentos.filter(
      (a) => a.status === 'Concluído' || a.status === 'Cancelado'
    );
    return { listaProximos: proximos, listaHistorico: historico };
  }, [agendamentos]);

  const listaAtual = filtroAba === 'proximos' ? listaProximos : listaHistorico;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Cabeçalho da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meus agendamentos
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-1 font-medium">
            Acompanhe, reagende ou cancele seus atendimentos na Secretaria.
          </p>
        </div>

        {/* Botão Novo Agendamento Acessível */}
        <button
          onClick={() => aoIniciarAgendamento()}
          className="inline-flex items-center space-x-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold px-6 py-3.5 rounded-xl text-base shadow-sm transition active:scale-[0.99] self-start sm:self-auto cursor-pointer"
        >
          <Calendar size={20} />
          <span>Novo agendamento</span>
        </button>
      </div>

      {/* Pílulas de Alternância: Próximos (N) | Histórico (N) */}
      <div className="flex items-center space-x-2 mb-8">
        <button
          type="button"
          onClick={() => setFiltroAba('proximos')}
          className={`px-6 py-2.5 rounded-xl text-base font-bold transition cursor-pointer border-2 ${
            filtroAba === 'proximos'
              ? 'bg-red-50 text-red-700 border-red-300 shadow-xs'
              : 'text-slate-700 hover:text-slate-950 bg-white border-slate-200'
          }`}
        >
          Próximos ({listaProximos.length})
        </button>

        <button
          type="button"
          onClick={() => setFiltroAba('historico')}
          className={`px-6 py-2.5 rounded-xl text-base font-bold transition cursor-pointer border-2 ${
            filtroAba === 'historico'
              ? 'bg-red-50 text-red-700 border-red-300 shadow-xs'
              : 'text-slate-700 hover:text-slate-950 bg-white border-slate-200'
          }`}
        >
          Histórico ({listaHistorico.length})
        </button>
      </div>

      {/* Estado Vazio */}
      {listaAtual.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-4">
            <CalendarX size={32} />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Você ainda não possui atendimentos agendados.
          </h3>
          <p className="text-base text-slate-500 mt-2 mb-8">
            Quando você agendar, ele aparecerá aqui.
          </p>

          <button
            onClick={() => aoIniciarAgendamento()}
            className="inline-flex items-center space-x-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold px-7 py-3.5 rounded-xl text-base shadow-sm transition active:scale-[0.99] cursor-pointer"
          >
            <Calendar size={20} />
            <span>Novo agendamento</span>
          </button>
        </div>
      ) : (
        /* Lista de Agendamentos Existentes */
        <div className="space-y-4">
          {listaAtual.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-300 p-6 shadow-xs transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                    {item.servico}
                  </h4>

                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold border ${
                    item.status === 'Confirmado'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : item.status === 'Concluído'
                      ? 'bg-slate-100 text-slate-800 border-slate-300'
                      : item.status === 'Cancelado'
                      ? 'bg-red-50 text-red-700 border-red-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-base text-slate-600 font-medium">
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-slate-500" />
                    <span>{item.dataFormatada || item.data}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={18} className="text-slate-500" />
                    <span className="font-bold text-slate-800">{item.horario}</span>
                  </div>
                  {item.protocolo && (
                    <span className="text-sm text-slate-500 font-mono font-bold">
                      Protocolo: {item.protocolo}
                    </span>
                  )}
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center space-x-3 self-end md:self-auto pt-2 md:pt-0">
                {item.status === 'Confirmado' && (
                  <button
                    onClick={() => aoCancelarAgendamento(item.id)}
                    className="px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50 rounded-xl border-2 border-red-200 transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                )}

                <button
                  onClick={() => aoAbrirDetalhes(item)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-900 rounded-xl text-sm font-bold transition cursor-pointer"
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
