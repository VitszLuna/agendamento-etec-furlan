import React from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Check, 
  FileText, 
  HelpCircle,
  CalendarCheck
} from 'lucide-react';

/**
 * Componente da Visão Inicial do Aluno (Início)
 * Adaptado com foco total em acessibilidade: tipografia ampliada, botões robustos e ícones destacados.
 */
export default function AlunoInicio({
  proximoAtendimento,
  aoIniciarAgendamento,
  aoAbrirDetalhes,
  aoNavegarAba
}) {
  const servicosPrincipais = [
    { titulo: 'Solicitação de Declaração Escolar' },
    { titulo: 'Histórico e Certificado' },
    { titulo: 'Reunião com a Secretaria' },
    { titulo: 'Reconsideração de Nota' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Seção Hero de Boas-vindas (Tamanho Ampliado para Acessibilidade) */}
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Olá, Débora. Como podemos ajudar?
        </h2>
        <p className="text-slate-600 text-lg sm:text-xl mt-3 font-normal max-w-3xl leading-relaxed">
          Agende seu atendimento na Secretaria sem precisar enfrentar fila.
        </p>

        {/* Botão Primário Vermelho Gigante e Confortável para Clique */}
        <button
          onClick={() => aoIniciarAgendamento()}
          className="mt-6 inline-flex items-center space-x-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold px-8 py-4 rounded-xl text-base sm:text-lg shadow-md transition active:scale-[0.99] cursor-pointer"
        >
          <Calendar size={24} />
          <span>Agendar atendimento</span>
        </button>
      </div>

      {/* Grid Principal com 2 Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUNA ESQUERDA */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Card: PRÓXIMO ATENDIMENTO (Destaque Acessível com Borda Vermelha) */}
          {proximoAtendimento ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 relative overflow-hidden border-l-[6px] border-l-[#b91c1c]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                {/* Informações do Agendamento */}
                <div className="space-y-2">
                  <span className="text-xs font-extrabold tracking-wider text-red-700 uppercase block">
                    PRÓXIMO ATENDIMENTO
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {proximoAtendimento.servico}
                  </h3>

                  {/* Linha com Data e Horário Ampliada */}
                  <div className="flex flex-wrap items-center gap-6 text-base sm:text-lg text-slate-700 pt-1 font-medium">
                    <div className="flex items-center space-x-2">
                      <Calendar size={20} className="text-slate-500" />
                      <span>{proximoAtendimento.dataFormatada || proximoAtendimento.data}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={20} className="text-slate-500" />
                      <span className="font-bold text-slate-900">{proximoAtendimento.horario}</span>
                    </div>
                  </div>

                  {/* Badge de Status Confirmado */}
                  <div className="pt-2">
                    <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-sm font-bold border-2 border-slate-300 text-slate-800 bg-white">
                      <Check size={18} className="text-emerald-600" />
                      <span>{proximoAtendimento.status}</span>
                    </span>
                  </div>
                </div>

                {/* Botão Ver Detalhes */}
                <div className="sm:self-end">
                  <button
                    onClick={() => aoAbrirDetalhes(proximoAtendimento)}
                    className="w-full sm:w-auto px-6 py-3 border-2 border-slate-300 hover:bg-slate-100 text-slate-800 text-base font-bold rounded-xl transition cursor-pointer"
                  >
                    Ver detalhes
                  </button>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center shadow-xs">
              <CalendarCheck size={40} className="mx-auto text-slate-400 mb-3" />
              <p className="text-slate-700 font-bold text-lg">Você não possui nenhum atendimento agendado no momento.</p>
              <button
                onClick={() => aoIniciarAgendamento()}
                className="mt-3 text-base font-bold text-red-700 hover:underline cursor-pointer"
              >
                Clique aqui para agendar um atendimento
              </button>
            </div>
          )}

          {/* Seção: Serviços Mais Procurados */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Serviços mais procurados
              </h3>
              <button
                onClick={() => aoIniciarAgendamento()}
                className="text-sm sm:text-base font-bold text-red-700 hover:text-red-800 flex items-center space-x-1 transition cursor-pointer"
              >
                <span>Ver todos os serviços</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Grid 2x2 com cards de serviços amplos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {servicosPrincipais.map((servico, idx) => (
                <button
                  key={idx}
                  onClick={() => aoIniciarAgendamento(servico.titulo)}
                  className="w-full text-left p-5 sm:p-6 bg-white border border-slate-200/90 hover:border-red-300 rounded-2xl shadow-xs hover:shadow-sm transition flex items-center justify-between group cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-red-700 transition">
                    {servico.titulo}
                  </span>
                  <ArrowRight size={22} className="text-red-700 transition-transform group-hover:translate-x-1 flex-shrink-0 ml-3" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card: Atalhos */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-4">
              Atalhos
            </h3>

            <div className="divide-y divide-slate-100">
              <button
                onClick={() => aoIniciarAgendamento()}
                className="w-full py-4 flex items-center justify-between text-left hover:bg-slate-50 px-2 rounded-xl transition group cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <Calendar size={22} className="text-red-700" />
                  <span className="text-base font-bold text-slate-800 group-hover:text-red-700">
                    Agendar atendimento
                  </span>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => aoNavegarAba('meus-agendamentos')}
                className="w-full py-4 flex items-center justify-between text-left hover:bg-slate-50 px-2 rounded-xl transition group cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <FileText size={22} className="text-red-700" />
                  <span className="text-base font-bold text-slate-800 group-hover:text-red-700">
                    Meus agendamentos
                  </span>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => aoNavegarAba('ajuda')}
                className="w-full py-4 flex items-center justify-between text-left hover:bg-slate-50 px-2 rounded-xl transition group cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <HelpCircle size={22} className="text-red-700" />
                  <span className="text-base font-bold text-slate-800 group-hover:text-red-700">
                    Ajuda e dúvidas frequentes
                  </span>
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card: Atendimentos anteriores */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs text-center">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-4 text-left">
              Atendimentos anteriores
            </h3>

            <p className="text-base text-slate-500 py-6 font-medium">
              Nenhum atendimento anterior.
            </p>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => aoNavegarAba('meus-agendamentos')}
                className="text-base font-bold text-red-700 hover:text-red-800 hover:underline transition cursor-pointer"
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
