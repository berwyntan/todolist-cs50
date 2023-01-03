import axios from "axios";

export const apiGetTodos = async (id, accessToken) => {
    try {
      const response = await axios.get(`/api/todo/${id}`,
        {
          headers: { 
              'Authorization': `Bearer ${accessToken}` 
          },
          withCredentials: true
        }
      )
      return response
    } catch (error) {
      return response.error
    }
  }

export const apiUpdateTodo = async (id, data, accessToken) => {
    try {
      const response = await axios.post(`/api/todo/${id}`, data,
        {
          headers: 
            { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
          withCredentials: true
        }
      )
      return response
    } catch (error) {
      return response.error
    }
  }

export const apiGetPrevTodos = async (id, accessToken) => {
    try {
      const response = await axios.get(`/api/todo/done/${id}`, 
      {
        headers: 
          { 
            'Authorization': `Bearer ${accessToken}`
          },
        withCredentials: true
      }
      )
      return response
    } catch (error) {
      return response.error
    }
  }

export const apiDeletePrevTodos = async (id, accessToken) => {
    try {
      const response = await axios.delete(`/api/todo/done/${id}`,
      {
        headers: 
          { 
            'Authorization': `Bearer ${accessToken}`
          },
        withCredentials: true
      }
      )
      return response
    } catch (error) {
      return response.error
    }
  }

export const apiAddTodos = async (data, accessToken) => {
    try {
      const response = await axios.post("/api/todo", data,
        {
            headers: 
            { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },            
            withCredentials: true
        })
        // console.log(response)
      return response
    } catch (error) {
      return response.error
    }
  }