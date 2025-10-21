import { describe, it, expect, beforeEach } from 'vitest'
import JWTService from '../../src/services/JWTService'
import jwt from 'jsonwebtoken'

describe('JWTService', () => {
  let jwtService: JWTService
  const testKey = 'test-secret-key'

  beforeEach(() => {
    jwtService = new JWTService(testKey)
  })

  describe('generateToken', () => {
    it('should generate um token válido', () => {
      const payload = { userId: 123, username: 'testuser' }
      const expires = '1h'
      
      const token = jwtService.generateToken(payload, expires)
      
      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3) // JWT tem 3 partes separadas por pontos
    })

    it('should generate tokens diferentes para payloads diferentes', () => {
      const payload1 = { userId: 123 }
      const payload2 = { userId: 456 }
      const expires = '1h'
      
      const token1 = jwtService.generateToken(payload1, expires)
      const token2 = jwtService.generateToken(payload2, expires)
      
      expect(token1).not.toBe(token2)
    })

    it('should generate tokens diferentes para o mesmo payload com tempos diferentes', () => {
      const payload = { userId: 123 }
      
      const token1 = jwtService.generateToken(payload, '1h')
      const token2 = jwtService.generateToken(payload, '2h')
      
      expect(token1).not.toBe(token2)
    })

    it('should generate token com expiração correta', () => {
      const payload = { userId: 123 }
      const expires = '1h'
      
      const token = jwtService.generateToken(payload, expires)
      const decoded = jwt.decode(token) as any
      
      expect(decoded).toBeDefined()
      expect(decoded.userId).toBe(123)
      expect(decoded.exp).toBeDefined()
    })
  })

  describe('verifyTokenValidity', () => {
    it('should return true para token válido', () => {
      const payload = { userId: 123 }
      const token = jwtService.generateToken(payload, '1h')
      
      const isValid = jwtService.verifyTokenValidity(token)
      
      expect(isValid).toBe(true)
    })

    it('should return false para token inválido', () => {
      const invalidToken = 'invalid.token.here'
      
      const isValid = jwtService.verifyTokenValidity(invalidToken)
      
      expect(isValid).toBe(false)
    })

    it('should return false para token com chave diferente', () => {
      const otherJwtService = new JWTService('different-key')
      const payload = { userId: 123 }
      const token = otherJwtService.generateToken(payload, '1h')
      
      const isValid = jwtService.verifyTokenValidity(token)
      
      expect(isValid).toBe(false)
    })

    it('should return false para token expirado', () => {
      const payload = { userId: 123 }
      const token = jwtService.generateToken(payload, '0s') // Expira imediatamente
      
      // Aguarda um pouco para garantir que o token expire
      setTimeout(() => {
        const isValid = jwtService.verifyTokenValidity(token)
        expect(isValid).toBe(false)
      }, 1000)
    })

    it('should return false para string vazia', () => {
      const isValid = jwtService.verifyTokenValidity('')
      
      expect(isValid).toBe(false)
    })
  })

  describe('getTokenPayload', () => {
    it('should return payload para token válido', () => {
      const payload = { userId: 123, username: 'testuser' }
      const token = jwtService.generateToken(payload, '1h')
      
      const result = jwtService.getTokenPayload(token)
      
      expect(result).toBeDefined()
      expect(result?.userId).toBe(123)
      expect(result?.username).toBe('testuser')
    })

    it('should return null para token inválido', () => {
      const invalidToken = 'invalid.token.here'
      
      const result = jwtService.getTokenPayload(invalidToken)
      
      expect(result).toBeNull()
    })

    it('should return null para token com chave diferente', () => {
      const otherJwtService = new JWTService('different-key')
      const payload = { userId: 123 }
      const token = otherJwtService.generateToken(payload, '1h')
      
      const result = jwtService.getTokenPayload(token)
      
      expect(result).toBeNull()
    })

    it('should return null para string vazia', () => {
      const result = jwtService.getTokenPayload('')
      
      expect(result).toBeNull()
    })

    it('should return payload correto para token expirado', () => {
      const payload = { userId: 123, username: 'testuser' }
      const token = jwtService.generateToken(payload, '0s')
      
      // Para token expirado, getTokenPayload should return null
      const result = jwtService.getTokenPayload(token)
      
      expect(result).toBeNull()
    })
  })

  describe('integração entre métodos', () => {
    it('should gerar, verificar e extrair payload do mesmo token', () => {
      const originalPayload = { userId: 123, username: 'testuser', role: 'admin' }
      const token = jwtService.generateToken(originalPayload, '1h')
      
      // Verifica se o token é válido
      const isValid = jwtService.verifyTokenValidity(token)
      expect(isValid).toBe(true)
      
      // Extrai o payload
      const extractedPayload = jwtService.getTokenPayload(token)
      expect(extractedPayload).toBeDefined()
      expect(extractedPayload?.userId).toBe(originalPayload.userId)
      expect(extractedPayload?.username).toBe(originalPayload.username)
      expect(extractedPayload?.role).toBe(originalPayload.role)
    })
  })
})
