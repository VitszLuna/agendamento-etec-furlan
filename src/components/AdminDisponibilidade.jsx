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

/**
 * Componente da Visão de Disponibilidade do Administrador (Foto 3)
 * Adaptado com tipografia ampliada, botões táteis acessíveis e validação rigorosa.
 */
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

  // Alternar atendimento no dia
  const alternarDia = (nomeDia) => {
    aoAtualizarDisponibilidade((prev) => ({
      ...prev,
      [nomeDia]: {
        ...prev[nomeDia],
        ativo: !prev[nomeDia].ativo
      }
    }));
  };

  // Remover horário
  const removerHorario = (nomeDia, horaParaRemover) => {
    aoAtualizarDisponibilidade((prev) => ({
      ...prev,
      [nomeDia]: {
        ...prev[nomeDia],
        horarios: prev[nomeDia].horarios.filter((h) => h !== horaParaRemover)
      }
    }));
  };

  // Adicionar horário com validação estrita de formato HH:MM
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

  // Adicionar bloqueio com validação
  const submeterBloqueio = (e) => {
    e.preventDefault();
    setErroBloqueio('');

    if (!dataBloqueio) {
      setErroBloqueio('Selecione uma data para o bloqueio.');
      return;
    }

    const partes = dataBloqueio.split('-');
    const tituloFormatado = `Data: ${partes[2]}/${partes[1]}/${partes[0]}`;
    const textoDetalhe = bloquearDiaInteiro 
      ? `Dia inteiro • ${motivoBloqueio || 'Bloqueio administrativo'}`
      : `${horaInicioBloqueio} às ${horaFimBloqueio} • ${motivoBloqueio || 'Período bloqueado'}`;

    const novoBloqueio = {
      id: `block-${Date.now()}`,
      titulo: tituloFormatado,
      data: dataBloqueio,
      detalhe: textoDetalhe,
      diaInteiro: bloquearDiaInteiro,
      horarioInicio: bloquearDiaInteiro ? null : horaInicioBloqueio,
      horarioFim: bloquearDiaInteiro ? null : horaFimBloqueio,
      motivo: motivoBloqueio
    };

    aoAtualizarPeriodosBloqueados((prev) => [novoBloqueio, ...prev]);
    setMotivoBloqueio('');
    setMensagemFeedback('Período bloqueado com sucesso!');
    setTimeout(() => setMensagemFeedback(null), 3000);
  };

  // Remover bloqueio
  const removerBloqueio = (idBloqueio) => {
    aoAtualizarPeriodosBloqueados((prev) => prev.filter((b) => b.id !== idBloqueio));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Cabeçalho */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Disponibilidade
        </h2>
        <p className="text-slate-600 text-base sm:text-lg mt-1 font-medium">
          Defina os dias e horários de atendimento da Secretaria.
        </p>
      </div>

      {mensagemFeedback && (
        <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-base font-bold rounded-xl flex items-center space-x-2">
          <Check size={20} className="text-emerald-700" />
          <span>{mensagemFeedback}</span>
        </div>
      )}

      {/* Grid com 2 Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUNA ESQUERDA: Dias e Horários de Atendimento */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-extrabold text-slate-900 mb-6">
            Dias e horários de atendimento
          </h3>

          <div className="space-y-8 divide-y divide-slate-100">
            {Object.entries(disponibilidade).map(([nomeDia, dadosDia], index) => (
              <div key={nomeDia} className={index > 0 ? "pt-6" : ""}>
                
                {/* Linha do Dia e Toggle Switch "Com atendimento" */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-slate-900 text-base sm:text-lg">
                    {nomeDia}
                  </span>

                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => alternarDia(nomeDia)}
                      className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        dadosDia.ativo ? 'bg-[#b91c1c]' : 'bg-slate-300'
                      }`}
                      role="switch"
                      aria-checked={dadosDia.ativo}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          dadosDia.ativo ? 'translate-x-7' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="text-sm font-bold text-slate-700">
                      {dadosDia.ativo ? 'Com atendimento' : 'Sem atendimento'}
                    </span>
                  </div>
                </div>

                {/* Lista de Horários do Dia em Tags Ampliadas */}
                {dadosDia.ativo ? (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mb-4">
                      {dadosDia.horarios.map((hora) => (
                        <div
                          key={hora}
                          className="flex items-center justify-between px-3.5 py-2.5 bg-white border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-800 hover:border-slate-400 transition"
                        >
                          <span>{hora}</span>
                          <button
                            type="button"
                            onClick={() => removerHorario(nomeDia, hora)}
                            className="text-slate-400 hover:text-red-700 p-1 rounded transition cursor-pointer"
                            title="Remover horário"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Formulário para Adicionar Novo Horário */}
                    <div className="flex items-center space-x-3 mt-3">
                      <div className="relative w-36">
                        <input
                          type="text"
                          placeholder="--:--"
                          value={novoHorarioPorDia[nomeDia] || ''}
                          onChange={(e) =>
                            setNovoHorarioPorDia({
                              ...novoHorarioPorDia,
                              [nomeDia]: e.target.value
                            })
                          }
                          className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <Clock size={16} className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none" />
                      </div>

                      <button
                        type="button"
                        onClick={() => adicionarHorario(nomeDia)}
                        className="flex items-center space-x-2 px-5 py-2.5 border-2 border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-sm font-bold transition cursor-pointer"
                      >
                        <Plus size={16} />
                        <span>Adicionar</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-slate-400 italic py-2">
                    Atendimento desativado para este dia da semana.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA DIREITA: Bloquear datas e períodos */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Card: Bloquear datas e períodos */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">
              Bloquear datas e períodos
            </h3>
            <p className="text-slate-600 text-sm mt-1 mb-6">
              Horários bloqueados deixam de aparecer para os alunos.
            </p>

            <form onSubmit={submeterBloqueio} className="space-y-5">
              {erroBloqueio && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-medium rounded-lg flex items-center space-x-2">
                  <AlertCircle size={16} />
                  <span>{erroBloqueio}</span>
                </div>
              )}

              {/* Data */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  value={dataBloqueio}
                  onChange={(e) => setDataBloqueio(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              {/* Checkbox Bloquear o dia inteiro */}
              <div className="flex items-center space-x-3 pt-1">
                <input
                  type="checkbox"
                  id="bloquearDiaInteiro"
                  checked={bloquearDiaInteiro}
                  onChange={(e) => setBloquearDiaInteiro(e.target.checked)}
                  className="w-5 h-5 text-red-700 rounded border-slate-300 focus:ring-red-500 accent-[#b91c1c] cursor-pointer"
                />
                <label htmlFor="bloquearDiaInteiro" className="text-sm font-bold text-slate-800 cursor-pointer">
                  Bloquear o dia inteiro
                </label>
              </div>

              {!bloquearDiaInteiro && (
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Início
                    </label>
                    <input
                      type="time"
                      value={horaInicioBloqueio}
                      onChange={(e) => setHoraInicioBloqueio(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Fim
                    </label>
                    <input
                      type="time"
                      value={horaFimBloqueio}
                      onChange={(e) => setHoraFimBloqueio(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              )}

              {/* Motivo */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Motivo (opcional)
                </label>
                <input
                  type="text"
                  value={motivoBloqueio}
                  onChange={(e) => setMotivoBloqueio(e.target.value)}
                  placeholder="Ex.: feriado, reunião"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Botão Vermelho */}
              <button
                type="submit"
                className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold py-3.5 px-6 rounded-xl text-base transition shadow-sm cursor-pointer"
              >
                Bloquear período
              </button>
            </form>
          </div>

          {/* Card: Bloqueios programados */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-5">
              Bloqueios programados
            </h3>

            {periodosBloqueados.length === 0 ? (
              <p className="text-sm text-slate-500 italic">
                Nenhum bloqueio cadastrado no momento.
              </p>
            ) : (
              <div className="space-y-4">
                {periodosBloqueados.map((bloco) => (
                  <div
                    key={bloco.id}
                    className="flex items-start justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-start space-x-3.5">
                      <div className="mt-1 text-red-600">
                        <Ban size={22} />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {bloco.titulo}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          {bloco.detalhe}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removerBloqueio(bloco.id)}
                      className="text-slate-400 hover:text-red-700 p-1.5 rounded-lg transition cursor-pointer"
                      title="Excluir bloqueio"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
