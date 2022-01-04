const env = {
  API_BASE_URL:
    process.env.NEXT_PUBLIC_ENV === 'development'
      ? 'http://localhost:3000/api/'
      : 'https://www.thewandererdeveloper.com/api/',
};

export default env;
