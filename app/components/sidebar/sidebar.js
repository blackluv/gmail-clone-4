'use strict';

import sidebarComponent from './sidebar.component';
console.log("In sidebar.js");
let sidebarModule = angular.module('sidebar',[])
.component('sidebar', sidebarComponent);



export default sidebarModule;