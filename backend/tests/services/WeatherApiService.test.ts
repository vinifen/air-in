import { describe, it, expect, vi, beforeEach } from 'vitest'
import WeatherApiService from '../../src/services/WeatherApiService'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('WeatherApiService', () => {
  let weatherService: WeatherApiService
  const testApiKey = 'test-api-key'

  beforeEach(() => {
    weatherService = new WeatherApiService(testApiKey)
    vi.clearAllMocks()
  })

  describe('request', () => {
    it('should fazer requisições para múltiplas cidades com sucesso', async () => {
      const cities = ['London', 'Paris', 'Tokyo']
      const mockResponses = [
        {
          data: {
            name: 'London',
            main: { temp: 15 },
            weather: [{ description: 'cloudy' }]
          }
        },
        {
          data: {
            name: 'Paris',
            main: { temp: 20 },
            weather: [{ description: 'sunny' }]
          }
        },
        {
          data: {
            name: 'Tokyo',
            main: { temp: 25 },
            weather: [{ description: 'rainy' }]
          }
        }
      ]

      mockedAxios.get
        .mockResolvedValueOnce(mockResponses[0])
        .mockResolvedValueOnce(mockResponses[1])
        .mockResolvedValueOnce(mockResponses[2])

      const result = await weatherService.request(cities)

      expect(result.allValid).toBe(true)
      expect(result.data).toHaveLength(3)
      expect(result.data[0]).toEqual({
        city: 'London',
        content: mockResponses[0].data,
        status: true
      })
      expect(result.data[1]).toEqual({
        city: 'Paris',
        content: mockResponses[1].data,
        status: true
      })
      expect(result.data[2]).toEqual({
        city: 'Tokyo',
        content: mockResponses[2].data,
        status: true
      })

      expect(mockedAxios.get).toHaveBeenCalledTimes(3)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${testApiKey}&units=metric`
      )
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${testApiKey}&units=metric`
      )
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${testApiKey}&units=metric`
      )
    })

    it('should lidar com erro em uma cidade e marcar allValid como false', async () => {
      const cities = ['London', 'InvalidCity', 'Tokyo']
      const mockError = new Error('City not found')
      
      mockedAxios.get
        .mockResolvedValueOnce({
          data: { name: 'London', main: { temp: 15 } }
        })
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce({
          data: { name: 'Tokyo', main: { temp: 25 } }
        })

      const result = await weatherService.request(cities)

      expect(result.allValid).toBe(false)
      expect(result.data).toHaveLength(3)
      expect(result.data[0].status).toBe(true)
      expect(result.data[1].status).toBe(false)
      expect(result.data[1].city).toBe('InvalidCity')
      expect(result.data[1].content.error).toContain('Error fetching weather data for InvalidCity')
      expect(result.data[2].status).toBe(true)
    })

    it('should lidar com erro em todas as cidades', async () => {
      const cities = ['InvalidCity1', 'InvalidCity2']
      const mockError = new Error('Network error')
      
      mockedAxios.get
        .mockRejectedValueOnce(mockError)
        .mockRejectedValueOnce(mockError)

      const result = await weatherService.request(cities)

      expect(result.allValid).toBe(false)
      expect(result.data).toHaveLength(2)
      expect(result.data[0].status).toBe(false)
      expect(result.data[1].status).toBe(false)
      expect(result.data[0].content.error).toContain('Error fetching weather data for InvalidCity1')
      expect(result.data[1].content.error).toContain('Error fetching weather data for InvalidCity2')
    })

    it('should lidar com array vazio de cidades', async () => {
      const cities: string[] = []

      const result = await weatherService.request(cities)

      expect(result.allValid).toBe(true)
      expect(result.data).toHaveLength(0)
      expect(mockedAxios.get).not.toHaveBeenCalled()
    })

    it('should lidar com cidade com nome especial (espaços, acentos)', async () => {
      const cities = ['São Paulo', 'New York', 'São Francisco']
      const mockResponse = {
        data: { name: 'São Paulo', main: { temp: 30 } }
      }

      mockedAxios.get.mockResolvedValue(mockResponse)

      const result = await weatherService.request(cities)

      expect(result.allValid).toBe(true)
      expect(result.data).toHaveLength(3)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=São Paulo&appid=${testApiKey}&units=metric`
      )
    })

    it('should usar a chave da API corretamente', async () => {
      const customApiKey = 'custom-api-key-123'
      const customWeatherService = new WeatherApiService(customApiKey)
      const cities = ['London']

      mockedAxios.get.mockResolvedValue({
        data: { name: 'London', main: { temp: 15 } }
      })

      await customWeatherService.request(cities)

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${customApiKey}&units=metric`
      )
    })

    it('should preservar a ordem das cidades no resultado', async () => {
      const cities = ['Tokyo', 'London', 'Paris']
      const mockResponses = [
        { data: { name: 'Tokyo', main: { temp: 25 } } },
        { data: { name: 'London', main: { temp: 15 } } },
        { data: { name: 'Paris', main: { temp: 20 } } }
      ]

      mockedAxios.get
        .mockResolvedValueOnce(mockResponses[0])
        .mockResolvedValueOnce(mockResponses[1])
        .mockResolvedValueOnce(mockResponses[2])

      const result = await weatherService.request(cities)

      expect(result.data[0].city).toBe('Tokyo')
      expect(result.data[1].city).toBe('London')
      expect(result.data[2].city).toBe('Paris')
    })
  })
})
