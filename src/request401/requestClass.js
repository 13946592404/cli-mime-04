let isAuth = false;

const request = async (timeout) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const code = isAuth ? 200 : 401;
      const response = {
        code,
        data: { timeout }
      };

      console.log('call the response ', response);
      resolve(response);
    }, timeout);
  });
}

const requestReNew = async () => {
  await new Promise(resolve => {
    isAuth = true;
    resolve()
  }, 3000);

  return true;
}

class RetryHandler {
  constructor() {
    // queue
    this.retryRequestQueue = [];
  };

  // promise for queue
  getRetryRequestPromise() {
    const retryRequestPromise = this.retryRequestQueue.map(result => {
      const { timeout } = result.data;
      return request(timeout);
    });
    this.clearRetryRequest();
    return Promise.all(retryRequestPromise);
  };

  // clear queue
  clearRetryRequest() {
    this.retryRequestQueue = [];
    console.log('retryRequestQueue is empty');
  }
};

const rh = new RetryHandler();

const retry = async results => {

  // catch 401
  console.log('results', results);
  results.forEach(result => {
    if (result.code === 401) {
      rh.retryRequestQueue.push(result);
    }
  })

  // after renew success
  const isAuthBy = await requestReNew();
  console.log('re new auth', isAuthBy, rh.retryRequestQueue);
  
  // retry
  return isAuthBy ? rh.getRetryRequestPromise() : Promise.reject();

}

Promise.all([
  request(1000),
  request(2000),
  request(3000),
]).then(retry);

// const MAX = 10;

// for (let i = 0; i < MAX; i += 1) {
//   Promise.all([request(i * 1000)]).then(retry);
// }
