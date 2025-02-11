
# Air-in Backend
#### v-1.1

Air-in é um aplicativo desenvolvido por Vinicius FN, para pesquisa do clima em qualquer cidade do mundo. Foi criado com o objetivo de aprimorar habilidades no desenvolvimento de software web.

Esse repositório é um dos três criados para o desenvolvimento do projeto, sendo os outros dois:
- frontend: https://github.com/vinifen/air-in
- backend: https://github.com/vinifen/air-in-backend


## Instalação:

Certifique-se de ter docker e docker compose instalado:
- docker (v27.5.1 testado): https://docs.docker.com/engine/install/
- docker compose (v2.32.4 testado): https://docs.docker.com/compose/install/

### Criar chave API 
Primeiramente é necessário criar uma chave API em: https://openweathermap.org/api


### Clonar repositório:

```bash
  git clone https://github.com/vinifen/air-in-docker.git
```

### Criar .env

Criar na raíz do projeto o arquivo `.env` para a configuração geral.
Siga o modelo abaixo e altere WEATHER_API_KEY para sua chave gerada.
(As configurações padrões funcionam com o banco de dados)

Siga .env.exemple


### Rodar aplicação em modo de desenvolvimento:

```bash
  sudo docker compose -f docker-compose-dev.yml up -d
```

### Iniciar aplicação em produção:

```bash
  sudo docker compose -f docker-compose-prod.yml up -d
```




