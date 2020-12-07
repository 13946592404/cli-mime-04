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

const retryHandler = async results => {
  const retryRequestQueue = [];

  // catch 401
  console.log(results);
  results.forEach(result => {
    if (result.code === 401) {
      retryRequestQueue.push(result);
    }
  })

  // after renew success
  const isAuthBy = await requestReNew();
  console.log('re new auth', isAuthBy, retryRequestQueue);
  // logger.log('try to renew console.log is');

  if (isAuthBy) {
    if (retryRequestQueue.length) {
      console.log('retryRequestQueue is empty');
    }
    // call used 401's request again
    return Promise.all(retryRequestQueue.map(result => {
      const { timeout } = result.data
      return request(timeout);
    }))
  }

  return Promise.reject();
}

Promise.all([
  request(1000),
  request(2000),
  request(3000),
]).then(retryHandler)
