import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Hash, 
  Check, 
  AlertCircle, 
  Save, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Accessibility, 
  MessageSquare,
  GraduationCap
} from 'lucide-react';

export default function AlunoPerfil({ dadosPerfil, aoSalvarPerfil, aoVoltar }) {
  const [formulario, setFormulario] = useState({
    nome: dadosPerfil?.nome || 'Laura Ferreira',
    rm: dadosPerfil?.rm || '21201',
    turma: dadosPerfil?.turma || '3º TI',
    periodo: dadosPerfil?.periodo || 'Manhã',
    curso: dadosPerfil?.curso || 'Informática para Internet',
    situacaoMatricula: dadosPerfil?.situacaoMatricula || 'Ativo',
    anoIngresso: dadosPerfil?.anoIngresso || '2025',
    cin: dadosPerfil?.cin || '456.789.012-34',
    dataNascimento: dadosPerfil?.dataNascimento || '2008-05-14',
    emailInstitucional: dadosPerfil?.emailInstitucional || 'laura.ferreira@etec.sp.gov.br',
    email: dadosPerfil?.email || 'laura.ferreira@gmail.com',
    telefone: dadosPerfil?.telefone || '(11) 95321-2324',
    nomeResponsavel: dadosPerfil?.nomeResponsavel || 'Vitoria Mendes',
    parentescoResponsavel: dadosPerfil?.parentescoResponsavel || 'Mãe',
    cinResponsavel: dadosPerfil?.cinResponsavel || '123.456.789-00',
    telefoneResponsavel: dadosPerfil?.telefoneResponsavel || '(11) 98765-4321',
    atendimentoTerreo: dadosPerfil?.atendimentoTerreo || false,
    suporteLibras: dadosPerfil?.suporteLibras || false,
    notificarWhatsApp: dadosPerfil?.notificarWhatsApp ?? true
  });

  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const [abaInterna, setAbaInterna] = useState('dados-pessoais');

  const validarCampos = () => {
    const novosErros = {};

    if (!formulario.nome.trim()) {
      novosErros.nome = 'O nome completo é obrigatório.';
    } else if (formulario.nome.trim().length < 3) {
      novosErros.nome = 'O nome deve ter no mínimo 3 caracteres.';
    }

    if (!formulario.rm.trim()) {
      novosErros.rm = 'O RM é obrigatório.';
    }

    if (!formulario.turma.trim()) {
      novosErros.turma = 'A turma é obrigatória.';
    }

    if (!formulario.curso.trim()) {
      novosErros.curso = 'O curso é obrigatório.';
    }

    if (!formulario.email.trim()) {
      novosErros.email = 'O e-mail é obrigatório.';
    }

    if (!formulario.telefone.trim()) {
      novosErros.telefone = 'O telefone é obrigatório.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const manipularSalvar = (e) => {
    e.preventDefault();
    if (validarCampos()) {
      aoSalvarPerfil(formulario);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Perfil do Aluno
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-lg mt-1 font-medium">
            Gerencie seus dados pessoais, acadêmicos, contato do responsável e preferências de acessibilidade.
          </p>
        </div>

        <button
          type="button"
          onClick={aoVoltar}
          className="self-start sm:self-auto px-4 sm:px-5 py-2 sm:py-2.5 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
        >
          Voltar ao Início
        </button>
      </div>

      {sucesso && (
        <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 text-sm sm:text-base font-bold rounded-2xl flex items-center space-x-3 shadow-sm animate-in fade-in duration-200">
          <Check size={20} className="text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
          <span>Perfil e dados atualizados com sucesso no sistema!</span>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6 sm:mb-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-8 text-white">
          <div className="flex flex-col xs:flex-row items-center xs:items-start text-center xs:text-left gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#b91c1c] text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-white/20 flex-shrink-0">
              {formulario.nome.charAt(0) || 'L'}
            </div>
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl font-extrabold truncate">{formulario.nome}</h3>
              <p className="text-slate-300 text-xs sm:text-base mt-0.5">
                RM: <strong className="text-white">{formulario.rm}</strong> • {formulario.curso} ({formulario.turma})
              </p>
              <div className="flex flex-wrap items-center justify-center xs:justify-start gap-1.5 sm:gap-2 mt-2">
                <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Matrícula Ativa
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200">
                  Turno: {formulario.periodo}
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200">
                  Etec Antônio Furlan
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex border-b-2 border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 px-3 sm:px-6 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setAbaInterna('dados-pessoais')}
            className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-base font-bold border-b-4 transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
              abaInterna === 'dados-pessoais'
                ? 'border-[#b91c1c] text-[#b91c1c]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Dados Pessoais
          </button>

          <button
            type="button"
            onClick={() => setAbaInterna('academico')}
            className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-base font-bold border-b-4 transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
              abaInterna === 'academico'
                ? 'border-[#b91c1c] text-[#b91c1c]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Vida Acadêmica
          </button>

          <button
            type="button"
            onClick={() => setAbaInterna('responsavel')}
            className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-base font-bold border-b-4 transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
              abaInterna === 'responsavel'
                ? 'border-[#b91c1c] text-[#b91c1c]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Responsável Legal
          </button>

          <button
            type="button"
            onClick={() => setAbaInterna('acessibilidade')}
            className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-base font-bold border-b-4 transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
              abaInterna === 'acessibilidade'
                ? 'border-[#b91c1c] text-[#b91c1c]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Acessibilidade
          </button>
        </div>

        <form onSubmit={manipularSalvar} className="p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
          {abaInterna === 'dados-pessoais' && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formulario.nome}
                  onChange={(e) => {
                    setFormulario({ ...formulario, nome: e.target.value });
                    if (erros.nome) setErros({ ...erros, nome: null });
                  }}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                />
                {erros.nome && (
                  <p className="text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400 mt-1.5 flex items-center space-x-1.5">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{erros.nome}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    CIN
                  </label>
                  <input
                    type="text"
                    value={formulario.cin}
                    onChange={(e) => setFormulario({ ...formulario, cin: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={formulario.dataNascimento}
                    onChange={(e) => setFormulario({ ...formulario, dataNascimento: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    E-mail Pessoal de Contato *
                  </label>
                  <input
                    type="email"
                    value={formulario.email}
                    onChange={(e) => {
                      setFormulario({ ...formulario, email: e.target.value });
                      if (erros.email) setErros({ ...erros, email: null });
                    }}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                  />
                  {erros.email && (
                    <p className="text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400 mt-1.5 flex items-center space-x-1.5">
                      <AlertCircle size={16} className="flex-shrink-0" />
                      <span>{erros.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    Telefone Celular / WhatsApp *
                  </label>
                  <input
                    type="text"
                    value={formulario.telefone}
                    onChange={(e) => {
                      setFormulario({ ...formulario, telefone: e.target.value });
                      if (erros.telefone) setErros({ ...erros, telefone: null });
                    }}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
                  />
                  {erros.telefone && (
                    <p className="text-xs sm:text-sm font-semibold text-red-600 dark:text-red-400 mt-1.5 flex items-center space-x-1.5">
                      <AlertCircle size={16} className="flex-shrink-0" />
                      <span>{erros.telefone}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {abaInterna === 'academico' && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    Registro de Matrícula (RM) *
                  </label>
                  <input
                    type="text"
                    value={formulario.rm}
                    onChange={(e) => {
                      setFormulario({ ...formulario, rm: e.target.value });
                      if (erros.rm) setErros({ ...erros, rm: null });
                    }}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    Turma / Módulo *
                  </label>
                  <input
                    type="text"
                    value={formulario.turma}
                    onChange={(e) => setFormulario({ ...formulario, turma: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    Curso Técnico *
                  </label>
                  <input
                    type="text"
                    value={formulario.curso}
                    onChange={(e) => setFormulario({ ...formulario, curso: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    Período / Turno
                  </label>
                  <select
                    value={formulario.periodo}
                    onChange={(e) => setFormulario({ ...formulario, periodo: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100"
                  >
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                    <option value="Integral">Integral</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                  E-mail Institucional (@etec.sp.gov.br)
                </label>
                <input
                  type="email"
                  value={formulario.emailInstitucional}
                  readOnly
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-600 dark:text-slate-400 font-mono cursor-not-allowed"
                />
                <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 mt-1">Gerenciado pela Diretoria de Serviços da escola.</p>
              </div>
            </div>
          )}

          {abaInterna === 'responsavel' && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <div className="p-3.5 sm:p-4 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 rounded-2xl text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-medium">
                Esses dados são automaticamente utilizados em serviços que exigem a presença ou assinatura do responsável legal (como cancelamento, trancamento e transferências).
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    Nome Completo do Responsável Legal
                  </label>
                  <input
                    type="text"
                    value={formulario.nomeResponsavel}
                    onChange={(e) => setFormulario({ ...formulario, nomeResponsavel: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    Grau de Parentesco
                  </label>
                  <select
                    value={formulario.parentescoResponsavel}
                    onChange={(e) => setFormulario({ ...formulario, parentescoResponsavel: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100"
                  >
                    <option value="Mãe">Mãe</option>
                    <option value="Pai">Pai</option>
                    <option value="Tutor(a) Legal">Tutor(a) Legal</option>
                    <option value="Avô / Avó">Avô / Avó</option>
                    <option value="Outro Responsável">Outro Responsável</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    CIN do Responsável
                  </label>
                  <input
                    type="text"
                    value={formulario.cinResponsavel}
                    onChange={(e) => setFormulario({ ...formulario, cinResponsavel: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5 sm:mb-2">
                    Telefone de Contato do Responsável
                  </label>
                  <input
                    type="text"
                    value={formulario.telefoneResponsavel}
                    onChange={(e) => setFormulario({ ...formulario, telefoneResponsavel: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>
          )}

          {abaInterna === 'acessibilidade' && (
            <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-150">
              <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 font-medium">
                Configure suas necessidades assistivas para que a Secretaria se prepare antes do seu atendimento.
              </p>

              <div className="space-y-3 sm:space-y-4">
                <label className="flex items-start space-x-3 p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={formulario.atendimentoTerreo}
                    onChange={(e) => setFormulario({ ...formulario, atendimentoTerreo: e.target.checked })}
                    className="w-5 h-5 rounded text-[#b91c1c] accent-[#b91c1c] mt-0.5 cursor-pointer flex-shrink-0"
                  />
                  <div>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 block">
                      Necessidade de atendimento no piso térreo
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Recomendado para pessoas com mobilidade reduzida, cadeirantes ou em recuperação cirúrgica.
                    </span>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={formulario.suporteLibras}
                    onChange={(e) => setFormulario({ ...formulario, suporteLibras: e.target.checked })}
                    className="w-5 h-5 rounded text-[#b91c1c] accent-[#b91c1c] mt-0.5 cursor-pointer flex-shrink-0"
                  />
                  <div>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 block">
                      Suporte ou atendimento em Libras
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      A escola providenciará intérprete ou profissional capacitado para comunicação em Língua Brasileira de Sinais.
                    </span>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3.5 sm:p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={formulario.notificarWhatsApp}
                    onChange={(e) => setFormulario({ ...formulario, notificarWhatsApp: e.target.checked })}
                    className="w-5 h-5 rounded text-[#b91c1c] accent-[#b91c1c] mt-0.5 cursor-pointer flex-shrink-0"
                  />
                  <div>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 block">
                      Receber aviso do atendimento na Secretaria por WhatsApp
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Permite que a Secretaria envie uma mensagem com o tempo e aviso de atendimento.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          <div className="pt-4 sm:pt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t-2 border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={aoVoltar}
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-sm sm:text-base font-bold transition cursor-pointer text-center"
            >
              Voltar
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-md transition active:scale-[0.99] cursor-pointer text-center"
            >
              <Save size={18} />
              <span>Salvar Alterações do Perfil</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
