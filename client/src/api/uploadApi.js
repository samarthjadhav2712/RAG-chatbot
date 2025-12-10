// 📁 src/uploadApi.js (or similar utility path)

import axios from 'axios';

const BACKEND_URL = "http://localhost:8000/upload";

/**
 * Executes the file upload to the backend.
 * @param {File} file - The PDF file object.
 * @returns {Promise<object>} - Resolves with { success: true, result: data } or { success: false, error: message }.
 */
export async function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file); // Ensure your backend key is 'file'

    try {
        const response = await axios.post(BACKEND_URL, formData);
        return { success: true, result: response.data };

    } catch (error) {
        console.error("Pipeline Upload Error:", error);
        
        let errorMessage = "An unknown error occurred during upload.";
        if (axios.isAxiosError(error) && error.response) {
            const backendError = error.response.data;
            errorMessage = backendError.detail || backendError.message || `Server Error: ${error.response.status}`;
        } else if (axios.isAxiosError(error) && error.request) {
            errorMessage = "Network Error: Cannot reach the backend server (Is it running?)."
        } else {
            errorMessage = error.message;
        }

        return { success: false, error: errorMessage };
    }
}