import React from 'react';
import { X, Calendar, Clock, MapPin, FileCheck, Hash, User, AlertCircle } from 'lucide-react';

/**
 * Modal com Detalhes Completos do Atendimento
 * Focado em acessibilidade e facilidade de leitura.
 */
export default function ModalDetalhesAtendimento({
  atendimento,
  estaAberto,
  aoFechar,
  aoCancelarAtendimento
}) {
  if (!estaAberto || !atendimento) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xl font-extrabold text-slate-900">
            Detalhes do Atendimento
          </h3>
          <button
            onClick={aoFechar}
            className="text-slate-400 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-200 transition cursor-pointer"
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-8 space-y-6">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
              Serviço Acadêmico
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {atendimento.status || 'Confirmado'}
            </span>
          </div>

          <h4 className="text-2xl font-extrabold text-slate-900 -mt-2">
            {atendimento.servico}
          </h4>

          {/* Dados em Card com Tipografia Grande */}
          <div className="bg-slate-50 rounded-2xl p-5 space-y-3.5 text-base text-slate-800 border border-slate-200">
            <div className="flex items-center space-x-3">
              <Calendar size={20} className="text-red-700 flex-shrink-0" />
              <span><strong>Data:</strong> {atendimento.dataFormatada || atendimento.data}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-red-700 flex-shrink-0" />
              <span><strong>Horário:</strong> {atendimento.horario}</span>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin size={20} className="text-red-700 flex-shrink-0" />
              <span><strong>Local:</strong> {atendimento.local || 'Secretaria Acadêmica - Guichê 02'}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Hash size={20} className="text-red-700 flex-shrink-0" />
              <span><strong>Protocolo:</strong> <span className="font-mono font-bold text-slate-900">{atendimento.protocolo || 'AG-2026-0925-884'}</span></span>
            </div>

            {atendimento.aluno && (
              <div className="flex items-center space-x-3">
                <User size={20} className="text-red-700 flex-shrink-0" />
                <span><strong>Aluno:</strong> {atendimento.aluno} (RM: {atendimento.rm})</span>
              </div>
            )}
          </div>

          {/* Orientações */}
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-sm text-blue-950 font-medium">
            <p className="font-bold mb-1 flex items-center space-x-2">
              <FileCheck size={18} className="text-blue-700" />
              <span>Orientações importantes:</span>
            </p>
            <p className="leading-relaxed">
              Compareça com 5 minutos de antecedência munido de documento oficial original com foto (RG ou CNH).
            </p>
          </div>

          {/* Ações */}
          <div className="pt-2 flex items-center justify-between">
            {aoCancelarAtendimento && atendimento.status === 'Confirmado' && (
              <button
                type="button"
                onClick={() => {
                  aoCancelarAtendimento(atendimento.id);
                  aoFechar();
                }}
                className="text-sm text-red-700 hover:text-red-900 font-bold hover:underline cursor-pointer"
              >
                Cancelar agendamento
              </button>
            )}

            <button
              type="button"
              onClick={aoFechar}
              className="ml-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition cursor-pointer"
            >
              Fechar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
