import React from 'react';
import { X, Calendar, Clock, MapPin, FileCheck, Hash, User } from 'lucide-react';

export default function ModalDetalhesAtendimento({
  atendimento,
  estaAberto,
  aoFechar,
  aoCancelarAtendimento
}) {
  if (!estaAberto || !atendimento) return null;

  const statusNorm =
    atendimento.status === 'Confirmado' || atendimento.status === 'Aguardando' || atendimento.status === 'Em atendimento'
      ? 'Agendado'
      : atendimento.status || 'Agendado';

  const statusCls =
    statusNorm === 'Cancelado'
      ? 'bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border-red-300 dark:border-red-800'
      : statusNorm === 'Concluído'
      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
      : 'bg-red-50 dark:bg-red-950/60 text-[#b91c1c] dark:text-red-300 border-red-300 dark:border-red-800';

  const podeCancel = aoCancelarAtendimento && (
    atendimento.status === 'Agendado' ||
    atendimento.status === 'Confirmado' ||
    atendimento.status === 'Aguardando'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex-shrink-0 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">
            Detalhes do Atendimento
          </h3>
          <button
            onClick={aoFechar}
            className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 p-1.5 sm:p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-8 space-y-4 sm:space-y-6 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-bold text-[#b91c1c] dark:text-red-400 uppercase tracking-wider">
              Serviço Acadêmico
            </span>
            <span className={`px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold border ${statusCls}`}>
              {statusNorm}
            </span>
          </div>

          <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 -mt-1 sm:-mt-2">
            {atendimento.servico}
          </h4>

          <div className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-4 sm:p-5 space-y-3 text-sm sm:text-base text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start sm:items-center space-x-2.5 sm:space-x-3">
              <Calendar size={18} className="text-[#b91c1c] flex-shrink-0 mt-0.5 sm:mt-0" />
              <span><strong>Data:</strong> {atendimento.dataFormatada || atendimento.data}</span>
            </div>

            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <Clock size={18} className="text-[#b91c1c] flex-shrink-0" />
              <span><strong>Horário:</strong> {atendimento.horario}</span>
            </div>

            <div className="flex items-start sm:items-center space-x-2.5 sm:space-x-3">
              <MapPin size={18} className="text-[#b91c1c] flex-shrink-0 mt-0.5 sm:mt-0" />
              <span><strong>Local:</strong> {atendimento.local || 'Secretaria Acadêmica'}</span>
            </div>

            <div className="flex items-start sm:items-center space-x-2.5 sm:space-x-3">
              <Hash size={18} className="text-[#b91c1c] flex-shrink-0 mt-0.5 sm:mt-0" />
              <span className="break-all"><strong>Protocolo:</strong> <span className="font-mono font-bold">{atendimento.protocolo || 'AG-2026-0925-884'}</span></span>
            </div>

            {atendimento.aluno && (
              <div className="flex items-start sm:items-center space-x-2.5 sm:space-x-3">
                <User size={18} className="text-[#b91c1c] flex-shrink-0 mt-0.5 sm:mt-0" />
                <span><strong>Aluno:</strong> {atendimento.aluno} (RM: {atendimento.rm})</span>
              </div>
            )}
          </div>

          <div className="p-3.5 sm:p-4 bg-red-50 dark:bg-red-950/50 rounded-2xl border border-red-200 dark:border-red-900 text-xs sm:text-sm text-red-950 dark:text-red-100 font-medium">
            <p className="font-bold mb-1 flex items-center space-x-1.5 sm:space-x-2">
              <FileCheck size={16} className="text-[#b91c1c] flex-shrink-0" />
              <span>Orientações importantes:</span>
            </p>
            <p className="leading-relaxed">
              Compareça com 5 minutos de antecedência munido de documento oficial original com foto (RG ou CNH).
            </p>
          </div>

          <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {podeCancel ? (
              <button
                type="button"
                onClick={() => {
                  aoCancelarAtendimento(atendimento.id);
                  aoFechar();
                }}
                className="w-full sm:w-auto text-xs sm:text-sm text-red-700 hover:text-red-900 dark:hover:text-red-400 font-bold hover:underline cursor-pointer py-2 text-center"
              >
                Cancelar este atendimento
              </button>
            ) : <div className="hidden sm:block" />}

            <button
              type="button"
              onClick={aoFechar}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs sm:text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition cursor-pointer text-center"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}