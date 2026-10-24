import React from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Check, 
  FileText, 
  HelpCircle,
  CalendarCheck,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export default function AlunoInicio({
  proximoAtendimento,
  aoIniciarAgendamento,
  aoAbrirDetalhes,
  aoNavegarAba,
  isGuardian = false,
  alunoVinculado = null,
  dadosAluno = null,
  dadosResponsavel = null
}) {
  const servicosPrincipais = [
    { titulo: 'Solicitação de Declaração Escolar' },
    { titulo: 'Histórico e Certificado' },
    { titulo: 'Reunião com a Secretaria' },
    { titulo: 'Reconsideração de Nota' }
  ];

  const nomeExibicao = isGuardian ? 'Vitoria' : (dadosAluno?.nome?.split(' ')[0] || 'Laura');
  const nomeEstudanteCompleto = alunoVinculado?.nome || dadosAluno?.nome || 'Laura Ferreira';
  const primeiroNomeEstudante = nomeEstudanteCompleto.split(' ')[0] || 'Laura';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {isGuardian && alunoVinculado && (
        <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50/60 dark:from-amber-950/40 dark:to-orange-950/20 border-2 border-amber-300 dark:border-amber-700/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-950 dark:text-amber-100 shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
              <GraduationCap size={22} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-200 bg-amber-200/80 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
                  Dependente Vinculado(a)
                </span>
                <span className="text-[11px] text-amber-800 dark:text-amber-300 font-semibold">RM: {alunoVinculado.rm || '21201'}</span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 mt-0.5">
                {nomeEstudanteCompleto}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                {alunoVinculado.curso || 'Informática para Internet'} • {alunoVinculado.turma || '3º TI'} • Turno: {alunoVinculado.periodo || 'Manhã'} • CIN: {alunoVinculado.cin || '456.789.012-34'}
              </p>
            </div>
          </div>

          <div className="self-end sm:self-auto flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1 text-xs font-bold px-3 py-1 bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 rounded-full text-amber-900 dark:text-amber-300 shadow-2xs">
              <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>Vínculo Ativo</span>
            </span>
          </div>
        </div>
      )}

      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          {isGuardian
            ? `Olá, ${nomeExibicao}. Como podemos orientar sua família hoje?`
            : `Olá, ${nomeExibicao}. Como podemos ajudar?`
          }
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg md:text-xl mt-2 sm:mt-3 font-normal max-w-3xl leading-relaxed">
          {isGuardian
            ? `Agende atendimentos na Secretaria Acadêmica para ${nomeEstudanteCompleto} com hora marcada e sem filas.`
            : 'Agende seu atendimento na Secretaria sem precisar enfrentar fila.'
          }
        </p>

        <button
          onClick={() => aoIniciarAgendamento()}
          className="mt-5 sm:mt-6 w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg shadow-md transition active:scale-[0.99] cursor-pointer"
        >
          <Calendar size={22} />
          <span>{isGuardian ? `Agendar para ${primeiroNomeEstudante}` : 'Agendar atendimento'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {proximoAtendimento ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 sm:p-6 md:p-8 relative overflow-hidden border-l-[6px] border-l-[#b91c1c]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6">
                <div className="space-y-2">
                  <span className="text-[11px] sm:text-xs font-extrabold tracking-wider text-[#b91c1c] uppercase block">
                    PRÓXIMO ATENDIMENTO
                  </span>
                  <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                    {proximoAtendimento.servico}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 pt-1 font-medium">
                    <div className="flex items-center space-x-2">
                      <Calendar size={18} className="text-slate-500 dark:text-slate-400" />
                      <span>{proximoAtendimento.dataFormatada || proximoAtendimento.data}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={18} className="text-slate-500 dark:text-slate-400" />
                      <span className="font-bold text-slate-900 dark:text-slate-100">{proximoAtendimento.horario}</span>
                    </div>
                  </div>

                  <div className="pt-1 sm:pt-2">
                    <span className={`inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 ${
                      proximoAtendimento.status === 'Cancelado'
                        ? 'border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/50'
                        : proximoAtendimento.status === 'Concluído'
                        ? 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
                        : 'border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40'
                    }`}>
                      <Check size={16} className="text-[#b91c1c]" />
                      <span>{
                        proximoAtendimento.status === 'Confirmado' || proximoAtendimento.status === 'Aguardando' || proximoAtendimento.status === 'Em atendimento'
                          ? 'Agendado'
                          : proximoAtendimento.status
                      }</span>
                    </span>
                  </div>
                </div>

                <div className="w-full sm:w-auto sm:self-end pt-2 sm:pt-0">
                  <button
                    onClick={() => aoAbrirDetalhes(proximoAtendimento)}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm sm:text-base font-bold rounded-xl transition cursor-pointer text-center"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 text-center shadow-xs">
              <CalendarCheck size={40} className="mx-auto text-slate-400 mb-3" />
              <p className="text-slate-700 dark:text-slate-300 font-bold text-base sm:text-lg">Você não possui nenhum atendimento agendado no momento.</p>
              <button
                onClick={() => aoIniciarAgendamento()}
                className="mt-3 text-sm sm:text-base font-bold text-red-700 dark:text-red-400 hover:underline cursor-pointer"
              >
                Clique aqui para agendar um atendimento
              </button>
            </div>
          )}

          <div>
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 mb-4">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                Serviços mais procurados
              </h3>
              <button
                onClick={() => aoIniciarAgendamento()}
                className="text-xs sm:text-base font-bold text-red-700 dark:text-red-400 hover:text-red-800 flex items-center space-x-1 transition cursor-pointer self-start xs:self-auto"
              >
                <span>Ver todos os serviços</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {servicosPrincipais.map((servico, idx) => (
                <button
                  key={idx}
                  onClick={() => aoIniciarAgendamento(servico.titulo)}
                  className="w-full text-left p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-800 rounded-2xl shadow-xs hover:shadow-sm transition flex items-center justify-between group cursor-pointer"
                >
                  <span className="text-sm sm:text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-700 dark:group-hover:text-red-400 transition">
                    {servico.titulo}
                  </span>
                  <ArrowRight size={20} className="text-red-700 dark:text-red-400 transition-transform group-hover:translate-x-1 flex-shrink-0 ml-3" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6 sm:space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-xs">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
              Atalhos Rápidos
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <button
                onClick={() => aoIniciarAgendamento()}
                className="w-full py-3.5 sm:py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 px-2 rounded-xl transition group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Calendar size={20} className="text-red-700 dark:text-red-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-700 dark:group-hover:text-red-400">
                    {isGuardian ? `Agendar para ${primeiroNomeEstudante}` : 'Agendar atendimento'}
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </button>

              <button
                onClick={() => aoNavegarAba('meus-agendamentos')}
                className="w-full py-3.5 sm:py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 px-2 rounded-xl transition group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <FileText size={20} className="text-red-700 dark:text-red-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-700 dark:group-hover:text-red-400">
                    {isGuardian ? 'Atendimentos da Família' : 'Meus agendamentos'}
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </button>

              <button
                onClick={() => aoNavegarAba('ajuda')}
                className="w-full py-3.5 sm:py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 px-2 rounded-xl transition group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle size={20} className="text-red-700 dark:text-red-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-700 dark:group-hover:text-red-400">
                    Ajuda e dúvidas frequentes
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-xs text-center">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4 text-left">
              Atendimentos anteriores
            </h3>

            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 py-4 sm:py-6 font-medium">
              Nenhum atendimento anterior arquivado.
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => aoNavegarAba('meus-agendamentos')}
                className="text-sm sm:text-base font-bold text-red-700 dark:text-red-400 hover:text-red-800 hover:underline transition cursor-pointer"
              >
                Ver todo o histórico
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
