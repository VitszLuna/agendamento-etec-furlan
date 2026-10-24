import React, { useState } from 'react';
import { ChevronDown, Clock, Phone, MapPin } from 'lucide-react';

export default function AlunoAjuda() {
  const [duvidaAberta, setDuvidaAberta] = useState(null);

  const faqLista = [
    {
      pergunta: 'Como faço um agendamento?',
      resposta: 'Acesse a aba "Agendar", procure pelo serviço que você precisa, verifique os documentos necessários e escolha uma data e horário livres no calendário. Por fim, confirme seus dados para emitir o comprovante com o protocolo.'
    },
    {
      pergunta: 'Quais documentos devo levar?',
      resposta: 'Sempre compareça com um documento de identidade original com foto (RG ou CNH). Para solicitações de histórico escolar ou outros documentos, consulte os requisitos específicos informados nos detalhes do serviço.'
    },
    {
      pergunta: 'Posso mudar o dia ou o horário?',
      resposta: 'Sim! Na aba "Meus Agendamentos", você pode cancelar o horário anterior a qualquer momento e realizar um novo agendamento escolhendo outro dia ou horário disponível sem penalidade.'
    },
    {
      pergunta: 'Como cancelo um atendimento?',
      resposta: 'Vá até a aba "Meus Agendamentos", localize o atendimento desejado na aba "Próximos" e clique no botão "Cancelar". O horário será imediatamente liberado para outro atendimento.'
    },
    {
      pergunta: 'Não encontrei horário disponível. E agora?',
      resposta: 'A Secretaria Acadêmica atualiza as vagas de atendimento regularmente no início de cada semana. Caso seja um caso urgente de prazo legal ou matrícula, entre em contato diretamente pelos canais ao lado.'
    }
  ];

  const alternarDuvida = (indice) => {
    setDuvidaAberta(duvidaAberta === indice ? null : indice);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Ajuda
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg mt-1 font-medium">
          Respostas rápidas para as dúvidas mais comuns.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
          {faqLista.map((faq, idx) => {
            const estaAberta = duvidaAberta === idx;
            return (
              <div key={idx} className="transition">
                <button
                  type="button"
                  onClick={() => alternarDuvida(idx)}
                  className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-sm sm:text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-[#b91c1c] dark:hover:text-red-400 transition cursor-pointer gap-2"
                >
                  <span className="leading-snug">{faq.pergunta}</span>
                  <ChevronDown
                    size={20}
                    className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ml-2 sm:ml-4 ${
                      estaAberta ? 'rotate-180 text-[#b91c1c]' : ''
                    }`}
                  />
                </button>

                {estaAberta && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium animate-in fade-in duration-150">
                    {faq.resposta}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
            Canais de Atendimento
          </h3>

          <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-start space-x-3">
              <MapPin size={18} className="text-[#b91c1c] flex-shrink-0 mt-0.5" />
              <span>Rua João Batista Soares, 440 - Novo Centro Comercial de Barueri - Barueri/SP - CEP: 06401-135</span>
            </div>

            <div className="flex items-center space-x-3">
              <Phone size={18} className="text-[#b91c1c] flex-shrink-0" />
              <span>(11) 4198-4444</span>
            </div>

            <div className="flex items-center space-x-3">
              <Clock size={18} className="text-[#b91c1c] flex-shrink-0" />
              <span>Segunda a Sexta, das 08:00 às 16:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
