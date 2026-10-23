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

/**
 * Área de Perfil Completo do Aluno ("Meu Perfil")
 * Segue a identidade visual do site com seções detalhadas, acessibilidade e validação.
 */
export default function AlunoPerfil({ dadosPerfil, aoSalvarPerfil, aoVoltar }) {
  const [formulario, setFormulario] = useState({
    nome: dadosPerfil?.nome || 'Débora Oliveira',
    rm: dadosPerfil?.rm || '21201',
    turma: dadosPerfil?.turma || '3',
    periodo: dadosPerfil?.periodo || 'Tarde',
    curso: dadosPerfil?.curso || 'Informática para Internet',
    situacaoMatricula: dadosPerfil?.situacaoMatricula || 'Ativo',
    anoIngresso: dadosPerfil?.anoIngresso || '2025',
    cpf: dadosPerfil?.cpf || '456.789.012-34',
    dataNascimento: dadosPerfil?.dataNascimento || '2008-05-14',
    emailInstitucional: dadosPerfil?.emailInstitucional || 'debora.oliveira@etec.sp.gov.br',
    email: dadosPerfil?.email || 'lucasmacenamr@gmail.com',
    telefone: dadosPerfil?.telefone || '(11) 95321-2324',
    // Dados do Responsável Legal
    nomeResponsavel: dadosPerfil?.nomeResponsavel || 'Marta Helena de Oliveira',
    parentescoResponsavel: dadosPerfil?.parentescoResponsavel || 'Mãe',
    cpfResponsavel: dadosPerfil?.cpfResponsavel || '123.456.789-00',
    telefoneResponsavel: dadosPerfil?.telefoneResponsavel || '(11) 98765-4321',
    // Acessibilidade e Preferências
    atendimentoTerreo: dadosPerfil?.atendimentoTerreo || false,
    suporteLibras: dadosPerfil?.suporteLibras || false,
    notificarWhatsApp: dadosPerfil?.notificarWhatsApp ?? true
  });

  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState(false);
  const [abaInterna, setAbaInterna] = useState('dados-pessoais'); // 'dados-pessoais' | 'academico' | 'responsavel' | 'acessibilidade'

  // Validação estrita
  const validarCampos = () => {
    const novosErros = {};

    if (!formulario.nome.trim()) {
      novosErros.nome = 'O nome completo é obrigatório.';
    } else if (formulario.nome.trim().length < 3) {
      novosErros.nome = 'O nome deve ter no mínimo 3 caracteres.';
    }

    if (!formulario.rm.trim()) {
      novosErros.rm = 'O RM é obrigatório.';
    } else if (!/^\d+$/.test(formulario.rm.trim())) {
      novosErros.rm = 'O RM deve conter apenas dígitos numéricos.';
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
      novosErros.email = 'Informe um endereço de e-mail válido.';
    }

    if (!formulario.telefone.trim()) {
      novosErros.telefone = 'O telefone é obrigatório.';
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formulario.telefone.trim())) {
      novosErros.telefone = 'Formato inválido. Use (11) 99999-9999.';
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perfil do Aluno
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-1 font-medium">
            Gerencie seus dados pessoais, acadêmicos, contato do responsável e preferências de acessibilidade.
          </p>
        </div>

        <button
          type="button"
          onClick={aoVoltar}
          className="self-start sm:self-auto px-5 py-2.5 border-2 border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-sm font-bold transition cursor-pointer"
        >
          Voltar ao Início
        </button>
      </div>

      {sucesso && (
        <div className="mb-8 p-5 bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-base font-bold rounded-2xl flex items-center space-x-3 shadow-sm animate-in fade-in duration-200">
          <Check size={22} className="text-emerald-700 flex-shrink-0" />
          <span>Perfil e dados atualizados com sucesso no sistema!</span>
        </div>
      )}

      {/* Cartão de Banner e Identidade do Aluno */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 rounded-2xl bg-[#b91c1c] text-white font-black text-3xl flex items-center justify-center shadow-lg border-2 border-white/20">
              {formulario.nome.charAt(0) || 'D'}
            </div>
            <div>
              <h3 className="text-2xl font-extrabold">{formulario.nome}</h3>
              <p className="text-slate-300 text-base mt-0.5">
                RM: <strong className="text-white">{formulario.rm}</strong> • {formulario.curso} ({formulario.turma}º Módulo)
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Matrícula Ativa
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-slate-200">
                  Turno: {formulario.periodo}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-slate-200">
                  Etec Antônio Furlan — Barueri
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Abas Internas do Perfil */}
        <div className="flex border-b-2 border-slate-200 bg-slate-50/70 px-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setAbaInterna('dados-pessoais')}
            className={`py-4 px-4 text-base font-bold border-b-4 transition cursor-pointer whitespace-nowrap ${
              abaInterna === 'dados-pessoais'
                ? 'border-[#b91c1c] text-[#b91c1c]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Dados Pessoais
          </button>

          <button
            type="button"
            onClick={() => setAbaInterna('academico')}
            className={`py-4 px-4 text-base font-bold border-b-4 transition cursor-pointer whitespace-nowrap ${
              abaInterna === 'academico'
                ? 'border-[#b91c1c] text-[#b91c1c]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Vida Acadêmica
          </button>

          <button
            type="button"
            onClick={() => setAbaInterna('responsavel')}
            className={`py-4 px-4 text-base font-bold border-b-4 transition cursor-pointer whitespace-nowrap ${
              abaInterna === 'responsavel'
                ? 'border-[#b91c1c] text-[#b91c1c]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Responsável Legal
          </button>

          <button
            type="button"
            onClick={() => setAbaInterna('acessibilidade')}
            className={`py-4 px-4 text-base font-bold border-b-4 transition cursor-pointer whitespace-nowrap ${
              abaInterna === 'acessibilidade'
                ? 'border-[#b91c1c] text-[#b91c1c]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Acessibilidade
          </button>
        </div>

        {/* Conteúdo do Formulário */}
        <form onSubmit={manipularSalvar} className="p-8 sm:p-10 space-y-8">
          
          {/* ABA 1: DADOS PESSOAIS */}
          {abaInterna === 'dados-pessoais' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formulario.nome}
                  onChange={(e) => {
                    setFormulario({ ...formulario, nome: e.target.value });
                    if (erros.nome) setErros({ ...erros, nome: null });
                  }}
                  className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {erros.nome && (
                  <p className="text-sm font-semibold text-red-600 mt-1.5 flex items-center space-x-1.5">
                    <AlertCircle size={16} />
                    <span>{erros.nome}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={formulario.cpf}
                    onChange={(e) => setFormulario({ ...formulario, cpf: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={formulario.dataNascimento}
                    onChange={(e) => setFormulario({ ...formulario, dataNascimento: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    E-mail Institucional (@etec.sp.gov.br)
                  </label>
                  <input
                    type="email"
                    value={formulario.emailInstitucional}
                    onChange={(e) => setFormulario({ ...formulario, emailInstitucional: e.target.value })}
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-300 rounded-xl text-base text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    E-mail Pessoal de Contato *
                  </label>
                  <input
                    type="email"
                    value={formulario.email}
                    onChange={(e) => {
                      setFormulario({ ...formulario, email: e.target.value });
                      if (erros.email) setErros({ ...erros, email: null });
                    }}
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  {erros.email && (
                    <p className="text-sm font-semibold text-red-600 mt-1.5 flex items-center space-x-1.5">
                      <AlertCircle size={16} />
                      <span>{erros.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Telefone / WhatsApp para Notificações *
                </label>
                <input
                  type="text"
                  value={formulario.telefone}
                  onChange={(e) => {
                    setFormulario({ ...formulario, telefone: e.target.value });
                    if (erros.telefone) setErros({ ...erros, telefone: null });
                  }}
                  className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Este número será utilizado pela Secretaria para disparar a chamada de guichê via WhatsApp.
                </p>
              </div>
            </div>
          )}

          {/* ABA 2: VIDA ACADÊMICA */}
          {abaInterna === 'academico' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Registro de Matrícula (RM) *
                  </label>
                  <input
                    type="text"
                    value={formulario.rm}
                    readOnly
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-300 rounded-xl text-base font-bold text-slate-800 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 mt-1">Gerado pela Secretaria Acadêmica.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Situação da Matrícula
                  </label>
                  <input
                    type="text"
                    value={formulario.situacaoMatricula}
                    readOnly
                    className="w-full px-4 py-3.5 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-base font-bold text-emerald-800 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Curso Técnico *
                  </label>
                  <input
                    type="text"
                    value={formulario.curso}
                    onChange={(e) => setFormulario({ ...formulario, curso: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Módulo / Turma *
                  </label>
                  <input
                    type="text"
                    value={formulario.turma}
                    onChange={(e) => setFormulario({ ...formulario, turma: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Período / Turno
                  </label>
                  <select
                    value={formulario.periodo}
                    onChange={(e) => setFormulario({ ...formulario, periodo: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base font-medium text-slate-900"
                  >
                    <option value="Manhã">Manhã (07h30 às 11h50)</option>
                    <option value="Tarde">Tarde (13h15 às 17h35)</option>
                    <option value="Noite">Noite (19h00 às 22h45)</option>
                    <option value="Integral">Integral / M-Tec</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Ano de Ingresso
                  </label>
                  <input
                    type="text"
                    value={formulario.anoIngresso}
                    onChange={(e) => setFormulario({ ...formulario, anoIngresso: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: RESPONSÁVEL LEGAL */}
          {abaInterna === 'responsavel' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-950 text-sm font-medium">
                <strong>Importante:</strong> Esses dados são utilizados automaticamente em agendamentos que exigem acompanhamento de responsável (como cancelamento, trancamento e reuniões de coordenação).
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">
                  Nome do Responsável Legal
                </label>
                <input
                  type="text"
                  value={formulario.nomeResponsavel}
                  onChange={(e) => setFormulario({ ...formulario, nomeResponsavel: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base font-medium text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Grau de Parentesco
                  </label>
                  <select
                    value={formulario.parentescoResponsavel}
                    onChange={(e) => setFormulario({ ...formulario, parentescoResponsavel: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base font-medium text-slate-900"
                  >
                    <option value="Mãe">Mãe</option>
                    <option value="Pai">Pai</option>
                    <option value="Responsável Legal / Tutor">Responsável Legal / Tutor</option>
                    <option value="Avó / Avô">Avó / Avô</option>
                    <option value="Tia / Tio">Tia / Tio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    CPF do Responsável
                  </label>
                  <input
                    type="text"
                    value={formulario.cpfResponsavel}
                    onChange={(e) => setFormulario({ ...formulario, cpfResponsavel: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Telefone de Contato
                  </label>
                  <input
                    type="text"
                    value={formulario.telefoneResponsavel}
                    onChange={(e) => setFormulario({ ...formulario, telefoneResponsavel: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 rounded-xl text-base text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: PREFERÊNCIAS DE ACESSIBILIDADE */}
          {abaInterna === 'acessibilidade' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <p className="text-base text-slate-600 font-medium">
                Indique suas preferências para que a Secretaria prepare seu guichê com antecipação e respeito às suas necessidades.
              </p>

              <div className="space-y-4">
                <label className="flex items-start space-x-3.5 p-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={formulario.atendimentoTerreo}
                    onChange={(e) => setFormulario({ ...formulario, atendimentoTerreo: e.target.checked })}
                    className="w-6 h-6 rounded text-red-700 accent-[#b91c1c] mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="text-base font-bold text-slate-900 block">
                      Atendimento acessível no piso térreo
                    </span>
                    <span className="text-sm text-slate-500">
                      Garante que o guichê designado tenha acesso livre sem escadas ou desníveis (mobilidade reduzida ou cadeirante).
                    </span>
                  </div>
                </label>

                <label className="flex items-start space-x-3.5 p-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={formulario.suporteLibras}
                    onChange={(e) => setFormulario({ ...formulario, suporteLibras: e.target.checked })}
                    className="w-6 h-6 rounded text-red-700 accent-[#b91c1c] mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="text-base font-bold text-slate-900 block">
                      Suporte ou atendimento em Libras
                    </span>
                    <span className="text-sm text-slate-500">
                      A escola providenciará intérprete ou profissional capacitado para comunicação em Língua Brasileira de Sinais.
                    </span>
                  </div>
                </label>

                <label className="flex items-start space-x-3.5 p-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={formulario.notificarWhatsApp}
                    onChange={(e) => setFormulario({ ...formulario, notificarWhatsApp: e.target.checked })}
                    className="w-6 h-6 rounded text-red-700 accent-[#b91c1c] mt-0.5 cursor-pointer"
                  />
                  <div>
                    <span className="text-base font-bold text-slate-900 block">
                      Receber chamada no guichê por WhatsApp
                    </span>
                    <span className="text-sm text-slate-500">
                      Permite que a Secretaria envie uma mensagem instantânea avisando quando for sua vez, permitindo aguardar no pátio ou biblioteca.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Botões do Rodapé */}
          <div className="pt-6 flex items-center justify-between border-t-2 border-slate-200">
            <button
              type="button"
              onClick={aoVoltar}
              className="px-6 py-3.5 border-2 border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-base font-bold transition cursor-pointer"
            >
              Voltar
            </button>

            <button
              type="submit"
              className="inline-flex items-center space-x-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-md transition active:scale-[0.99] cursor-pointer"
            >
              <Save size={20} />
              <span>Salvar Alterações do Perfil</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
