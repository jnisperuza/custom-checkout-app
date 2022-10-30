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

const openVtexAdmin = () => {
  const environment = document.getElementById('environment');

  if (!environment?.value) {
    return;
  }

  const url = environment.value
    .replace("api", "admin")
    .replace("pvt", "#")
    .replace("files", "code");

  window.open(url);
}

const handleSecurityChange = (value) => {
  const securitySelectors = document.getElementsByName('security-content');
  const securityContent = document.getElementById(value);

  for (const element of securitySelectors) {
      element.parentNode.classList.add('hidden');
      element.value = '';
  }

  if (securityContent) {
    securityContent.parentNode.classList.remove('hidden');
    securityContent.focus();
  }
}

const start = () => {
  const preloader = document.getElementById('preloader');
  const environment = document.getElementById('environment');
  const cookie = document.getElementById('cookie');
  const VtexIdclientAutCookie = document.getElementById('VtexIdclientAutCookie');

  if (!environment?.value || (!cookie?.value && !VtexIdclientAutCookie?.value)) {
    alert('Missing required fields!');
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
      VtexIdclientAutCookie: VtexIdclientAutCookie?.value,
    };

    if (!cookie?.value) {
      delete data.cookie;
    }

    if (!VtexIdclientAutCookie?.value) {
      delete data.VtexIdclientAutCookie;
    }

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
        console.error(error);
        alert(error);
      })
      .then((response) => {
        // Close preloader
        preloader.classList.remove('display');
        // When there are errors in the response
        if (response?.data?.code) {
          const error = JSON.stringify(response.data);
          console.error(error);
          alert(error);
        } else {
          // Process success and error list of files
          process(response?.data);
        }
      });
  }
};
