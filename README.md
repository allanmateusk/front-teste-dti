🎓 Sistema de Controle de Alunos - Front-end
Interface web para controle de alunos, construída utilizando React com TypeScript.

Este projeto permite:

Cadastrar alunos com nome, notas e frequência.

Exibir a média das notas e a frequência de cada aluno.

Destacar alunos que precisam de atenção especial:

Frequência abaixo de 75%;

Média abaixo da média da turma.

🚀 Tecnologias Utilizadas
React

TypeScript

Vite

Axios (requisições HTTP)

📂 Como Rodar o Projeto
1. Clonar o Repositório
bash
Copiar
Editar
git clone git@github.com:allanmateusk/front-teste-dti.git
ou via HTTPS:

bash
Copiar
Editar
git clone https://github.com/allanmateusk/front-teste-dti.git
2. Entrar na pasta do projeto
bash
Copiar
Editar
cd front-teste-dti
3. Instalar as dependências
bash
Copiar
Editar
npm install
ou

bash
Copiar
Editar
yarn install
4. Rodar o projeto
bash
Copiar
Editar
npm run dev
ou

bash
Copiar
Editar
yarn dev
O front-end estará disponível em:

arduino
Copiar
Editar
http://localhost:5173
📡 Configuração de API
O front-end se comunica com o back-end através de chamadas HTTP feitas pelo Axios.

Base URL configurada em /src/services/api.ts:

typescript
Copiar
Editar
const api = axios.create({
  baseURL: "http://localhost:8080",
});
Certifique-se que o back-end esteja rodando em localhost:8080.

🧑‍💻 Funcionalidades do Front-end
Formulário para cadastro de novos alunos.

Cálculo automático da média individual.

Exibição da lista de alunos cadastrados.

Identificação de alunos que:

Têm frequência abaixo de 75%;

Têm média abaixo da média geral da turma.

Estilização com tema escuro e cards para destaque de alunos.

🎨 Layout Visual
Layout adaptado para tema escuro.

Cards destacados:

Atenção por frequência baixa: fundo amarelo claro.

Atenção por média baixa: fundo vermelho claro.

Botões com efeito de hover.

💬 Observações
Projeto desenvolvido apenas para fins de teste técnico.

Caso queira trocar a API base (em produção, por exemplo), basta alterar o arquivo src/services/api.ts.

🧑 Autor
Desenvolvido por [Allan Mateus].

