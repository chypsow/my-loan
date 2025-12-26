
import { buildApp01 } from './app01.js';
import { buildApp02 } from './app02.js';
import { buildApp03, preparePrintOverview } from './app03.js';

export let activePage = localStorage.getItem('activePage') ? parseInt(localStorage.getItem('activePage')) : 0;
export const $ = selector => document.querySelector(selector);
export const $all = selector => Array.from(document.querySelectorAll(selector));
export const fmtCurrency = new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR",maximumFractionDigits: 2 });
export const fmtDecimal = (digits = 2) => new Intl.NumberFormat("nl-BE", { style: "decimal", maximumFractionDigits: digits });
export const fmtDate = d => new Date(d).toLocaleDateString("nl-BE");
// Format date to local ISO string (YYYY-MM-DD) instead of UTC
export function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
//export const fmtPercent = new Intl.NumberFormat("nl-BE", { style: "percent", maximumFractionDigits: 4 });

export const  el = (tag, options = {}, children = []) => {
    const element = document.createElement(tag);

    Object.entries(options).forEach(([key, value]) => {
        if (key === "class") element.className = value;
        else if (key === "id") element.id = value;
        else if (key === "text") element.textContent = value;
        else if (key === "html") element.innerHTML = value;
        else element.setAttribute(key, value);
    });

    children.forEach(child => element.appendChild(child));
    return element;
};
export const showApp = (index) => {
    for (let i = 1; i <= 4; i++) {
        if (i !== index) {
            $(`#app0${i}`).style.display = "none";
        } else {
            $(`#app0${i}`).style.display = "block";
            if(i === 3) {
                preparePrintOverview();
                $(`#app0${i}`).classList.add("table-wrapper");
                return;
            }
            $(`#app0${i}`).classList.add("wrapper");
        }   
    }
};

export function createHeader(tekst) {
    return el("header", { class: "no-print" }, [
        el("h1", { text: tekst })
    ]);
};

function makeTopHeader() {
    const header = $('#topHeader');
    const tabArray = ['LENING CALCULATOR 1', 'LENING CALCULATOR 2', 'AFLOSSINGSTABEL'];
    header.setAttribute('role', 'tablist');
    tabArray.forEach((tab, i) => {
        const hyperlink = document.createElement('a');
        hyperlink.href = '#';
        hyperlink.textContent = tab;
        hyperlink.setAttribute('role', 'tab');
        hyperlink.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        if(i === activePage) hyperlink.classList.add('active');
        hyperlink.addEventListener('click', () => {
            if (hyperlink.classList.contains("active")) return;
            const activeLink = header.querySelector('.active');
            activeLink.classList.remove("active");
            activeLink.setAttribute('aria-selected', 'false');
            hyperlink.classList.add("active");
            hyperlink.setAttribute('aria-selected', 'true');
            activePage = i;
            localStorage.setItem('activePage', activePage);
            showApp(activePage + 1);
            createHeader();
        });
        header.appendChild(hyperlink);
    });
};

function makeCircleContainer() {
    const container = $(".circles-wrapper");
    for (let i = 0; i < 7; i++) {
        container.appendChild(el('div', { class: 'circle' }));
    }
    return container;
};

/* Initialize */
document.addEventListener("DOMContentLoaded", () => {
    makeCircleContainer();
    makeTopHeader();
    buildApp01();
    buildApp02();
    buildApp03();
    showApp(activePage + 1);
});

