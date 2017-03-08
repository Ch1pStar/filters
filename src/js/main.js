require('babel-polyfill');

const Panel = require('./components/Panel');
/* eslint-disable */
const GSAP = require('gsap');
/* eslint-enable */

window.com = window.com || {};
window.com.components = window.com.components || {};

window.com.components.Panel = Panel;
