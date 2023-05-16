export const swagger = {
  swagger: '2.0',
  info: {
    title: 'API for Real Estate APP',
    version: '1.0.0',
    description: 'API for Real Estate APP',
  },
  host: 'localhost:3000',
  basePath: '/api/v1',
  tags: [
    {
      name: 'Estate Api',
      description: 'Endpoints',
    },
  ],
  schemes: ['http', 'https'],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/order-status/': {
      get: {
        description: '',
        parameters: [],
        responses: {},
      },
    },
    '/roles/': {
      get: {
        description: '',
        parameters: [],
        responses: {},
      },
    },
    '/users/signup': {
      post: {
        description: '',
        parameters: [],
        responses: {},
      },
    },
    '/users/login': {
      post: {
        description: '',
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                email: {
                  example: 'any',
                },
                password: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
      },
    },
    '/users/forgotPassword': {
      post: {
        description: '',
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                email: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
      },
    },
    '/users/resetPassword/{token}': {
      post: {
        description: '',
        parameters: [
          {
            name: 'token',
            in: 'path',
            required: true,
            type: 'string',
          },
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                password: {
                  example: 'any',
                },
                passwordConfirm: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
      },
    },
    '/users/updateMyPassword': {
      patch: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                passwordCurrent: {
                  example: 'any',
                },
                password: {
                  example: 'any',
                },
                passwordConfirm: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/users/profile': {
      get: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
      patch: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                password: {
                  example: 'any',
                },
                passwordConfirm: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/users/': {
      get: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/users/{id}': {
      get: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
      delete: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/estate-status/': {
      get: {
        description: '',
        parameters: [],
        responses: {},
      },
    },
    '/estate-types/': {
      get: {
        description: '',
        parameters: [],
        responses: {},
      },
    },
    '/estates/': {
      get: {
        description: 'This route allow you to get all Estate',
        parameters: [],
        responses: {},
      },
      post: {
        tags: [],
        description: 'This route help you create new Estate',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'files',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                coverImg: {
                  type: 'string',
                },
                thumbnail: {
                  type: '[string]',
                },
              },
            },
          },
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                name: {
                  example: 'Da Nang House',
                  type: 'string',
                },
                address: {
                  example: '32 Nguyen Ba Hoc, Binh Thuan, Hai Chau, Da Nang',
                  type: 'string',
                },
                area: {
                  example: '300',
                  type: 'integer',
                },
                neiborHood: {
                  example: 'Dragon bridge',
                  type: 'string',
                },
                type: {
                  example: 'ObjectId',
                  type: 'ObjectId',
                },
                currentStatus: {
                  example: 'ObjectId',
                  type: 'ObjectId',
                },
                price: {
                  example: '100000',
                  type: 'integer',
                },
                bedRoom: {
                  type: 'integer',
                  example: '3',
                },
                bathRoom: {
                  type: 'integer',
                  example: '4',
                },
                description: {
                  type: 'string',
                  example: 'Can von xa lo',
                },
              },
            },
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/estates/{id}': {
      get: {
        description: '',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {},
      },
      delete: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
      patch: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'files',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                coverImg: {
                  type: 'string',
                },
                thumbnail: {
                  type: '[string]',
                },
              },
            },
          },
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                name: {
                  example: 'Da Nang House',
                  type: 'string',
                },
                address: {
                  example: '32 Nguyen Ba Hoc, Binh Thuan, Hai Chau, Da Nang',
                  type: 'string',
                },
                area: {
                  example: '300',
                  type: 'integer',
                },
                neiborHood: {
                  example: 'Dragon bridge',
                  type: 'string',
                },
                type: {
                  example: 'ObjectId',
                  type: 'ObjectId',
                },
                currentStatus: {
                  example: 'ObjectId',
                  type: 'ObjectId',
                },
                price: {
                  example: '100000',
                  type: 'integer',
                },
                bedRoom: {
                  type: 'integer',
                  example: '3',
                },
                bathRoom: {
                  type: 'integer',
                  example: '4',
                },
                description: {
                  type: 'string',
                  example: 'Can von xa lo',
                },
              },
            },
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/comments/': {
      get: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
      post: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                estate: {
                  example: 'any',
                },
                user: {
                  example: 'any',
                },
              },
            },
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
    '/comments/{id}': {
      get: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
      delete: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
      patch: {
        tags: [],
        description: '',
        consumes: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {},
        security: [
          {
            jwt: [],
          },
        ],
      },
    },
  },
};
