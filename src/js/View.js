import { TIMEOUT_SEC_BTN } from "./config";

class View {
  _parentElement = document.querySelector(".urls-list");
  _submitBtn = document.getElementById("submit-btn");
  _inputUrl = document.getElementById("url-input");
  _loadingGif = document.getElementById("loading-gif");
  _menuBtn = document.querySelector(".ham-btn");
  _hamMenu = document.querySelector(".nav-list");
  _loader = document.querySelector(".loader");

  constructor() {
    this._submitBtn.parentElement.addEventListener("click", e => e.preventDefault());
    this._parentElement.addEventListener("click", this.addHandlerCopyLink);
    this._menuBtn.addEventListener("click", this.addHandlerShowMenu.bind(this));
  }

  render (originalLink, shortenedLink) {
    const markup = this._generateMarkup(originalLink, shortenedLink);

    this._clear();
    this._loader.insertAdjacentHTML("beforebegin", markup);
  }

  _clear () {
    this._inputUrl.value = "";
  }

  _generateMarkup (originalLink, shortenedLink) {
    return `
      <li class="new-link">
        <span>${originalLink}</span>
        <div>
            <span>${shortenedLink}</span>
            <button class="copy-btn">Copy</button>
        </div>
      </li>
    `;
  }

  addHandlerLoadLinks (handler) {
    window.addEventListener("load", handler);
  }

  addHandlerShowLink (handler) {
    this._submitBtn.addEventListener("click", handler);
  }

  addHandlerCopyLink (e) {
    if (!e.target.classList.contains("copy-btn")) return;
    const btns = document.querySelectorAll(".copy-btn");
    const curBtn = e.target;
    const shortnedLinkElText = e.target.previousElementSibling.textContent;

    // send copied text to clipboard
    navigator.clipboard.writeText(shortnedLinkElText).then(() => {
      // style btn
      btns.forEach(el => {
        el.style.removeProperty('background-color');
        el.textContent = "Copy";
      });

      curBtn.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--Dark-Violet');
      curBtn.textContent = "Copied!";

      // remove btn style after 5s
      setTimeout(() => {
        curBtn.style.removeProperty('background-color');
        curBtn.textContent = "Copy";
      }, TIMEOUT_SEC_BTN * 1000);
    });
  }

  addHandlerShowMenu () {
    this._menuBtn.classList.toggle("btn-active");
    this._hamMenu.classList.toggle("active-ham-menu");
  }

  renderError (message) {
    if (document.querySelector('.err-message')) return;
    const markup = `<i class='err-message'>${message}</i>`;
    this._inputUrl.insertAdjacentHTML("afterend", markup);
    this._inputUrl.classList.add('input-err');
    this._inputUrl.focus();
    document.querySelector(".loader").style.removeProperty("display");
  };

  removeError () {
    // if there is an error remove it
    document.querySelector('.err-message')?.remove();
    this._inputUrl.classList.remove('input-err');
  };

}

export default new View();