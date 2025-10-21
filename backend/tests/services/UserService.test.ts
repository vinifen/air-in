import { describe, it, expect, vi, beforeEach } from 'vitest'
import UserService from '../../src/services/UserService'
import UsersModel from '../../src/model/UsersModel'
import JWTSessionRefreshService from '../../src/services/JWTSessionRefreshService'
import { toHash } from '../../src/utils/toHash'

vi.mock('../../src/model/UsersModel')
vi.mock('../../src/services/JWTSessionRefreshService')
vi.mock('../../src/utils/toHash')

describe('UserService', () => {
  let userService: UserService
  let mockUsersModel: any
  let mockJwtSessionRefreshService: any

  beforeEach(() => {
    vi.clearAllMocks()
    
    mockUsersModel = {
      deleteUserById: vi.fn(),
      selectUserDatabyPublicID: vi.fn(),
      selectUserByUsername: vi.fn(),
      insertUser: vi.fn(),
      selectPasswordByUserID: vi.fn(),
      alterUsername: vi.fn(),
      alterPassword: vi.fn()
    }
    
    mockJwtSessionRefreshService = {
      getSessionTokenPayload: vi.fn()
    }
    
    userService = new UserService(mockUsersModel, mockJwtSessionRefreshService)
  })

  describe('deleteUserData', () => {
    it('should deletar dados do usuário quando autorizado', async () => {
      const mockResult = { status: true, message: 'User deleted successfully' }
      mockUsersModel.deleteUserById.mockResolvedValue(mockResult)

      const result = await userService.deleteUserData(1, true)

      expect(mockUsersModel.deleteUserById).toHaveBeenCalledWith(1, true)
      expect(result).toEqual(mockResult)
    })

    it('should return erro quando não autorizado', async () => {
      const result = await userService.deleteUserData(1, false)

      expect(result).toEqual({
        status: false,
        message: 'Delete user not authorized'
      })
      expect(mockUsersModel.deleteUserById).not.toHaveBeenCalled()
    })
  })

  describe('verifyPublicUserIdData', () => {
    it('should return dados do usuário quando encontrado', async () => {
      const mockUserData = {
        userID: 1,
        username: 'testuser',
        publicUserID: 'pub-123'
      }
      mockUsersModel.selectUserDatabyPublicID.mockResolvedValue(mockUserData)

      const result = await userService.verifyPublicUserIdData('pub-123')

      expect(mockUsersModel.selectUserDatabyPublicID).toHaveBeenCalledWith('pub-123')
      expect(result).toEqual({
        status: true,
        username: 'testuser',
        publicUserID: 'pub-123',
        userID: 1
      })
    })

    it('should return erro quando usuário não encontrado', async () => {
      mockUsersModel.selectUserDatabyPublicID.mockResolvedValue(null)

      const result = await userService.verifyPublicUserIdData('invalid-id')

      expect(result).toEqual({
        status: false,
        message: 'User not found'
      })
    })

    it('should return erro quando userID não existe', async () => {
      mockUsersModel.selectUserDatabyPublicID.mockResolvedValue({
        username: 'testuser',
        publicUserID: 'pub-123'
        // userID ausente
      })

      const result = await userService.verifyPublicUserIdData('pub-123')

      expect(result).toEqual({
        status: false,
        message: 'User not found'
      })
    })
  })

  describe('checkIfUsernameExists', () => {
    it('should return true quando username existe', async () => {
      const mockUser = {
        userID: 1,
        username: 'existinguser',
        publicUserID: 'pub-123'
      }
      mockUsersModel.selectUserByUsername.mockResolvedValue(mockUser)

      const result = await userService.checkIfUsernameExists('existinguser')

      expect(mockUsersModel.selectUserByUsername).toHaveBeenCalledWith('existinguser')
      expect(result).toBe(true)
    })

    it('should return false quando username não existe', async () => {
      mockUsersModel.selectUserByUsername.mockResolvedValue(false)

      const result = await userService.checkIfUsernameExists('nonexistent')

      expect(result).toBe(false)
    })

    it('should return false quando username não coincide', async () => {
      const mockUser = {
        userID: 1,
        username: 'differentuser',
        publicUserID: 'pub-123'
      }
      mockUsersModel.selectUserByUsername.mockResolvedValue(mockUser)

      const result = await userService.checkIfUsernameExists('testuser')

      expect(result).toBe(false)
    })
  })

  describe('addNewUser', () => {
    it('should adicionar novo usuário com sucesso', async () => {
      const mockHash = 'hashed-password-123'
      const mockPublicId = 'pub-123'
      const mockInsertResult = { status: true }
      
      vi.mocked(toHash).mockResolvedValue(mockHash)
      mockUsersModel.insertUser.mockResolvedValue(mockInsertResult)
      
      vi.doMock('uuidv7', () => ({
        uuidv7: () => mockPublicId
      }))

      const result = await userService.addNewUser('newuser', 'password123')

      expect(toHash).toHaveBeenCalledWith('password123')
      expect(mockUsersModel.insertUser).toHaveBeenCalledWith('newuser', mockHash, expect.any(String))
      expect(result).toEqual({ status: true })
    })

    it('should return erro quando insert falha', async () => {
      const mockHash = 'hashed-password-123'
      const mockInsertResult = { 
        status: false, 
        message: 'Username already exists' 
      }
      
      vi.mocked(toHash).mockResolvedValue(mockHash)
      mockUsersModel.insertUser.mockResolvedValue(mockInsertResult)

      const result = await userService.addNewUser('existinguser', 'password123')

      expect(result).toEqual({
        status: false,
        message: 'Username already exists'
      })
    })
  })

  describe('getUserDataByUsername', () => {
    it('should return dados do usuário quando encontrado', async () => {
      const mockUser = {
        userID: 1,
        username: 'testuser',
        publicUserID: 'pub-123'
      }
      mockUsersModel.selectUserByUsername.mockResolvedValue(mockUser)

      const result = await userService.getUserDataByUsername('testuser')

      expect(mockUsersModel.selectUserByUsername).toHaveBeenCalledWith('testuser')
      expect(result).toEqual({
        userID: 1,
        publicUserID: 'pub-123',
        username: 'testuser'
      })
    })

    it('should return null quando usuário não encontrado', async () => {
      mockUsersModel.selectUserByUsername.mockResolvedValue(false)

      const result = await userService.getUserDataByUsername('nonexistent')

      expect(result).toBeNull()
    })
  })

  describe('updateUsername', () => {
    it('should atualizar username', async () => {
      const mockResult = { status: true, message: 'Username updated successfully' }
      mockUsersModel.alterUsername.mockResolvedValue(mockResult)

      const result = await userService.updateUsername('newusername', 1)

      expect(mockUsersModel.alterUsername).toHaveBeenCalledWith(1, 'newusername')
      expect(result).toEqual(mockResult)
    })
  })

  describe('updatePassword', () => {
    it('should atualizar senha', async () => {
      const mockHash = 'new-hashed-password'
      const mockResult = { status: true, message: 'Password updated successfully' }
      
      vi.mocked(toHash).mockResolvedValue(mockHash)
      mockUsersModel.alterPassword.mockResolvedValue(mockResult)

      const result = await userService.updatePassword('newpassword', 1)

      expect(toHash).toHaveBeenCalledWith('newpassword')
      expect(mockUsersModel.alterPassword).toHaveBeenCalledWith(1, mockHash)
      expect(result).toEqual(mockResult)
    })
  })

  describe('getUserDataBySessionToken', () => {
    it('should return dados do usuário quando token é válido', async () => {
      const mockPayload = { publicUserID: 'pub-123' }
      const mockUserData = {
        status: true,
        username: 'testuser',
        publicUserID: 'pub-123',
        userID: 1
      }
      
      mockJwtSessionRefreshService.getSessionTokenPayload.mockReturnValue({
        status: true,
        data: mockPayload
      })
      mockUsersModel.selectUserDatabyPublicID.mockResolvedValue(mockUserData)

      const result = await userService.getUserDataBySessionToken('valid-token')

      expect(mockJwtSessionRefreshService.getSessionTokenPayload).toHaveBeenCalledWith('valid-token')
      expect(mockUsersModel.selectUserDatabyPublicID).toHaveBeenCalledWith('pub-123')
      expect(result).toEqual({
        status: true,
        statusCode: 200,
        data: mockUserData
      })
    })

    it('should return erro quando token é inválido', async () => {
      mockJwtSessionRefreshService.getSessionTokenPayload.mockReturnValue({
        status: false,
        message: 'Invalid token'
      })

      const result = await userService.getUserDataBySessionToken('invalid-token')

      expect(result).toEqual({
        status: false,
        statusCode: 400,
        message: 'Invalid token'
      })
    })

    it('should return erro quando dados do usuário não são encontrados', async () => {
      const mockPayload = { publicUserID: 'pub-123' }
      
      mockJwtSessionRefreshService.getSessionTokenPayload.mockReturnValue({
        status: true,
        data: mockPayload
      })
      mockUsersModel.selectUserDatabyPublicID.mockResolvedValue({
        status: false,
        message: 'User not found'
      })

      const result = await userService.getUserDataBySessionToken('valid-token')

      expect(result).toEqual({
        status: false,
        statusCode: 500,
        message: 'User data not found'
      })
    })
  })

  describe('getHashPassword', () => {
    it('should return hash da senha quando encontrado', async () => {
      const mockPassword = 'hashed-password-123'
      mockUsersModel.selectPasswordByUserID.mockResolvedValue(mockPassword)

      const result = await userService.getHashPassword(1)

      expect(mockUsersModel.selectPasswordByUserID).toHaveBeenCalledWith(1)
      expect(result).toEqual({
        status: true,
        password: mockPassword
      })
    })

    it('should return erro quando senha não encontrada', async () => {
      mockUsersModel.selectPasswordByUserID.mockResolvedValue(null)

      const result = await userService.getHashPassword(999)

      expect(result).toEqual({
        status: false,
        message: 'Password not found'
      })
    })
  })
})
