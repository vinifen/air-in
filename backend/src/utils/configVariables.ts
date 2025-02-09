
class ConfigVariablesClass {

  get corsOptions() {
    return {
      origin: this.CORS_ORIGIN,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true, 
    };
  }
  get CORS_ORIGIN(): string {
    return process.env.WEB_URL || 'error cors_origin';
  }

  
  get DB_HOST(): string {
    return process.env.DB_HOST || 'erro';
  }
  get DB_USER(): string {
    return process.env.DB_USER || 'erro';
  }
  get DB_PASSWORD(): string {
    return process.env.DB_ROOT_PASSWORD || 'erro';
  }
  get DB_NAME(): string {
    return process.env.DB_NAME || 'error';
  }


  get WEATHER_API_KEY(): string {
    return process.env.WEATHER_API_KEY || 'yourApiKey***';
  }


  get SERVER_HOSTNAME(): string {
    return 'localhost';
  }
  get SERVER_PORT(): number {
    return 1111;
  }


  get JWT_SESSION_KEY(): string {
    return process.env.JWT_SESSION_KEY || 'jwtkeysession321';
  }
  get JWT_REFRESH_KEY(): string {
    return process.env.JWT_REFRESH_KEY || 'jwtkeyrefresh123';
  }

  get COOKIE_SECURE(): boolean{
    console.log(process.env.COOKIE_SECURE, "COOKIES SECURE VARIABLE");
    const cookieSecureBinary = process.env.COOKIE_SECURE ? parseInt(process.env.COOKIE_SECURE) : 1;
    if(cookieSecureBinary === 0){
      return false;
    }
    if(cookieSecureBinary === 1){
      return true;
    }
    console.error("Cookie secure not defined, default value: false");
    return false;
  }
}

export const configVariables = new ConfigVariablesClass();