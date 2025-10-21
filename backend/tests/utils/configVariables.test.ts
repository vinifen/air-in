import { describe, it, expect, beforeEach, vi } from 'vitest'
import { configVariables } from '../../src/utils/configVariables'

describe('ConfigVariables', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('should return default values when environment variables are not defined', () => {
    delete process.env.WEB_URL
    delete process.env.DB_HOST
    delete process.env.DB_USER
    delete process.env.DB_PASSWORD
    delete process.env.DB_NAME
    delete process.env.WEATHER_API_KEY
    delete process.env.BACK_PORT
    delete process.env.JWT_SESSION_KEY
    delete process.env.JWT_REFRESH_KEY
    delete process.env.COOKIE_SECURE

    expect(configVariables.CORS_ORIGIN).toBe('error CORS_ORIGIN')
    expect(configVariables.DB_HOST).toBe('error DB_HOST')
    expect(configVariables.DB_USER).toBe('error DB_USER')
    expect(configVariables.DB_PASSWORD).toBe('error DB_PASSWORD')
    expect(configVariables.DB_NAME).toBe('error DB_NAME')
    expect(configVariables.WEATHER_API_KEY).toBe('error WEATHER_API_KEY')
    expect(configVariables.SERVER_PORT).toBe(0)
    expect(configVariables.JWT_SESSION_KEY).toBe('error JWT_SESSION_KEY')
    expect(configVariables.JWT_REFRESH_KEY).toBe('error JWT_REFRESH_KEY')
  })

  it('should return environment variable values when defined', () => {
    process.env.WEB_URL = 'http://localhost:3000'
    process.env.DB_HOST = 'localhost'
    process.env.DB_USER = 'testuser'
    process.env.DB_PASSWORD = 'testpass'
    process.env.DB_NAME = 'testdb'
    process.env.WEATHER_API_KEY = 'testkey123'
    process.env.BACK_PORT = '3001'
    process.env.JWT_SESSION_KEY = 'sessionkey123'
    process.env.JWT_REFRESH_KEY = 'refreshkey123'

    expect(configVariables.CORS_ORIGIN).toBe('http://localhost:3000')
    expect(configVariables.DB_HOST).toBe('localhost')
    expect(configVariables.DB_USER).toBe('testuser')
    expect(configVariables.DB_PASSWORD).toBe('testpass')
    expect(configVariables.DB_NAME).toBe('testdb')
    expect(configVariables.WEATHER_API_KEY).toBe('testkey123')
    expect(configVariables.SERVER_PORT).toBe(3001)
    expect(configVariables.JWT_SESSION_KEY).toBe('sessionkey123')
    expect(configVariables.JWT_REFRESH_KEY).toBe('refreshkey123')
  })

  it('should configure CORS options correctly', () => {
    process.env.WEB_URL = 'http://localhost:3000'
    
    const corsOptions = configVariables.corsOptions

    expect(corsOptions).toEqual({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    })
  })

  it('should handle COOKIE_SECURE correctly', () => {
    process.env.COOKIE_SECURE = '0'
    expect(configVariables.COOKIE_SECURE).toBe(false)

    process.env.COOKIE_SECURE = '1'
    expect(configVariables.COOKIE_SECURE).toBe(true)

    delete process.env.COOKIE_SECURE
    expect(configVariables.COOKIE_SECURE).toBe(false)
  })

  it('should always return localhost for SERVER_HOSTNAME', () => {
    expect(configVariables.SERVER_HOSTNAME).toBe('localhost')
  })

  it('should convert BACK_PORT to number correctly', () => {
    process.env.BACK_PORT = '8080'
    expect(configVariables.SERVER_PORT).toBe(8080)
    expect(typeof configVariables.SERVER_PORT).toBe('number')
  })
})
