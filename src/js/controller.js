import "core-js/stable";
import "regenerator-runtime";
import { async } from "regenerator-runtime";

import * as modul from "./modul";
import View from "./View";

let inputUrlVal = [];
const controlShowLinks = async function () {
  try {
    // remove error if there is any
    View.removeError();
    // check if the recevied link if already there
    document.querySelector(".loader").style.display = "inline-block";
    const isDuplicated = inputUrlVal.some(link => link === View._inputUrl.value);
    if (isDuplicated) {
      View.renderError("Already shortened");
      document.querySelector(".loader").style.removeProperty("display");
      return;
    }
    inputUrlVal.push(View._inputUrl.value);

    await modul.getShortenedLink(View._inputUrl.value);
    modul.setLocalStorage();
    View.render(modul.linkData.originalLink, modul.linkData.shortenedLink);

    document.querySelector(".loader").style.removeProperty("display");
  } catch (err) {
    View.renderError(err.message);
  }
};

const controlLoadLinks = function () {
  const data = modul.getLocalStorage("links");
  if (data.length === 0) return;

  // remove the "http:// || https://" so they can be correctly comparable above
  data.forEach(data => inputUrlVal.push(data.originalLink.slice(data.originalLink.indexOf("/") + 2)));

  modul.links.push(...data);

  // render from local storage
  data.forEach(item => View.render(item.originalLink, item.shortenedLink));
};

const init = function () {
  View.addHandlerShowLink(controlShowLinks);
  View.addHandlerLoadLinks(controlLoadLinks);
};
init();
