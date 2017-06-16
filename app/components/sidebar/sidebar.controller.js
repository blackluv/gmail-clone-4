class sidebarController {
	constructor($rootScope, $interval) {
		let ctrl = this;
		ctrl.title = "Bmail";
		ctrl.$rootScope = $rootScope;
		
		ctrl.$rootScope.$watch('unread', () => {
			console.log('Updating Unreads');
			ctrl.unread = ctrl.$rootScope.unread;
		});
		

		
	};

}

export default sidebarController;