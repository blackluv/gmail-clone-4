class sidebarController {
	constructor($rootScope, $interval) {
		let ctrl = this;
		ctrl.title = "Bmail";
		ctrl.$rootScope = $rootScope;
		ctrl.activeNav= "Inbox";
		ctrl.viewStarred = false;
		ctrl.$rootScope.$watch('unread', () => {
			console.log('Updating Unreads');
			ctrl.unread = ctrl.$rootScope.unread;
		});
		
		// ctrl.$rootscope.$watch('starred', () => {
		// 	console.log('updating starred emails');
		// 	ctrl.emails = ctrl.$rootScope.emails;
		// })

	};

	toggleNav(selection) {
			let ctrl = this;
			if (selection === 'Starred') {
				ctrl.viewStarred = true;
			} else {
				ctrl.viewStarred = false;
			}
			ctrl.$rootScope.viewStarred = ctrl.viewStarred;
			ctrl.activeNav = selection;
		}

}

export default sidebarController;