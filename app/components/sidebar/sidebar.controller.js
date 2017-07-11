class sidebarController {
	constructor($rootScope, $interval) {
		let ctrl = this;
		ctrl.title = "Bmail";
		ctrl.$rootScope = $rootScope;
		ctrl.activeNav= "Inbox";
		ctrl.viewStarred = false;
		ctrl.viewPane = 'inbox';
		ctrl.$rootScope.$watch('unread', () => {
			ctrl.unread = ctrl.$rootScope.unread;
		});
		ctrl.toggleNav("Inbox");
		ctrl.toggleCompose(ctrl.viewPane);

		ctrl.$rootScope.$watch('viewPane', () => {
            ctrl.viewPane = ctrl.$rootScope.viewPane;
            ctrl.toggleCompose(ctrl.viewPane);
        });
	};

	toggleNav(selection) {
			let ctrl = this;
			ctrl.toggleCompose(ctrl.viewPane = 'inbox');
			if (selection === 'Starred') {
				ctrl.viewStarred = true;
			} else {
				ctrl.viewStarred = false;
			}
			ctrl.$rootScope.viewStarred = ctrl.viewStarred;
			ctrl.activeNav = selection;
		}
	
	toggleCompose(viewPane) {
		let ctrl = this;
		ctrl.$rootScope.viewPane = viewPane;
	}
}

export default sidebarController;