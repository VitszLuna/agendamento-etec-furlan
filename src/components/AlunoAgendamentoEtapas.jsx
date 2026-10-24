import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  ShieldAlert
} from 'lucide-react';

export default function AlunoAgendamentoEtapas({
  servico,
  dadosAluno,
  aoCancelar,
  aoConcluirAgendamento,
  aoMudarAba
}) {
  const [etapaAtual, setEtapaAtual] = useState(2);
  const [mesExibido, setMesExibido] = useState('outubro');
  const [dataSelecionada, setDataSelecionada] = useState('2026-10-23');
  const [horarioSelecionado, setHorarioSelecionado] = useState('15:30');

  const [formulario, setFormulario] = useState({
    nome: dadosAluno?.nome || 'Laura Ferreira',
    rm: dadosAluno?.rm || '21201',
    turma: dadosAluno?.turma || '3º TI',
    curso: dadosAluno?.curso || 'Informática para Internet',
    email: dadosAluno?.email || 'laura.ferreira@gmail.com',
    telefone: dadosAluno?.telefone || '(11) 95321-2324',
    observacoes: '',
    nomeResponsavel: dadosAluno?.nomeResponsavel || 'Vitoria Mendes',
    parentescoResponsavel: dadosAluno?.parentescoResponsavel || 'Mãe',
    cinResponsavel: dadosAluno?.cinResponsavel || '123.456.789-00',
    telefoneResponsavel: dadosAluno?.telefoneResponsavel || '(11) 98765-4321'
  });

  const [agendamentoConfirmado, setAgendamentoConfirmado] = useState(null);

  const horariosManha = [
    { hora: '08:00', ocupado: false },
    { hora: '08:30', ocupado: false },
    { hora: '09:00', ocupado: false },
    { hora: '09:30', ocupado: false },
    { hora: '10:00', ocupado: true },
    { hora: '10:30', ocupado: false },
    { hora: '11:00', ocupado: false },
    { hora: '11:30', ocupado: false }
  ];

  const horariosTarde = [
    { hora: '13:30', ocupado: false },
    { hora: '14:00', ocupado: false },
    { hora: '14:30', ocupado: false },
    { hora: '15:00', ocupado: false },
    { hora: '15:30', ocupado: false },
    { hora: '16:00', ocupado: false }
  ];

  const obterTextoData = () => {
    if (!dataSelecionada) return 'A escolher';
    const partes = dataSelecionada.split('-');
    const dia = partes[2];
    const mes = partes[1];
    const ano = partes[0];

    const mesesNomes = {
      '09': 'setembro',
      '10': 'outubro',
      '11': 'novembro'
    };

    return `${dia} de ${mesesNomes[mes] || 'outubro'} de ${ano}`;
  };

  const confirmarAgendamentoFinal = () => {
    const novoAtendimento = {
      id: `agend-${Date.now()}`,
      servico: servico.title,
      data: dataSelecionada,
      dataFormatada: obterTextoData(),
      horario: horarioSelecionado,
      status: 'Agendado',
      aluno: formulario.nome,
      curso: formulario.curso,
      turma: formulario.turma,
      rm: formulario.rm,
      email: formulario.email,
      telefone: formulario.telefone,
      observacao: formulario.observacoes,
      requerResponsavel: servico.requerResponsavel,
      nomeResponsavel: servico.requerResponsavel ? formulario.nomeResponsavel : null,
      parentescoResponsavel: servico.requerResponsavel ? formulario.parentescoResponsavel : null,
      protocolo: `AG-2026-1023-${Math.floor(100 + Math.random() * 900)}`,
      local: 'Secretaria Acadêmica',
      duration: servico.duration,
      documentosNecessarios: servico.requiredDocs ? servico.requiredDocs.join(', ') : 'Documento oficial com foto (RG ou CNH)'
    };

    setAgendamentoConfirmado(novoAtendimento);
    aoConcluirAgendamento(novoAtendimento);
    setEtapaAtual(4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <button
        onClick={aoCancelar}
        className="inline-flex items-center space-x-2 text-sm sm:text-base font-bold text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 transition mb-4 sm:mb-6 py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
      >
        <ChevronLeft size={20} />
        <span>Cancelar e voltar ao serviço</span>
      </button>

      <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-6 sm:mb-8">
        Agendar atendimento
      </h2>

      {servico.requerResponsavel && (
        <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 rounded-2xl flex items-start space-x-3 text-amber-950 dark:text-amber-100 font-medium">
          <ShieldAlert size={22} className="text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-amber-900 dark:text-amber-200">
              Atenção: Serviço com exigência de Responsável Legal
            </h4>
            <p className="text-xs sm:text-sm mt-1 leading-relaxed">
              Para o serviço <strong>"{servico.title}"</strong>, a presença de um responsável legal com documento original é obrigatória na Secretaria caso o aluno tenha menos de 18 anos.
            </p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-5 mb-6 sm:mb-8">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-base font-bold text-slate-900 dark:text-slate-100 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#b91c1c] text-white flex items-center justify-center font-bold text-xs sm:text-sm">
              <Check size={16} />
            </div>
            <span className="hidden sm:inline">Serviço</span>
          </div>

          <div className="flex-1 h-[2px] sm:h-[3px] bg-[#b91c1c] mx-2 sm:mx-4"></div>

          <div className="flex items-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-base font-bold text-slate-900 dark:text-slate-100 flex-shrink-0">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
              etapaAtual > 2
                ? 'bg-[#b91c1c] text-white'
                : 'border-2 border-[#b91c1c] text-[#b91c1c] bg-white dark:bg-slate-900'
            }`}>
              {etapaAtual > 2 ? <Check size={16} /> : '2'}
            </div>
            <span className="hidden sm:inline">Data/Hora</span>
          </div>

          <div className={`flex-1 h-[2px] sm:h-[3px] mx-2 sm:mx-4 ${etapaAtual >= 3 ? 'bg-[#b91c1c]' : 'bg-slate-200 dark:bg-slate-700'}`}></div>

          <div className="flex items-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-base font-bold flex-shrink-0">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
              etapaAtual > 3
                ? 'bg-[#b91c1c] text-white'
                : etapaAtual === 3
                ? 'border-2 border-[#b91c1c] text-[#b91c1c] bg-white dark:bg-slate-900'
                : 'border-2 border-slate-300 dark:border-slate-700 text-slate-400 bg-white dark:bg-slate-900'
            }`}>
              {etapaAtual > 3 ? <Check size={16} /> : '3'}
            </div>
            <span className={`hidden sm:inline ${etapaAtual >= 3 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>
              Dados
            </span>
          </div>

          <div className={`flex-1 h-[2px] sm:h-[3px] mx-2 sm:mx-4 ${etapaAtual >= 3.5 ? 'bg-[#b91c1c]' : 'bg-slate-200 dark:bg-slate-700'}`}></div>

          <div className="flex items-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-base font-bold flex-shrink-0">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm ${
              etapaAtual === 4
                ? 'bg-[#b91c1c] text-white'
                : etapaAtual === 3.5
                ? 'border-2 border-[#b91c1c] text-[#b91c1c] bg-white dark:bg-slate-900'
                : 'border-2 border-slate-300 dark:border-slate-700 text-slate-400 bg-white dark:bg-slate-900'
            }`}>
              {etapaAtual === 4 ? <Check size={16} /> : '4'}
            </div>
            <span className={`hidden sm:inline ${etapaAtual >= 3.5 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>
              Revisão
            </span>
          </div>
        </div>
      </div>

      {etapaAtual === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">
                  Escolha uma data
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <button 
                    type="button" 
                    onClick={() => setMesExibido('setembro')}
                    className={`p-1.5 sm:p-2 rounded-xl border-2 transition cursor-pointer ${
                      mesExibido === 'setembro' ? 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                    {mesExibido === 'outubro' ? 'Outubro 2026' : 'Setembro 2026'}
                  </span>

                  <button 
                    type="button" 
                    onClick={() => setMesExibido('outubro')}
                    className={`p-1.5 sm:p-2 rounded-xl border-2 transition cursor-pointer ${
                      mesExibido === 'outubro' ? 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[11px] sm:text-xs font-bold text-slate-400 mb-2">
                  <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
                </div>

                {mesExibido === 'outubro' && (
                  <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm font-semibold">
                    <span className="p-1.5 sm:p-2 text-slate-300"></span>
                    <span className="p-1.5 sm:p-2 text-slate-300"></span>
                    <span className="p-1.5 sm:p-2 text-slate-300"></span>
                    <span className="p-1.5 sm:p-2 text-slate-300"></span>

                    <button type="button" onClick={() => setDataSelecionada('2026-10-01')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-01' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>1</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-02')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-02' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>2</button>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">3</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">4</span>

                    <button type="button" onClick={() => setDataSelecionada('2026-10-05')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-05' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>5</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-06')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-06' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>6</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-07')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-07' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>7</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-08')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-08' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>8</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-09')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-09' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>9</button>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">10</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">11</span>

                    <span className="p-1.5 sm:p-2 text-red-300 line-through font-bold">12</span>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-13')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-13' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>13</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-14')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-14' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>14</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-15')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-15' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>15</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-16')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-16' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>16</button>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">17</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">18</span>

                    <button type="button" onClick={() => setDataSelecionada('2026-10-19')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-19' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>19</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-20')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-20' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>20</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-21')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-21' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>21</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-22')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-22' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>22</button>
                    
                    <button type="button" onClick={() => setDataSelecionada('2026-10-23')} className={`p-1.5 sm:p-2.5 rounded-xl font-extrabold transition cursor-pointer ${dataSelecionada === '2026-10-23' ? 'bg-[#b91c1c] text-white shadow-sm' : 'border-2 border-red-500 text-red-700'}`}>23</button>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">24</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">25</span>

                    <button type="button" onClick={() => setDataSelecionada('2026-10-26')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-26' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>26</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-27')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-27' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>27</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-28')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-28' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>28</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-29')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-29' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>29</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-30')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-30' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>30</button>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">31</span>
                  </div>
                )}

                {mesExibido === 'setembro' && (
                  <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm font-semibold">
                    <span className="p-1.5 sm:p-2 text-slate-300"></span>
                    <span className="p-1.5 sm:p-2 text-slate-300"></span>

                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">1</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">2</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">3</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">4</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">5</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">6</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">7</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">8</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">9</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">10</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">11</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">12</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">13</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">14</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">15</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">16</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">17</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">18</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">19</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">20</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">21</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">22</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">23</span>

                    <button type="button" onClick={() => setDataSelecionada('2026-09-24')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-09-24' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>24</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-09-25')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-09-25' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>25</button>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">26</span>
                    <span className="p-1.5 sm:p-2 text-slate-300 dark:text-slate-600 line-through">27</span>
                    <button type="button" onClick={() => setDataSelecionada('2026-09-28')} className={`p-1.5 sm:p-2.5 rounded-xl font-bold transition cursor-pointer ${dataSelecionada === '2026-09-28' ? 'bg-[#b91c1c] text-white shadow-xs' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>28</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-09-29')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-09-29' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>29</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-09-30')} className={`p-1.5 sm:p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-09-30' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'}`}>30</button>
                  </div>
                )}

                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-3 sm:mt-4 font-medium">
                  Dias riscados são finais de semana ou feriados sem atendimento.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Escolha um horário
                </h3>

                <div className="mt-2 space-y-4 sm:space-y-5">
                  <p className="text-xs sm:text-sm font-bold text-[#b91c1c]">
                    {obterTextoData()}
                  </p>

                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                      Manhã
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
                      {horariosManha.map((slot) => (
                        <button
                          key={slot.hora}
                          type="button"
                          disabled={slot.ocupado}
                          onClick={() => setHorarioSelecionado(slot.hora)}
                          className={`py-2.5 sm:py-3 px-1 text-xs sm:text-sm font-bold rounded-xl border-2 text-center transition ${
                            slot.ocupado
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border-slate-200 dark:border-slate-700 line-through cursor-not-allowed'
                              : horarioSelecionado === slot.hora
                              ? 'border-[#b91c1c] bg-red-50 dark:bg-red-950/40 text-[#b91c1c] shadow-xs'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-slate-200 cursor-pointer'
                          }`}
                        >
                          {slot.hora}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                      Tarde
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
                      {horariosTarde.map((slot) => (
                        <button
                          key={slot.hora}
                          type="button"
                          disabled={slot.ocupado}
                          onClick={() => setHorarioSelecionado(slot.hora)}
                          className={`py-2.5 sm:py-3 px-1 text-xs sm:text-sm font-bold rounded-xl border-2 text-center transition ${
                            slot.ocupado
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border-slate-200 dark:border-slate-700 line-through cursor-not-allowed'
                              : horarioSelecionado === slot.hora
                              ? 'border-[#b91c1c] bg-red-50 dark:bg-red-950/40 text-[#b91c1c] shadow-xs'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-slate-200 cursor-pointer'
                          }`}
                        >
                          {slot.hora}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 pt-1">
                    Horários riscados já estão ocupados por outros alunos.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6">
              <button
                type="button"
                onClick={aoCancelar}
                className="w-full sm:w-auto px-6 py-3 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-sm sm:text-base font-bold transition cursor-pointer text-center"
              >
                Voltar ao serviço
              </button>

              <button
                type="button"
                disabled={!dataSelecionada || !horarioSelecionado}
                onClick={() => setEtapaAtual(3)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold transition shadow-sm bg-[#b91c1c] hover:bg-[#991b1b] text-white cursor-pointer active:scale-[0.99] text-center"
              >
                Continuar para Dados →
              </button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5">
              <h3 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                SEU AGENDAMENTO
              </h3>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base font-medium">
                <div className="flex items-start space-x-3">
                  <FileText size={18} className="text-[#b91c1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-xs">Serviço</span>
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                      {servico.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar size={18} className="text-[#b91c1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-xs">Data</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                      {obterTextoData()}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock size={18} className="text-[#b91c1c] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 dark:text-slate-400 block text-xs">Horário</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                      {horarioSelecionado || 'A escolher'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">
                  Duração estimada: {servico.duration}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {etapaAtual === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-8 shadow-xs">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Confirme seu agendamento
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 mb-6">
                A escola já possui seus dados cadastrais. Verifique as informações abaixo e adicione uma observação se precisar.
              </p>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 sm:p-5 space-y-3 mb-5 border border-slate-200 dark:border-slate-700">
                <p className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Seus dados cadastrais</p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">Nome</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{formulario.nome}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">RM</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{formulario.rm}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">Turma</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{formulario.turma}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">Curso</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{formulario.curso}</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                  ✓ Dados carregados do sistema institucional.
                </p>
              </div>

              {servico.requerResponsavel && (
                <div className="mb-5 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl">
                  <p className="text-[11px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">Responsável Legal necessário</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{formulario.nomeResponsavel} ({formulario.parentescoResponsavel})</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{formulario.telefoneResponsavel}</p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Observação para a Secretaria (opcional)
                </label>
                <textarea
                  rows={3}
                  value={formulario.observacoes}
                  onChange={(e) => setFormulario({ ...formulario, observacoes: e.target.value })}
                  placeholder="Descreva brevemente o assunto ou qualquer informação relevante para o atendimento."
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEtapaAtual(2)}
                  className="w-full sm:w-auto px-6 py-3 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-sm font-bold transition cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => setEtapaAtual(3.5)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-sm font-bold transition shadow-sm cursor-pointer"
                >
                  <span>Revisar agendamento</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">SEU AGENDAMENTO</h3>
              <div className="space-y-2.5 text-sm">
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-xs">Serviço</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{servico.title}</span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-xs">Data</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{obterTextoData()}</span>
                </div>
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-xs">Horário</span>
                  <span className="font-bold text-[#b91c1c]">{horarioSelecionado || 'A escolher'}</span>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-xs">
                  Duração estimada: {servico.duration}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {etapaAtual === 3.5 && (
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-4 sm:p-8 md:p-12 shadow-md space-y-6 sm:space-y-8">
            <div className="border-b-2 border-slate-100 dark:border-slate-800 pb-4 sm:pb-6">
              <span className="text-xs font-extrabold text-[#b91c1c] tracking-wider uppercase block mb-1">
                PRÉ-VISUALIZAÇÃO DO AGENDAMENTO
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                Confira todos os detalhes antes de agendar
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base mt-1">
                Verifique se as informações abaixo estão corretas. Ao confirmar, seu horário será imediatamente reservado.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Serviço Solicitado
                </span>
                <p className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-slate-100">{servico.title}</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">Duração estimada: {servico.duration}</p>
              </div>

              <div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Data e Horário Marcados
                </span>
                <p className="text-base sm:text-xl font-extrabold text-[#b91c1c]">{obterTextoData()}</p>
                <p className="text-xs sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">Horário: {horarioSelecionado}</p>
              </div>

              <div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Dados do Estudante
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">{formulario.nome}</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">RM: {formulario.rm} • Turma: {formulario.turma}</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{formulario.curso}</p>
              </div>

              <div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Contatos Informados
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 break-all">{formulario.email}</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">{formulario.telefone}</p>
                <p className="text-[11px] sm:text-xs text-emerald-700 dark:text-emerald-400 font-bold mt-1">✓ Notificação via WhatsApp ativada</p>
              </div>

              {servico.requerResponsavel && (
                <div className="sm:col-span-2 pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] sm:text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-1">
                    Acompanhamento de Responsável Legal
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                    {formulario.nomeResponsavel} ({formulario.parentescoResponsavel})
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    CIN: {formulario.cinResponsavel} • Telefone: {formulario.telefoneResponsavel}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-red-50/60 dark:bg-red-950/30 p-4 sm:p-6 rounded-2xl border border-red-200 dark:border-red-900/60">
              <h4 className="text-sm sm:text-base font-extrabold text-red-950 dark:text-red-200 mb-2.5 sm:mb-3 flex items-center space-x-2">
                <CheckCircle2 size={18} className="text-[#b91c1c] flex-shrink-0" />
                <span>Documentos que você DEVE levar no dia do atendimento:</span>
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-base text-slate-800 dark:text-slate-200 font-medium">
                {servico.requiredDocs ? (
                  servico.requiredDocs.map((doc, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#b91c1c] flex-shrink-0 mt-1.5"></span>
                      <span>{doc}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#b91c1c] flex-shrink-0 mt-1.5"></span>
                    <span>Documento oficial com foto (RG ou CNH)</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="pt-4 sm:pt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEtapaAtual(3)}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-4 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-sm sm:text-base font-bold transition cursor-pointer text-center"
              >
                Voltar e Editar Dados
              </button>

              <button
                type="button"
                onClick={confirmarAgendamentoFinal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 sm:px-10 py-3.5 sm:py-4 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-base sm:text-lg font-extrabold shadow-lg transition active:scale-[0.99] cursor-pointer text-center"
              >
                <Calendar size={20} />
                <span>Confirmar e Realizar Agendamento</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {etapaAtual === 4 && agendamentoConfirmado && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-5 sm:p-8 md:p-12 shadow-lg text-center animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
            <Check size={32} />
          </div>

          <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
            Agendamento Confirmado com Sucesso!
          </h3>
          <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 mt-2 mb-6 sm:mb-8">
            Seu atendimento foi agendado na Secretaria Acadêmica da Etec Antônio Furlan.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700 text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-sm sm:text-base">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-700 gap-1">
              <span className="text-slate-600 dark:text-slate-400 font-bold text-xs sm:text-base">Protocolo de Atendimento</span>
              <span className="font-extrabold text-[#b91c1c] text-base sm:text-xl font-mono tracking-wider">
                {agendamentoConfirmado.protocolo}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[10px] sm:text-xs font-bold uppercase">Serviço</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">{agendamentoConfirmado.servico}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[10px] sm:text-xs font-bold uppercase">Data e Horário</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">{agendamentoConfirmado.dataFormatada} às {agendamentoConfirmado.horario}</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[10px] sm:text-xs font-bold uppercase">Aluno</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">{agendamentoConfirmado.aluno} (RM: {agendamentoConfirmado.rm})</span>
              </div>
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[10px] sm:text-xs font-bold uppercase">Local</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">{agendamentoConfirmado.local}</span>
              </div>
            </div>

            {agendamentoConfirmado.nomeResponsavel && (
              <div className="pt-2 sm:pt-3 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-500 block text-[10px] sm:text-xs font-bold uppercase">Responsável Acompanhante</span>
                <span className="font-bold text-amber-900 dark:text-amber-300 text-sm sm:text-base">
                  {agendamentoConfirmado.nomeResponsavel} ({agendamentoConfirmado.parentescoResponsavel})
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => aoMudarAba('inicio')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl text-sm sm:text-base font-bold transition cursor-pointer text-center"
            >
              Voltar ao Início
            </button>

            <button
              onClick={() => aoMudarAba('meus-agendamentos')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-sm sm:text-base font-bold transition shadow-sm cursor-pointer text-center"
            >
              Ver Meus Agendamentos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
