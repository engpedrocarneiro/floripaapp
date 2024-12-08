# Floripa Turismo

Aplicativo de planejamento turístico para Florianópolis, desenvolvido com React + TypeScript.

## 🚀 Funcionalidades

- 🗺️ Mapa interativo com pontos turísticos
- 🌤️ Previsão do tempo em tempo real
- 💬 Chat assistente para recomendações
- 📅 Planejamento de roteiros
- 🔐 Sistema de autenticação

## 🛠️ Tecnologias

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase (Autenticação)
- Mapbox GL
- OpenAI API
- FullCalendar

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- NPM ou Yarn
- Conta no Supabase
- Chaves de API (Mapbox, OpenAI, Weather)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/floripa-turismo.git
cd floripa-turismo
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Preencha o arquivo .env com suas chaves de API.

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## 🌐 Estrutura do Projeto

```
src/
├── components/     # Componentes React
├── pages/         # Páginas da aplicação
├── services/      # Serviços de API
├── styles/        # Estilos CSS
├── types/         # Tipos TypeScript
└── utils/         # Funções utilitárias
```

## 📱 Páginas

- `/` - Landing page
- `/cadastro` - Registro de usuário
- `/login` - Login de usuário
- `/app` - Dashboard principal
- `/planning` - Planejamento de roteiro

## 🔑 Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
VITE_MAPBOX_TOKEN=seu_token_mapbox
VITE_OPENAI_API_KEY=sua_chave_openai
VITE_WEATHER_API_KEY=sua_chave_weather
VITE_OPENAI_MODEL=gpt-4o-mini
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Agradecimentos

- [Supabase](https://supabase.io/)
- [Mapbox](https://www.mapbox.com/)
- [OpenAI](https://openai.com/)
- [FullCalendar](https://fullcalendar.io/)