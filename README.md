# 📱 App de Cadastro de Produtos (Em campo)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React Native](https://img.shields.io/badge/React_Native-v0.7x-61DAFB?logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-v5x-000020?logo=expo&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-v10.x-FFCA28?logo=firebase&logoColor=black)
![Build Status](https://img.shields.io/badge/EAS_Build-passing-brightgreen?logo=expo&logoColor=white)

Um aplicativo mobile moderno para gerenciamento de estoque e produtos, desenvolvido com **React Native** e **Expo**, utilizando o **Firebase** como infraestrutura de backend e banco de dados em tempo real.


## 🚀 Funcionalidades

* **Autenticação Completa:** Cadastro e Login de usuários via Firebase Auth.
* **CRUD de Produtos:** Criar, Ler, Atualizar e Deletar produtos.
* **Sincronização em Tempo Real:** Dados atualizados instantaneamente com Cloud Firestore.
* **Segurança:** Regras de proteção de dados por usuário (cada usuário só vê seus próprios produtos).
* **UX Aprimorada:** Toggle de visibilidade de senha (olhinho) e tratamento de cores para Light/Dark mode.
* **Atualizações OTA:** Atualizações via Expo Updates (sem necessidade de baixar novo APK).

## 🛠 Tecnologias Utilizadas

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [Firebase (Auth & Firestore)](https://firebase.google.com/)
* [React Navigation](https://reactnavigation.org/)
* [Lucide React Native / Ionicons](https://icons.expo.fyi/)

## 📦 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

2. **Instale as dependências:**

    ```Bash

    npm install

3. **Configure o Firebase: Crie um arquivo src/config/firebaseConfig.js e adicione suas credenciais:**

    ```Bash
        export const firebaseConfig = {
        apiKey: "SUA_API_KEY",
        authDomain: "SEU_AUTH_DOMAIN",
        projectId: "SEU_PROJECT_ID",
        storageBucket: "SEU_STORAGE_BUCKET",
        messagingSenderId: "SEU_SENDER_ID",
        appId: "SEU_APP_ID"
    };

4. **Inicie o servidor de desenvolvimento:**
    ```Bash
    npx expo start

# 📱 Build e Distribuição
Este projeto utiliza o EAS Build para geração de APKs. Para gerar uma nova versão de teste:
    ```Bash
    eas build -p android --profile preview

Para atualizações rápidas de código (OTA):
    ```Bash
    eas update --branch preview --message "Descrição da mudança"

Desenvolvido por [Werbeth Martins Sousa] - 2026 🚀
    * Desenvovimento: Curso de React Native na Proway
    * Professor: Vilso Mouro
    * Data: Janeiro de 2026 

🧠 Aprendizados e Desafios Superados
Tive muitos desafios na criação do projeto, com configuração de ambiente e integração de serviços, mas que me trouxeram grandes aprendizagens:
    * Migração de SDK (Nativo vs. Web): Inicialmente, o projeto utilizava o @react-native-firebase, que exige configurações nativas profundas. Para manter a compatibilidade e agilidade com o Expo Go, migrei com sucesso para o Firebase JS SDK, ajustando a lógica de autenticação e banco de dados.

    * Gestão de Build Mobile: Aprendi a utilizar o EAS (Expo Application Services) para configurar e gerar arquivos APK diretamente na nuvem, superando erros de UUID e configuração de pacotes.

    * Atualizações OTA (Over-the-Air): Implementei o Expo Updates, permitindo que melhorias de interface e lógica cheguem aos utilizadores instantaneamente sem a necessidade de reinstalar o aplicativo.

    * Ambiente Firebase: Aprendi a configurar o Firestore Database do zero, incluindo a definição de regras de segurança para proteger os dados de cada utilizador de forma isolada.

