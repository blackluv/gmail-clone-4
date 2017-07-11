import template from './app.html';
import controller from './app.controller';

controller.$inject = ['$rootScope', '$interval','$http','$q'];

let appComponent = {
	template,
	controller
}

export default appComponent;
