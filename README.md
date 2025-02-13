# Air-in Frontend
#### v-1.1

http://air-in.space/

Air-in é um aplicativo desenvolvido por Vinicius FN utilizando Angular 18, para pesquisa do clima em qualquer cidade do mundo. Foi criado com o objetivo de aprimorar habilidades no desenvolvimento de software web.

Esse repositório é um dos três criados para o desenvolvimento do projeto, sendo os outros dois:
- backend: https://github.com/vinifen/air-in-backend
- docker: https://github.com/vinifen/air-in-docker

Figma: https://www.figma.com/design/1M0Uc673vghA5KG11TwvNL/Air-In?node-id=0-1&p=f&t=8wNScQ6AMVmF58tF-0

Video: https://www.youtube.com/watch?v=clhH-om0xYE&ab_channel=ViniciusFerreiraNovacoski

## Instalação:

Para uma instalação completa e simplificada, recomenda-se utilizar a versão Docker e seguir as instruções do repositório correspondente.

Se preferir instalar cada parte separadamente, comece pelo backend seguindo as instruções de instalação do repositório.

Certifique-se de ter os seguintes itens instalados: 
- git:  `sudo apt install git-all`
- node.js: `sudo apt install nodejs` 
- npm: `sudo apt install npm` 
- angular: `npm install -g @angular/cli`

### Clonar repositório:

```bash
git clone https://github.com/vinifen/air-in.git
```

### Instalar dependências:

```bash
npm install
```

### Rodar aplicação:


```bash
ng serve
```

### Fazer Build:

Caso deseje fazer build do projeto utilize o comando abaixo:

```bash
ng build
```

## CHECKLIST: 

### RA1 - Prototipar e projetar interfaces gráficas de usuário, considerando princípios de usabilidade e experiência do usuário.

- ✅ ID1: O aluno desenvolveu protótipos de interfaces que demonstram compreensão das diretrizes de usabilidade.
- ✅ ID2: O aluno projetou interfaces responsivas que se adaptam a diferentes tamanhos de tela.

### RA2 - Criar e reutilizar componentes em frameworks frontend, desenvolvendo interfaces modulares, responsivas e estilizadas.

- ✅ ID3: O aluno desenvolveu componentes reutilizáveis que são aplicáveis em diferentes contextos da aplicação, garantindo que se adaptem de maneira responsiva em vários tamanhos de tela.
- ✅ ID4: O aluno incorporou componentes de frameworks CSS para aprimorar a aparência e funcionalidade da aplicação de maneira consistente.
- ✅ ID5: O aluno aplicou diretivas estruturais para renderizar elementos de forma condicional, permitindo a exibição ou ocultação de conteúdo com base em condições dinâmicas.
- ✅ ID6: O aluno utilizou diretivas estruturais para repetir elementos de interface de maneira dinâmica, a fim de criar listas, galerias ou outras visualizações baseadas em conjuntos de dados.
- ✅ ID7: O aluno aplicou Pipes de maneira eficaz para formatar a apresentação de dados, garantindo que as informações exibidas sejam legíveis, esteticamente agradáveis e atendam aos requisitos de apresentação específicos para cada contexto.

### RA3 - Sincronizar dados entre a interface gráfica e o modelo de dados, aplicando técnicas de binding para manter a consistência.

- ✅ ID8: O aluno demonstrou a compreensão e a aplicação de técnicas de one-way data binding, como Interpolation e Property Binding, para exibir e atualizar dados na interface gráfica de maneira unidirecional.
- ✅ ID9: O aluno demonstrou a aplicação de técnicas de event binding para capturar eventos do usuário na interface e interagir com o modelo de dados, mantendo a consistência e a sincronização entre os dois.
- ✅ ID10: O aluno implementou a técnica de two-way data binding para criar uma sincronização bidirecional automática entre a interface e o modelo de dados, permitindo uma atualização eficiente dos dados em ambos os lados.
- ✅ ID11: O aluno fez uso eficaz de variáveis de template para manipulação dinâmica dos dados na interface gráfica, demonstrando a capacidade de exibir informações de maneira flexível e adaptável.

### RA4 - Implementar comunicação eficaz entre componentes, utilizando padrões de comunicação e serviços para compartilhar lógica e dados.

- ✅ ID12: O aluno criou comunicação entre componentes não relacionados hierarquivamente por meio de serviços através do mecanismo de injeção de dependência, compartilhando lógica ou informações.
- ✅ ID13: O aluno utilizou efetivamente as diretivas @Input e @Output para estabelecer uma comunicanção em uma hierarquia de componentes, passando e recebendo dados entre componentes de maneira segura e consistente.

### RA5 - Criar interfaces de navegação intuitivas e responsivas, implementando roteamento em aplicações de página única (SPA).

- ✅ ID14: O aluno configurou rotas para diferentes partes da aplicação, permitindo a navegação entre páginas distintas.
- ✅ ID15: O aluno demonstrou a habilidade de passar dados entre componentes que representam diferentes telas usando parâmetros de rotas, garantindo uma troca eficiente de informações.
- ✅ ID16: O aluno criou uma estrutura de navegação aninhada para representar hierarquias de conteúdo.
- ✅ ID17: O aluno aplicou guardas de rotas para controlar o acesso a rotas específicas da aplicação, assegurando que somente usuários autorizados possam acessar determinadas partes da interface.

### RA6 - Realizar requisições assíncronas para serviços web, compreendendo os protocolos e formatos de troca de dados, tratando respostas e erros.

- ✅ ID18: O aluno fez requisições assíncronas a uma API pública, compreendendo os protocolos HTTP e formatos de dados para no mínimo a operação GET.
- ✅ ID19: O aluno fez requisições assíncronas a uma API simulada/fake, compreendendo os protocolos HTTP e formatos de dados para as operações GET, POST, PUT, PATCH e DELETE.
- ✅ ID20: O aluno tratou respostas de sucesso e erros das requisições assíncronas de forma apropriada.
- ✅ ID21: O aluno aplicou validações de entrada nos campos do formulário, utilizando técnicas como expressões regulares (REGEX), e apresentou mensagens de erro claras e informativas para auxiliar os usuários a corrigir entradas incorretas.
- ✅ ID22: O aluno desabilitou adequadamente o botão de submit enquanto o formulário continha campos inválidos, promovendo uma experiência de usuário mais intuitiva e evitando a submissão de dados incorretos.
- ✅ ID23: O aluno demonstrou a capacidade de utilizar Promises para tratar respostas assíncronas.
- ✅ ID24: O aluno demonstrou a capacidade de utilizar Observables para tratar respostas assíncronas.
  
### RA7 - Gerenciar o código-fonte de maneira eficiente, implementar boas práticas de controle de versão e colaborar em projetos de desenvolvimento.

- ✅ ID25: O aluno criou um repositório no GitHub utilizando a estrutura do Gitflow, estabelecendo as branches "main" e "develop", demonstrando proficiência em boas práticas de controle de versão e organização do projeto.
- ✅ ID26: O aluno colaborou de maneira efetiva com outros membros do projeto, realizando fusões (merges) e resolução de conflitos de código de forma adequada e alinhada às práticas de desenvolvimento colaborativo.
- ✅ ID27: O aluno planejou, configurou e executou o processo de build da aplicação, preparando-a para produção e realizou o deploy em um ambiente de hospedagem, tornando-a prontamente acessível para uso.




