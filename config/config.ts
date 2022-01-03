const url = process.env.APP_URL
  ? String(process.env.APP_URL)
  : 'http://localhost:3000/';

export { url };
