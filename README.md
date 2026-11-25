# Trilha 3: Testes de API e Contrato

Projeto prático de Qualidade de Software.

## Integrantes

| Integrante | Responsabilidade | Cenários |
|---|---|---|
| Athos Morais | Configuração do projeto, utilitários e CEP | CT01 a CT05 |
| Erick Ferreira | CNPJ e feriados | CT06 a CT11 |
| Ildersong Guerra | Criação e consulta de reservas | CT12 a CT17 |
| Joao Monteiro | Autenticação, atualização, exclusão e CI | CT18 a CT24 |

## APIs testadas

- Brasil API: https://brasilapi.com.br
- restful-booker: https://restful-booker.herokuapp.com

## Pré-requisitos

- Node.js 20 ou superior
- Git
- Acesso à internet

Não é preciso instalar navegadores: os testes são feitos direto na API.

## Como instalar e rodar

```bash
git clone https://github.com/AthosMorais/trilha3-testes-api.git
cd trilha3-testes-api
npm ci
npm test
```

| Comando | O que faz |
|---|---|
| `npm test` | Roda todos os testes |
| `npm run test:brasil` | Roda só os testes da Brasil API |
| `npm run test:booker` | Roda só os testes do restful-booker |
| `npm run relatorio` | Abre o relatório HTML da última execução |

## O que cada teste valida

1. **Status code** (200, 201, 400, 403, 404 e 500)
2. **Contrato**: campos obrigatórios e tipos, com JSON Schema (Ajv)
3. **Tempo de resposta**: 5 s por padrão; 8 s no CNPJ e 15 s no CEP inexistente, que dependem de serviços externos

Os testes marcados com "achado" confirmam o comportamento **atual** da API, que consideramos
incorreto. Eles passam enquanto o problema existir e falham se a API mudar. Detalhes em [REPORT.md](REPORT.md).

## Estrutura

```
tests/     cenários, separados por API
schemas/   contratos (JSON Schema)
utils/     funções reaproveitadas (requisição, validação, reservas)
```
