# Sistema de Agendamento de Atendimento
## Etec Antônio Furlan — Centro Paula Souza (CPS)

Plataforma web inclusiva e responsiva para gestão inteligente de fluxo e eliminação de filas na Secretaria Acadêmica.

---

### Acesse o Protótipo Navegável e Funcional
[Clique aqui para testar a aplicação online no Vercel](https://agendamento-etec-furlan.vercel.app/)

---

## Demonstração em Vídeo

[![Demonstração do Sistema de Agendamento](https://img.youtube.com/vi/FPAO706Q93Q/maxresdefault.jpg)](https://www.youtube.com/watch?v=FPAO706Q93Q)

---

## 1. Contexto e Justificativa do Projeto

Nas instituições públicas de ensino técnico e médio, como as unidades do Centro Paula Souza (ETECs e FATECs), a Secretaria Acadêmica é o núcleo de relacionamento operacional com os estudantes e suas famílias. É o local onde ocorrem solicitações de declarações escolares, históricos, reconsiderações de notas, passes de transporte escolar, trancamentos e orientações pedagógicas.

O atendimento anteriormente realizado de maneira presencial sem agendamento gerava filas em horários de intervalo e trocas de turno, falta de previsibilidade na documentação exigida e ausência do responsável legal quando este se fazia necessário por lei.

O Sistema de Agendamento de Atendimento foi projetado para substituir as filas físicas por um fluxo digital com horário marcado, garantindo previsibilidade, respeito ao tempo da comunidade escolar e eficiência à gestão pública.

---

## 2. Pilares de Desenvolvimento e Usabilidade

O desenvolvimento do sistema priorizou:

* Centralização na Secretaria Acadêmica como ponto único e padronizado de atendimento, eliminando ruídos de comunicação.
* Redução de campos repetitivos: o estudante tem seus dados cadastrais reaproveitados automaticamente a partir do registro escolar (RM), necessitando apenas escolher serviço, data e horário.
* Clareza nos status: o ciclo de vida do atendimento opera de forma simples e intuitiva (Agendado, Concluído e Cancelado).
* Suporte nativo a modo escuro (Dark Mode) e modo claro em todas as telas, acessível pelo cabeçalho.
* Responsividade e acessibilidade com alvos de toque confortáveis, tipografia nítida e alto contraste.
* Notificações humanizadas: possibilidade de disparo de mensagens pré-formatadas para o WhatsApp do estudante com o cálculo dinâmico do tempo restante para o comparecimento à Secretaria.

---

## 3. Identidade Visual e Padrões de Interface

* Vermelho Institucional CPS: #b91c1c (hover #991b1b) para botões principais, chamadas de ação e destaques de status ativo.
* Tipografia Neutra: família Inter em pesos regulados para alta legibilidade.
* Cores Neutras: tons slate (slate-900 a slate-50) para fundos, bordas e textos em modo claro e escuro.
* Documentação de Identidade: integração do padrão CIN (Carteira de Identidade Nacional).

---

## 4. Perfis de Usuário

* Aluno (Laura Ferreira): acesso via RM e senha, consulta ao catálogo de serviços, marcação de horário, visualização de protocolo e cancelamento quando necessário.
* Responsável (Vitoria Mendes): acesso via e-mail e senha, com dependente vinculado (Laura Ferreira) claramente indicado na interface para serviços que exigem acompanhamento legal.
* Secretaria Acadêmica / Admin (Pietro Rossi): acesso via CIN e senha, visualização da agenda diária, acionamento por WhatsApp com tempo restante dinâmico, atualização de status e configurações de expediente.

---

## 5. Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js (versão 18 ou superior)
* npm

### Passos de instalação
```bash
git clone https://github.com/lauraprocopio/agendamento-etec-furlan.git
cd agendamento-etec-furlan
npm install
npm run dev
```

### Compilação para produção
```bash
npm run build
```

---

© 2026 LV2PL · Todos os direitos reservados
