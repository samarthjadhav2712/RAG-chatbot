// 📁 src/queryApi.js
import axios from 'axios';

const QUERY_URL = "http://localhost:8000/query";

/**
 * Sends a user query to the backend and fetches the RAG response.
 * @param {string} query - The user's question.
 * @param {string} documentId - The ID of the document (used to query the correct vector index).
 * @returns {Promise<object>} - Resolves with the structured response or an error object.
 */
export async function sendQuery(query, documentId) {
    try {
        // Assuming your backend expects 'query' and 'document_id' in the body.
        const response = await axios.post(QUERY_URL, {
            query: query,
            document_id: documentId, 
        });

        return { success: true, data: response.data };

    } catch (error) {
        console.error("Query API Error:", error);
        
        let errorMessage = "An unknown error occurred while processing the query.";
        if (axios.isAxiosError(error) && error.response) {
            const backendError = error.response.data;
            errorMessage = backendError.detail || backendError.message || `Server Error: ${error.response.status}`;
        } else if (axios.isAxiosError(error) && error.request) {
            errorMessage = "Network Error: Cannot reach the backend server (Check connection or service status).";
        } else {
            errorMessage = error.message;
        }

        return { success: false, error: errorMessage };
    }
}