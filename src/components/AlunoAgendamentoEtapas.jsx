import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Users,
  ShieldAlert,
  MapPin,
  Send
} from 'lucide-react';

/**
 * Fluxo em Etapas de Agendamento do Aluno com Pré-visualização Grande
 * Suporte a navegação por meses (Setembro e Outubro de 2026)
 * Validação de dados do aluno e dados do Responsável Legal (quando o serviço exigir).
 */
export default function AlunoAgendamentoEtapas({
  servico,
  dadosAluno,
  aoCancelar,
  aoConcluirAgendamento,
  aoMudarAba
}) {
  // Etapas:
  // 2: 'data-horario'
  // 3: 'dados'
  // 3.5: 'preview' (Pré-visualização Grande antes de confirmar)
  // 4: 'confirmacao' (Comprovante com protocolo)
  const [etapaAtual, setEtapaAtual] = useState(2);

  // Mês exibido no calendário: 'setembro' ou 'outubro'
  const [mesExibido, setMesExibido] = useState('outubro'); // Outubro 2026 por padrão!

  // Seleções da Etapa 2
  const [dataSelecionada, setDataSelecionada] = useState('2026-10-23');
  const [horarioSelecionado, setHorarioSelecionado] = useState('15:30');

  // Formulário da Etapa 3
  const [formulario, setFormulario] = useState({
    nome: dadosAluno?.nome || 'Débora Oliveira',
    rm: dadosAluno?.rm || '21201',
    turma: dadosAluno?.turma || '3',
    curso: dadosAluno?.curso || 'Informática para Internet',
    email: dadosAluno?.email || 'lucasmacenamr@gmail.com',
    telefone: dadosAluno?.telefone || '(11) 95321-2324',
    observacoes: '',
    // Dados do Responsável Legal caso o serviço exija
    nomeResponsavel: dadosAluno?.nomeResponsavel || 'Marta Helena de Oliveira',
    parentescoResponsavel: dadosAluno?.parentescoResponsavel || 'Mãe',
    cpfResponsavel: dadosAluno?.cpfResponsavel || '123.456.789-00',
    telefoneResponsavel: dadosAluno?.telefoneResponsavel || '(11) 98765-4321'
  });

  const [erros, setErros] = useState({});
  const [agendamentoConfirmado, setAgendamentoConfirmado] = useState(null);

  // Horários de exemplo divididos em Manhã e Tarde
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

  // Helper para texto da data
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

  // Validação estrita da Etapa 3
  const validarDadosAluno = () => {
    const novosErros = {};

    if (!formulario.nome.trim()) {
      novosErros.nome = 'O nome completo é obrigatório.';
    } else if (formulario.nome.trim().length < 3) {
      novosErros.nome = 'O nome deve ter pelo menos 3 caracteres.';
    }

    if (!formulario.rm.trim()) {
      novosErros.rm = 'O RM é obrigatório.';
    } else if (!/^\d+$/.test(formulario.rm.trim())) {
      novosErros.rm = 'O RM deve conter apenas números.';
    }

    if (!formulario.turma.trim()) {
      novosErros.turma = 'A turma é obrigatória.';
    }

    if (!formulario.curso.trim()) {
      novosErros.curso = 'O curso é obrigatório.';
    }

    if (!formulario.email.trim()) {
      novosErros.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.email.trim())) {
      novosErros.email = 'Digite um e-mail válido (ex: aluno@etec.sp.gov.br).';
    }

    if (!formulario.telefone.trim()) {
      novosErros.telefone = 'O telefone é obrigatório.';
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formulario.telefone.trim())) {
      novosErros.telefone = 'Informe um telefone válido com DDD.';
    }

    // Se o serviço exige responsável, valida os campos do responsável
    if (servico.requerResponsavel) {
      if (!formulario.nomeResponsavel.trim()) {
        novosErros.nomeResponsavel = 'O nome do responsável legal é obrigatório para este serviço.';
      }
      if (!formulario.cpfResponsavel.trim()) {
        novosErros.cpfResponsavel = 'O CPF do responsável é obrigatório.';
      }
      if (!formulario.telefoneResponsavel.trim()) {
        novosErros.telefoneResponsavel = 'O telefone do responsável é obrigatório.';
      }
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Avança para o Preview Grande (Etapa 3.5)
  const irParaPreview = (e) => {
    e.preventDefault();
    if (validarDadosAluno()) {
      setEtapaAtual(3.5);
    }
  };

  // Confirmação final após o Preview
  const confirmarAgendamentoFinal = () => {
    const novoAtendimento = {
      id: `agend-${Date.now()}`,
      servico: servico.title,
      data: dataSelecionada,
      dataFormatada: obterTextoData(),
      horario: horarioSelecionado,
      status: 'Confirmado',
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
      local: 'Secretaria Acadêmica - Guichê 02',
      duration: servico.duration,
      documentosNecessarios: servico.requiredDocs ? servico.requiredDocs.join(', ') : 'Documento oficial com foto (RG ou CNH)'
    };

    setAgendamentoConfirmado(novoAtendimento);
    aoConcluirAgendamento(novoAtendimento);
    setEtapaAtual(4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Botão de Cancelar / Voltar */}
      <button
        onClick={aoCancelar}
        className="inline-flex items-center space-x-2 text-base font-bold text-slate-600 hover:text-slate-950 transition mb-6 py-2 px-3 rounded-lg hover:bg-slate-100 cursor-pointer"
      >
        <ChevronLeft size={22} className="text-slate-700" />
        <span>Cancelar e voltar ao serviço</span>
      </button>

      {/* Título Principal */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
        Agendar atendimento
      </h2>

      {/* Alerta de Responsável Legal (se aplicável ao serviço) */}
      {servico.requerResponsavel && (
        <div className="mb-8 p-5 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-start space-x-3.5 text-amber-950 font-medium">
          <ShieldAlert size={24} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-base text-amber-900">
              Atenção: Serviço com exigência de Responsável Legal
            </h4>
            <p className="text-sm mt-1 leading-relaxed">
              Para o serviço <strong>"{servico.title}"</strong>, a presença de um responsável legal com documento original é obrigatória no guichê caso o aluno tenha menos de 18 anos.
            </p>
          </div>
        </div>
      )}

      {/* Stepper / Indicador de Etapas */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 mb-8">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          
          {/* Etapa 1: Serviço */}
          <div className="flex items-center space-x-2.5 text-sm sm:text-base font-bold text-slate-900">
            <div className="w-8 h-8 rounded-full bg-[#b91c1c] text-white flex items-center justify-center font-bold">
              <Check size={18} />
            </div>
            <span>Serviço</span>
          </div>

          <div className="flex-1 h-[3px] bg-[#b91c1c] mx-2 sm:mx-4"></div>

          {/* Etapa 2: Data e horário */}
          <div className="flex items-center space-x-2.5 text-sm sm:text-base font-bold text-slate-900">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              etapaAtual > 2
                ? 'bg-[#b91c1c] text-white'
                : 'border-2 border-[#b91c1c] text-[#b91c1c] bg-white'
            }`}>
              {etapaAtual > 2 ? <Check size={18} /> : '2'}
            </div>
            <span>Data e horário</span>
          </div>

          <div className={`flex-1 h-[3px] mx-2 sm:mx-4 ${etapaAtual >= 3 ? 'bg-[#b91c1c]' : 'bg-slate-200'}`}></div>

          {/* Etapa 3: Dados */}
          <div className="flex items-center space-x-2.5 text-sm sm:text-base font-bold">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              etapaAtual > 3
                ? 'bg-[#b91c1c] text-white'
                : etapaAtual === 3
                ? 'border-2 border-[#b91c1c] text-[#b91c1c] bg-white'
                : 'border-2 border-slate-300 text-slate-400 bg-white'
            }`}>
              {etapaAtual > 3 ? <Check size={18} /> : '3'}
            </div>
            <span className={etapaAtual >= 3 ? 'text-slate-900' : 'text-slate-400'}>
              Dados
            </span>
          </div>

          <div className={`flex-1 h-[3px] mx-2 sm:mx-4 ${etapaAtual >= 3.5 ? 'bg-[#b91c1c]' : 'bg-slate-200'}`}></div>

          {/* Etapa 3.5: Revisão / Preview */}
          <div className="flex items-center space-x-2.5 text-sm sm:text-base font-bold">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              etapaAtual === 4
                ? 'bg-[#b91c1c] text-white'
                : etapaAtual === 3.5
                ? 'border-2 border-[#b91c1c] text-[#b91c1c] bg-white'
                : 'border-2 border-slate-300 text-slate-400 bg-white'
            }`}>
              {etapaAtual === 4 ? <Check size={18} /> : '4'}
            </div>
            <span className={etapaAtual >= 3.5 ? 'text-slate-900' : 'text-slate-400'}>
              Revisão
            </span>
          </div>

        </div>
      </div>

      {/* =========================================================================
          ETAPA 2: DATA E HORÁRIO (COM CALENDÁRIO DE OUTUBRO 2026 E SETEMBRO)
          ========================================================================= */}
      {etapaAtual === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              {/* Calendário com Navegação por Mês */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-base font-extrabold text-slate-900 mb-4">
                  Escolha uma data
                </h3>

                {/* Alternador de Mês */}
                <div className="flex items-center justify-between mb-4">
                  <button 
                    type="button" 
                    onClick={() => setMesExibido('setembro')}
                    className={`p-2 rounded-xl border-2 transition cursor-pointer ${
                      mesExibido === 'setembro' ? 'border-slate-300 text-slate-300' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                    title="Mês anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <span className="text-base font-extrabold text-slate-900">
                    {mesExibido === 'outubro' ? 'Outubro 2026' : 'Setembro 2026'}
                  </span>

                  <button 
                    type="button" 
                    onClick={() => setMesExibido('outubro')}
                    className={`p-2 rounded-xl border-2 transition cursor-pointer ${
                      mesExibido === 'outubro' ? 'border-slate-300 text-slate-300' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                    title="Próximo mês"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
                  <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sab</span>
                </div>

                {/* CALENDÁRIO DE OUTUBRO 2026 */}
                {mesExibido === 'outubro' && (
                  <div className="grid grid-cols-7 gap-1.5 text-center text-sm font-semibold">
                    {/* Outubro 2026 começa na Quinta-feira (4 vazios: Dom, Seg, Ter, Qua) */}
                    <span className="p-2.5 text-slate-300"></span>
                    <span className="p-2.5 text-slate-300"></span>
                    <span className="p-2.5 text-slate-300"></span>
                    <span className="p-2.5 text-slate-300"></span>

                    {/* Dia 1 (Qui) */}
                    <button type="button" onClick={() => setDataSelecionada('2026-10-01')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-01' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>1</button>
                    {/* Dia 2 (Sex) */}
                    <button type="button" onClick={() => setDataSelecionada('2026-10-02')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-02' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>2</button>
                    {/* Dia 3 (Sab) */}
                    <span className="p-2.5 text-slate-300 line-through">3</span>
                    {/* Dia 4 (Dom) */}
                    <span className="p-2.5 text-slate-300 line-through">4</span>

                    {/* Semana 2 */}
                    <button type="button" onClick={() => setDataSelecionada('2026-10-05')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-05' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>5</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-06')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-06' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>6</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-07')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-07' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>7</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-08')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-08' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>8</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-09')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-09' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>9</button>
                    <span className="p-2.5 text-slate-300 line-through">10</span>
                    <span className="p-2.5 text-slate-300 line-through">11</span>

                    {/* Semana 3 (Dia 12 Feriado Aparecida Bloqueado) */}
                    <span className="p-2.5 text-red-300 font-bold line-through" title="Feriado Nossa Senhora Aparecida">12</span>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-13')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-13' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>13</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-14')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-14' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>14</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-15')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-15' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>15</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-16')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-16' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>16</button>
                    <span className="p-2.5 text-slate-300 line-through">17</span>
                    <span className="p-2.5 text-slate-300 line-through">18</span>

                    {/* Semana 4 */}
                    <button type="button" onClick={() => setDataSelecionada('2026-10-19')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-19' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>19</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-20')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-20' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>20</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-21')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-21' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>21</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-22')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-22' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>22</button>
                    
                    {/* Dia 23 (Hoje - Destaque) */}
                    <button type="button" onClick={() => setDataSelecionada('2026-10-23')} className={`p-2.5 rounded-xl font-extrabold transition cursor-pointer ${dataSelecionada === '2026-10-23' ? 'bg-[#b91c1c] text-white shadow-sm' : 'border-2 border-red-500 text-red-700'}`}>23</button>
                    
                    <span className="p-2.5 text-slate-300 line-through">24</span>
                    <span className="p-2.5 text-slate-300 line-through">25</span>

                    {/* Semana 5 */}
                    <button type="button" onClick={() => setDataSelecionada('2026-10-26')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-26' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>26</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-27')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-27' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>27</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-28')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-28' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>28</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-29')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-29' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>29</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-10-30')} className={`p-2.5 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-10-30' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>30</button>
                    <span className="p-2.5 text-slate-300 line-through">31</span>
                  </div>
                )}

                {/* CALENDÁRIO DE SETEMBRO 2026 */}
                {mesExibido === 'setembro' && (
                  <div className="grid grid-cols-7 gap-1.5 text-center text-sm font-semibold">
                    <span className="p-2 text-slate-300"></span>
                    <span className="p-2 text-slate-300 line-through">1</span>
                    <span className="p-2 text-slate-300 line-through">2</span>
                    <span className="p-2 text-slate-300 line-through">3</span>
                    <span className="p-2 text-slate-300 line-through">4</span>
                    <span className="p-2 text-slate-300 line-through">5</span>
                    <span className="p-2 text-slate-300 line-through">6</span>
                    <span className="p-2 text-slate-300 line-through">7</span>
                    <span className="p-2 text-slate-300 line-through">8</span>
                    <span className="p-2 text-slate-300 line-through">9</span>
                    <span className="p-2 text-slate-300 line-through">10</span>
                    <span className="p-2 text-slate-300 line-through">11</span>
                    <span className="p-2 text-slate-300 line-through">12</span>
                    <span className="p-2 text-slate-300 line-through">13</span>
                    <span className="p-2 text-slate-300 line-through">14</span>
                    <span className="p-2 text-slate-300 line-through">15</span>
                    <span className="p-2 text-slate-300 line-through">16</span>
                    <span className="p-2 text-slate-300 line-through">17</span>
                    <span className="p-2 text-slate-300 line-through">18</span>
                    <span className="p-2 text-slate-300 line-through">19</span>
                    <span className="p-2 text-slate-300 line-through">20</span>
                    <span className="p-2 text-slate-300 line-through">21</span>
                    <span className="p-2 text-slate-300 line-through">22</span>
                    <span className="p-2 text-slate-300 line-through">23</span>

                    <button type="button" onClick={() => setDataSelecionada('2026-09-24')} className={`p-2 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-09-24' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>24</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-09-25')} className={`p-2 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-09-25' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}>25</button>
                    <span className="p-2 text-slate-300 line-through">26</span>
                    <span className="p-2 text-slate-300 line-through">27</span>
                    <button type="button" onClick={() => setDataSelecionada('2026-09-28')} className={`p-2 rounded-xl font-bold transition cursor-pointer ${dataSelecionada === '2026-09-28' ? 'bg-[#b91c1c] text-white shadow-xs' : 'hover:bg-slate-100 text-slate-800'}`}>28</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-09-29')} className={`p-2 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-09-29' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-800'}`}>29</button>
                    <button type="button" onClick={() => setDataSelecionada('2026-09-30')} className={`p-2 rounded-xl transition cursor-pointer ${dataSelecionada === '2026-09-30' ? 'bg-[#b91c1c] text-white font-bold' : 'hover:bg-slate-100 text-slate-800'}`}>30</button>
                  </div>
                )}

                <p className="text-xs text-slate-500 mt-4 font-medium">
                  Dias riscados são finais de semana ou feriados sem atendimento.
                </p>
              </div>

              {/* Escolha um Horário */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-base font-extrabold text-slate-900">
                  Escolha um horário
                </h3>

                <div className="mt-2 space-y-5">
                  <p className="text-sm font-bold text-red-700">
                    {obterTextoData()}
                  </p>

                  {/* Manhã */}
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                      Manhã
                    </span>
                    <div className="grid grid-cols-4 gap-2.5">
                      {horariosManha.map((slot) => (
                        <button
                          key={slot.hora}
                          type="button"
                          disabled={slot.ocupado}
                          onClick={() => setHorarioSelecionado(slot.hora)}
                          className={`py-3 px-1 text-sm font-bold rounded-xl border-2 text-center transition ${
                            slot.ocupado
                              ? 'bg-slate-100 text-slate-300 border-slate-200 line-through cursor-not-allowed'
                              : horarioSelecionado === slot.hora
                              ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-400 text-slate-800 cursor-pointer'
                          }`}
                        >
                          {slot.hora}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tarde */}
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                      Tarde
                    </span>
                    <div className="grid grid-cols-4 gap-2.5">
                      {horariosTarde.map((slot) => (
                        <button
                          key={slot.hora}
                          type="button"
                          disabled={slot.ocupado}
                          onClick={() => setHorarioSelecionado(slot.hora)}
                          className={`py-3 px-1 text-sm font-bold rounded-xl border-2 text-center transition ${
                            slot.ocupado
                              ? 'bg-slate-100 text-slate-300 border-slate-200 line-through cursor-not-allowed'
                              : horarioSelecionado === slot.hora
                              ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-400 text-slate-800 cursor-pointer'
                          }`}
                        >
                          {slot.hora}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 pt-1">
                    Horários riscados já estão ocupados por outros alunos.
                  </p>
                </div>
              </div>

            </div>

            {/* Ações da Etapa 2 */}
            <div className="flex items-center justify-between pt-6">
              <button
                type="button"
                onClick={aoCancelar}
                className="px-6 py-3 border-2 border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-base font-bold transition cursor-pointer"
              >
                Voltar ao serviço
              </button>

              <button
                type="button"
                disabled={!dataSelecionada || !horarioSelecionado}
                onClick={() => setEtapaAtual(3)}
                className="px-8 py-3.5 rounded-xl text-base font-bold transition shadow-sm bg-[#b91c1c] hover:bg-[#991b1b] text-white cursor-pointer active:scale-[0.99]"
              >
                Continuar para Dados →
              </button>
            </div>
          </div>

          {/* Resumo Lateral */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-xs space-y-5">
              <h3 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                SEU AGENDAMENTO
              </h3>

              <div className="space-y-4 text-base font-medium">
                <div className="flex items-start space-x-3">
                  <FileText size={20} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">Serviço</span>
                    <span className="font-extrabold text-slate-900 text-base">
                      {servico.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar size={20} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">Data</span>
                    <span className="font-bold text-slate-900 text-base">
                      {obterTextoData()}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock size={20} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-500 block text-xs">Horário</span>
                    <span className="font-bold text-slate-900 text-base">
                      {horarioSelecionado || 'A escolher'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-slate-500 text-sm font-medium">
                  Duração estimada: {servico.duration}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          ETAPA 3: DADOS DO ALUNO E DO RESPONSÁVEL
          ========================================================================= */}
      {etapaAtual === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Confira seus dados
              </h3>
              <p className="text-slate-600 text-base mt-1 mb-8">
                Preenchemos o que já sabemos sobre você. Campos com * são obrigatórios.
              </p>

              <form onSubmit={irParaPreview} className="space-y-6">
                
                {/* Nome Completo */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Nome completo do aluno *
                  </label>
                  <input
                    type="text"
                    value={formulario.nome}
                    onChange={(e) => {
                      setFormulario({ ...formulario, nome: e.target.value });
                      if (erros.nome) setErros({ ...erros, nome: null });
                    }}
                    className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl text-base text-slate-900 font-medium focus:outline-none focus:ring-2 transition ${
                      erros.nome ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-red-500'
                    }`}
                  />
                  {erros.nome && (
                    <p className="text-sm font-semibold text-red-600 mt-1.5 flex items-center space-x-1.5">
                      <AlertCircle size={16} />
                      <span>{erros.nome}</span>
                    </p>
                  )}
                </div>

                {/* Grid: RM e Turma */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      RM (Registro de Matrícula) *
                    </label>
                    <input
                      type="text"
                      value={formulario.rm}
                      onChange={(e) => {
                        setFormulario({ ...formulario, rm: e.target.value });
                        if (erros.rm) setErros({ ...erros, rm: null });
                      }}
                      className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl text-base text-slate-900 font-medium focus:outline-none focus:ring-2 transition ${
                        erros.rm ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-red-500'
                      }`}
                    />
                    <p className="text-xs text-slate-400 mt-1">Apenas números.</p>
                    {erros.rm && (
                      <p className="text-sm font-semibold text-red-600 mt-1 flex items-center space-x-1.5">
                        <AlertCircle size={16} />
                        <span>{erros.rm}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Turma / Módulo *
                    </label>
                    <input
                      type="text"
                      value={formulario.turma}
                      onChange={(e) => {
                        setFormulario({ ...formulario, turma: e.target.value });
                        if (erros.turma) setErros({ ...erros, turma: null });
                      }}
                      className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl text-base text-slate-900 font-medium focus:outline-none focus:ring-2 transition ${
                        erros.turma ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-red-500'
                      }`}
                    />
                    {erros.turma && (
                      <p className="text-sm font-semibold text-red-600 mt-1 flex items-center space-x-1.5">
                        <AlertCircle size={16} />
                        <span>{erros.turma}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Curso */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Curso *
                  </label>
                  <input
                    type="text"
                    value={formulario.curso}
                    onChange={(e) => {
                      setFormulario({ ...formulario, curso: e.target.value });
                      if (erros.curso) setErros({ ...erros, curso: null });
                    }}
                    className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl text-base text-slate-900 font-medium focus:outline-none focus:ring-2 transition ${
                      erros.curso ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-red-500'
                    }`}
                  />
                  {erros.curso && (
                    <p className="text-sm font-semibold text-red-600 mt-1 flex items-center space-x-1.5">
                      <AlertCircle size={16} />
                      <span>{erros.curso}</span>
                    </p>
                  )}
                </div>

                {/* Grid: E-mail e Telefone (WhatsApp) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      value={formulario.email}
                      onChange={(e) => {
                        setFormulario({ ...formulario, email: e.target.value });
                        if (erros.email) setErros({ ...erros, email: null });
                      }}
                      className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl text-base text-slate-900 font-medium focus:outline-none focus:ring-2 transition ${
                        erros.email ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-red-500'
                      }`}
                    />
                    {erros.email && (
                      <p className="text-sm font-semibold text-red-600 mt-1 flex items-center space-x-1.5">
                        <AlertCircle size={16} />
                        <span>{erros.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="text"
                      value={formulario.telefone}
                      onChange={(e) => {
                        setFormulario({ ...formulario, telefone: e.target.value });
                        if (erros.telefone) setErros({ ...erros, telefone: null });
                      }}
                      className={`w-full px-4 py-3.5 bg-white border-2 rounded-xl text-base text-slate-900 font-medium focus:outline-none focus:ring-2 transition ${
                        erros.telefone ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-red-500'
                      }`}
                    />
                    {erros.telefone && (
                      <p className="text-sm font-semibold text-red-600 mt-1 flex items-center space-x-1.5">
                        <AlertCircle size={16} />
                        <span>{erros.telefone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* SEÇÃO ESPECÍFICA: RESPONSÁVEL LEGAL (Quando o serviço exigir) */}
                {servico.requerResponsavel && (
                  <div className="pt-6 border-t-2 border-amber-200 bg-amber-50/50 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center space-x-2.5 text-amber-900">
                      <Users size={22} className="text-amber-700" />
                      <h4 className="text-base font-extrabold">
                        Dados do Responsável Legal (Obrigatório para este serviço)
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nome do Responsável *
                        </label>
                        <input
                          type="text"
                          value={formulario.nomeResponsavel}
                          onChange={(e) => setFormulario({ ...formulario, nomeResponsavel: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Grau de Parentesco *
                        </label>
                        <select
                          value={formulario.parentescoResponsavel}
                          onChange={(e) => setFormulario({ ...formulario, parentescoResponsavel: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm"
                        >
                          <option value="Mãe">Mãe</option>
                          <option value="Pai">Pai</option>
                          <option value="Responsável Legal / Tutor">Responsável Legal / Tutor</option>
                          <option value="Avó / Avô">Avó / Avô</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          CPF do Responsável *
                        </label>
                        <input
                          type="text"
                          value={formulario.cpfResponsavel}
                          onChange={(e) => setFormulario({ ...formulario, cpfResponsavel: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Telefone do Responsável *
                        </label>
                        <input
                          type="text"
                          value={formulario.telefoneResponsavel}
                          onChange={(e) => setFormulario({ ...formulario, telefoneResponsavel: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Observações */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Observações para o atendimento (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={formulario.observacoes}
                    onChange={(e) => setFormulario({ ...formulario, observacoes: e.target.value })}
                    placeholder="Conte brevemente o motivo, se quiser."
                    className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Botões da Etapa 3 */}
                <div className="pt-6 flex items-center justify-between border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setEtapaAtual(2)}
                    className="px-6 py-3 border-2 border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-base font-bold transition cursor-pointer"
                  >
                    Voltar
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center space-x-2 px-8 py-3.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-base font-bold transition shadow-sm active:scale-[0.99] cursor-pointer"
                  >
                    <span>Revisar agendamento</span>
                    <ChevronRight size={18} />
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Resumo */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-extrabold tracking-wider text-slate-400 uppercase">
                SEU AGENDAMENTO
              </h3>
              <div className="space-y-3 text-base">
                <div>
                  <span className="text-slate-500 block text-xs">Serviço</span>
                  <span className="font-extrabold text-slate-900">{servico.title}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Data</span>
                  <span className="font-bold text-slate-900">{obterTextoData()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Horário</span>
                  <span className="font-bold text-slate-900">{horarioSelecionado}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 text-slate-500 text-sm">
                  Duração: {servico.duration}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          ETAPA 3.5: PRÉ-VISUALIZAÇÃO GRANDE (SOLICITADA PELO USUÁRIO)
          ========================================================================= */}
      {etapaAtual === 3.5 && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-150">
          
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 sm:p-12 shadow-md space-y-8">
            
            <div className="border-b-2 border-slate-100 pb-6">
              <span className="text-xs font-extrabold text-red-700 tracking-wider uppercase block mb-1">
                PRÉ-VISUALIZAÇÃO DO AGENDAMENTO
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Confira todos os detalhes antes de agendar
              </h3>
              <p className="text-slate-600 text-base mt-1">
                Verifique se as informações abaixo estão corretas. Ao confirmar, seu horário será imediatamente reservado.
              </p>
            </div>

            {/* Grid com Dados do Atendimento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Serviço Solicitado
                </span>
                <p className="text-xl font-extrabold text-slate-900">{servico.title}</p>
                <p className="text-sm text-slate-600 mt-1">Duração estimada: {servico.duration}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Data e Horário Marcados
                </span>
                <p className="text-xl font-extrabold text-red-700">{obterTextoData()}</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">Horário: {horarioSelecionado}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Dados do Estudante
                </span>
                <p className="text-base font-bold text-slate-900">{formulario.nome}</p>
                <p className="text-sm text-slate-600">RM: {formulario.rm} • Turma: {formulario.turma}</p>
                <p className="text-sm text-slate-600">{formulario.curso}</p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Contatos Informados
                </span>
                <p className="text-sm font-semibold text-slate-900">{formulario.email}</p>
                <p className="text-sm font-semibold text-slate-900">{formulario.telefone}</p>
                <p className="text-xs text-emerald-700 font-bold mt-1">✓ Notificação via WhatsApp ativada</p>
              </div>

              {servico.requerResponsavel && (
                <div className="md:col-span-2 pt-4 border-t border-slate-200">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                    Acompanhamento de Responsável Legal
                  </span>
                  <p className="text-base font-bold text-slate-900">
                    {formulario.nomeResponsavel} ({formulario.parentescoResponsavel})
                  </p>
                  <p className="text-sm text-slate-600">
                    CPF: {formulario.cpfResponsavel} • Telefone: {formulario.telefoneResponsavel}
                  </p>
                </div>
              )}
            </div>

            {/* Checklist de Documentos Obrigatórios */}
            <div className="bg-red-50/60 p-6 rounded-2xl border border-red-200">
              <h4 className="text-base font-extrabold text-red-950 mb-3 flex items-center space-x-2">
                <CheckCircle2 size={20} className="text-red-700" />
                <span>Documentos que você DEVE levar no dia do atendimento:</span>
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-slate-800 font-medium">
                {servico.requiredDocs ? (
                  servico.requiredDocs.map((doc, idx) => (
                    <li key={idx} className="flex items-center space-x-2.5">
                      <span className="w-2 h-2 rounded-full bg-red-700 flex-shrink-0"></span>
                      <span>{doc}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-red-700 flex-shrink-0"></span>
                    <span>Documento oficial com foto (RG ou CNH)</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Botões Finais: Voltar para editar OU Botão Grande para Agendar de Fato */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEtapaAtual(3)}
                className="w-full sm:w-auto px-6 py-4 border-2 border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-base font-bold transition cursor-pointer"
              >
                Voltar e Editar Dados
              </button>

              {/* Botão de Agendar de Fato Solicitado */}
              <button
                type="button"
                onClick={confirmarAgendamentoFinal}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-10 py-4 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-lg font-extrabold shadow-lg transition active:scale-[0.99] cursor-pointer"
              >
                <Calendar size={22} />
                <span>Confirmar e Realizar Agendamento</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          ETAPA 4: COMPROVANTE OFICIAL
          ========================================================================= */}
      {etapaAtual === 4 && agendamentoConfirmado && (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border-2 border-slate-200 p-8 sm:p-12 shadow-lg text-center animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={36} />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Agendamento Confirmado com Sucesso!
          </h3>
          <p className="text-base text-slate-600 mt-2 mb-8">
            Seu atendimento foi agendado na Secretaria Acadêmica da Etec Antônio Furlan.
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 text-left space-y-4 mb-8 text-base">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-slate-600 font-bold">Protocolo de Atendimento</span>
              <span className="font-extrabold text-red-700 text-lg sm:text-xl font-mono tracking-wider">
                {agendamentoConfirmado.protocolo}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 block text-xs font-bold uppercase">Serviço</span>
                <span className="font-bold text-slate-900 text-base">{agendamentoConfirmado.servico}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold uppercase">Data e Horário</span>
                <span className="font-bold text-slate-900 text-base">{agendamentoConfirmado.dataFormatada} às {agendamentoConfirmado.horario}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold uppercase">Aluno</span>
                <span className="font-bold text-slate-900 text-base">{agendamentoConfirmado.aluno} (RM: {agendamentoConfirmado.rm})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold uppercase">Local</span>
                <span className="font-bold text-slate-900 text-base">{agendamentoConfirmado.local}</span>
              </div>
            </div>

            {agendamentoConfirmado.nomeResponsavel && (
              <div className="pt-3 border-t border-slate-200">
                <span className="text-slate-400 block text-xs font-bold uppercase">Responsável Acompanhante</span>
                <span className="font-bold text-amber-900 text-base">
                  {agendamentoConfirmado.nomeResponsavel} ({agendamentoConfirmado.parentescoResponsavel})
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => aoMudarAba('inicio')}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-base font-bold transition cursor-pointer"
            >
              Voltar ao Início
            </button>

            <button
              onClick={() => aoMudarAba('meus-agendamentos')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-base font-bold transition shadow-sm cursor-pointer"
            >
              Ver Meus Agendamentos
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
