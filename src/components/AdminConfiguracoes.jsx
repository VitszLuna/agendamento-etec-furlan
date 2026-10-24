import React, { useState } from 'react';
import { 
  Settings, 
  MapPin, 
  Clock, 
  Save, 
  Check, 
  ShieldCheck, 
  MessageCircle, 
  Eye, 
  Info 
} from 'lucide-react';

export default function AdminConfiguracoes({
  configuracoes,
  aoSalvarConfiguracoes,
  aoAlternarPerfil
}) {
  const [formConfig, setFormConfig] = useState({
    localAtendimento: 'Secretaria Acadêmica',
    toleranciaAtrasoMinutos: 10,
    intervaloAtendimentoMinutos: 15,
    diasAntecedenciaMaxima: 30,
    modeloMensagemWhatsApp: `Olá {aluno}! A Secretaria Acadêmica da Etec Antônio Furlan informa sobre o seu agendamento para "{servico}".\n\n📅 Horário marcado: {horario} ({data})\n⏳ Previsão: {tempoRestante}!\n\nPor favor, compareça à Secretaria Acadêmica com documento oficial com foto.\nRM: {rm}`,
    notificarWhatsAppPadrao: true,
    exigirDocumentoComFoto: true
  });

  const [mensagemSucesso, setMensagemSucesso] = useState(false);

  const submeterConfiguracoes = (e) => {
    e.preventDefault();
    if (aoSalvarConfiguracoes) {
      aoSalvarConfiguracoes(formConfig);
    }
    setMensagemSucesso(true);
    setTimeout(() => setMensagemSucesso(false), 3000);
  };

  const previaMensagem = (formConfig.modeloMensagemWhatsApp || '')
    .replace('{aluno}', 'Laura Ferreira')
    .replace('{servico}', 'Histórico e Certificado')
    .replace('{horario}', '15:30')
    .replace('{data}', 'Hoje')
    .replace('{tempoRestante}', 'faltam 25 minutos para o atendimento')
    .replace('{rm}', '21201');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center space-x-2.5">
            <Settings size={28} className="text-[#b91c1c] flex-shrink-0" />
            <span>Configurações da Secretaria</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base mt-1 font-medium">
            Gerencie os parâmetros operacionais, modelos de mensagens pré-definidas e regras da Secretaria Acadêmica.
          </p>
        </div>
      </div>

      {mensagemSucesso && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 text-xs sm:text-base font-bold rounded-2xl flex items-center space-x-3 shadow-sm animate-in fade-in duration-150">
          <Check size={20} className="text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
          <span>Configurações salvas e aplicadas com sucesso!</span>
        </div>
      )}

      <form onSubmit={submeterConfiguracoes} className="space-y-6 sm:space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            <MapPin size={20} className="text-[#b91c1c]" />
            <h3 className="text-base sm:text-lg font-extrabold">
              Local de Atendimento Presencial
            </h3>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/60 text-[#b91c1c] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100">
                Ponto de Atendimento Único: Secretaria Acadêmica
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Na Etec Antônio Furlan, todos os atendimentos ocorrem centralizados na Secretaria Acadêmica (piso térreo).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            <MessageCircle size={20} className="text-[#25D366]" />
            <h3 className="text-base sm:text-lg font-extrabold">
              Modelo de Mensagem Pré-definida (WhatsApp)
            </h3>
          </div>

          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-950 dark:text-emerald-100 text-xs sm:text-sm flex items-start space-x-2.5">
            <Info size={18} className="text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Aviso Operacional:</strong> A mensagem não é enviada automaticamente por robô. O funcionário da Secretaria clica no botão "Chamar" na Agenda e o sistema carrega este texto pré-definido com o cálculo exato do tempo restante.
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Texto do Modelo Pré-definido
            </label>
            <textarea
              rows={4}
              value={formConfig.modeloMensagemWhatsApp}
              onChange={(e) => setFormConfig({ ...formConfig, modeloMensagemWhatsApp: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-mono focus:ring-2 focus:ring-[#b91c1c] focus:outline-none"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Variáveis dinâmicas suportadas: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[#b91c1c] font-bold">{'{aluno}'}</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[#b91c1c] font-bold">{'{servico}'}</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[#b91c1c] font-bold">{'{horario}'}</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[#b91c1c] font-bold">{'{tempoRestante}'}</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[#b91c1c] font-bold">{'{rm}'}</code>
            </p>
          </div>

          <div className="mt-3 p-4 bg-[#f0fdf4] dark:bg-emerald-950/20 border border-[#bbf7d0] dark:border-emerald-800/60 rounded-xl">
            <div className="flex items-center space-x-2 text-emerald-900 dark:text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-2">
              <Eye size={16} className="text-emerald-700 dark:text-emerald-400" />
              <span>Simulação de Envio (Laura Ferreira - 3º TI)</span>
            </div>
            <pre className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans bg-white dark:bg-slate-850 p-3.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40 shadow-2xs">
              {previaMensagem}
            </pre>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Clock size={20} className="text-[#b91c1c]" />
            <h3 className="text-base sm:text-lg font-extrabold">
              Parâmetros de Horário e Tolerância
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tolerância de Atraso (minutos)
              </label>
              <input
                type="number"
                min="0"
                max="60"
                value={formConfig.toleranciaAtrasoMinutos}
                onChange={(e) => setFormConfig({ ...formConfig, toleranciaAtrasoMinutos: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold"
              />
              <p className="text-[11px] text-slate-400 mt-1">Tempo limite antes de cancelar o agendamento.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Intervalo Médio por Consulta
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={formConfig.intervaloAtendimentoMinutos}
                onChange={(e) => setFormConfig({ ...formConfig, intervaloAtendimentoMinutos: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold"
              />
              <p className="text-[11px] text-slate-400 mt-1">Duração base prevista para cada atendimento.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Antecedência Máxima (dias)
              </label>
              <input
                type="number"
                min="1"
                max="90"
                value={formConfig.diasAntecedenciaMaxima}
                onChange={(e) => setFormConfig({ ...formConfig, diasAntecedenciaMaxima: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-bold"
              />
              <p className="text-[11px] text-slate-400 mt-1">Quantos dias à frente o calendário abre.</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
            <ShieldCheck size={20} className="text-[#b91c1c]" />
            <h3 className="text-base sm:text-lg font-extrabold">
              Diretrizes de Atendimento e Documentação
            </h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formConfig.notificarWhatsAppPadrao}
                onChange={(e) => setFormConfig({ ...formConfig, notificarWhatsAppPadrao: e.target.checked })}
                className="w-5 h-5 rounded text-[#b91c1c] accent-[#b91c1c] mt-0.5 cursor-pointer"
              />
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 block">
                  Habilitar botão de mensagem pré-definida no WhatsApp na Agenda
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  Permite aos funcionários enviar com 1 clique a mensagem pré-definida com contagem regressiva para o atendimento.
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={formConfig.exigirDocumentoComFoto}
                onChange={(e) => setFormConfig({ ...formConfig, exigirDocumentoComFoto: e.target.checked })}
                className="w-5 h-5 rounded text-[#b91c1c] accent-[#b91c1c] mt-0.5 cursor-pointer"
              />
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 block">
                  Exigir obrigatoriamente documento oficial original com foto na Secretaria
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  Reforça em todos os comprovantes emitidos o aviso aos estudantes e responsáveis sobre a obrigatoriedade da documentação.
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center space-x-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-md transition active:scale-[0.99] cursor-pointer"
          >
            <Save size={18} />
            <span>Salvar Configurações</span>
          </button>
        </div>
      </form>
    </div>
  );
}
