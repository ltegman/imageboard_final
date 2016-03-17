import 'isomorphic-fetch';

const API_ROOT = 'http://localhost:3000/api/';

export const callApi = (endpoint) => {
  return fetch(API_ROOT + endpoint)
    .then((response) => response.json());
};

export const postApi = (endpoint, data) => {
  return fetch(API_ROOT + endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.image)
  })
    .then((response) => response.json());
};
