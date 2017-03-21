require('babel-polyfill');
require('dopamine-polyfill').apply();
require('./util/HbsHelpers');

const Panel = require('./components/Panel');
/* eslint-disable */
const GSAP = require('gsap');
/* eslint-enable */

window.com = window.com || {};
window.com.components = window.com.components || {};

window.com.components.Panel = Panel;
