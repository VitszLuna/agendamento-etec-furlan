import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Clock, 
  Ban, 
  Trash2, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export default function AdminDisponibilidade({
  disponibilidade,
  aoAtualizarDisponibilidade,
  periodosBloqueados,
  aoAtualizarPeriodosBloqueados
}) {
  const [novoHorarioPorDia, setNovoHorarioPorDia] = useState({});
  const [dataBloqueio, setDataBloqueio] = useState('2026-10-30');
  const [bloquearDiaInteiro, setBloquearDiaInteiro] = useState(true);
  const [motivoBloqueio, setMotivoBloqueio] = useState('');
  const [horaInicioBloqueio, setHoraInicioBloqueio] = useState('13:30');
  const [horaFimBloqueio, setHoraFimBloqueio] = useState('16:30');
  const [mensagemFeedback, setMensagemFeedback] = useState(null);
  const [erroBloqueio, setErroBloqueio] = useState('');

  const alternarDia = (nomeDia) => {
    aoAtualizarDisponibilidade((prev) => ({
      ...prev,
      [nomeDia]: {
        ...prev[nomeDia],
        ativo: !prev[nomeDia].ativo
      }
    }));
  };

  const removerHorario = (nomeDia, horaParaRemover) => {
    aoAtualizarDisponibilidade((prev) => ({
      ...prev,
      [nomeDia]: {
        ...prev[nomeDia],
        horarios: prev[nomeDia].horarios.filter((h) => h !== horaParaRemover)
      }
    }));
  };

  const adicionarHorario = (nomeDia) => {
    const hora = novoHorarioPorDia[nomeDia]?.trim();
    if (!hora) return;

    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(hora)) {
      alert('Por favor, informe um horário válido no formato HH:MM (exemplo: 11:30)');
      return;
    }

    if (disponibilidade[nomeDia]?.horarios.includes(hora)) {
      alert('Este horário já foi cadastrado para este dia.');
      return;
    }

    aoAtualizarDisponibilidade((prev) => {
      const novaLista = [...(prev[nomeDia]?.horarios || []), hora].sort();
      return {
        ...prev,
        [nomeDia]: {
          ...prev[nomeDia],
          horarios: novaLista
        }
      };
    });

    setNovoHorarioPorDia((prev) => ({ ...prev, [nomeDia]: '' }));
  };

  const adicionarBloqueio = (e) => {
    e.preventDefault();
    setErroBloqueio('');

    if (!motivoBloqueio.trim()) {
      setErroBloqueio('Por favor, descreva o motivo do bloqueio (ex.: Reunião pedagógica, Feriado).');
      return;
    }

    if (!dataBloqueio) {
      setErroBloqueio('Selecione uma data para o bloqueio.');
      return;
    }

    const partes = dataBloqueio.split('-');
    const dataFormatadaBr = `${partes[2]}/${partes[1]}/${partes[0]}`;
    
    const novoBloqueio = {
      id: `block-${Date.now()}`,
      titulo: `${dataFormatadaBr} — ${motivoBloqueio}`,
      data: dataBloqueio,
      detalhe: bloquearDiaInteiro 
        ? `Dia inteiro • ${motivoBloqueio}` 
        : `${horaInicioBloqueio} às ${horaFimBloqueio} • ${motivoBloqueio}`,
      diaInteiro: bloquearDiaInteiro,
      horarioInicio: bloquearDiaInteiro ? null : horaInicioBloqueio,
      horarioFim: bloquearDiaInteiro ? null : horaFimBloqueio,
      motivo: motivoBloqueio
    };

    aoAtualizarPeriodosBloqueados((prev) => [novoBloqueio, ...prev]);

    setMotivoBloqueio('');
    setMensagemFeedback('Período bloqueado com sucesso na agenda da Secretaria.');
    setTimeout(() => setMensagemFeedback(null), 3500);
  };

  const removerBloqueio = (idBloqueio) => {
    aoAtualizarPeriodosBloqueados((prev) => prev.filter((b) => b.id !== idBloqueio));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Horários e Disponibilidade
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg mt-1 font-medium">
          Configure a grade semanal e adicione bloqueios pontuais na Secretaria Acadêmica.
        </p>
      </div>

      {mensagemFeedback && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 rounded-2xl flex items-center space-x-3 text-sm sm:text-base font-bold shadow-sm animate-in fade-in duration-150">
          <Check size={20} className="text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
          <span>{mensagemFeedback}</span>
        </div>
      )}

      <div className="space-y-6 mb-10 sm:mb-14">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
          Grade Semanal de Atendimento
        </h3>

        <div className="space-y-4">
          {Object.entries(disponibilidade).map(([dia, config]) => (
            <div 
              key={dia}
              className={`p-4 sm:p-6 rounded-2xl border-2 transition ${
                config.ativo 
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs' 
                  : 'bg-slate-100 dark:bg-slate-850 border-slate-300 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
                    {dia}
                  </span>
                  <span className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    config.ativo 
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                  }`}>
                    {config.ativo ? 'Atendimento Aberto' : 'Sem Atendimento'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => alternarDia(dia)}
                  className={`self-start sm:self-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition cursor-pointer ${
                    config.ativo
                      ? 'border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
                      : 'border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 bg-white dark:bg-slate-900'
                  }`}
                >
                  {config.ativo ? 'Desativar este dia' : 'Ativar este dia'}
                </button>
              </div>

              {config.ativo && (
                <div className="pt-4 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {config.horarios.map((hora) => (
                      <span
                        key={hora}
                        className="inline-flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group hover:border-red-300 transition"
                      >
                        <Clock size={14} className="text-slate-400" />
                        <span>{hora}</span>
                        <button
                          type="button"
                          onClick={() => removerHorario(dia, hora)}
                          className="text-slate-400 hover:text-red-700 dark:hover:text-red-400 p-0.5 rounded-md transition cursor-pointer"
                          title="Remover horário"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="text"
                      placeholder="HH:MM (ex: 16:30)"
                      value={novoHorarioPorDia[dia] || ''}
                      onChange={(e) => setNovoHorarioPorDia({ ...novoHorarioPorDia, [dia]: e.target.value })}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); adicionarHorario(dia); } }}
                      className="px-3 py-2 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 w-36 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                    />
                    <button
                      type="button"
                      onClick={() => adicionarHorario(dia)}
                      className="inline-flex items-center space-x-1 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
                    >
                      <Plus size={16} />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
          <Ban size={22} className="text-[#b91c1c]" />
          <span>Bloqueios Pontuais e Feriados</span>
        </h3>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
            Cadastrar Novo Bloqueio na Agenda
          </h4>

          {erroBloqueio && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs sm:text-sm font-semibold rounded-xl flex items-center space-x-2">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{erroBloqueio}</span>
            </div>
          )}

          <form onSubmit={adicionarBloqueio} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Data do Bloqueio *
                </label>
                <input
                  type="date"
                  value={dataBloqueio}
                  onChange={(e) => setDataBloqueio(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Motivo do Bloqueio *
                </label>
                <input
                  type="text"
                  placeholder="Ex.: Reunião pedagógica, Feriado"
                  value={motivoBloqueio}
                  onChange={(e) => setMotivoBloqueio(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <label className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bloquearDiaInteiro}
                  onChange={(e) => setBloquearDiaInteiro(e.target.checked)}
                  className="w-4 h-4 rounded text-[#b91c1c] accent-[#b91c1c]"
                />
                <span>Bloquear o dia inteiro (sem atendimentos)</span>
              </label>

              {!bloquearDiaInteiro && (
                <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                  <span>Das:</span>
                  <input
                    type="time"
                    value={horaInicioBloqueio}
                    onChange={(e) => setHoraInicioBloqueio(e.target.value)}
                    className="px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-xs font-mono"
                  />
                  <span>Às:</span>
                  <input
                    type="time"
                    value={horaFimBloqueio}
                    onChange={(e) => setHoraFimBloqueio(e.target.value)}
                    className="px-2 py-1 bg-white dark:bg-slate-800 border rounded-lg text-xs font-mono"
                  />
                </div>
              )}

              <button
                type="submit"
                className="inline-flex items-center justify-center space-x-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition active:scale-[0.98] cursor-pointer"
              >
                <Ban size={16} />
                <span>Salvar Bloqueio</span>
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-3">
          {periodosBloqueados.map((bloqueio) => (
            <div
              key={bloqueio.id}
              className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs"
            >
              <div>
                <h5 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                  {bloqueio.titulo}
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  {bloqueio.detalhe}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removerBloqueio(bloqueio.id)}
                className="text-slate-400 hover:text-red-700 dark:hover:text-red-400 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Remover bloqueio"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
