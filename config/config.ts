const url = process.env.NEXT_PUBLIC_ENV === 'development'
  ?'http://localhost:3000/'
  : 'https://www.thewandererdeveloper.com/';

export { url };
