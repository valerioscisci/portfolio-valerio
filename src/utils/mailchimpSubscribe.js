import jsonp from 'jsonp';
import toQueryString from 'to-querystring';

const getAjaxUrl = (url) => url.replace('/post?', '/post-json?');

const subscribe = (url) =>
  jsonp(
    url,
    {
      param: 'c',
    },
    (err, data) => {
      console.log(err, data);

      if (err) {
        return {
          status: 'error',
          message: err,
        };
      } else if (data.result !== 'success') {
        return {
          status: 'error',
          message: data.msg,
        };
      } else {
        return {
          status: 'success',
          message: data.msg,
        };
      }
    },
  );

export const subscribeToMailingList = async (url, data) => {
  const params = toQueryString(data);
  const urlRequest = getAjaxUrl(url) + '&' + params;

  return subscribe(urlRequest);
};
