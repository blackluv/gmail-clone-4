import template from './email.html';
import controller from './email.controller';

let emailComponent = {
	bindings: {},
	template,
	controller: ['$rootScope','$interval', '$http', '$q',controller],
	controllerAs: '$ctrl'

};

export default emailComponent;