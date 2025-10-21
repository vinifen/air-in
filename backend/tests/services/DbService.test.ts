import { describe, it, expect, vi, beforeEach } from 'vitest'
import DbService from '../../src/services/DbService'
import mysql from 'mysql2'

vi.mock('mysql2', () => ({
  default: {
    createPool: vi.fn()
  }
}))

describe('DbService', () => {
  let dbService: DbService
  let mockPool: any
  let mockConnection: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockConnection = {
      query: vi.fn(),
      execute: vi.fn(),
      release: vi.fn()
    }

    mockPool = {
      getConnection: vi.fn()
    }

    vi.mocked(mysql.createPool).mockReturnValue(mockPool)

    dbService = new DbService('localhost', 'user', 'password', 'testdb')
  })

  describe('constructor', () => {
    it('should create pool with correct configurations', () => {
      expect(mysql.createPool).toHaveBeenCalledWith({
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'testdb',
        waitForConnections: true,
        connectionLimit: 20,
        queueLimit: 100
      })
    })
  })

  describe('getQuery', () => {
    it('should execute query successfully', async () => {
      const mockResults = [{ id: 1, name: 'test' }]
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(null, mockConnection)
      })
      mockConnection.query.mockImplementation((sql: string, values: any[], callback: any) => {
        callback(null, mockResults)
      })

      const result = await dbService.getQuery('SELECT * FROM users', [1])

      expect(mockPool.getConnection).toHaveBeenCalled()
      expect(mockConnection.query).toHaveBeenCalledWith(
        'SELECT * FROM users',
        [1],
        expect.any(Function)
      )
      expect(mockConnection.release).toHaveBeenCalled()
      expect(result).toEqual(mockResults)
    })

    it('should handle connection error', async () => {
      const mockError = new Error('Connection failed')
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(mockError, null)
      })

      await expect(dbService.getQuery('SELECT * FROM users')).rejects.toThrow('Connection failed')
    })

    it('should handle query error', async () => {
      const mockError = new Error('Query failed')
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(null, mockConnection)
      })
      mockConnection.query.mockImplementation((sql: string, values: any[], callback: any) => {
        callback(mockError, null)
      })

      await expect(dbService.getQuery('SELECT * FROM users')).rejects.toThrow('Query failed')
      expect(mockConnection.release).toHaveBeenCalled()
    })

    it('should execute query without parameters', async () => {
      const mockResults = [{ id: 1, name: 'test' }]
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(null, mockConnection)
      })
      mockConnection.query.mockImplementation((sql: string, values: any[], callback: any) => {
        callback(null, mockResults)
      })

      const result = await dbService.getQuery('SELECT * FROM users')

      expect(mockConnection.query).toHaveBeenCalledWith(
        'SELECT * FROM users',
        [],
        expect.any(Function)
      )
      expect(result).toEqual(mockResults)
    })
  })

  describe('getExecute', () => {
    it('should execute statement successfully', async () => {
      const mockResults = [{ id: 1, name: 'test' }]
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(null, mockConnection)
      })
      mockConnection.execute.mockImplementation((sql: string, values: any[], callback: any) => {
        callback(null, mockResults)
      })

      const result = await dbService.getExecute('INSERT INTO users (name) VALUES (?)', ['test'])

      expect(mockPool.getConnection).toHaveBeenCalled()
      expect(mockConnection.execute).toHaveBeenCalledWith(
        'INSERT INTO users (name) VALUES (?)',
        ['test'],
        expect.any(Function)
      )
      expect(mockConnection.release).toHaveBeenCalled()
      expect(result).toEqual(mockResults)
    })

    it('should handle connection error', async () => {
      const mockError = new Error('Connection failed')
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(mockError, null)
      })

      await expect(dbService.getExecute('INSERT INTO users (name) VALUES (?)', ['test']))
        .rejects.toThrow('Connection failed')
    })

    it('should handle execute error', async () => {
      const mockError = new Error('Execute failed')
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(null, mockConnection)
      })
      mockConnection.execute.mockImplementation((sql: string, values: any[], callback: any) => {
        callback(mockError, null)
      })

      await expect(dbService.getExecute('INSERT INTO users (name) VALUES (?)', ['test']))
        .rejects.toThrow('Execute failed')
      expect(mockConnection.release).toHaveBeenCalled()
    })

    it('should execute statement without parameters', async () => {
      const mockResults = [{ id: 1, name: 'test' }]
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(null, mockConnection)
      })
      mockConnection.execute.mockImplementation((sql: string, values: any[], callback: any) => {
        callback(null, mockResults)
      })

      const result = await dbService.getExecute('SELECT * FROM users')

      expect(mockConnection.execute).toHaveBeenCalledWith(
        'SELECT * FROM users',
        [],
        expect.any(Function)
      )
      expect(result).toEqual(mockResults)
    })
  })

  describe('getConnection (private method)', () => {
    it('should resolve promise when connection is successful', async () => {
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(null, mockConnection)
      })

      const mockResults = [{ id: 1 }]
      mockConnection.query.mockImplementation((sql: string, values: any[], callback: any) => {
        callback(null, mockResults)
      })

      await dbService.getQuery('SELECT 1')

      expect(mockPool.getConnection).toHaveBeenCalled()
    })

    it('should reject promise when connection fails', async () => {
      const mockError = new Error('Connection failed')
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(mockError, null)
      })

      await expect(dbService.getQuery('SELECT 1')).rejects.toThrow('Connection failed')
    })
  })

  describe('real usage scenarios', () => {
    it('should simulate SELECT operation', async () => {
      const mockResults = [
        { id: 1, username: 'user1', email: 'user1@test.com' },
        { id: 2, username: 'user2', email: 'user2@test.com' }
      ]
      
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(null, mockConnection)
      })
      mockConnection.query.mockImplementation((sql: string, values: any[], callback: any) => {
        callback(null, mockResults)
      })

      const result = await dbService.getQuery('SELECT * FROM users WHERE active = ?', [1])

      expect(result).toEqual(mockResults)
      expect(mockConnection.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE active = ?',
        [1],
        expect.any(Function)
      )
    })

    it('should simulate INSERT operation', async () => {
      const mockResults = { insertId: 123, affectedRows: 1 }
      
      mockPool.getConnection.mockImplementation((callback: any) => {
        callback(null, mockConnection)
      })
      mockConnection.execute.mockImplementation((sql: string, values: any[], callback: any) => {
        callback(null, mockResults)
      })

      const result = await dbService.getExecute(
        'INSERT INTO users (username, email) VALUES (?, ?)',
        ['newuser', 'newuser@test.com']
      )

      expect(result).toEqual(mockResults)
      expect(mockConnection.execute).toHaveBeenCalledWith(
        'INSERT INTO users (username, email) VALUES (?, ?)',
        ['newuser', 'newuser@test.com'],
        expect.any(Function)
      )
    })
  })
})
