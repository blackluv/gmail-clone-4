class sidebarController {
	constructor($rootScope, $interval) {
		let ctrl = this;
		ctrl.title = "Bmail";
		ctrl.$rootScope = $rootScope;
		ctrl.activeNav= "Inbox";
		ctrl.viewStarred = false;
		ctrl.$rootScope.$watch('unread', () => {
			ctrl.unread = ctrl.$rootScope.unread;
		});
		ctrl.toggleNav("Inbox");
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