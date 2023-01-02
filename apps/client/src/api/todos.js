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

export const apiUpdateTodo = async (id, data) => {
    try {
      const response = await axios.post(`/api/todo/${id}`, data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      return response
    } catch (error) {
      return response.error
    }
  }

export const apiGetPrevTodos = async (id) => {
    try {
      const response = await axios.get(`/api/todo/done/${id}`)
      return response
    } catch (error) {
      return response.error
    }
  }

export const apiDeletePrevTodos = async (id) => {
    try {
      const response = await axios.delete(`/api/todo/done/${id}`)
      return response
    } catch (error) {
      return response.error
    }
  }

export const apiAddTodos = async (data) => {
    try {
      const response = await axios.post("/api/todo", data,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        // console.log(response)
      return response
    } catch (error) {
      return response.error
    }
  }