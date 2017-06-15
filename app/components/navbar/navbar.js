'use strict';

import navbarComponent from './navbar.component';
console.log("In navbar.js");
let navbarModule = angular.module('navbar',[])
.component('navbar', navbarComponent);



export default navbarModule;