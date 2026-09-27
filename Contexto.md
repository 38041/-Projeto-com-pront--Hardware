# Contexto do Projeto

## Objetivo
Mini sistema para gerenciamento e listagem de hardwares/aparelhos com campos Hardware, Marca, Modelo, Preço e Foto.

## Tecnologias
### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- CORS

### Frontend
- HTML
- CSS
- JavaScript puro

### Hospedagem planejada
- Vercel para backend e frontend em deployments separados.

## Estrutura atual
O projeto possui `backend/`, `frontend/`, `Roadmap.md`, `Contexto.md`, `api.md`, `README.md` e `.gitignore`.

## Funcionalidades concluídas
- Model `Hardware` com validações e timestamps.
- CRUD REST completo em `/api/hardwares`.
- Tratamento de ID inválido, registros não encontrados e dados inválidos.
- CORS configurável por `FRONTEND_URL`.
- Frontend responsivo com cards dinâmicos.
- Formatação de preço em Real Brasileiro.
- Estados de carregamento, vazio e erro.
- Script de seed com 3 registros de exemplo.
- Testes automatizados preparados com `mongodb-memory-server` e `supertest`.
- Validação de sintaxe JavaScript executada com `node --check` sem erros.

## Funcionalidades pendentes
Dependem de serviços externos e credenciais do usuário:
- MongoDB Atlas real.
- `MONGODB_URI` real.
- GitHub.
- Deploy do backend na Vercel.
- URL real do backend no frontend.
- Deploy do frontend na Vercel.
- Teste da aplicação em produção.

## Decisões técnicas
- O frontend não contém produtos escritos manualmente; os cards são gerados a partir da API.
- A foto é armazenada como URL.
- O backend usa cache de conexão Mongoose para funcionar melhor em ambiente serverless.
- As credenciais ficam fora do código, via variáveis de ambiente.

## Problemas encontrados
Nenhuma credencial ou serviço externo foi fornecido nesta etapa, portanto o deploy real e a conexão com banco de produção não foram executados.

## Última atualização
Projeto de código finalizado e validado sintaticamente. A instalação de dependências (`npm install`) não concluiu dentro do limite do ambiente usado para gerar o pacote, então a suíte `npm test` deve ser executada localmente após instalar as dependências. MongoDB real e deploy continuam pendentes por dependerem das contas do usuário.
