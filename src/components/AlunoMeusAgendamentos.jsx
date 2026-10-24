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

export default function AlunoMeusAgendamentos({
  agendamentos,
  aoIniciarAgendamento,
  aoAbrirDetalhes,
  aoCancelarAgendamento
}) {
  const [filtroAba, setFiltroAba] = useState('proximos');

  const { listaProximos, listaHistorico } = useMemo(() => {
    const proximos = agendamentos.filter(
      (a) => a.status === 'Agendado' || a.status === 'Confirmado' || a.status === 'Aguardando' || a.status === 'Em atendimento'
    );
    const historico = agendamentos.filter(
      (a) => a.status === 'Concluído' || a.status === 'Cancelado'
    );
    return { listaProximos: proximos, listaHistorico: historico };
  }, [agendamentos]);

  const listaAtual = filtroAba === 'proximos' ? listaProximos : listaHistorico;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Meus agendamentos
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg mt-1 font-medium">
            Acompanhe, reagende ou cancele seus atendimentos na Secretaria.
          </p>
        </div>

        <button
          onClick={() => aoIniciarAgendamento()}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow-sm transition active:scale-[0.99] cursor-pointer"
        >
          <Calendar size={18} />
          <span>Novo agendamento</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 mb-6 sm:mb-8">
        <button
          type="button"
          onClick={() => setFiltroAba('proximos')}
          className={`py-2.5 px-4 sm:px-6 rounded-xl text-xs sm:text-base font-bold text-center transition cursor-pointer border-2 ${
            filtroAba === 'proximos'
              ? 'bg-red-50 dark:bg-red-950/60 text-[#b91c1c] dark:text-red-300 border-red-300 dark:border-red-800 shadow-xs'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-100 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
        >
          Próximos ({listaProximos.length})
        </button>

        <button
          type="button"
          onClick={() => setFiltroAba('historico')}
          className={`py-2.5 px-4 sm:px-6 rounded-xl text-xs sm:text-base font-bold text-center transition cursor-pointer border-2 ${
            filtroAba === 'historico'
              ? 'bg-red-50 dark:bg-red-950/60 text-[#b91c1c] dark:text-red-300 border-red-300 dark:border-red-800 shadow-xs'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-slate-100 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}
        >
          Histórico ({listaHistorico.length})
        </button>
      </div>

      {listaAtual.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center shadow-xs">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400 mb-4">
            <CalendarX size={28} />
          </div>

          <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            Você ainda não possui atendimentos agendados.
          </h3>
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 mt-1.5 mb-6 sm:mb-8">
            Quando você agendar, ele aparecerá aqui.
          </p>

          <button
            onClick={() => aoIniciarAgendamento()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold px-7 py-3.5 rounded-xl text-sm sm:text-base shadow-sm transition active:scale-[0.99] cursor-pointer"
          >
            <Calendar size={18} />
            <span>Novo agendamento</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {listaAtual.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-4 sm:p-6 shadow-xs transition flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h4 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                    {item.servico}
                  </h4>

                  <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-sm font-bold border ${
                    item.status === 'Agendado' || item.status === 'Confirmado' || item.status === 'Aguardando' || item.status === 'Em atendimento'
                      ? 'bg-red-50 dark:bg-red-950/60 text-[#b91c1c] dark:text-red-300 border-red-300 dark:border-red-800'
                      : item.status === 'Concluído'
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      : item.status === 'Cancelado'
                      ? 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800'
                      : 'bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}>
                    {item.status === 'Confirmado' || item.status === 'Aguardando' || item.status === 'Em atendimento' ? 'Agendado' : item.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-base text-slate-600 dark:text-slate-400 font-medium">
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <Calendar size={16} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
                    <span>{item.dataFormatada || item.data}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 sm:space-x-2">
                    <Clock size={16} className="text-slate-500 dark:text-slate-400 flex-shrink-0" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.horario}</span>
                  </div>
                  {item.protocolo && (
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono font-bold">
                      Protocolo: {item.protocolo}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 pt-2 md:pt-0 border-t border-slate-100 dark:border-slate-800 md:border-t-0">
                {(item.status === 'Agendado' || item.status === 'Confirmado' || item.status === 'Aguardando') && (
                  <button
                    onClick={() => aoCancelarAgendamento(item.id)}
                    className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl border-2 border-red-200 dark:border-red-800 transition cursor-pointer text-center"
                  >
                    Cancelar
                  </button>
                )}

                <button
                  onClick={() => aoAbrirDetalhes(item)}
                  className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer text-center"
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
