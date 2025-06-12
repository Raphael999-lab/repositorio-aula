# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
SpaceEsportsHub
Aplicativo React Native com Expo para gerenciar tarefas de esports e acompanhar partidas usando a API Abios, com tema futurista dark espacial.
Pré-requisitos

Node.js (v18 ou superior)
Expo CLI (npm install -g expo-cli)
App Expo Go (iOS/Android)
Chave da API Abios (https://abiosgaming.com/)
Xcode (iOS) ou Android Studio (Android)

Configuração

Clone o repositório: git clone <seu-repo-url>
Entre no diretório: cd SpaceEsportsHub
Instale dependências:npm install expo@~53.0.0 expo-status-bar@~1.12.1 react@18.3.1 react-native@0.75.4 @react-navigation/native@^6.1.18 @react-navigation/stack@^6.4.1 @react-navigation/bottom-tabs@^6.6.1 react-native-safe-area-context@4.10.5 react-native-screens@~3.31.1 react-native-paper@^5.12.5 @react-native-async-storage/async-storage@^1.24.0 formik@^2.4.5 yup@^1.4.0 react-native-masked-text@^1.13.0 axios@^1.7.7 expo-notifications@~0.28.18 expo-device@~6.0.2 react-native-chart-kit@^6.12.0 react-native-svg@15.7.1 lottie-react-native@~7.0.0 lottie-ios@~3.5.0 react-native-fast-image@^8.6.3 react-native-reanimated@~3.15.4 @babel/core@^7.20.0


Crie um arquivo .env com a chave da API Abios:APIOS_API_KEY=sua_chave_api_aqui


Adicione ativos em assets/:
icon.png (512x512)
splash.png (1242x2436)
space-welcome.gif e space-match.gif (Giphy)
nebula-loading.json (Lottiefiles)


Inicie o app: npm start
Escaneie o QR code com o Expo Go ou use um simulador.

Estrutura de Pastas

assets/: Ícone, splash, GIFs e animações Lottie.
src/: Código-fonte.
components/: Componentes reutilizáveis.
navigation/: Configuração de navegação.
screens/: Telas do app.
services/: Serviços de API, armazenamento, notificações e autenticação.
styles/: Tema e estilos.



Solução de Problemas

Erro de npm: Limpe o cache (npm cache clean --force) ou reinstale o Node.js.
iOS: Execute npx expo doctor. Reinstale dependências: npx expo install react-native-safe-area-context react-native-screens.
API Abios: Substitua dados mock em src/services/api.js com chamadas reais após obter credenciais.

Notas

Teste notificações e GIFs em dispositivo físico.
Entregue via repositório GitHub.

