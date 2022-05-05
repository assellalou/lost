const getUrlParams = (url) => {
  let pair;
  let res = {};
  let pairs = url.split('&');
  for (let i = 0; i < pairs.length; i++) {
    pair = pairs[i].split('=');
    res[pair[0]] = pair[1];
  }
  return res;
};
export default getUrlParams;
