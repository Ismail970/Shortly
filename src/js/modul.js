import "regenerator-runtime";

import { AJAX } from "./helpers";
import { API_URL } from "./config";

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

// localStorage.clear();