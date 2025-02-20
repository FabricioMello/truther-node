# truther-node

## Description

`truther-node` is a Node.js application built with NestJS. It provides a RESTful API for managing users and cryptocurrencies. The application uses TypeORM for database interactions and bcrypt for password hashing.

## Tecnologias Utilizadas

Para este projeto, escolhi as seguintes tecnologias para garantir escalabilidade, manutenção e segurança:

- **NestJS**: Framework progressivo para Node.js, baseado em TypeScript, que facilita a criação de aplicações modulares e bem estruturadas.
- **TypeORM**: ORM que permite interação eficiente com o banco de dados, oferecendo suporte a múltiplos SGBDs e integração nativa com NestJS.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional utilizado para persistir os dados.
- **Jest**: Framework de testes robusto, utilizado para testes unitários e de integração, proporcionando uma excelente experiência com funcionalidades como mocks, spies e cobertura de código.
- **bcrypt**: Biblioteca para hashing de senhas, garantindo segurança no armazenamento de credenciais dos usuários.
- **Axios**: Biblioteca para realizar chamadas HTTP, utilizada para chamar o endpoint do CoinGecko.
- **Swagger**: Ferramenta para documentação da API, facilitando a visualização e teste dos endpoints disponíveis.

## Table of Contents

- [Installation](#installation)
- [Running the app](#running-the-app)
- [Test](#test)
- [API Endpoints](#api-endpoints)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/FabricioMello/truther-node.git
    cd truther-node
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Running the app

1. Build the application:

    ```bash
    npm run build
    ```

2. Start the application:

    ```bash
    npm start
    ```

3. For development mode with hot-reloading:

    ```bash
    npm run start:dev
    ```

4. Open the Swagger documentation:
 
   ```bash
   The Swagger documentation is available at (http://localhost:3000/api).
   ```

## Database Setup

To set up the database, you need to run Docker. Ensure you have Docker installed and running on your machine. Then, use the following command to start the database container:

```bash
docker-compose up -d
```

## Test

1. Run unit tests:

    ```bash
    npm run test
    ```

2. Run tests in watch mode:

    ```bash
    npm run test:watch
    ```

3. Check code coverage:

    ```bash
    npm run test:cov
    ```

## API Endpoints

### Users

- **GET** `/users` - Get all users
- **POST** `/users` - Create a new user
- **GET** `/users/:id` - Get a user by ID
- **PUT** `/users/:id` - Update a user by ID
- **DELETE** `/users/:id` - Delete a user by ID

### Cryptocurrencies

- **GET** `/cryptos` - Get all cryptocurrencies
- **POST** `/cryptos/fetch` - Fetch and save crypto data
- **GET** `/cryptos/:id` - Get a cryptocurrency by ID
- **GET** `/cryptos/coingecko/:id` - Get all cryptocurrencies by CoinGecko ID