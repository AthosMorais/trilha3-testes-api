// Responsável: Athos
const { test, expect } = require('@playwright/test');
const { chamar } = require('../../utils/requisicao');
const { validarSchema } = require('../../utils/validarSchema');
const cepSchema = require('../../schemas/cep');
const erroSchema = require('../../schemas/erro');

test.describe('CEP - GET /api/cep/v1/{cep}', () => {
  test('CT01 - CEP válido retorna 200 e respeita o contrato', async ({ request }) => {
    const corpo = await chamar(request, 'GET', '/api/cep/v1/01001000', { status: 200 });

    validarSchema(cepSchema, corpo);
    expect(corpo.state).toBe('SP');
    expect(corpo.city).toBe('São Paulo');
  });

  test('CT02 - CEP válido com hífen também é aceito (borda)', async ({ request }) => {
    const corpo = await chamar(request, 'GET', '/api/cep/v1/01001-000', { status: 200 });

    validarSchema(cepSchema, corpo);
    expect(corpo.cep.replace('-', '')).toBe('01001000');
  });

  test('CT03 - CEP inexistente retorna 404 (achado ID-01)', async ({ request }) => {
    // A API consulta vários provedores antes de responder, por isso o limite é maior.
    const corpo = await chamar(request, 'GET', '/api/cep/v1/00000000', {
      status: 404,
      tempoMaximo: 15000,
    });

    validarSchema(erroSchema, corpo);
    expect(corpo.type).toBe('service_error');
  });

  test('CT04 - CEP com menos de 8 dígitos retorna 400', async ({ request }) => {
    const corpo = await chamar(request, 'GET', '/api/cep/v1/123', { status: 400 });

    validarSchema(erroSchema, corpo);
    expect(corpo.type).toBe('validation_error');
  });

  test('CT05 - CEP com letras retorna 400', async ({ request }) => {
    const corpo = await chamar(request, 'GET', '/api/cep/v1/abc01001000', { status: 400 });

    validarSchema(erroSchema, corpo);
    expect(corpo.type).toBe('validation_error');
  });
});
