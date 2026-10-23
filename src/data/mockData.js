// ==============================================================================
// DADOS MOCKADOS COMPLETOS (SISTEMA DE AGENDAMENTO ETEC ANTÔNIO FURLAN / CPS)
// Catálogo completo, disponibilidade, bloqueios, perfil e regras de responsáveis.
// ==============================================================================

/**
 * Catálogo completo de Serviços da Secretaria da Etec
 * Inclui sinalização de exigência de Responsável Legal para menores de 18 anos.
 */
export const CATEGORIZED_SERVICES = [
  {
    category: 'DOCUMENTOS',
    services: [
      {
        id: 'historico-certificado',
        title: 'Histórico e Certificado',
        description: 'Solicitação de histórico escolar, certificado ou diploma de conclusão de curso.',
        duration: 'cerca de 15 min',
        durationMinutes: 15,
        requerResponsavel: false,
        requiredDocs: [
          'Documento com foto (RG ou CNH)',
          'CPF',
          'Comprovante de conclusão, se houver'
        ],
        importantNotice: 'O prazo de emissão do diploma pode chegar a 30 dias.'
      },
      {
        id: 'declaracao-escolar',
        title: 'Solicitação de Declaração Escolar',
        description: 'Emissão de declaração de matrícula ou de frequência para estágio, transporte, trabalho ou outros fins.',
        duration: 'cerca de 10 min',
        durationMinutes: 10,
        requerResponsavel: false,
        requiredDocs: [
          'Documento com foto (RG ou CNH)',
          'Número do RM'
        ],
        importantNotice: 'Declarações simples podem ser emitidas no guichê ou em até 2 dias úteis.'
      }
    ]
  },
  {
    category: 'MATRÍCULA E VIDA ACADÊMICA',
    services: [
      {
        id: 'cancelamento-matricula',
        title: 'Cancelamento da Matrícula',
        description: 'Encerramento definitivo do vínculo do aluno com o curso.',
        duration: 'cerca de 15 min',
        durationMinutes: 15,
        requerResponsavel: true, // EXIGE RESPONSÁVEL LEGAL
        requiredDocs: [
          'Documento com foto (RG ou CNH)',
          'Requerimento assinado pelo responsável',
          'Presença OBRIGATÓRIA do responsável legal (para menores de 18 anos)'
        ],
        importantNotice: 'O cancelamento de matrícula é irreversível após sua homologação e exige a presença do responsável legal para alunos menores de idade.'
      },
      {
        id: 'desistencia-vaga',
        title: 'Desistência da Vaga',
        description: 'Formalização da desistência de vaga conquistada no Vestibulinho.',
        duration: 'cerca de 10 min',
        durationMinutes: 10,
        requerResponsavel: true, // EXIGE RESPONSÁVEL LEGAL
        requiredDocs: [
          'Documento com foto (RG ou CNH)',
          'Comprovante de convocação do Vestibulinho',
          'Presença do responsável se aluno for menor de idade'
        ],
        importantNotice: 'Permite a convocação imediata dos próximos candidatos da lista de espera.'
      },
      {
        id: 'reclassificacao',
        title: 'Reclassificação',
        description: 'Avaliação para reposicionar o aluno em série ou módulo compatível com seu desenvolvimento.',
        duration: 'cerca de 30 min',
        durationMinutes: 30,
        requerResponsavel: false,
        requiredDocs: [
          'Histórico escolar anterior',
          'Documento com foto',
          'Requerimento formal com justificativa'
        ],
        importantNotice: 'A reclassificação passa por avaliação da comissão pedagógica.'
      },
      {
        id: 'reconsideracao-nota',
        title: 'Reconsideração de Nota',
        description: 'Pedido de revisão de menção ou nota atribuída em um componente curricular.',
        duration: 'cerca de 20 min',
        durationMinutes: 20,
        requerResponsavel: false,
        requiredDocs: [
          'Cópia da avaliação ou trabalho contestado',
          'Formulário de justificativa pedagógica preenchido'
        ],
        importantNotice: 'Prazo máximo de solicitação é de até 5 dias após a divulgação da menção.'
      },
      {
        id: 'trancamento',
        title: 'Trancamento',
        description: 'Interrupção temporária da matricula por um período letivo.',
        duration: 'cerca de 15 min',
        durationMinutes: 15,
        requerResponsavel: true, // EXIGE RESPONSÁVEL LEGAL
        requiredDocs: [
          'Documento com foto',
          'Comprovante do motivo (trabalho, saúde ou pessoal)',
          'Presença ou assinatura do responsável legal (para menores)'
        ],
        importantNotice: 'O trancamento é permitido a partir do 2º módulo por até 6 meses.'
      },
      {
        id: 'transferencia',
        title: 'Transferência',
        description: 'Transferência interna entre cursos, turnos ou turmas da própria ETEC.',
        duration: 'cerca de 20 min',
        durationMinutes: 20,
        requerResponsavel: false,
        requiredDocs: [
          'Documento com foto',
          'Boletim acadêmico atualizado',
          'Declaração de compatibilidade de grade horária'
        ],
        importantNotice: 'Sujeita à existência de vaga remanescente no curso de destino.'
      },
      {
        id: 'transferencia-externa',
        title: 'Transferência Externa',
        description: 'Saída ou entrada de aluno transferido de outra instituição de ensino.',
        duration: 'cerca de 20 min',
        durationMinutes: 20,
        requerResponsavel: true, // EXIGE RESPONSÁVEL LEGAL
        requiredDocs: [
          'Histórico escolar oficial e reconhecido',
          'Declaração de transferência com guia de recolhimento',
          'Ementas oficiais das disciplinas cursadas',
          'Presença do responsável legal para alunos menores'
        ],
        importantNotice: 'A análise curricular leva em torno de 15 dias úteis.'
      }
    ]
  },
  {
    category: 'ATENDIMENTOS E REUNIÕES',
    services: [
      {
        id: 'reuniao-direcao',
        title: 'Reunião com a Direção',
        description: 'Conversa com a Direção da escola sobre assuntos que precisam de decisão institucional.',
        duration: 'cerca de 30 min',
        durationMinutes: 30,
        requerResponsavel: true, // EXIGE RESPONSÁVEL LEGAL
        requiredDocs: [
          'Documento com foto',
          'Resumo do assunto a ser tratado',
          'Acompanhamento do responsável legal para menores de idade'
        ],
        importantNotice: 'Atendimento exclusivo com a Diretoria da unidade escolar.'
      },
      {
        id: 'reuniao-orientacao',
        title: 'Reunião com a Orientação',
        description: 'Conversa sobre desempenho escolar, frequência, adaptação e acompanhamento do aluno.',
        duration: 'cerca de 30 min',
        durationMinutes: 30,
        requerResponsavel: true, // EXIGE RESPONSÁVEL LEGAL
        requiredDocs: [
          'Documento de identificação',
          'Presença obrigatória do responsável legal para alunos menores'
        ],
        importantNotice: 'Espaço de acolhimento psicopedagógico e orientação acadêmica.'
      },
      {
        id: 'reuniao-secretaria',
        title: 'Reunião com a Secretaria',
        description: 'Atendimento geral para dúvidas sobre documentos, matrícula e vida escolar.',
        duration: 'cerca de 15 min',
        durationMinutes: 15,
        requerResponsavel: false,
        requiredDocs: [
          'Documento com foto',
          'RM do estudante'
        ],
        importantNotice: 'Dúvidas em geral sobre processos acadêmicos e secretaria.'
      }
    ]
  },
  {
    category: 'OUTROS SERVIÇOS',
    services: [
      {
        id: 'achados-perdidos',
        title: 'Achados e Perdidos',
        description: 'Retirada ou registro de objetos perdidos nas dependências da escola.',
        duration: 'cerca de 10 min',
        durationMinutes: 10,
        requerResponsavel: false,
        requiredDocs: [
          'Documento com foto',
          'Descrição detalhada ou comprovação de posse do objeto'
        ],
        importantNotice: 'Itens não reclamados ao fim do semestre são destinados à doação.'
      },
      {
        id: 'dados-vestibular-isencao',
        title: 'Dados para Vestibular / Isenção',
        description: 'Inclusão dos seus dados nas plataformas de vestibular e pedidos de isenção de taxa.',
        duration: 'cerca de 15 min',
        durationMinutes: 15,
        requerResponsavel: false,
        requiredDocs: [
          'Comprovante de conclusão ou matrícula em escola pública',
          'Comprovante de renda familiar recente'
        ],
        importantNotice: 'Fique atento aos prazos do calendário oficial da FAT.'
      },
      {
        id: 'inscricao-plataforma-curso',
        title: 'Inscrição de Plataforma de Curso',
        description: 'Apoio no cadastro e acesso às plataformas digitais utilizadas no curso.',
        duration: 'cerca de 15 min',
        durationMinutes: 15,
        requerResponsavel: false,
        requiredDocs: [
          'E-mail institucional (@etec.sp.gov.br)',
          'Número de RM'
        ],
        importantNotice: 'Suporte para Microsoft Teams, NSA e Google Workspace for Education.'
      },
      {
        id: 'revalidacao-diploma-estrangeiro',
        title: 'Revalidação de Diploma Estrangeiro',
        description: 'Orientação sobre a validação de estudos realizados fora do Brasil.',
        duration: 'cerca de 30 min',
        durationMinutes: 30,
        requerResponsavel: false,
        requiredDocs: [
          'Diploma original consularizado ou com Apostila de Haia',
          'Tradução juramentada oficial'
        ],
        importantNotice: 'Processo sujeito às normas vigentes da Secretaria Estadual de Educação.'
      },
      {
        id: 'transporte',
        title: 'Transporte',
        description: 'Informações e documentos para o passe escolar e transporte municipal ou intermunicipal.',
        duration: 'cerca de 10 min',
        durationMinutes: 10,
        requerResponsavel: false,
        requiredDocs: [
          'Comprovante de residência em nome do aluno ou responsável',
          'Declaração de frequência escolar',
          'Formulário oficial EMTU / SPTrans preenchido'
        ],
        importantNotice: 'A validação do benefício depende da concessionária de transporte.'
      }
    ]
  }
];

export const ALL_SERVICES = CATEGORIZED_SERVICES.flatMap(cat => cat.services);
export const SERVICES_LIST = ALL_SERVICES.map(s => s.title);

/**
 * Atendimentos da Secretaria com telefones para o recurso "Chamar no WhatsApp"
 */
export const INITIAL_APPOINTMENTS = [
  {
    id: '1',
    horario: '08:30',
    aluno: 'Lucas Ferreira',
    curso: '3º ADM',
    rm: '22871',
    telefone: '(11) 98765-4321',
    servico: 'Transporte',
    status: 'Concluído',
    data: '2026-10-23',
    observacao: 'Solicitação de passe escolar EMTU.',
    requerResponsavel: false
  },
  {
    id: '2',
    horario: '09:00',
    aluno: 'Beatriz Santos',
    curso: '1º TI',
    rm: '23390',
    telefone: '(11) 97654-3210',
    servico: 'Reconsideração de Nota',
    status: 'Concluído',
    data: '2026-10-23',
    observacao: 'Revisão da avaliação bimestral de Lógica de Programação.',
    requerResponsavel: false
  },
  {
    id: '3',
    horario: '10:00',
    aluno: 'Gabriel Souza',
    curso: '2º TI',
    rm: '21904',
    telefone: '(11) 96543-2109',
    servico: 'Transferência',
    status: 'Cancelado',
    data: '2026-10-23',
    observacao: 'Cancelado a pedido do responsável.',
    requerResponsavel: false
  },
  {
    id: '4',
    horario: '14:00',
    aluno: 'Ana Clara Lima',
    curso: '1º ADM',
    rm: '23512',
    telefone: '(11) 95432-1098',
    servico: 'Reunião com a Secretaria',
    status: 'Em atendimento',
    data: '2026-10-23',
    observacao: 'Entrega de documentos de matrícula pendentes.',
    requerResponsavel: false
  },
  {
    id: '5',
    horario: '15:00',
    aluno: 'Pedro Almeida',
    curso: '3º RH',
    rm: '22456',
    telefone: '(11) 94321-0987',
    servico: 'Histórico e Certificado',
    status: 'Confirmado',
    data: '2026-10-23',
    observacao: 'Retirada da 2ª via de histórico de conclusão.',
    requerResponsavel: false
  },
  {
    id: '6',
    horario: '15:30',
    aluno: 'Débora Oliveira',
    curso: 'Informática para Internet',
    rm: '21201',
    telefone: '(11) 95321-2324',
    servico: 'Histórico e Certificado',
    status: 'Confirmado',
    data: '2026-10-23',
    observacao: 'Retirada de documentação acadêmica.',
    requerResponsavel: false
  }
];

export const INITIAL_AVAILABILITY = {
  'Segunda-feira': {
    ativo: true,
    horarios: [
      '08:00', '08:30', '09:00', '09:30',
      '10:00', '10:30', '11:00', '11:30',
      '13:30', '14:00', '14:30', '15:00',
      '15:30', '16:00'
    ]
  },
  'Terça-feira': {
    ativo: true,
    horarios: [
      '08:00', '08:30', '09:00', '09:30',
      '10:00', '10:30', '11:00', '11:30',
      '13:30', '14:00', '14:30', '15:00',
      '15:30', '16:00'
    ]
  },
  'Quarta-feira': {
    ativo: true,
    horarios: [
      '08:00', '08:30', '09:00', '09:30',
      '10:00', '10:30', '11:00', '11:30',
      '13:30', '14:00', '14:30', '15:00',
      '15:30', '16:00'
    ]
  },
  'Quinta-feira': {
    ativo: true,
    horarios: [
      '08:00', '08:30', '09:00', '09:30',
      '10:00', '10:30', '11:00', '11:30',
      '13:30', '14:00', '14:30', '15:00',
      '15:30', '16:00'
    ]
  },
  'Sexta-feira': {
    ativo: true,
    horarios: [
      '08:00', '08:30', '09:00', '09:30',
      '10:00', '10:30', '11:00', '11:30',
      '13:30', '14:00', '14:30', '15:00'
    ]
  }
};

export const INITIAL_BLOCKED_PERIODS = [
  {
    id: 'block-1',
    titulo: 'Segunda-feira, 12 de outubro de 2026',
    data: '2026-10-12',
    detalhe: 'Dia inteiro • Feriado — Nossa Senhora Aparecida',
    diaInteiro: true,
    motivo: 'Feriado — Nossa Senhora Aparecida'
  },
  {
    id: 'block-2',
    titulo: 'Terça-feira, 29 de setembro de 2026',
    data: '2026-09-29',
    detalhe: '13:30 às 16:30 • Reunião de planejamento pedagógico',
    diaInteiro: false,
    horarioInicio: '13:30',
    horarioFim: '16:30',
    motivo: 'Reunião de planejamento pedagógico'
  }
];

export const INITIAL_STUDENT_NEXT_APPOINTMENT = {
  id: 'next-1',
  servico: 'Histórico e Certificado',
  dataFormatada: 'Sexta-feira, 23 de outubro de 2026',
  data: '2026-10-23',
  horario: '15:30',
  status: 'Confirmado',
  local: 'Secretaria Acadêmica - Guichê 02',
  documentosNecessarios: 'Documento original com foto (RG ou CNH)',
  protocolo: 'AG-2026-1023-884',
  duration: 'cerca de 15 min',
  requerResponsavel: false
};

/**
 * Perfil completo da aluna Débora Oliveira com dados pessoais,
 * acadêmicos, responsável legal e acessibilidade.
 */
export const INITIAL_STUDENT_PROFILE = {
  nome: 'Débora Oliveira',
  rm: '21201',
  turma: '3',
  periodo: 'Tarde',
  curso: 'Informática para Internet',
  situacaoMatricula: 'Ativo',
  anoIngresso: '2025',
  cpf: '456.789.012-34',
  dataNascimento: '2008-05-14',
  emailInstitucional: 'debora.oliveira@etec.sp.gov.br',
  email: 'lucasmacenamr@gmail.com',
  telefone: '(11) 95321-2324',
  // Dados do Responsável Legal (para quando o serviço exigir)
  nomeResponsavel: 'Marta Helena de Oliveira',
  parentescoResponsavel: 'Mãe',
  cpfResponsavel: '123.456.789-00',
  telefoneResponsavel: '(11) 98765-4321',
  // Preferências de Acessibilidade
  atendimentoTerreo: false,
  suporteLibras: false,
  notificarWhatsApp: true
};
