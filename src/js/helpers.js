import "regenerator-runtime/runtime";

import { TIMEOUT_SEC } from "./config";

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error('Please enter a valid link');

    return data;
  } catch (err) {
    throw err;
  }
};

// comparing url with the domain name
const formatFullUrl = url => new URL(url).host.replace("www.", "");

export const getUrl = url => {
  const a = document.createElement("a");
  a.href = url;
  return url.startsWith("http") && formatFullUrl(url).toLocaleLowerCase() || a.getAttribute('href', 2).replace("www.", "").toLocaleLowerCase();
};