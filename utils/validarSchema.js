const { expect } = require('@playwright/test');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });

// Valida o "contrato": campos obrigatórios e tipos definidos no JSON Schema.
function validarSchema(schema, corpo) {
  const valido = ajv.validate(schema, corpo);
  expect(valido, `Contrato inválido: ${ajv.errorsText()}`).toBe(true);
}

module.exports = { validarSchema };
