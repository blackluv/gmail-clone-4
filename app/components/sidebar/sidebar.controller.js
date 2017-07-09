class sidebarController {
	constructor($rootScope, $interval) {
		let ctrl = this;
		ctrl.title = "Bmail";
		ctrl.$rootScope = $rootScope;
		ctrl.activeNav= "inbox";
		ctrl.$rootScope.$watch('unread', () => {
			console.log('Updating Unreads');
			ctrl.unread = ctrl.$rootScope.unread;
		});
		
		// ctrl.$rootscope.$watch('starred', () => {
		// 	console.log('updating starred emails');
		// 	ctrl.emails = ctrl.$rootScope.emails;
		// })
		
	};

}

export default sidebarController;