import { describe, it, expect, vi, beforeEach } from 'vitest'
import UsersModel from '../../src/model/UsersModel'

vi.mock('../../src/services/DbService')

describe('UsersModel', () => {
  let usersModel: UsersModel
  let mockDbService: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockDbService = {
      getQuery: vi.fn()
    }
    
    usersModel = new UsersModel(mockDbService as any)
  })

  describe('selectUserById', () => {
    it('should return dados do usuário quando encontrado', async () => {
      const mockUser = {
        id: 1,
        public_id: 'pub-123',
        username: 'testuser'
      }
      mockDbService.getQuery.mockResolvedValue([mockUser])

      const result = await usersModel.selectUserById(1)

      expect(mockDbService.getQuery).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE id = ?',
        [1]
      )
      expect(result).toEqual({
        userID: 1,
        publicUserID: 'pub-123',
        username: 'testuser'
      })
    })

    it('should return null quando usuário não encontrado', async () => {
      mockDbService.getQuery.mockResolvedValue([])

      const result = await usersModel.selectUserById(999)

      expect(result).toBeNull()
    })

    it('should return null quando ocorre erro', async () => {
      mockDbService.getQuery.mockRejectedValue(new Error('Database error'))

      const result = await usersModel.selectUserById(1)

      expect(result).toBeNull()
    })
  })

  describe('selectUserByUsername', () => {
    it('should return dados do usuário quando encontrado', async () => {
      const mockUser = {
        id: 1,
        public_id: 'pub-123',
        username: 'testuser'
      }
      mockDbService.getQuery.mockResolvedValue([mockUser])

      const result = await usersModel.selectUserByUsername('testuser')

      expect(mockDbService.getQuery).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE username = ?',
        ['testuser']
      )
      expect(result).toEqual({
        userID: 1,
        publicUserID: 'pub-123',
        username: 'testuser'
      })
    })

    it('should return false quando usuário não encontrado', async () => {
      mockDbService.getQuery.mockResolvedValue([])

      const result = await usersModel.selectUserByUsername('nonexistent')

      expect(result).toBe(false)
    })
  })

  describe('selectUserDatabyPublicID', () => {
    it('should return dados do usuário quando encontrado', async () => {
      const mockUser = {
        id: 1,
        public_id: 'pub-123',
        username: 'testuser'
      }
      mockDbService.getQuery.mockResolvedValue([mockUser])

      const result = await usersModel.selectUserDatabyPublicID('pub-123')

      expect(mockDbService.getQuery).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE public_id = ?',
        ['pub-123']
      )
      expect(result).toEqual({
        userID: 1,
        username: 'testuser',
        publicUserID: 'pub-123'
      })
    })

    it('should return null quando usuário não encontrado', async () => {
      mockDbService.getQuery.mockResolvedValue([])

      const result = await usersModel.selectUserDatabyPublicID('invalid-id')

      expect(result).toBeNull()
    })
  })

  describe('selectPasswordByUserID', () => {
    it('should return senha do usuário quando encontrado', async () => {
      const mockPassword = 'hashed-password-123'
      mockDbService.getQuery.mockResolvedValue([{ password: mockPassword }])

      const result = await usersModel.selectPasswordByUserID(1)

      expect(mockDbService.getQuery).toHaveBeenCalledWith(
        'SELECT password FROM users WHERE id = ?',
        [1]
      )
      expect(result).toBe(mockPassword)
    })

    it('should return null quando usuário não encontrado', async () => {
      mockDbService.getQuery.mockResolvedValue([])

      const result = await usersModel.selectPasswordByUserID(999)

      expect(result).toBeNull()
    })
  })

  describe('insertUser', () => {
    it('should inserir usuário com sucesso quando username não existe', async () => {
      mockDbService.getQuery
        .mockResolvedValueOnce([]) // selectUserByUsername retorna vazio
        .mockResolvedValueOnce([]) // insert retorna sucesso

      const result = await usersModel.insertUser('newuser', 'hashedpass', 'pub-123')

      expect(mockDbService.getQuery).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE username = ?',
        ['newuser']
      )
      expect(mockDbService.getQuery).toHaveBeenCalledWith(
        'INSERT INTO users(username, password, public_id) VALUES (?,?,?)',
        ['newuser', 'hashedpass', 'pub-123']
      )
      expect(result).toEqual({ username: 'newuser' })
    })

    it('should return erro quando username já existe', async () => {
      const existingUser = {
        id: 1,
        public_id: 'pub-123',
        username: 'existinguser'
      }
      mockDbService.getQuery.mockResolvedValue([existingUser])

      const result = await usersModel.insertUser('existinguser', 'hashedpass', 'pub-456')

      expect(result).toEqual({
        status: false,
        message: 'Username has already been added.'
      })
    })

    it('should return erro quando dados obrigatórios estão faltando', async () => {
      const result = await usersModel.insertUser('', '', '')

      expect(result).toEqual({
        status: false,
        message: 'Username and password are required.'
      })
    })

    it('should return erro quando ocorre exceção', async () => {
      mockDbService.getQuery.mockRejectedValue(new Error('Database error'))

      const result = await usersModel.insertUser('newuser', 'hashedpass', 'pub-123')

      expect(result).toEqual({
        status: false,
        message: 'An error occurred while inserting the user.'
      })
    })
  })

  describe('deleteUserById', () => {
    it('should deletar usuário com sucesso quando autorizado', async () => {
      const existingUser = {
        id: 1,
        public_id: 'pub-123',
        username: 'testuser'
      }
      
      mockDbService.getQuery
        .mockResolvedValueOnce([existingUser]) // selectUserById - usuário existe
        .mockResolvedValueOnce([]) // delete query
        .mockResolvedValueOnce([]) // selectUserById após delete - usuário não existe mais

      const result = await usersModel.deleteUserById(1, true)

      expect(result).toEqual({
        status: true,
        message: 'User with ID: 1 successfully deleted.'
      })
    })

    it('should return erro quando não autorizado', async () => {
      const result = await usersModel.deleteUserById(1, false)

      expect(result).toEqual({
        status: false,
        message: 'Delete user data not authorized'
      })
    })

    it('should return erro quando usuário não existe', async () => {
      mockDbService.getQuery.mockResolvedValue([]) // selectUserById retorna vazio

      const result = await usersModel.deleteUserById(999, true)

      expect(result).toEqual({
        status: false,
        message: 'No user found with ID: 999'
      })
    })

    it('should return erro quando delete falha', async () => {
      const existingUser = {
        id: 1,
        public_id: 'pub-123',
        username: 'testuser'
      }
      
      mockDbService.getQuery
        .mockResolvedValueOnce([existingUser]) // selectUserById - usuário existe
        .mockResolvedValueOnce([]) // delete query
        .mockResolvedValueOnce([existingUser]) // selectUserById após delete - usuário ainda existe

      const result = await usersModel.deleteUserById(1, true)

      expect(result).toEqual({
        status: false,
        message: 'Failed to delete user with ID: 1'
      })
    })

    it('should return erro quando ocorre exceção', async () => {
      mockDbService.getQuery.mockRejectedValue(new Error('Database error'))

      const result = await usersModel.deleteUserById(1, true)

      expect(result).toEqual({
        status: false,
        message: 'No user found with ID: 1'
      })
    })
  })

  describe('alterUsername', () => {
    it('should alterar username com sucesso', async () => {
      const existingUser = {
        id: 1,
        public_id: 'pub-123',
        username: 'olduser'
      }
      const updatedUser = {
        id: 1,
        public_id: 'pub-123',
        username: 'newuser'
      }
      
      mockDbService.getQuery
        .mockResolvedValueOnce([]) // selectUserByUsername - novo username não existe
        .mockResolvedValueOnce([existingUser]) // selectUserById - usuário existe
        .mockResolvedValueOnce([]) // update query
        .mockResolvedValueOnce([updatedUser]) // selectUserById após update

      const result = await usersModel.alterUsername(1, 'newuser')

      expect(result).toEqual({
        status: true,
        message: 'Username updated successfully.'
      })
    })

    it('should return erro quando novo username já existe', async () => {
      const existingUser = {
        id: 2,
        public_id: 'pub-456',
        username: 'existinguser'
      }
      
      mockDbService.getQuery.mockResolvedValue([existingUser]) // selectUserByUsername

      const result = await usersModel.alterUsername(1, 'existinguser')

      expect(result).toEqual({
        status: false,
        message: 'Username is already taken.'
      })
    })

    it('should return erro quando usuário não existe', async () => {
      mockDbService.getQuery
        .mockResolvedValueOnce([]) // selectUserByUsername
        .mockResolvedValueOnce([]) // selectUserById

      const result = await usersModel.alterUsername(999, 'newuser')

      expect(result).toEqual({
        status: false,
        message: 'User with ID: 999 not found.'
      })
    })

    it('should return erro quando update falha', async () => {
      const existingUser = {
        id: 1,
        public_id: 'pub-123',
        username: 'olduser'
      }
      
      mockDbService.getQuery
        .mockResolvedValueOnce([]) // selectUserByUsername
        .mockResolvedValueOnce([existingUser]) // selectUserById
        .mockResolvedValueOnce([]) // update query
        .mockResolvedValueOnce([existingUser]) // selectUserById após update - não mudou

      const result = await usersModel.alterUsername(1, 'newuser')

      expect(result).toEqual({
        status: false,
        message: 'Failed to update username.'
      })
    })

    it('should return erro quando ocorre exceção', async () => {
      mockDbService.getQuery.mockRejectedValue(new Error('Database error'))

      const result = await usersModel.alterUsername(1, 'newuser')

      expect(result).toEqual({
        status: false,
        message: 'An error occurred while updating the username.'
      })
    })
  })

  describe('alterPassword', () => {
    it('should alterar senha com sucesso', async () => {
      mockDbService.getQuery.mockResolvedValue([]) // update query

      const result = await usersModel.alterPassword(1, 'newhashedpassword')

      expect(mockDbService.getQuery).toHaveBeenCalledWith(
        'UPDATE users SET password = ? WHERE id = ?',
        ['newhashedpassword', 1]
      )
      expect(result).toEqual({
        status: true,
        message: 'New password changed successfully'
      })
    })

    it('should return erro quando ocorre exceção', async () => {
      mockDbService.getQuery.mockRejectedValue(new Error('Database error'))

      const result = await usersModel.alterPassword(1, 'newhashedpassword')

      expect(result).toEqual({
        status: false,
        message: 'An error occurred while updating the username.'
      })
    })
  })
})
