# Relatório de Achados: Trilha 3 (API e Contrato)

### [ID-01] Falha dos provedores de CEP é devolvida como 404
- **Trilha / Tipo:** API / Tratamento de erros
- **Severidade:** Média
- **Referência Técnica:** GET /api/cep/v1/{cep}
- **Responsável:** Athos
- **Passos para Reproduzir:**
  1. Executar `npx playwright test -g CT03` e observar no relatório que a resposta 404 cita erro dos serviços (`service_error`)
  2. Para simular a falha, rodar o código-fonte da BrasilAPI localmente sem acesso aos provedores e consultar `GET /api/cep/v1/00000000`
- **Resultado Esperado:** Diferenciar "CEP não existe" (404) de "serviços de consulta indisponíveis" (503).
- **Resultado Atual:** Todo erro do tipo `service_error` vira 404. Em execução local sem acesso aos provedores, a API respondeu 404 mesmo com falha de conexão, o que faz o cliente concluir que o CEP não existe.
- **Evidência:** print do relatório HTML em `evidencias/id-01.png` (cenário CT03). Resposta obtida executando o código-fonte da API localmente:

```
HTTP 404
{"message":"Todos os serviços de CEP retornaram erro.","type":"service_error","name":"CepPromiseError",
 "errors":[{"service":"correios","message":"Erro ao se conectar com o serviço dos Correios."},
           {"service":"viacep","message":"Erro ao se conectar com o serviço ViaCEP."}, ...]}
```
