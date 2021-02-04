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
      if (err) {
        return 'error';
      } else if (data.result !== 'success') {
        return 'error';
      } else {
        return 'success';
      }
    },
  );

export const subscribeToMailingList = async (url, data) => {
  const params = toQueryString(data);
  const urlRequest = getAjaxUrl(url) + '&' + params;

  return subscribe(urlRequest);
};
