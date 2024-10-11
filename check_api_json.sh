#!/bin/bash

API_JSON_PATH="public/api.json"

# Check if public/api.json exists
if [ ! -f $API_JSON_PATH ]; then
  echo "Error: $API_JSON_PATH does not exist."
  exit 1
fi

# Check the structure of the JSON file
node -e "
const fs = require('fs');
const schema = {
  type: 'object',
  properties: {
    domain: { type: 'string' },
    categories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          category: { type: 'string' },
          apis: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                endpoint: { type: 'string' },
                method: { type: 'string' },
                requiresAuth: { type: 'boolean' },
                params: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      type: { type: 'string' },
                      required: { type: 'boolean' }
                    },
                    required: ['name', 'type', 'required']
                  }
                }
              },
              required: ['name', 'endpoint', 'method', 'requiresAuth']
            }
          }
        },
        required: ['category', 'apis']
      }
    }
  },
  required: ['domain', 'categories']
};

fs.readFile('$API_JSON_PATH', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading $API_JSON_PATH:', err);
    process.exit(1);
  }

  try {
    const jsonData = JSON.parse(data);
    const validate = require('jsonschema').validate;
    const result = validate(jsonData, schema);

    if (result.valid) {
      console.log('$API_JSON_PATH is valid.');
    } else {
      console.error('$API_JSON_PATH is invalid.');
      result.errors.forEach(error => {
        console.error('  ' + error.stack);
      });
      process.exit(1);
    }
  } catch (e) {
    console.error('Error parsing JSON:', e);
    process.exit(1);
  }
});
"
