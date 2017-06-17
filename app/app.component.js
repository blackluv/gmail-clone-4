import template from './app.html';
import controller from './app.controller';

controller.$inject = ['$rootScope', '$interval','$http'];

let appComponent = {
	template,
	controller
}

export default appComponent;
