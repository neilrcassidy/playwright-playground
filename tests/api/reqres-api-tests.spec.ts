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
      headers: headers, 
      params: params
    }

    const response = await request.get(endpoint, options)
    expect(response.status()).toBe(200);
  })

  test('API GET User By ID', async({request}) => {
    const userId = 1
    const endpoint = `${URL}/api/users/${userId}`
    const options = {
      headers: headers
    }

    const response = await request.get(endpoint, options)
    expect(response.status()).toBe(200);

    const json = await response.json()
    expect(json.data.first_name).toBe("George")
    expect(json.data.last_name).toBe("Bluth")
  })

  test('API GET User By ID -> User Not Found', async({request}) => {
    const userId = 23
    const endpoint = `${URL}/api/users/${userId}`
    const options = {
      failOnStatusCode: false, 
      headers: headers, 
    }

    const response = await request.get(endpoint, options)
    expect(response.status()).toBe(404);

    const responseJson = await response.json()
    console.log(responseJson)
  })

  test('API POST User', async({request}) => {
    const endpoint = `${URL}/api/users`
    const options = {
      headers: headers,
      data: { "name": "Neil", "job": "Tester" }
    }

    const response = await request.post(endpoint, options)
    expect(response.status()).toBe(201)
    
    const json = await response.json()
    expect(json.name).toBe("Neil")
    expect(json.job).toBe("Tester")
  })

  test('API PUT User', async({request}) => {
    const userId = 2
    const endpoint = `${URL}/api/users/${userId}`
    const options = {
      headers: headers,
      data: { "name": "Neil", "job": "Tester" }
    }

    const response = await request.put(endpoint, options)
    expect(response.status()).toBe(200)
    
    const text = await response.text()
    expect(text).toContain("updatedAt")

    const json = await response.json()
    expect(json.name).toBe("Neil")
    expect(json.job).toBe("Tester")
  })

  test('API PATCH User', async({request}) => {
    const userId = 3
    const endpoint = `${URL}/api/users/${userId}`
    const options = {
      headers: headers,
      data: { "name": "Neil" }
    }

    const response = await request.patch(endpoint, options)
    expect(response.status()).toBe(200)
    
    const text = await response.text()
    expect(text).toContain("updatedAt")

    const json = await response.json()
    expect(json.name).toBe("Neil")
  })

  test('API DELETE User', async({request}) => {
    const userId = 3
    const endpoint = `${URL}/api/users/${userId}`
    const options = {
      headers: headers
    }

    const response = await request.delete(endpoint, options)
    expect(response.status()).toBe(204)
  })
})
