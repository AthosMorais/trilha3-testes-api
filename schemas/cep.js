// Contrato de GET /api/cep/v1/{cep}
module.exports = {
  type: 'object',
  required: ['cep', 'state', 'city', 'neighborhood', 'street', 'service'],
  properties: {
    cep: { type: 'string', pattern: '^[0-9]{5}-?[0-9]{3}$' },
    state: { type: 'string', pattern: '^[A-Z]{2}$' },
    city: { type: 'string' },
    neighborhood: { type: 'string' },
    street: { type: 'string' },
    service: { type: 'string' },
  },
};
