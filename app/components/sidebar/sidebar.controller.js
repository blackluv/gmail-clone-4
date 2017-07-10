class sidebarController {
	constructor($rootScope, $interval) {
		let ctrl = this;
		ctrl.title = "Bmail";
		ctrl.$rootScope = $rootScope;
		ctrl.activeNav= "Inbox";
		ctrl.viewStarred = false;
		ctrl.compose = false;
		ctrl.$rootScope.$watch('unread', () => {
			ctrl.unread = ctrl.$rootScope.unread;
		});
		ctrl.toggleNav("Inbox");
		ctrl.toggleCompose(ctrl.compose);

		ctrl.$rootScope.$watch('compose', () => {
            ctrl.compose = ctrl.$rootScope.compose;
            ctrl.toggleCompose(ctrl.compose);
        });
	};

	toggleNav(selection) {
			let ctrl = this;
			ctrl.toggleCompose(ctrl.compose = false);
			if (selection === 'Starred') {
				ctrl.viewStarred = true;
			} else {
				ctrl.viewStarred = false;
			}
			ctrl.$rootScope.viewStarred = ctrl.viewStarred;
			ctrl.activeNav = selection;
		}
	
	toggleCompose(compose) {
		let ctrl = this;
		ctrl.compose = compose;
		ctrl.$rootScope.compose = ctrl.compose;
	}
}

export default sidebarController;