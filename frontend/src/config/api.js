/**
 * API Configuration
 * Uses environment variable for production, falls back to proxy for development
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export default API_BASE_URL;

