import "regenerator-runtime";

import { AJAX } from "./helpers";
import { API_URL, TIMEOUT_SEC_STORAGE } from "./config";

export let linkData = {};

export const getShortenedLink = async function (link) {
  try {

    const data = await AJAX(`${API_URL}?url=${link}`);
    const { original_link: originalLink, full_short_link: shortenedLink } = data.result;
    linkData = {
      originalLink,
      shortenedLink
    };
  } catch (err) {
    throw err;
  }
};

export let links = [];
export const setLocalStorage = function () {
  links.push(linkData);
  localStorage.setItem("links", JSON.stringify(links));
};

export const getLocalStorage = function () {
  return JSON.parse(localStorage.getItem('links')) || [];
};

// clear local sotrage after 3 hours
setTimeout(function () {
  localStorage.clear();
}, TIMEOUT_SEC_STORAGE * 1000);