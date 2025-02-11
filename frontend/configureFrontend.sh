#!/bin/sh

# frontend
[ -d node_modules ] && rm -rf node_modules || echo 'frontend node_modules does not exist ';
npm install -g @angular/cli  
npm install

echo "export const environment = {
  production: true,
  backendURL: '${WEB_BACK_URL}',
};" > /frontend/src/environments/environment.ts

echo "export const environment = {
  production: false,
  backendURL: '${WEB_BACK_URL}',
};" > /frontend/src/environments/environment.development.ts
