import React from 'react';
import { ChevronLeft, Clock, CheckCircle2, Info, Calendar } from 'lucide-react';

/**
 * Componente de Detalhes do Serviço Selecionado (Foto 3)
 * Projetado com foco em acessibilidade: tipografia grande, ícones nítidos e botões amplos.
 */
export default function AlunoDetalhesServico({
  servico,
  aoVoltarParaCatalogo,
  aoAvancarParaAgendamento
}) {
  if (!servico) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Botão de Retorno Acessível */}
      <button
        onClick={aoVoltarParaCatalogo}
        className="inline-flex items-center space-x-2 text-base font-bold text-slate-600 hover:text-slate-950 transition mb-6 py-2 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
      >
        <ChevronLeft size={22} className="text-slate-700" />
        <span>Voltar aos serviços</span>
      </button>

      {/* Título e Descrição com Tamanho Acessível */}
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {servico.title}
        </h2>
        <p className="text-slate-600 text-lg sm:text-xl mt-2 leading-relaxed font-medium">
          {servico.description}
        </p>
      </div>

      {/* Cartão Branco de Detalhes */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
        
        {/* Alerta de Responsável Legal (se aplicável ao serviço) */}
        {servico.requerResponsavel && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 flex items-start space-x-3.5 text-amber-950 font-medium">
            <Info size={24} className="text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-base text-amber-900">
                Atenção: Exige Presença Obrigatória de Responsável Legal
              </p>
              <p className="text-sm mt-1 leading-relaxed">
                Para alunos menores de 18 anos, a realização deste serviço exige o acompanhamento presencial do pai, mãe ou responsável legal com documento oficial com foto.
              </p>
            </div>
          </div>
        )}

        {/* Linha 1: Duração Prevista */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-slate-200">
          <span className="text-base font-bold text-slate-700">
            Duração prevista
          </span>
          <div className="md:col-span-3 flex items-center space-x-3 text-base sm:text-lg font-semibold text-slate-900">
            <Clock size={22} className="text-red-700 flex-shrink-0" />
            <span>{servico.duration || 'Cerca de 15 minutos'}</span>
          </div>
        </div>

        {/* Linha 2: Documentos Necessários */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8 border-b border-slate-200">
          <span className="text-base font-bold text-slate-700">
            Documentos necessários
          </span>
          <div className="md:col-span-3 space-y-3.5">
            {servico.requiredDocs && servico.requiredDocs.length > 0 ? (
              servico.requiredDocs.map((doc, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-base sm:text-lg text-slate-800 font-medium">
                  <CheckCircle2 size={22} className="text-emerald-700 flex-shrink-0" />
                  <span>{doc}</span>
                </div>
              ))
            ) : (
              <div className="flex items-center space-x-3 text-base sm:text-lg text-slate-800 font-medium">
                <CheckCircle2 size={22} className="text-emerald-700 flex-shrink-0" />
                <span>Documento oficial com foto (RG ou CNH)</span>
              </div>
            )}
          </div>
        </div>

        {/* Aviso Importante em Azul */}
        {servico.importantNotice && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 flex items-start space-x-3.5 text-base sm:text-lg text-blue-950 font-medium">
            <Info size={24} className="text-blue-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-bold">Importante:</strong> {servico.importantNotice}
            </p>
          </div>
        )}

      </div>

      {/* Botões Grandes e Acessíveis no Rodapé */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-end gap-4">
        <button
          onClick={aoVoltarParaCatalogo}
          className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-xl text-base font-bold transition cursor-pointer"
        >
          Voltar aos serviços
        </button>

        <button
          onClick={() => aoAvancarParaAgendamento(servico)}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8 py-4 rounded-xl text-base sm:text-lg font-bold shadow-md transition active:scale-[0.99] cursor-pointer"
        >
          <Calendar size={22} />
          <span>Agendar atendimento</span>
        </button>
      </div>

    </div>
  );
}
