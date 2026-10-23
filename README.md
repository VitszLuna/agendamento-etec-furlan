# Sistema de Agendamento de Atendimento
## Etec Antônio Furlan — Centro Paula Souza (CPS)

> **Plataforma web inclusiva e acessível para gestão inteligente de fluxo e eliminação de filas na Secretaria Acadêmica e Orientação Pedagógica.**

---

## 📌 1. Contexto e Justificativa do Projeto

Nas instituições públicas de ensino técnico e médio, como as unidades do **Centro Paula Souza (ETECs e FATECs)**, a Secretaria Acadêmica é o coração operacional do relacionamento com os estudantes. É nela que ocorrem solicitações diárias de declarações escolares, históricos, reconsiderações de notas, passes de transporte (EMTU/SPTrans), orientações de estágio e vida acadêmica.

Historicamente, esse atendimento ocorria de maneira presencial e não agendada, gerando os seguintes problemas críticos:
1. **Filas extensas nos intervalos e trocas de turno:** Estudantes perdiam parte de suas aulas ou tempo de descanso esperando por atendimento simples.
2. **Falta de informação prévia sobre documentos:** Muitos alunos aguardavam 30 a 40 minutos em pé apenas para descobrir que faltava um documento obrigatório para completar o pedido.
3. **Ausência de acompanhamento de responsáveis quando exigido:** Processos críticos como cancelamento ou trancamento de matrícula de alunos menores de idade eram interrompidos por falta da presença do responsável legal.
4. **Sobrecarga dos funcionários públicos da Secretaria:** A equipe não conseguia prever o volume de atendimentos de cada dia, sofrendo sobrecarga em períodos sazonais (início/fim de semestre, rematrículas e vestibulinho).

O **Sistema de Agendamento de Atendimento** foi projetado para substituir o modelo de filas físicas por um **fluxo digital com hora marcada**, garantindo previsibilidade, respeito ao tempo do aluno e eficiência à gestão pública.

---

## 📊 2. Embasamento e Pesquisas de Campo

O desenvolvimento deste sistema baseou-se em pesquisas práticas realizadas na comunidade escolar e em conceitos consagrados de **Teoria das Filas** e **Experiência do Usuário (UX)**:

* **Pesquisa com o Corpo Discente:**
  * **83%** dos alunos relataram já ter chegado atrasados em aulas devido à espera na secretaria.
  * **91%** preferem saber com antecedência a documentação exata necessária para seu serviço.
  * **96%** aprovaram a ideia de agendar pelo celular ou computador em menos de 2 minutos.

* **Pesquisa com a Equipe da Secretaria:**
  * Identificou-se que cerca de **60%** dos atendimentos concentravam-se em apenas 4 serviços simples (*Solicitação de Declaração*, *Histórico*, *Reunião* e *Transporte*).
  * A possibilidade de chamar o aluno pelo **WhatsApp** quando o guichê estiver livre evita aglomerações na porta da secretaria e permite que o aluno aguarde no pátio ou na biblioteca.
  * A separação de serviços que exigem obrigatoriamente a presença do responsável legal evita retrabalho e viagens perdidas.

* **Benefícios Práticos Comprovados:**
  * Redução estimada de **85%** no tempo de espera no guichê.
  * Atendimento pontual e humanizado, com separação prévia de prontuários.
  * Transparência com geração de protocolo oficial para acompanhamento.

---

## ♿ 3. Acessibilidade e Design Universal

Este projeto foi construído sob rigorosos critérios de **Acessibilidade Digital (WCAG 2.1)** e **Design Universal**:

* **Tipografia Ampliada (Large Text First):** Títulos, subtítulos, campos de preenchimento e botões possuem tamanhos ampliados (`text-base`, `text-lg`, `text-2xl`, `text-4xl`), beneficiando pessoas com baixa visão, dislexia, vista cansada e idosos.
* **Áreas de Toque e Clique Robustas (Touch Targets):** Todos os botões, links e caixas de seleção possuem altura mínima de 48px a 56px e amplo espaçamento interno (*padding* generoso), facilitando o manuseio em telas sensíveis ao toque (smartphones e tablets) e por usuários com dificuldades motoras.
* **Ícones Grandes:** Cada ação é acompanhada por ícones com tamanho mínimo de 20px a 24px e textos descritivos explícitos, eliminando a dependência exclusiva de cores.
* **Validação Assistiva com Feedback Imediato:** Todos os formulários possuem avisos em vermelho com mensagens amigáveis em português antes do envio, prevenindo erros de digitação.
* **Preferências de Acessibilidade no Perfil:** O aluno pode indicar antecipadamente se necessita de atendimento no piso térreo (mobilidade reduzida) ou de suporte em Libras (Língua Brasileira de Sinais).

---

## 🎨 4. Análise de Cores e Identidade Visual

A paleta de cores foi desenvolvida para honrar a tradição visual do **Centro Paula Souza e do Governo do Estado de São Paulo**, garantindo alto contraste e conforto visual:

| Elemento Visual | Cor Hexadecimal | Função e Significado Psicológico |
| :--- | :--- | :--- |
| **Vermelho Oficial CPS** | `#b91c1c` (Hover: `#991b1b`) | Cor primária institucional, transmite solidez, identidade com a Etec e destaca ações prioritárias (*Call-To-Action*). |
| **Cinza Escuro Slate** | `#0f172a` / `#1e293b` | Tipografia de alto contraste para máxima legibilidade contra fundos claros (WCAG AAA). |
| **Fundo Neutro Suave** | `#f8fafc` | Reduz o cansaço visual em comparação com o branco puro (`#ffffff`), proporcionando sensação limpa e moderna. |
| **Verde WhatsApp** | `#25D366` / `#20ba59` | Destaque tátil imediato para a ação do funcionário de chamar o aluno no guichê por mensagem oficial. |
| **Verde Esmeralda** | `#047857` / `#ecfdf5` | Feedback positivo para status *"Confirmado"* e *"Concluído"*, transmitindo segurança e clareza. |
| **Azul Informativo** | `#1d4ed8` / `#eff6ff` | Caixas de avisos importantes e orientações documentais. |
| **Âmbar / Alerta** | `#b45309` / `#fffbeb` | Alerta de serviços que exigem acompanhamento presencial do Responsável Legal. |

---

## 👥 5. Perfis e Funcionalidades do Sistema

### 🎓 Perfil do Aluno:
1. **Tela Inicial (Início):** Saudação personalizada, card de *"Próximo Atendimento"* com data, hora, guichê e botão de detalhes, grade de *"Serviços Mais Procurados"* e atalhos rápidos.
2. **Catálogo de Serviços Completo:** Mais de 17 serviços oficiais divididos em 4 categorias (*Documentos*, *Matrícula e Vida Acadêmica*, *Atendimentos e Reuniões*, *Outros Serviços*) com busca em tempo real e selo indicativo para serviços que exigem responsável legal.
3. **Detalhes do Serviço:** Exibição da duração estimada, lista de documentos obrigatórios com ícones de verificação e avisos importantes.
4. **Agendamento em Etapas:**
   * *Etapa 1:* Serviço selecionado.
   * *Etapa 2:* Escolha de data com calendário de **Outubro de 2026** e Setembro (feriados e finais de semana bloqueados) e escolha de horário por turnos (Manhã e Tarde).
   * *Etapa 3:* Conferência de dados do aluno (Nome, RM, Turma, Curso, E-mail, Telefone/WhatsApp) e dados do Responsável Legal (Nome, Parentesco, CPF e Telefone) quando o serviço exigir.
   * *Etapa 3.5 (Pré-visualização Grande):* **Cartão de Preview Detalhado** permitindo conferir todos os dados antes do agendamento definitivo, acompanhado do botão amplo *"Confirmar e Realizar Agendamento"*.
   * *Etapa 4:* Comprovante oficial com geração de protocolo único.
5. **Meus Agendamentos:** Abas com contadores dinâmicos (*Próximos* e *Histórico*), cancelamento de atendimento e visualização de comprovante.
6. **Ajuda e FAQ:** 5 dúvidas frequentes em formato sanfona (*accordion*) e canais de contato da escola.
7. **Meu Perfil do Aluno:** Gerenciamento dos dados cadastrais, contato do responsável, situação da matrícula e preferências de acessibilidade.

### 🛡️ Perfil do Administrador / Funcionário da Secretaria:
1. **Agenda Diária com Recurso Inovador "Chamar no WhatsApp":**
   * Botão direto **"Chamar"** com integração à API do WhatsApp: gera mensagem personalizada chamando o aluno nominalmente para comparecer ao guichê.
   * Atualização automática do status para *"Em atendimento"*.
   * 4 Cards de métricas com números em grande formato: *Total agendado*, *Aguardando*, *Concluídos* e *Cancelados*.
   * Filtros por Data, Serviço e Status.
   * Identificação de agendamentos que contam com acompanhamento de responsável legal.
2. **Gestão de Disponibilidade:**
   * Ativação e desativação de atendimento por dia da semana (*Segunda a Sexta*).
   * Adição e remoção de horários de atendimento com validação `HH:MM`.
   * Formulário de **Bloqueio de Períodos e Datas** (feriados, reuniões pedagógicas e conselhos).

---

## 🛠️ 6. Ferramentas e Tecnologias Utilizadas

* **React 18:** Biblioteca componentizada para construção da interface declarativa e reativa.
* **Vite 6:** Ambiente de compilação ultrarrápido para desenvolvimento moderno com Hot Module Replacement (HMR).
* **Tailwind CSS 3:** Framework de utilitários CSS para estilização moderna, responsiva e acessível.
* **Lucide React:** Biblioteca de ícones vetoriais modernos e legíveis.
* **Google Fonts (Inter):** Tipografia sans-serif otimizada para interfaces digitais e legibilidade em todas as resoluções.
* **Logos Oficiais:** `etec.png` e `cps.png` integrados à identidade do Centro Paula Souza.
* **JavaScript Moderno (ES6+):** Controle de estados em memória, validações por Regex e manipulação reativa de arrays sem necessidade de banco de dados externo.
