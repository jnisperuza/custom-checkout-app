"use strict";

const fs = require("fs");

/**
 *
 * @returns string
 */
const getPathSeparator = () => {
    if (/^win/.test(process.platform)) {
        return "\\";
    } else if (process.platform === "darwin") {
        return "/";
    } else if (process.platform === "linux") {
        return "/";
    }
};

/**
 *
 * @param {string} path
 * @returns string[]
 */
const getFiles = (path) => {
    const files = [];
    for (const file of fs.readdirSync(path)) {
        const fullPath = path + "/" + file;
        if (fs.lstatSync(fullPath).isDirectory()) getFiles(fullPath).forEach((x) => files.push(file + "/" + x));
        else files.push(file);
    }
    return files;
};

/**
 *
 * @param {string} filePath
 * @returns string
 */
const getFileName = (filePath) => {
    const xplode = filePath.split("/");
    return xplode[xplode.length - 1];
};

module.exports = {
    getPathSeparator,
    getFiles,
    getFileName,
};
