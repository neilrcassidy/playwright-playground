import { test, expect } from '@playwright/test';

test.describe('Reqres.in', async() => {
  let URL: string
  let apiKey: string
  let headers: { [key: string]: string }

  test.beforeAll(() => {
    URL = "https://reqres.in"
    apiKey = "reqres-free-v1"
    headers = {"x-api-key": apiKey}
  })

  test('API GET Users', async({request}) => {
    const endpoint = `${URL}/api/users`
    const params = {page: 2}

    const options = {
      failOnStatusCode: true, 
      headers: headers, 
      params: params
    }

    const response = await request.get(endpoint, options)
    expect(response.status()).toBe(200);
  })

  test('API GET User By ID', async({request}) => {
    const userId = 2
    const endpoint = `${URL}/api/users/${userId}`

    const options = {
      failOnStatusCode: true, 
      headers: headers, 
    }

    const response = await request.get(endpoint, options)
    expect(response.status()).toBe(200);

    const responseJson = await response.json()
    expect(responseJson.data.first_name).toBe("Janet")
    expect(responseJson.data.last_name).toBe("Weaver")
  })

  test('API POST User', async({request}) => {
    const endpoint = `${URL}/api/users`
    const options = {
      failOnStatusCode: true,
      headers: headers,
      data: { "name": "Neil", "job": "Tester" }
    }

    const response = await request.post(endpoint, options)
    expect(response.status()).toBe(201)
    
    const text = await response.text()
    expect(text).toContain("Neil")
  })
})
