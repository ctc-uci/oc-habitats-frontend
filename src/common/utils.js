import axios from 'axios';

let baseURL = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  baseURL = `${process.env.REACT_APP_API_URL}`;
} else {
  // production code
  baseURL = `${process.env.REACT_APP_PROD_API_URL}`;
}

// See auth_utils for AuthInterceptor
const OCHBackend = axios.create({
  baseURL,
});

export { OCHBackend };
