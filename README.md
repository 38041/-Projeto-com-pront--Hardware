# Gerenciador de Hardware

Mini sistema escolar para gerenciamento e listagem de hardwares.

## Funcionalidades
- Cadastro, consulta, atualização e exclusão pela API.
- Campos: Hardware, Marca, Modelo, Preço e Foto.
- Frontend responsivo em HTML, CSS e JavaScript puro.
- Dados carregados via `fetch()`.
- MongoDB com Mongoose.

## Estrutura
```text
gerenciador-hardware/
├── backend/
├── frontend/
├── Roadmap.md
├── Contexto.md
├── api.md
└── README.md
```

## Rodar o backend
1. Entre em `backend/`.
2. Rode `npm install`.
3. Copie `.env.example` para `.env`.
4. Coloque sua string real do MongoDB em `MONGODB_URI`.
5. Rode `npm run dev`.

Servidor local: `http://localhost:3000`.

## Popular o banco
Depois de configurar o `.env`:
```bash
npm run seed
```

## Rodar o frontend
Abra a pasta `frontend/` com uma extensão de servidor local, como Live Server, ou publique-a na Vercel.

Enquanto estiver local, o `script.js` aponta para:
```js
const API_URL = 'http://localhost:3000/api/hardwares';
```

Depois do deploy do backend, troque pela URL real, por exemplo:
```js
const API_URL = 'https://SEU-BACKEND.vercel.app/api/hardwares';
```

## Testes
Na pasta `backend/`:
```bash
npm test
```

Os testes usam um MongoDB em memória, então não precisam mexer no banco de produção.

## Variáveis de ambiente
Nunca envie o arquivo `.env` para o GitHub.

Exemplo:
```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/gerenciador_hardware
PORT=3000
FRONTEND_URL=http://localhost:5500
```

## Deploy
### Backend
- Importe a pasta `backend/` na Vercel.
- Cadastre `MONGODB_URI` em Environment Variables.
- Depois copie a URL real do backend.

### Frontend
- Atualize `API_URL` em `frontend/script.js` com a URL real do backend.
- Importe a pasta `frontend/` na Vercel.

As URLs de produção não foram inventadas nem preenchidas, pois dependem das contas do usuário.
