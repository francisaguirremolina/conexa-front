/* eslint-disable no-console */
const env = process.env.NODE_ENV;

export const success = (response) => {
  if (env === 'development') {
    console.log(
      `%c ${response.config.method?.toUpperCase()} ${response.config.url} ${
        response.status
      } ${response.statusText}`,
      'background: #329542; color: #fff'
    );
    console.log(response.data);
    console.log(response);
  }
};

export const error = (err) => {
  if (env === 'development') {
    console.log(
      `%c ${err.config.method?.toUpperCase()} ${err.config.url} ${
        err.response.status
      } ${err.response.statusText}`,
      'background: #ba0001; color: #fff'
    );
    console.log(`${err.config.baseURL}/${err.config.url}`);
    if (err.config.data) console.log(JSON.parse(err.config.data));
    console.log(err);
  }
};
