const addItem = (file, ul) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(file));
  ul.appendChild(li);
};

const process = (data) => {
  if (!data) return;
  const successNumber = document.getElementById('success-number');
  const errorNumber = document.getElementById('error-number');

  successNumber.innerText = `(${data.success.length})`;
  errorNumber.innerText = `(${data.error.length})`;

  Object.keys(data).forEach((status) => {
    const ul = document.getElementById(`${status}-list`);
    if (!ul) return;
    ul.innerHTML = '';
    data[status].forEach((file) => {
      addItem(file, ul);
    });
  });
};

const start = () => {
  const preloader = document.getElementById('preloader');
  const environment = document.getElementById('environment');
  const cookie = document.getElementById('cookie');

  if (!environment?.value || !cookie?.value) {
    alert('Falta diligenciar campos requeridos!');
    return;
  }

  var result = window.confirm(
    `Confirm deploy to ${environment.options[environment.selectedIndex].text}?`
  );

  if (result === true) {
    preloader.classList.add('display');

    const data = {
      environment: environment?.value,
      cookie: cookie?.value,
    };

    fetch('/deploy', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        preloader.classList.remove('display');
        console.error('Error:', error);
        alert(error);
      })
      .then((response) => {
        process(response?.data);
        preloader.classList.remove('display');
      });
  }
};
