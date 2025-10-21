import { describe, it, expect } from 'vitest'
import { toHash } from '../../src/utils/toHash'
import bcrypt from 'bcrypt'

describe('toHash', () => {
  it('should generate a valid hash for a string', async () => {
    const password = 'testPassword123'
    const hash = await toHash(password)
    
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
    expect(hash).not.toBe(password)
    expect(hash.length).toBeGreaterThan(0)
  })

  it('should generate different hashes for the same input', async () => {
    const password = 'samePassword'
    const hash1 = await toHash(password)
    const hash2 = await toHash(password)
    
    expect(hash1).not.toBe(hash2)
  })

  it('should generate hash that can be verified with bcrypt', async () => {
    const password = 'verifiablePassword'
    const hash = await toHash(password)
    
    const isValid = await bcrypt.compare(password, hash)
    expect(isValid).toBe(true)
  })

  it('should generate hash with salt rounds 10', async () => {
    const password = 'testPassword'
    const hash = await toHash(password)
    
    // Check if hash starts with $2b$10$ (indicating bcrypt with 10 rounds)
    expect(hash).toMatch(/^\$2b\$10\$/)
  })

  it('should handle empty strings', async () => {
    const emptyString = ''
    const hash = await toHash(emptyString)
    
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })

  it('should handle special strings', async () => {
    const specialString = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    const hash = await toHash(specialString)
    
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
    
    const isValid = await bcrypt.compare(specialString, hash)
    expect(isValid).toBe(true)
  })
})
