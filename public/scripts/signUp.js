const isValidateUserName = function(isExists) {
  if (isExists) {
    document.querySelector('#userName').innerHTML = 'user name already exists';
    return (document.querySelector('form').onsubmit = () => false);
  }
  return (document.querySelector('form').onsubmit = () => true);
};

const isUserExists = function() {
  const userName = event.target.value;
  sendXmlHttpRequest('/validateUserExists', 'POST', isValidateUserName, null, {
    userName
  });
};
