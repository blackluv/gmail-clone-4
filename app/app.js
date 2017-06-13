import appComponent from './app.component';
import navbarComponent from './components/navbar/navbar.component';
import sidebarComponent from './components/sidebar/sidebar.component';
import emailComponent from './components/email/email.component';

console.log("In app.js");
angular.module('app', [])
.component('app', appComponent)
.component('navbar', navbarComponent)
.component('sidebar', sidebarComponent)
.component('email', emailComponent)