const env = {
  NODE_ENV: String(process.env.NODE_ENV) || 'development',
  API_BASE_URL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/'
      : 'https://www.thewandererdeveloper.com/api/',
};

export default env;
