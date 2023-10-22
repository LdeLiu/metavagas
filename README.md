# Api - MetaVagas

A api tem como finalidade o uso para a busca de vagas de tecnologia, tambem é possivel adicionar vagas, criar um usuario assim como efetuar login. 

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
NodeJs
```

### 🔧 Instalação

Acima da lista de arquivos, clique em < > Código.<br>

<img alt="License" width="300px" src="https://docs.github.com/assets/cb-32892/mw-1440/images/help/repository/code-button.webp"><br>

Copie a URL do repositório.<br>

<img alt="License" width="300px" src="https://docs.github.com/assets/cb-45942/mw-1440/images/help/repository/https-url-clone-cli.webp"><br>

Abra Terminal na pasta que deseja clonar o repositorio

Digite git clone e cole a URL já copiada.
```
git clone https://github.com/LdeLiu/reservaDeHoteis.git
```
Pressione ENTER para criar seu clone local.

### 🔧 Entidades
- User:
    Cadastro, login e auteração de dados de usuario. Tambem permite salvar dados como favorito.
- Job:
    Cria, busca e filtra vagas.
- Technology:
    Cria, verifica e busca tecnologias.
- SearchCounter:
    Cria, busca, e incrementa contadores de busca. Tambem retorna as 5 tecnologias mais perquisadas.
-  City:
    Cria e busca cidades.

## ⚙️ Executando os testes

Para executar os testes unitarios será necessario utilizar a biblioteca Vitest.
para instalar o Vitest utilize:
```
npm install -D vitest OU yarn add -D vitest
```
para iniciar os testes basta utilizar o comando:
```
npm run test
```

## 📦 Implantação

visualize o arquivo [Rota - Teste integração](https://github.com/LdeLiu/metavagas/blob/master/Rotas%20-Teste%20Integra%C3%A7%C3%A3o.json) no insomnia. 

## 🛠️ Construído com

* [NodeJs](https://nodejs.org/pt-br/docs) - O framework
* [Express](https://expressjs.com/pt-br/guide/routing.html) - Para a construção do servidor
* [MongoDB](https://www.mongodb.com/docs/) - O banco de dados
* [Mongoose](https://mongoosejs.com/docs/guide.html) - ODM para mongoDB
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Para criptografar a senha do usuario
* [JWT](https://jwt.io/introduction) - Para gerar o token de autenticação
* [yup](https://www.npmjs.com/package/yup) - Para validar os dados recebidos
* [Insomnia](https://insomnia.rest) - Para os testes de integração e a documentação
* [Vitest](https://vitest.dev) - Para os testes unitarios

---
⌨️ por [Eu](https://github.com/LdeLiu)
