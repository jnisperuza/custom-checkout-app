"use strict";

const fs = require("fs"),
    axios = require("axios"),
    { getPathSeparator, getFiles, getFileName } = require("../utils");

const readFiles = (dist, files, environment, Cookie, VtexIdclientAutCookie) => {
    return new Promise((resolve) => {
        try {
            const response = {
                success: [],
                error: [],
            };
            const headers = {
                ...(Cookie ? {Cookie} : {VtexIdclientAutCookie}),
            }
            const numberFiles = files.length;
            let currentPosition = 0;

            files.forEach((filePath) => {
                const fileStream = fs.createReadStream(`${dist}${filePath}`, "UTF-8");
                const file = getFileName(filePath);

                let data = "";

                fileStream.on("data", (chunk) => {
                    data += chunk;
                });

                fileStream.on("end", () => {
                    axios({
                        method: "PUT",
                        baseURL: environment,
                        url: `/${file}`,
                        data: {
                            path: `${file}`,
                            text: `${data}`,
                        },
                        headers,
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
        } catch (error) {
            resolve(error);
        }
    });
};

exports.create = async (req, res) => {
    const path = __dirname.split(getPathSeparator());
    const dist = `${path.slice(0, path.length - 3).join("/")}/dist/`;
    const files = getFiles(dist);
    const { environment, cookie, VtexIdclientAutCookie } = req.body;

    try {
        const response = await readFiles(dist, files, environment, cookie, VtexIdclientAutCookie);
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
