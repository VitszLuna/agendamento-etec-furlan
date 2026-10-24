import React from 'react';
import { ChevronLeft, Clock, CheckCircle2, Info, Calendar } from 'lucide-react';

export default function AlunoDetalhesServico({
  servico,
  aoVoltarParaCatalogo,
  aoAvancarParaAgendamento
}) {
  if (!servico) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <button
        onClick={aoVoltarParaCatalogo}
        className="inline-flex items-center space-x-2 text-sm sm:text-base font-bold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 transition mb-4 sm:mb-6 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
      >
        <ChevronLeft size={20} />
        <span>Voltar aos serviços</span>
      </button>

      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {servico.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg md:text-xl mt-2 leading-relaxed font-medium">
          {servico.description}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
        {servico.requerResponsavel && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/60 rounded-2xl p-4 sm:p-5 flex items-start space-x-3 text-amber-950 dark:text-amber-100 font-medium">
            <Info size={22} className="text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-sm sm:text-base text-amber-900 dark:text-amber-200">
                Atenção: Exige Presença Obrigatória de Responsável Legal
              </p>
              <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                Para alunos menores de 18 anos, a realização deste serviço exige o acompanhamento presencial do pai, mãe ou responsável legal com documento oficial com foto.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 pb-6 sm:pb-8 border-b border-slate-200 dark:border-slate-800">
          <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
            Duração prevista
          </span>
          <div className="sm:col-span-3 flex items-center space-x-2.5 text-sm sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
            <Clock size={20} className="text-[#b91c1c] flex-shrink-0" />
            <span>{servico.duration || 'Cerca de 15 minutos'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 pb-6 sm:pb-8 border-b border-slate-200 dark:border-slate-800">
          <span className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
            Documentos necessários
          </span>
          <div className="sm:col-span-3 space-y-3">
            {servico.requiredDocs && servico.requiredDocs.length > 0 ? (
              servico.requiredDocs.map((doc, idx) => (
                <div key={idx} className="flex items-start sm:items-center space-x-2.5 text-sm sm:text-lg text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle2 size={20} className="text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                  <span>{doc}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center space-x-2.5 text-sm sm:text-lg text-slate-800 dark:text-slate-200 font-medium">
                <CheckCircle2 size={20} className="text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                <span>Documento oficial com foto (RG ou CNH)</span>
              </div>
            )}
          </div>
        </div>

        {servico.importantNotice && (
          <div className="bg-red-50/60 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-900/60 rounded-xl p-4 sm:p-5 flex items-start space-x-3 text-xs sm:text-base text-red-950 dark:text-red-200 font-medium">
            <Info size={22} className="text-[#b91c1c] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-bold">Importante:</strong> {servico.importantNotice}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 sm:mt-10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
        <button
          onClick={aoVoltarParaCatalogo}
          className="w-full sm:w-auto px-6 py-3 sm:py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-sm sm:text-base font-bold transition cursor-pointer text-center"
        >
          Voltar aos serviços
        </button>

        <button
          onClick={() => aoAvancarParaAgendamento(servico)}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-lg font-bold shadow-md transition active:scale-[0.99] cursor-pointer text-center"
        >
          <Calendar size={20} />
          <span>Agendar atendimento</span>
        </button>
      </div>
    </div>
  );
}
