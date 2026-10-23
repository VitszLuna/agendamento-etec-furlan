import React, { useState } from 'react';
import { ChevronDown, Clock, Phone, MapPin } from 'lucide-react';

/**
 * Componente de Ajuda do Aluno (Foto 1 da 3ª remessa)
 * Totalmente adaptado para acessibilidade com textos ampliados e sanfona de fácil clique.
 */
export default function AlunoAjuda() {
  const [duvidaAberta, setDuvidaAberta] = useState(null);

  const faqLista = [
    {
      pergunta: 'Como faço um agendamento?',
      resposta: 'Acesse a aba "Agendar", procure pelo serviço que você precisa, verifique os documentos necessários e escolha uma data e horário livres no calendário. Por fim, confirme seus dados para emitir o comprovante com o protocolo.'
    },
    {
      pergunta: 'Quais documentos devo levar?',
      resposta: 'Sempre compareça com um documento de identidade original com foto (RG, CNH ou Carteira de Trabalho). Para solicitações de histórico escolar ou passe de transporte, consulte os requisitos específicos informados nos detalhes do serviço.'
    },
    {
      pergunta: 'Posso mudar o dia ou o horário?',
      resposta: 'Sim! Na aba "Meus Agendamentos", você pode cancelar o horário anterior a qualquer momento e realizar um novo agendamento escolhendo outro dia ou horário disponível sem penalidade.'
    },
    {
      pergunta: 'Como cancelo um atendimento?',
      resposta: 'Vá até a aba "Meus Agendamentos", localize o atendimento desejado na aba "Próximos" e clique no botão "Cancelar". O horário será imediatamente liberado para que outro colega possa utilizar.'
    },
    {
      pergunta: 'Não encontrei horário disponível. E agora?',
      resposta: 'A Secretaria Acadêmica atualiza as vagas de atendimento regularmente no início de cada semana. Caso seja um caso urgente de matrícula ou prazo judicial, entre em contato diretamente pelos canais ao lado.'
    }
  ];

  const alternarDuvida = (indice) => {
    setDuvidaAberta(duvidaAberta === indice ? null : indice);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Título e Subtítulo Acessíveis */}
      <div className="mb-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Ajuda
        </h2>
        <p className="text-slate-600 text-base sm:text-lg mt-1 font-medium">
          Respostas rápidas para as dúvidas mais comuns.
        </p>
      </div>

      {/* Grid com 2 Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Coluna Esquerda: Sanfona com as 5 Perguntas */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {faqLista.map((faq, idx) => {
            const estaAberta = duvidaAberta === idx;
            return (
              <div key={idx} className="transition">
                <button
                  type="button"
                  onClick={() => alternarDuvida(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between text-base sm:text-lg font-bold text-slate-900 hover:text-red-700 transition cursor-pointer"
                >
                  <span>{faq.pergunta}</span>
                  <ChevronDown
                    size={20}
                    className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ml-4 ${
                      estaAberta ? 'rotate-180 text-red-700' : ''
                    }`}
                  />
                </button>

                {estaAberta && (
                  <div className="px-6 pb-6 text-base text-slate-700 leading-relaxed font-medium animate-in fade-in duration-150">
                    {faq.resposta}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Coluna Direita: Card "Fale com a escola" */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-extrabold text-slate-900">
            Fale com a escola
          </h3>

          <div className="space-y-5 text-base text-slate-700 font-medium">
            {/* Horário */}
            <div className="flex items-start space-x-3.5">
              <Clock size={22} className="text-red-700 flex-shrink-0 mt-0.5" />
              <span>Segunda a sexta, das 8h às 16h30</span>
            </div>

            {/* Telefone */}
            <div className="flex items-center space-x-3.5">
              <Phone size={22} className="text-red-700 flex-shrink-0" />
              <span className="font-bold text-slate-900 text-lg">(11) 4198-0000</span>
            </div>

            {/* Endereço */}
            <div className="flex items-start space-x-3.5">
              <MapPin size={22} className="text-red-700 flex-shrink-0 mt-0.5" />
              <span>Etec Antônio Furlan — Barueri, SP</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
