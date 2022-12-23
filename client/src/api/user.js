import axios from "axios";

export const apiLogin = async (data) => {
    try {
      const response = await axios.post("/api/user/login", data,
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