// Formato padrão de erro da Brasil API
module.exports = {
  type: 'object',
  required: ['message', 'type', 'name'],
  properties: {
    message: { type: 'string' },
    type: { type: 'string' },
    name: { type: 'string' },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        required: ['message', 'service'],
        properties: {
          message: { type: 'string' },
          service: { type: 'string' },
        },
      },
    },
  },
};
