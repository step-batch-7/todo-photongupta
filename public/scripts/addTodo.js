const addItems = function() {
  const form = document.querySelector('.items');
  const textarea = document.createElement('textarea');
  textarea.cols = '50';
  textarea.rows = '3';
  textarea.required = true;
  textarea.name = 'todoList';
  form.appendChild(textarea);
  const br = document.createElement('br');
  form.appendChild(br);
};

const removeItems = function() {
  const form = document.querySelector('.items');
  form.removeChild(form.lastChild);
  form.removeChild(form.lastChild);
};

const showDetail = function() {
  const div = event.target;
  const id = div.getAttribute('id');
  console.log(id);
  let xml = new XMLHttpRequest();
  xml.onreadystatechange = function() {
    if (xml.readyState == XMLHttpRequest.DONE) {
      const content = JSON.parse(xml.responseText);
    }
    xml.open('GET', '/todoList.json', true);
    xml.send();
  };
};
