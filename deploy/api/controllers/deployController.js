'use strict';

const fs = require('fs'),
  axios = require('axios');

const readFiles = (dist, environment, cookie) => {
  return new Promise((resolve) => {
    fs.readdir(`${dist}`, (err, data) => {
      if (!err) {
        const response = {
          success: [],
          error: [],
        };
        const numberFiles = data.length;
        let currentPosition = 0;

        data.forEach((file) => {
          let fileStream = fs.createReadStream(`${dist}${file}`, 'UTF-8');
          let data = '';

          fileStream.on('data', (chunk) => {
            data += chunk;
          });

          fileStream.on('end', () => {
            axios({
              method: 'PUT',
              baseURL: environment,
              url: `/${file}`,
              data: {
                path: `${file}`,
                text: `${data}`,
              },
              headers: {
                Cookie: `${cookie}`,
              },
            })
              .then(() => {
                response.success.push(file);
              })
              .catch(() => {
                response.error.push(file);
              })
              .finally(() => {
                currentPosition += 1;
                
                if (numberFiles === currentPosition) {
                  resolve(response);
                }
              });
          });
        });
      }
    });
  });
};

exports.create = async (req, res) => {
  const path = __dirname.split('/');
  const dist = `${path.slice(0, path.length - 3).join('/')}/dist/`;
  const { environment, cookie } = req.body;

  try {
    const response = await readFiles(dist, environment, cookie);
    res.json({
      status: res.statusCode,
      data: response,
    });
  } catch (error) {
    res.json({
      status: 500,
      data: null,
    });
  }
};
