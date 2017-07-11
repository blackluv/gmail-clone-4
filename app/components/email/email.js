'use strict';

import emailComponent from './email.component';
console.log("In email.js");
let emailModule = angular.module('email',[])
.component('email', emailComponent);



export default emailModule;