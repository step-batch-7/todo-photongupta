const sendXmlHttpRequest = function(url, method, callback, args, body) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      let todoLists = this.responseText;
      const contentType = this.getResponseHeader('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        todoLists = JSON.parse(todoLists);
      }
      callback(todoLists, args);
    } else {
      alert('something went wrong');
    }
  };

  xhr.open(method, url, true);
  body && xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(body));
};

const isValidUserName = function(isExists) {
  if (isExists) {
    document.querySelector('#userName').style['visibility'] = 'visible';
    return (document.querySelector('form').onsubmit = () => false);
  }
  return (document.querySelector('form').onsubmit = () => true);
};

const isUserExists = function() {
  const userName = event.target.value;
  sendXmlHttpRequest('/validateUserExists', 'POST', isValidUserName, null, {
    userName
  });
};

const isValidLogin = function(isValid) {
  if (isValid) {
    return (document.location = '/home.html');
  }
  document.querySelector('#loginMsg').style['visibility'] = 'visible';
};

const validateLogin = function() {
  const userName = document.querySelector('#userName').value;
  const password = document.querySelector('#password').value;
  sendXmlHttpRequest('/validateLogin', 'POST', isValidLogin, null, {
    userName,
    password
  });
};
