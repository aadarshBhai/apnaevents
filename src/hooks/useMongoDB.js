import { useState, useEffect, useCallback } from 'react';
import api from '../api/config';

// Custom hook for fetching data from MongoDB with loading states
export const useMongoDB = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const {
    immediate = true,
    params = {},
    transform = null,
    cache = false,
    cacheKey = null,
  } = options;

  const fetchData = useCallback(async (customParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      if (cache && cacheKey) {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          if (Date.now() - parsed.timestamp < 300000) { // 5 minutes cache
            setData(transform ? transform(parsed.data) : parsed.data);
            setLoading(false);
            return;
          }
        }
      }

      const queryString = new URLSearchParams({ ...params, ...customParams }).toString();
      const url = queryString ? `${endpoint}?${queryString}` : endpoint;

      const response = await api.get(url);
      
      let responseData = response.data;
      if (transform) {
        responseData = transform(responseData);
      }

      setData(responseData);

      // Cache the response
      if (cache && cacheKey) {
        localStorage.setItem(cacheKey, JSON.stringify({
          data: response.data,
          timestamp: Date.now(),
        }));
      }

      // Set pagination if available
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }

    } catch (err) {
      console.error('MongoDB fetch error:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, params, transform, cache, cacheKey]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  const refetch = useCallback((customParams) => {
    return fetchData(customParams);
  }, [fetchData]);

  const mutate = useCallback(async (newData) => {
    setData(newData);
    return newData;
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    refetch,
    mutate,
  };
};

// Hook for paginated data
export const usePaginatedMongoDB = (endpoint, options = {}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const {
    data,
    loading,
    error,
    refetch,
    mutate,
  } = useMongoDB(endpoint, {
    ...options,
    params: {
      ...options.params,
      page: currentPage,
      limit: options.limit || 10,
    },
    transform: (response) => {
      if (response.pagination) {
        setTotalPages(response.pagination.totalPages);
        setTotalItems(response.pagination.totalItems);
      }
      return response.data || response;
    },
  });

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    refetch,
    mutate,
  };
};

// Hook for real-time data with WebSocket/SSE
export const useRealtimeMongoDB = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const {
    immediate = true,
    params = {},
    transform = null,
  } = options;

  useEffect(() => {
    let eventSource;

    const connect = () => {
      try {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        
        // For Server-Sent Events
        eventSource = new EventSource(`${api.defaults.baseURL}/${url}/stream`);

        eventSource.onopen = () => {
          setIsConnected(true);
          setLoading(false);
        };

        eventSource.onmessage = (event) => {
          try {
            const newData = JSON.parse(event.data);
            const transformedData = transform ? transform(newData) : newData;
            setData(transformedData);
          } catch (err) {
            console.error('Error parsing SSE data:', err);
          }
        };

        eventSource.onerror = (err) => {
          console.error('SSE error:', err);
          setIsConnected(false);
          setError('Connection error');
          
          // Reconnect after 5 seconds
          setTimeout(() => {
            connect();
          }, 5000);
        };

      } catch (err) {
        console.error('Failed to connect to SSE:', err);
        setError('Failed to connect');
        setLoading(false);
      }
    };

    if (immediate) {
      connect();
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [endpoint, JSON.stringify(params), transform, immediate]);

  return {
    data,
    loading,
    error,
    isConnected,
  };
};

// Hook for CRUD operations
export const useMongoDBCRUD = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const read = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`${endpoint}/${id}`);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const update = useCallback(async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`${endpoint}/${id}`, data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const remove = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  const list = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${endpoint}?${queryString}` : endpoint;
      const response = await api.get(url);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return {
    create,
    read,
    update,
    remove,
    list,
    loading,
    error,
  };
};

// Hook for search functionality
export const useMongoDBSearch = (endpoint, options = {}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    debounceMs = 300,
    minQueryLength = 2,
    transform = null,
  } = options;

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.length < minQueryLength) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`${endpoint}/search`, {
          params: { q: query }
        });

        const data = transform ? transform(response.data) : response.data;
        setResults(data);

      } catch (err) {
        console.error('Search error:', err);
        setError(err.response?.data?.message || err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, endpoint, debounceMs, minQueryLength, transform]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    clearSearch,
  };
};

export default {
  useMongoDB,
  usePaginatedMongoDB,
  useRealtimeMongoDB,
  useMongoDBCRUD,
  useMongoDBSearch,
};
