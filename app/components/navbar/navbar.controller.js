class navbarController {
	constructor($rootScope, $interval) {
		let ctrl = this;
		ctrl.title = "Bmail";
		ctrl.$rootScope = $rootScope;
		ctrl.searchText = '';

	};

	search(searchText) {
        const ctrl = this;
        ctrl.$rootScope.searchText = searchText;
    };
}

export default navbarController;