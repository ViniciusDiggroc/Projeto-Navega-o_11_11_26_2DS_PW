# Projeto Navegação - 2DS PW

---

## Informações do Projeto

**Nome do projeto:** Projeto_Navegação_11_11_26_2DS_main

**Integrantes:** 
 - Vinicius Diggroc
 - Rafael Piffer

**Objetivo:** Desenvolver um sistema de cadastro que permita gerenciar categorias, produtos, clientes e fornecedores de um estabelecimento, utilizando operações CRUD e armazenamento de dados em arquivos JSON.

**Tecnologias utilizadas:** Node.js, Express, JavaScript, arquivos JSON, operações CRUD, Chat GPT.

---

## Estrutura de Pastas

```text
Projeto_Navegacao_28_10_26_2DS/
├── css/
│   └── style.css
├── data/
│   ├── fornecedores.json
│   ├── clientes.json
│   ├── produtos.json
│   └── categorias.json
├── imagens/
|   ├── antes 2.png
|   ├── antes 3.png
|   ├── antes 4.png
|   ├── antes.png
|   ├── depois 2.png
|   ├── depois 3.png
|   ├── depois 4.png
|   ├── depois.png
|   ├── image.png
|   ├── imagem (1).png
|   ├── imagem (2).png
|   ├── imagem.png
├── js/
│   └── script.js
├── node_modules/
├── routes/
│   ├── fornecedorRoutes.js
│   ├── clienteRoutes.js
│   ├── categoriaRoutes.js
│   └── produtoRoutes.js
├── utils/
│   └── jsonDatabase.js
├── views/
│   ├── categorias/
│   ├── cliente/
│   ├── fornecedor/
│   ├── partials/
│   ├── produto/
│   └── index.ejs
├── app.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Entidades Utilizadas
O projeto possui 4 entidades utilizadas nele:
 - Categorias: gerenciamento das categorias dos produtos.
 - Produtos: cadastro e gerenciamento dos produtos.
 - Clientes: armazenamento dos dados dos clientes.
 - Fornecedores: gerenciamento dos fornecedores.
---

## Migração para JSON
---
### Armazenamento Anterior
Antes da migração, os dados eram armazenados em arrays diretamente nos arquivos da pasta `routes/`. Os registros ficavam em memória e eram perdidos quando o servidor era reiniciado.
### Processo de Migração
A migração consistiu em substituir os arrays utilizados nas rotas por arquivos JSON, organizados na pasta `data/`.

Foi criado um módulo auxiliar chamado `jsonDatabase.js`, localizado na pasta `utils/`, para centralizar as operações de leitura e escrita dos arquivos.

As rotas foram adaptadas para utilizar os arquivos JSON nas operações CRUD, mantendo as funcionalidades existentes do sistema.

### Arquivos JSON Criados
Foram criados arquivos JSON para armazenar os dados de cada entidade:

- `categorias.json`: armazena as categorias.
- `produtos.json`: armazena os produtos.
- `clientes.json`: armazena os clientes.
- `fornecedores.json`: armazena os fornecedores.

Os arquivos estão organizados dentro da pasta `data/`.

---

## Prompt Utilizado

1º
Objetivo:
Migrar o CRUD desenvolvido em aula, que atualmente utiliza vetores (arrays) dentro dos controllers, para arquivos JSON armazenados em uma pasta chamada "data".

Requisitos:
1. Criar uma pasta chamada:
data/

2. Criar um arquivo JSON para cada entidade do sistema.
Exemplos:
data/produtos.json
data/clientes.json
data/categorias.json

3. Remover os dados fixos existentes nos controllers.

4. Implementar o CRUD utilizando os arquivos JSON:
✅ Create (Cadastrar)
✅ Read (Listar)
✅ Update (Editar)
✅ Delete (Excluir)

Todas as operações devem ler e gravar diretamente nos arquivos JSON.

5. Utilizar uma ferramenta de IA (ChatGPT, Copilot, Gemini ou similar) para auxiliar na implementação.

6. Documentar no README:
- Prompt utilizado;
- Resposta da IA;
- Sugestões recebidas;
- Alterações implementadas;
- Ajustes feitos manualmente.

O README vou fazer no final qualquer duvida me fale o por que e tal malhoria
2º Minhas decisões para a migração: dados: manter. Organização: util. Podemos começar.

---

## Resposta da IA

1º resposta

Analisei o ZIP do seu projeto. Vamos fazer essa migração preservando a estrutura atual, as telas, as rotas e as funcionalidades existentes.

Quero trabalhar com você de maneira organizada: não vou modificar coisas que não fazem parte da atividade sem explicar antes o motivo. Se encontrar uma melhoria, vou apresentar a justificativa.
1. O que encontrei no projeto
Seu sistema utiliza:
- Node.js;
- Express;
- EJS;
- JavaScript;
- Arquivos de rotas separados por entidade.
Uma observação importante: seu projeto não possui uma pasta controllers. Os vetores estão diretamente nos arquivos da pasta routes.

Encontrei quatro entidades:
Entidade	Arquivo atual
Produtos	routes/produtoRoutes.js
Clientes	routes/clienteRoutes.js
Categorias	routes/categoriaRoutes.js
Fornecedores	routes/fornecedorRoutes.js

Atualmente, os dados são armazenados em variáveis como:
let produtos = [
  {
    id: 1,
    nome: "Notebook Gamer",
    preco: 4999.9
  }
];


O problema é que esses dados ficam na memória do Node.js. Quando o servidor reinicia, alterações realizadas durante a execução são perdidas.
2. Como pretendo organizar o projeto
Minha sugestão é criar esta estrutura:
Projeto/
│
├── data/
│   ├── produtos.json
│   ├── clientes.json
│   ├── categorias.json
│   └── fornecedores.json
│
├── routes/
│   ├── produtoRoutes.js
│   ├── clienteRoutes.js
│   ├── categoriaRoutes.js
│   └── fornecedorRoutes.js
│
├── views/
├── css/
├── js/
│
├── app.js
└── package.json


Também sugiro criar um arquivo:
utils/jsonDatabase.js


Ele será responsável por centralizar a leitura e a gravação dos arquivos JSON.

Por exemplo:
- readData(): lê os dados.
- writeData(): grava os dados.
Por que fazer isso?

Porque não precisamos repetir a mesma lógica de leitura e gravação nos quatro arquivos de rotas. Isso deixa o código mais organizado e facilita futuras alterações.

Não precisamos instalar nenhuma biblioteca adicional. O próprio Node.js possui o módulo fs para trabalhar com arquivos.
3. Como funcionará o CRUD
Operação	Funcionamento
Create	Lê o JSON, adiciona o registro e grava novamente.
Read	Lê o JSON e apresenta os registros.
Update	Lê o JSON, modifica o registro e grava novamente.
Delete	Lê o JSON, remove o registro e grava novamente.

Uma melhoria importante será manter a geração automática dos IDs, mesmo depois de excluir registros.

Também vamos tratar arquivos inexistentes ou vazios para evitar que o sistema apresente erros desnecessários.
4. Uma decisão antes de começar
Tenho apenas uma dúvida sobre os dados existentes.

Atualmente, seu projeto possui registros de exemplo, como Notebook Gamer, Cliente exemplo e categorias de Informática e Eletrônicos.

Minha recomendação é transferir esses registros para os arquivos JSON, em vez de apagá-los.

5. Como vamos trabalhar
Minha proposta é fazer por etapas:
1. Criar a pasta data e os quatro arquivos JSON.
2. Implementar a ferramenta de leitura e gravação.
3. Migrar o CRUD de categorias.
4. Migrar o CRUD de produtos.
5. Migrar o CRUD de clientes.
6. Migrar o CRUD de fornecedores.
7. Testar todas as operações.
8. Preparar a documentação do README no final.
Vamos testar cada entidade antes de passar para a próxima.

Importante: não vamos alterar o visual, as telas EJS ou a navegação, a menos que encontremos algum problema que realmente exija isso.

Assim, teremos uma migração funcional, organizada e que você conseguirá explicar ao professor.

2ºresposta
Vamos começar pela estrutura e pela migração dos dados.

Analisei os quatro arquivos de rotas. Vamos preservar as validações, os endereços das rotas, as mensagens de sucesso e erro e todas as telas existentes.

Primeira etapa: criar os arquivos JSON e a função centralizada de leitura e gravação. Depois, adaptar as quatro entidades para utilizá-los.

Uma decisão técnica: vou utilizar o módulo fs nativo do Node.js, sem instalar dependências. Isso é suficiente para o tamanho e a finalidade deste projeto.
6. Primeira etapa concluída
Arquivos implementados e verificados
O projeto agora possui:
- data/produtos.json
- data/clientes.json
- data/categorias.json
- data/fornecedores.json
- utils/jsonDatabase.js
As quatro rotas foram adaptadas.

O que mudou na prática:
1. Os vetores fixos foram removidos dos arquivos de rotas.
2. Os registros de exemplo foram transferidos para os respectivos JSON.
3. O cadastro agora lê o arquivo, adiciona o registro e salva.
4. A edição lê, modifica e salva.
5. A exclusão lê, remove e salva.
6. A listagem consulta o arquivo JSON.
Também mantive a geração automática de IDs.
Verificações realizadas
- Sintaxe JavaScript dos arquivos: aprovada.
- Leitura dos quatro arquivos JSON: aprovada.
- Teste de gravação e leitura: aprovado.
- Dados originais restaurados após o teste.
Ainda não considero o CRUD inteiro aprovado: precisamos testar as operações pelas páginas do sistema, utilizando o navegador.

Baixar o projeto atualizado
"A IA mandou o arquivo do projeto aqui"

8. Próximo passo: testar no navegador
1. Extraia o ZIP.
2. Abra a pasta no VS Code.
3. Abra o terminal.
4. Execute npm install caso as dependências ainda não estejam instaladas.
5. Execute:
npm start


6. Acesse http://localhost:3000.

Teste primeiro o cadastro de um produto. Depois, confira se ele apareceu no arquivo data/produtos.json.

Uma observação: os testes que realizei até agora verificam a sintaxe e a persistência dos arquivos, não todas as interações HTTP pelo navegador.

Quero que façamos os testes juntos, começando por produtos. Se aparecer qualquer erro, envie a mensagem ou uma captura de tela antes de alterarmos outros arquivos.

---

## Sugestões Recebidas pela IA
1. Armazenar os dados em arquivos JSON
Substituir os arrays que armazenavam os dados diretamente na memória pelas informações persistidas em arquivos JSON.

Motivo: os dados armazenados em arrays são perdidos quando o servidor reinicia. Com JSON, os registros permanecem salvos.
2. Criar uma pasta data
Organizar os arquivos JSON em uma pasta específica para armazenamento dos dados.

Sugestão de estrutura:
data/
├── produtos.json
├── clientes.json
├── categorias.json
└── fornecedores.json


Motivo: separar os dados da lógica do sistema e facilitar a organização do projeto.
3. Criar um arquivo auxiliar utils/jsonDatabase.js
Centralizar as funções responsáveis pela leitura e gravação dos arquivos JSON.

Motivo: evitar repetição de código nas rotas e facilitar a manutenção do sistema.
4. Utilizar o módulo fs do Node.js
Utilizar o módulo nativo fs para realizar a leitura e gravação dos arquivos JSON.

Motivo: não é necessário instalar dependências adicionais para realizar essas operações.
5. Adaptar todas as operações do CRUD
Modificar as operações existentes para trabalhar diretamente com os arquivos JSON.
Operação	Sugestão
Create	Cadastrar e salvar o registro no JSON.
Read	Ler os registros diretamente do JSON.
Update	Atualizar o registro e salvar as alterações.
Delete	Excluir o registro e atualizar o arquivo.

Motivo: garantir que todas as operações trabalhem com dados persistentes.
6. Preservar os registros de exemplo
Manter os registros que já existiam nos arrays originais e transferi-los para os arquivos JSON.

Motivo: evitar perder informações e manter o sistema funcionando com os dados utilizados anteriormente.
7. Preservar a estrutura original do projeto
Manter as rotas, páginas EJS, mensagens, validações e redirecionamentos existentes.

Motivo: realizar a migração sem modificar desnecessariamente partes do sistema que já funcionavam.
8. Não criar controllers desnecessariamente
Manter a lógica do CRUD nos arquivos da pasta routes, pois o projeto antigo não utilizava controllers.

Motivo: respeitar a estrutura desenvolvida em aula e evitar alterações que não fazem parte do objetivo principal da atividade.
9. Manter a geração automática dos IDs
Preservar a lógica existente de geração automática dos identificadores dos registros.

Motivo: manter o comportamento original do sistema durante a migração.
10. Verificar a leitura e gravação dos arquivos
Realizar verificações para garantir que os arquivos JSON possam ser lidos e atualizados corretamente.

Motivo: identificar problemas de persistência antes de finalizar a atividade.
11. Testar todas as operações do CRUD
Executar o projeto e testar cadastro, listagem, edição e exclusão pelas páginas do sistema.

Motivo: verificar se a migração realmente funciona na aplicação, e não apenas no código.
12. Explicar as alterações e os problemas encontrados
Durante a implementação, explicar o motivo das mudanças, apresentar possíveis problemas e orientar sobre suas soluções.

Motivo: garantir que você compreenda o código desenvolvido e consiga explicar as alterações realizadas.

---

## Uso da Inteligência Artificial
Sim, usamos Inteligência Artificial
---

## Alterações Realizadas
- Substituição dos arrays em memória por arquivos JSON.
- Criação da pasta `data/` para armazenar os dados.
- Criação dos arquivos JSON para cada entidade.
- Implementação do módulo `jsonDatabase.js`.
- Adaptação das rotas para utilizar os arquivos JSON.
- Implementação das operações CRUD com persistência dos dados.
  
---

## Desafios Encontrados
Durante a migração, foi necessário adaptar o armazenamento dos dados sem comprometer as funcionalidades existentes.

Também foi necessário garantir que as operações de cadastro, consulta, edição e exclusão funcionassem corretamente com os arquivos JSON.

---

## Evidências do Uso da IA
A inteligência artificial foi utilizada como ferramenta de apoio durante o desenvolvimento do projeto.

Nesta seção, são apresentadas as evidências da utilização da IA, incluindo os prompts utilizados, as respostas recebidas e as sugestões aproveitadas durante a implementação.

---

## Conclusão
A realização deste projeto permitiu compreender melhor como funciona a migração de dados armazenados em arrays para arquivos JSON, utilizando o Node.js e o Express.

Com o apoio da inteligência artificial, foi possível obter sugestões e orientações para facilitar o processo de desenvolvimento. A atividade contribuiu para aprimorar os conhecimentos sobre operações CRUD, persistência de dados e organização do código.

Além disso, foi possível identificar a importância de manter os dados organizados e garantir que as funcionalidades do sistema continuem funcionando corretamente após as alterações.

---

## Links

**Link da aplicação (Deploy):**

**Link do repositório GitHub:**
---
