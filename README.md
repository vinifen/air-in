# Air-in
#### v-1.1

[Visit Air-in](http://air-in.space/)

Air-in is a website for checking the weather in any city around the world. It was created with the goal of enhancing web software development skills using Angular 18, Node.js with Fastify, MySQL, JWT tokens and Docker.

## Installation:

Make sure you have Docker and Docker Compose installed:
- Docker (v27.5.1 tested): https://docs.docker.com/engine/install/
- Docker Compose (v2.32.4 tested): https://docs.docker.com/compose/install/

### Create an API Key
First, you need to create an API key at: https://openweathermap.org/api


### Clone the Repository:

```bash
git clone https://github.com/vinifen/air-in-docker.git
```

### Create .env:

Create a `.env` file in the project root for general configuration. Follow the model in `.env.example` and change `WEATHER_API_KEY` to your generated key.

### Run the Application in Development Mode:

```bash
sudo docker compose -f docker-compose-dev.yml up -d
```

After installing the application, wait a few seconds for everything to be configured inside the containers.

### Start the Application in Production:

```bash
sudo docker compose -f docker-compose-prod.yml up -d
```

### Delete Containers:

```bash
sudo docker stop db backend frontend web
```

```bash
sudo docker rm db backend frontend web
```
Ignore errors for non-existent containers.

### Delete All Images:

```bash
sudo docker rmi air-in-docker-web air-in-docker-db air-in-docker-backend air-in-docker-frontend node:23-alpine3.20
```
Ignore errors for non-existent images.

## Prototyping: 

[Air-in Figma](https://www.figma.com/design/1M0Uc673vghA5KG11TwvNL/Air-In?node-id=0-1&p=f&t=WkTxNFTg8e0vyGeA-0)