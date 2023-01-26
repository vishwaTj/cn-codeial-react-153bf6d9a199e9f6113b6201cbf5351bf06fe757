import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from '../utils';
import { getFormBody } from '../utils';

// contains 3 arguments 1.url, 2.body, 3. customconfig
//here we destrucure body out and rest assign it to customconfig
const customFetch = async (url, { body, ...customConfig }) => {
  // Storing the authentication (Bearer) token in localstorage  
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/x-wwww-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  //extracting headers from above and also storing it in customConfig
  const config = {
    ...customConfig, //using spread operator for above customconfig argument
    headers: {
      ...headers, // spreading headers
      ...customConfig.headers, //spreading headers from customconfig
    },
  };

  // if token exists we assign it so that posts requests run smoothly
  if (body) {
    // we have to stringify the body first before adding it to the config
    config.body = getFormBody(body);
  }

  //now we do the required try catch
  try {
     // this the fetch function is a global function to fetch API data across diff platforms read https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(url, config);
    const data = await response.json();

    // every API mostly sends success key so we detect it and return data
    if (data.success) {
      return {
        data: data.data, // upon using the promise sent by fetch we extract data usng json promise every understand working from above link
        success: true, // every API also has a message but here we are checking only the success key
      };
    }

  //  if the request from API fails then throw the error with the message from the API
    throw new Error(data.message);
  } catch (error) {
    console.error('error');
    //when fetch from API fails we return message sent by the API as an error message
      return {
      message: error.message,
      success: false, // also we mark the success key false
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  //here we are fetching the posts from the utils folder
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};
