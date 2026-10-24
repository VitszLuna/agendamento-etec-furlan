import React, { useState } from 'react';
import { 
  Lock, 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  AlertCircle, 
  Mail, 
  KeyRound, 
  CheckCircle2, 
  X,
  Moon,
  Sun
} from 'lucide-react';

export default function TelaLogin({ aoLogar, darkMode, setDarkMode }) {
  const [papelAba, setPapelAba] = useState('aluno');
  const [identificador, setIdentificador] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});

  const [modalPrimeiroAcesso, setModalPrimeiroAcesso] = useState(false);
  const [etapaPrimeiroAcesso, setEtapaPrimeiroAcesso] = useState(1);
  const [dadosPrimeiroAcesso, setDadosPrimeiroAcesso] = useState({
    tipoConta: 'aluno',
    identificadorRecuperacao: '',
    codigoProvisorioEnviado: '',
    codigoDigitado: '',
    novaSenha: '',
    confirmarSenha: ''
  });
  const [mensagemSucessoPrimeiroAcesso, setMensagemSucessoPrimeiroAcesso] = useState('');
  const [erroPrimeiroAcesso, setErroPrimeiroAcesso] = useState('');

  const obterRotuloIdentificador = () => {
    switch (papelAba) {
      case 'responsavel':
        return {
          titulo: 'E-mail do Responsável',
          placeholder: 'ex.: responsavel@email.com',
          tipo: 'email',
          dica: 'Utilize o e-mail cadastrado na ficha de matrícula.'
        };
      case 'admin':
        return {
          titulo: 'CIN (Identificação Funcional da Secretaria)',
          placeholder: 'ex.: CIN-84920',
          tipo: 'text',
          dica: 'Código de Identificação Funcional emitido pelo Centro Paula Souza.'
        };
      case 'aluno':
      default:
        return {
          titulo: 'RM (Registro de Matrícula)',
          placeholder: 'ex.: 21201',
          tipo: 'text',
          dica: 'Seu número de RM presente na carteirinha ou boletim.'
        };
    }
  };

  const configCampo = obterRotuloIdentificador();

  const validarFormulario = () => {
    const novosErros = {};
    if (!identificador.trim()) {
      novosErros.identificador = `Informe seu ${configCampo.titulo.split(' ')[0]}.`;
    }
    if (!senha) {
      novosErros.senha = 'Digite sua senha de acesso.';
    } else if (senha.length < 4) {
      novosErros.senha = 'A senha deve ter no mínimo 4 caracteres.';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const manipularLoginNormal = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const roleMap = {
        aluno: 'student',
        responsavel: 'guardian',
        admin: 'admin'
      };
      aoLogar(roleMap[papelAba], { identificador, senha });
    }
  };

  const entrarComoTeste = (papel) => {
    aoLogar(papel, { teste: true });
  };

  const dispararEnvioSenhaProvisoria = (e) => {
    e.preventDefault();
    setErroPrimeiroAcesso('');
    if (!dadosPrimeiroAcesso.identificadorRecuperacao.trim()) {
      setErroPrimeiroAcesso('Preencha o campo de identificação.');
      return;
    }
    const codigoSimulado = Math.floor(100000 + Math.random() * 900000).toString();
    setDadosPrimeiroAcesso((prev) => ({
      ...prev,
      codigoProvisorioEnviado: codigoSimulado
    }));
    setEtapaPrimeiroAcesso(2);
  };

  const concluirDefinicaoSenha = (e) => {
    e.preventDefault();
    setErroPrimeiroAcesso('');
    if (dadosPrimeiroAcesso.codigoDigitado.trim() !== dadosPrimeiroAcesso.codigoProvisorioEnviado) {
      setErroPrimeiroAcesso('O código provisório digitado não confere.');
      return;
    }
    if (!dadosPrimeiroAcesso.novaSenha || dadosPrimeiroAcesso.novaSenha.length < 6) {
      setErroPrimeiroAcesso('A nova senha deve possuir no mínimo 6 caracteres.');
      return;
    }
    if (dadosPrimeiroAcesso.novaSenha !== dadosPrimeiroAcesso.confirmarSenha) {
      setErroPrimeiroAcesso('As duas senhas digitadas não coincidem.');
      return;
    }

    setMensagemSucessoPrimeiroAcesso('Senha definitiva cadastrada com sucesso!');
    setTimeout(() => {
      setModalPrimeiroAcesso(false);
      const roleMap = {
        aluno: 'student',
        responsavel: 'guardian',
        admin: 'admin'
      };
      aoLogar(roleMap[dadosPrimeiroAcesso.tipoConta], { teste: true });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center px-4 py-8 sm:py-12 w-full max-w-full overflow-x-hidden relative transition-colors duration-200">
      {setDarkMode && (
        <button
          onClick={() => setDarkMode(prev => !prev)}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer bg-white/80 dark:bg-slate-900/80 shadow-xs"
          title={darkMode ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
          aria-label="Alternar modo escuro"
        >
          {darkMode ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} className="text-slate-700" />}
        </button>
      )}

      <div className="flex items-center justify-center space-x-4 sm:space-x-8 mb-6 sm:mb-8 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-xs">
        <img 
          src="/etec.png" 
          alt="Etec Antônio Furlan" 
          className="h-10 sm:h-12 md:h-14 object-contain"
          onError={(e) => { 
            if (!e.target.dataset.triedWebp) {
              e.target.dataset.triedWebp = 'true';
              e.target.src = '/etec.webp';
            }
          }}
        />
        <img 
          src="/cps.png" 
          alt="Centro Paula Souza" 
          className="h-10 sm:h-12 md:h-14 object-contain"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      <div className="text-center mb-6 sm:mb-8 max-w-lg px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          Agendamento de Atendimento
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base md:text-lg mt-1.5 sm:mt-2 font-medium">
          Secretaria Escolar e Orientação Pedagógica • Etec Antônio Furlan
        </p>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 md:p-10">
        <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6 sm:mb-8 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => { setPapelAba('aluno'); setErros({}); }}
            className={`py-2 px-1 rounded-lg transition text-center cursor-pointer ${
              papelAba === 'aluno'
                ? 'bg-white dark:bg-slate-900 text-[#b91c1c] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Aluno
          </button>

          <button
            type="button"
            onClick={() => { setPapelAba('responsavel'); setErros({}); }}
            className={`py-2 px-1 rounded-lg transition text-center cursor-pointer ${
              papelAba === 'responsavel'
                ? 'bg-white dark:bg-slate-900 text-[#b91c1c] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Responsável
          </button>

          <button
            type="button"
            onClick={() => { setPapelAba('admin'); setErros({}); }}
            className={`py-2 px-1 rounded-lg transition text-center cursor-pointer ${
              papelAba === 'admin'
                ? 'bg-white dark:bg-slate-900 text-[#b91c1c] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Secretaria
          </button>
        </div>

        <form onSubmit={manipularLoginNormal} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              {configCampo.titulo} *
            </label>
            <input
              type={configCampo.tipo}
              value={identificador}
              onChange={(e) => {
                setIdentificador(e.target.value);
                if (erros.identificador) setErros({ ...erros, identificador: null });
              }}
              placeholder={configCampo.placeholder}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-transparent placeholder:text-slate-400"
            />
            {erros.identificador ? (
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center space-x-1">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{erros.identificador}</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{configCampo.dica}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                Senha de Acesso *
              </label>
              <button
                type="button"
                onClick={() => {
                  setDadosPrimeiroAcesso({
                    tipoConta: papelAba,
                    identificadorRecuperacao: identificador,
                    codigoProvisorioEnviado: '',
                    codigoDigitado: '',
                    novaSenha: '',
                    confirmarSenha: ''
                  });
                  setEtapaPrimeiroAcesso(1);
                  setErroPrimeiroAcesso('');
                  setMensagemSucessoPrimeiroAcesso('');
                  setModalPrimeiroAcesso(true);
                }}
                className="text-xs font-bold text-[#b91c1c] hover:underline cursor-pointer"
              >
                Primeiro Acesso / Esqueci
              </button>
            </div>
            <input
              type="password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                if (erros.senha) setErros({ ...erros, senha: null });
              }}
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm sm:text-base text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-transparent placeholder:text-slate-400"
            />
            {erros.senha && (
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 mt-1 flex items-center space-x-1">
                <AlertCircle size={14} className="flex-shrink-0" />
                <span>{erros.senha}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold py-3.5 px-4 rounded-xl text-base shadow-md transition active:scale-[0.99] cursor-pointer mt-2"
          >
            Entrar no Sistema
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Entrar em modo de teste:
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              Acesso Imediato
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => entrarComoTeste('student')}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl text-xs font-bold border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-300 hover:text-red-700 dark:hover:text-red-300 transition cursor-pointer"
            >
              <GraduationCap size={16} className="text-[#b91c1c] flex-shrink-0" />
              <span>Laura (Aluna)</span>
            </button>

            <button
              type="button"
              onClick={() => entrarComoTeste('guardian')}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl text-xs font-bold border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:border-amber-300 hover:text-amber-800 dark:hover:text-amber-300 transition cursor-pointer"
            >
              <Users size={16} className="text-amber-700 dark:text-amber-400 flex-shrink-0" />
              <span>Vitoria (Resp.)</span>
            </button>

            <button
              type="button"
              onClick={() => entrarComoTeste('admin')}
              className="flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl text-xs font-bold border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition cursor-pointer"
            >
              <ShieldCheck size={16} className="text-slate-700 dark:text-slate-300 flex-shrink-0" />
              <span>Pietro (Secret.)</span>
            </button>
          </div>
        </div>
      </div>

      {modalPrimeiroAcesso && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
              <div className="flex items-center space-x-2">
                <KeyRound size={20} className="text-[#b91c1c]" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Primeiro Acesso / Nova Senha
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalPrimeiroAcesso(false)}
                className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {mensagemSucessoPrimeiroAcesso ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100 rounded-xl text-center space-y-2">
                  <CheckCircle2 size={32} className="text-emerald-700 dark:text-emerald-400 mx-auto" />
                  <p className="font-extrabold text-base">{mensagemSucessoPrimeiroAcesso}</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">Conectando você ao sistema...</p>
                </div>
              ) : (
                <>
                  {erroPrimeiroAcesso && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold rounded-xl flex items-center space-x-2">
                      <AlertCircle size={16} className="flex-shrink-0" />
                      <span>{erroPrimeiroAcesso}</span>
                    </div>
                  )}

                  {etapaPrimeiroAcesso === 1 && (
                    <form onSubmit={dispararEnvioSenhaProvisoria} className="space-y-4">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        Informe o seu identificador de acesso. Você receberá uma senha provisória para definir sua nova credencial.
                      </p>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          {dadosPrimeiroAcesso.tipoConta === 'aluno' ? 'RM do Aluno' : dadosPrimeiroAcesso.tipoConta === 'responsavel' ? 'E-mail do Responsável' : 'CIN da Secretaria'} *
                        </label>
                        <input
                          type={dadosPrimeiroAcesso.tipoConta === 'responsavel' ? 'email' : 'text'}
                          value={dadosPrimeiroAcesso.identificadorRecuperacao}
                          onChange={(e) => setDadosPrimeiroAcesso({ ...dadosPrimeiroAcesso, identificadorRecuperacao: e.target.value })}
                          placeholder={dadosPrimeiroAcesso.tipoConta === 'aluno' ? 'ex.: 21201' : dadosPrimeiroAcesso.tipoConta === 'responsavel' ? 'ex.: mae@email.com' : 'ex.: CIN-84920'}
                          className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-sm transition cursor-pointer"
                      >
                        Enviar Senha Provisória por E-mail
                      </button>
                    </form>
                  )}

                  {etapaPrimeiroAcesso === 2 && (
                    <form onSubmit={concluirDefinicaoSenha} className="space-y-4">
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 rounded-xl text-xs text-amber-900 dark:text-amber-200 font-medium">
                        <p className="font-bold">Simulação de E-mail de Senha Provisória:</p>
                        <p className="mt-0.5">Seu código provisório gerado é: <strong className="font-mono text-sm bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-700">{dadosPrimeiroAcesso.codigoProvisorioEnviado}</strong></p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Senha Provisória Recebida (6 dígitos) *
                        </label>
                        <input
                          type="text"
                          value={dadosPrimeiroAcesso.codigoDigitado}
                          onChange={(e) => setDadosPrimeiroAcesso({ ...dadosPrimeiroAcesso, codigoDigitado: e.target.value })}
                          placeholder="Digite o código de 6 dígitos"
                          className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-slate-100"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Defina sua Nova Senha Definitiva *
                        </label>
                        <input
                          type="password"
                          value={dadosPrimeiroAcesso.novaSenha}
                          onChange={(e) => setDadosPrimeiroAcesso({ ...dadosPrimeiroAcesso, novaSenha: e.target.value })}
                          placeholder="Mínimo 6 caracteres"
                          className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Confirme a Nova Senha *
                        </label>
                        <input
                          type="password"
                          value={dadosPrimeiroAcesso.confirmarSenha}
                          onChange={(e) => setDadosPrimeiroAcesso({ ...dadosPrimeiroAcesso, confirmarSenha: e.target.value })}
                          placeholder="Repita a nova senha"
                          className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100"
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEtapaPrimeiroAcesso(1)}
                          className="w-1/3 py-2 px-3 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-sm transition"
                        >
                          Cadastrar e Acessar
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8 text-center text-xs font-medium text-slate-500 dark:text-slate-400 px-4">
        Centro Paula Souza • Etec Antônio Furlan — Barueri/SP
      </footer>
    </div>
  );
}
