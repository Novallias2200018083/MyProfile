// js/utils.js
export function getElement(selector) {
    return document.querySelector(selector);
}

export function getAllElements(selector) {
    return document.querySelectorAll(selector);
}

export function createAndAppend(parent, tag, attributes = {}, textContent = '') {
    const el = document.createElement(tag);
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
    if (textContent) {
        el.textContent = textContent;
    }
    parent.appendChild(el);
    return el;
}