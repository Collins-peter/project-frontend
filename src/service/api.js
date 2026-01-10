import axios from "axios";


//CREATE AXIOS BASE CONFIGURATION
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials: true
});

//API SERVICE FUNCTION
export const packageService = {
    createPackage: async(packageInfo) => {
        try {
            const response = await api.post("/admin/create-tracker", packageInfo);
            return {
                success: true,
                data: response.data,
                status: response.status
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "An error occurred",
                status: error.response?.status || 500
            }
        }
    },

    trackPackage: async(trackId) => {
        try {
            const response = await api.get(`/admin/track-package/${trackId}`);
            return {
                success: true,
                data: response.data,
                status: response.status
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "error occurred",
                status: error.response?.status || 500
            }
        }
    },

    updateStatus: async(trackingId, status) => {
        try {
            const response = await api.put("/admin/update-status", { trackingId, status });
            return {
                success: true,
                data: response.data,
                status: response.status
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "An error occurred",
                status: error.response?.status || 500
            }
        }
    }
}


export default api;