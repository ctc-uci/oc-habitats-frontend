import axios from 'axios';

// See auth_utils for AuthInterceptor
const OCHBackend = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

// eslint-disable-next-line import/prefer-default-export
export { OCHBackend };
