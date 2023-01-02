import axios from "axios";

export const apiLogin = async (data) => {
    try {
      const response = await axios.post("/api/user/login", data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      // console.log(response)
      return response
    } catch (error) {
      
      return error.response
    }
  }

export const apiSignup = async (data) => {
    try {
      const response = await axios.post("/api/user/signup", data,
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

export const apiRefresh = async () => {
    try {
      const response = await axios.get("/api/user/refresh",
        {
          withCredentials: true
        }
      )
      // console.log(response)
      return response
    } catch (error) {
      
      return error.response
    }
}