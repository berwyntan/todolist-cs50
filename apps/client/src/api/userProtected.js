import axios from "axios";

export const apiLogout = async (accessToken) => {
    try {
      const response = await axios.get("/api/userprotected/logout",
        {
          headers: { 'Authorization': `Bearer ${accessToken}` },
          withCredentials: true
        }
      )
      return response
    } catch (error) {
      return response.error
    }
  }