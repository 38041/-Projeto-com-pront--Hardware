# API - Gerenciador de Hardware

## Base URL
Local: `http://localhost:3000`

Produção: **PENDENTE DE DEPLOY**

Todas as respostas usam JSON.

## GET /api/hardwares
Lista todos os hardwares.

**Sucesso: 200**
```json
[
  {
    "_id": "...",
    "hardware": "Notebook",
    "marca": "Dell",
    "modelo": "Inspiron 15",
    "preco": 3499.9,
    "foto": "https://...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

## GET /api/hardwares/:id
Busca um hardware por ID.

- `200`: encontrado
- `400`: ID inválido
- `404`: hardware não encontrado

## POST /api/hardwares
Cria um hardware.

**Body:**
```json
{
  "hardware": "Notebook",
  "marca": "Dell",
  "modelo": "Inspiron 15",
  "preco": 3499.9,
  "foto": "https://exemplo.com/notebook.jpg"
}
```

- `201`: criado
- `400`: dados inválidos

## PUT /api/hardwares/:id
Atualiza um hardware. Pode enviar um ou mais campos.

```json
{
  "preco": 3299.9
}
```

- `200`: atualizado
- `400`: ID ou dados inválidos
- `404`: não encontrado

## DELETE /api/hardwares/:id
Remove um hardware.

**Sucesso: 200**
```json
{
  "success": true,
  "message": "Hardware excluído com sucesso."
}
```

## Erros internos
**500**
```json
{
  "success": false,
  "message": "Erro interno do servidor."
}
```

## Teste com cURL
```bash
curl http://localhost:3000/api/hardwares
```

```bash
curl -X POST http://localhost:3000/api/hardwares \
  -H "Content-Type: application/json" \
  -d '{"hardware":"Notebook","marca":"Dell","modelo":"Inspiron 15","preco":3499.9,"foto":"https://exemplo.com/notebook.jpg"}'
```
