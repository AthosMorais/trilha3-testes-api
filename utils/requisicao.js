const { test, expect } = require('@playwright/test');

// Tempo máximo de resposta aceito (em milissegundos).
const TEMPO_MAXIMO_MS = 5000;

/**
 * Faz uma requisição, valida o status code e o tempo de resposta
 * e anexa a resposta ao relatório HTML (serve como evidência).
 * Devolve o corpo da resposta (objeto, quando for JSON).
 */
async function chamar(request, metodo, url, { status, tempoMaximo = TEMPO_MAXIMO_MS, ...opcoes }) {
  const inicio = Date.now();
  const resposta = await request.fetch(url, { method: metodo, ...opcoes });
  const texto = await resposta.text();
  const tempoMs = Date.now() - inicio;

  let corpo = texto;
  try {
    corpo = JSON.parse(texto);
  } catch {
    // A resposta não é JSON (ex.: "Not Found"): mantém como texto.
  }

  await test.info().attach(`${metodo} ${url}`, {
    body: JSON.stringify({ status: resposta.status(), tempoMs, corpo }, null, 2),
    contentType: 'application/json',
  });

  expect(resposta.status(), 'status code').toBe(status);
  expect(tempoMs, 'tempo de resposta em ms').toBeLessThan(tempoMaximo);

  return corpo;
}

module.exports = { chamar };
