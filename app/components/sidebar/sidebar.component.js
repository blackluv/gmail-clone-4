import template from './sidebar.html';
import controller from './sidebar.controller';

let sidebarComponent = {
	bindings: {},
	template,
	controller: ['$rootScope','$interval', controller],
	controllerAs: '$ctrl'

};

export default sidebarComponent;