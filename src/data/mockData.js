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
          'CIN',
          'Comprovante de conclusão, se houver'
        ],
        importantNotice: 'O prazo de emissão em média é de 60 dias.'
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
        importantNotice: 'Declarações simples podem ser emitidas na Secretaria ou em até 2 dias úteis.'
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
        requerResponsavel: true,
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
        requerResponsavel: true,
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
        description: 'Interrupção temporária da matrícula por um período letivo.',
        duration: 'cerca de 15 min',
        durationMinutes: 15,
        requerResponsavel: true,
        requiredDocs: [
          'Documento com foto',
          'Comprovante do motivo (trabalho, saúde ou pessoal)',
          'Presença ou assinatura do responsável legal (para menores)'
        ],
        importantNotice: 'O trancamento é permitido a partir do 2º módulo por até 6 meses.'
      }
    ]
  },
  {
    category: 'ATENDIMENTO GERAL',
    services: [
      {
        id: 'reuniao-secretaria',
        title: 'Reunião com a Secretaria',
        description: 'Atendimento presencial para esclarecimento de dúvidas, entrega ou retirada de documentos e orientações diversas.',
        duration: 'cerca de 20 min',
        durationMinutes: 20,
        requerResponsavel: false,
        requiredDocs: [
          'Documento com foto (RG ou CNH)',
          'CIN'
        ],
        importantNotice: 'Compareça com 5 minutos de antecedência. Tolerância de 10 minutos de atraso.'
      }
    ]
  }
];

export const ALL_SERVICES = CATEGORIZED_SERVICES.flatMap(cat => cat.services);

export const INITIAL_APPOINTMENTS = [
  {
    id: '1',
    horario: '08:00',
    aluno: 'Carlos Mendes',
    curso: '2º DS',
    rm: '22102',
    telefone: '(11) 91234-5678',
    servico: 'Cancelamento da Matrícula',
    status: 'Agendado',
    data: '2026-10-23',
    observacao: 'Presença do responsável confirmada.',
    requerResponsavel: true
  },
  {
    id: '2',
    horario: '09:00',
    aluno: 'Ana Paula Souza',
    curso: '1º RH',
    rm: '22305',
    telefone: '(11) 92345-6789',
    servico: 'Solicitação de Declaração Escolar',
    status: 'Agendado',
    data: '2026-10-23',
    observacao: 'Declaração para fins de estágio.',
    requerResponsavel: false
  },
  {
    id: '3',
    horario: '10:00',
    aluno: 'Rafael Torres',
    curso: '2º TI',
    rm: '22410',
    telefone: '(11) 93456-7890',
    servico: 'Reconsideração de Nota',
    status: 'Concluído',
    data: '2026-10-23',
    observacao: 'Revisão de nota da prova de Algoritmos.',
    requerResponsavel: false
  },
  {
    id: '4',
    horario: '13:30',
    aluno: 'Juliana Costa',
    curso: '3º ADM',
    rm: '21534',
    telefone: '(11) 95432-1098',
    servico: 'Reunião com a Secretaria',
    status: 'Agendado',
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
    status: 'Agendado',
    data: '2026-10-23',
    observacao: 'Retirada da 2ª via de histórico de conclusão.',
    requerResponsavel: false
  },
  {
    id: '6',
    horario: '15:30',
    aluno: 'Laura Ferreira',
    curso: '3º TI',
    rm: '21201',
    telefone: '(11) 95321-2324',
    servico: 'Histórico e Certificado',
    status: 'Agendado',
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
    detalhe: 'Dia inteiro — Feriado – Nossa Senhora Aparecida',
    diaInteiro: true,
    motivo: 'Feriado – Nossa Senhora Aparecida'
  },
  {
    id: 'block-2',
    titulo: 'Terça-feira, 29 de setembro de 2026',
    data: '2026-09-29',
    detalhe: '13:30 às 16:30 — Reunião de planejamento pedagógico',
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
  status: 'Agendado',
  local: 'Secretaria Acadêmica',
  documentosNecessarios: 'Documento original com foto (RG ou CNH)',
  protocolo: 'AG-2026-1023-884',
  duration: 'cerca de 15 min',
  requerResponsavel: false
};

export const INITIAL_STUDENT_PROFILE = {
  nome: 'Laura Ferreira',
  rm: '21201',
  turma: '3º TI',
  periodo: 'Manhã',
  curso: 'Informática para Internet',
  situacaoMatricula: 'Ativo',
  anoIngresso: '2025',
  cin: '456.789.012-34',
  dataNascimento: '2008-05-14',
  emailInstitucional: 'laura.ferreira@etec.sp.gov.br',
  email: 'laura.ferreira@gmail.com',
  telefone: '(11) 95321-2324',
  nomeResponsavel: 'Vitoria Mendes',
  parentescoResponsavel: 'Mãe',
  cinResponsavel: '123.456.789-00',
  telefoneResponsavel: '(11) 98765-4321',
  atendimentoTerreo: false,
  suporteLibras: false,
  notificarWhatsApp: true
};

export const INITIAL_GUARDIAN_PROFILE = {
  nome: 'Vitoria Mendes',
  parentesco: 'Mãe',
  cin: '123.456.789-00',
  email: 'vitoria.mendes@email.com',
  telefone: '(11) 98765-4321',
  alunoVinculado: {
    nome: 'Laura Ferreira',
    rm: '21201',
    curso: 'Informática para Internet',
    turma: '3º TI',
    periodo: 'Manhã',
    cin: '456.789.012-34',
    nomeResponsavel: 'Vitoria Mendes'
  }
};

export const INITIAL_SETTINGS = {
  localAtendimento: 'Secretaria Acadêmica',
  toleranciaAtrasoMinutos: 10,
  intervaloAtendimentoMinutos: 15,
  diasAntecedenciaMaxima: 30,
  modeloMensagemWhatsApp: 'Olá, {aluno}! A Secretaria Acadêmica da Etec Antônio Furlan informa sobre seu atendimento de "{servico}": seu horário é às {horario} ({tempoRestante}). Por favor, compareça à Secretaria munido de documento oficial com foto e CIN. RM: {rm}',
  exigirDocumentoComFoto: true
};
