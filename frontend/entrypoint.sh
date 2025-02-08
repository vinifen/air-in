#!/bin/sh

# frontend

echo "export const environment = {
  production: true,
  backendURL: '${WEB_BACK_URL}',
};" > /frontend/src/environments/environment.ts

echo "export const environment = {
  production: false,
  backendURL: '${WEB_BACK_URL}',
};" > /frontend/src/environments/environment.development.ts

ng serve --host 0.0.0.0 --disable-host-check