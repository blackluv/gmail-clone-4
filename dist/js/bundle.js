(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _app = require('./app.html');

var _app2 = _interopRequireDefault(_app);

var _app3 = require('./app.controller');

var _app4 = _interopRequireDefault(_app3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app4.default.$inject = ['$rootScope', '$interval', '$http'];

var appComponent = {
	template: _app2.default,
	controller: _app4.default
};

exports.default = appComponent;

},{"./app.controller":2,"./app.html":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var appCtrl = function appCtrl($rootScope, $interval) {
	_classCallCheck(this, appCtrl);

	var ctrl = this;
};

exports.default = appCtrl;

},{}],3:[function(require,module,exports){
module.exports = "\n<navbar></navbar>\n<div class= \"col-sm-3 col-md-2\">\n<sidebar></sidebar>\n</div>\n<div class=\"col-sm-9 col-md-10\">\n<email></email>\n</div>";

},{}],4:[function(require,module,exports){
'use strict';

var _app = require('./app.component');

var _app2 = _interopRequireDefault(_app);

var _navbar = require('./components/navbar/navbar.component');

var _navbar2 = _interopRequireDefault(_navbar);

var _sidebar = require('./components/sidebar/sidebar.component');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _email = require('./components/email/email.component');

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', []).component('app', _app2.default).component('navbar', _navbar2.default).component('sidebar', _sidebar2.default).component('email', _email2.default);

},{"./app.component":1,"./components/email/email.component":5,"./components/navbar/navbar.component":8,"./components/sidebar/sidebar.component":11}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _email = require('./email.html');

var _email2 = _interopRequireDefault(_email);

var _email3 = require('./email.controller');

var _email4 = _interopRequireDefault(_email3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emailComponent = {
	bindings: {},
	template: _email2.default,
	controller: ['$rootScope', '$interval', '$http', _email4.default],
	controllerAs: '$ctrl'

};

exports.default = emailComponent;

},{"./email.controller":6,"./email.html":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var emailController = function () {
    function emailController($rootScope, $interval, $http) {
        _classCallCheck(this, emailController);

        var ctrl = this;
        ctrl.title = "BMail";
        ctrl.$rootScope = $rootScope;
        ctrl.$http = $http;
        ctrl.emails = [];
        ctrl.emailData;
        ctrl.getEmails();
        ctrl.activeNav = "inbox";
        ctrl.viewStarred = false;
        $interval(function () {
            ctrl.getEmails();
        }, 5000, [50]);
        $interval(function () {
            ctrl.getEmails();
        }, 2000, [2]);
        // watches for when the text box gets updated
        ctrl.$rootScope.$watch('searchText', function () {
            ctrl.searchText = ctrl.$rootScope.searchText;
        });

        ctrl.$rootScope.$watch('viewStarred', function () {
            ctrl.viewStarred = ctrl.$rootScope.viewStarred;
        });

        ctrl.$rootScope.$watch('viewPane', function () {
            ctrl.viewPane = ctrl.$rootScope.viewPane;
        });

        ctrl.tabs = [{
            name: 'Primary',
            icon: 'glyphicon-inbox'
        }, {
            name: 'Social',
            icon: 'glyphicon-user'
        }, {
            name: 'Promotions',
            icon: 'glyphicon-tags'

        }];
        ctrl.activeTab = ctrl.tabs[0].name;
    }
    //Makes the API call to get info for email


    _createClass(emailController, [{
        key: "getEmails",
        value: function getEmails() {
            //ADD multiple API call for email subject/ content

            var ctrl = this;
            ctrl.$http({
                method: 'GET',
                url: 'https://randomuser.me/api/?results=2&nat=us',
                dataType: 'json'
            }).then(function success(data) {
                ctrl.processEmails(data, ctrl.tabs);
            });
        }
        //parses json data into array of emails

    }, {
        key: "processEmails",
        value: function processEmails(emailData, tabs) {
            var ctrl = this;
            var now = new Date();
            emailData.data.results.forEach(function (each) {
                var tag = tabs[Math.floor(Math.random() * tabs.length)].name;
                ctrl.emails.push({
                    name: each.name.first + ' ' + each.name.last,
                    email: each.email,
                    read: false,
                    starred: false,
                    category: tag,
                    time: [[now.getMonth() + 1, now.getDate()].join("/"), [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ")
                });
            });

            function AddZero(num) {
                return num >= 0 && num < 10 ? "0" + num : num + "";
            }
            ctrl.read();
        }
    }, {
        key: "read",
        value: function read() {
            var ctrl = this;
            ctrl.unread = 0;
            ctrl.emails.forEach(function (e) {
                if (!e.read) {
                    ctrl.unread++;
                }
            });
            ctrl.$rootScope.unread = ctrl.unread;
            ctrl.toggleCompose(ctrl.viewPane);
        }
    }, {
        key: "starredEmail",
        value: function starredEmail(email) {
            var ctrl = this;
            console.log("email: ", email);
            email.starred = !email.starred;
            ctrl.$rootScope.emails = ctrl.emails;
        }
    }, {
        key: "updateTab",
        value: function updateTab(tabName) {
            var ctrl = this;
            ctrl.activeTab = tabName;
        }
    }, {
        key: "showStarred",
        value: function showStarred(star) {
            var ctrl = this;
            if (!ctrl.viewStarred) {
                return star;
            } else if (star) {
                return star;
            }
            return !star;
        }
    }, {
        key: "changeStar",
        value: function changeStar(email) {
            email.starred = !email.starred;
        }
    }, {
        key: "toggleCompose",
        value: function toggleCompose(viewPane) {
            var ctrl = this;
            console.log(viewPane);
            ctrl.viewPane = viewPane;
            ctrl.$rootScope.viewPane = viewPane;
        }
    }]);

    return emailController;
}();

exports.default = emailController;

},{}],7:[function(require,module,exports){
module.exports = "<div ng-show=\"$ctrl.viewPane == 'message'\">\n    <div class=\"compose input-group\">\n        <span class=\"input-group-addon\" id=\"basic-addon1\">TO: </span>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Recipient\">\n    </div>\n    <div class=\"compose input-group\">\n        <span class=\"input-group-addon\" id=\"basic-addon1\">CC: </span>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Other Recipients\">\n    </div>\n    <div class=\"compose input-group\">\n        <span class=\"input-group-addon\" id=\"basic-addon1\">Subject: </span>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Subject Here...\">\n    </div>\n    <div class=\"compose form-group\">\n        <textarea class=\"form-control\" rows=\"10\" id=\"comment\"></textarea>\n    </div>\n    <div class=\"composeButtons\">\n    <button class=\"btn btn-primary \"><span class=\"glyphicon glyphicon-send\" aria-hidden=\"true\"> </span> Send </button>\n    <button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=\"true\"> </span> Save </button>\n    <button class=\"btn btn-danger\" ng-click=\"$ctrl.toggleCompose($ctrl.viewPane = 'inbox')\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"> </span> Discard </button>\n    </div>\n</div>\n\n<div ng-show=\"$ctrl.viewPane == 'compose'\">\n    <div class=\"compose input-group\">\n        <span class=\"input-group-addon\" id=\"basic-addon1\">TO: </span>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Recipient\">\n    </div>\n    <div class=\"compose input-group\">\n        <span class=\"input-group-addon\" id=\"basic-addon1\">CC: </span>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Other Recipients\">\n    </div>\n    <div class=\"compose input-group\">\n        <span class=\"input-group-addon\" id=\"basic-addon1\">Subject: </span>\n        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Subject Here...\">\n    </div>\n    <div class=\"compose form-group\">\n        <textarea class=\"form-control\" rows=\"10\" id=\"comment\"></textarea>\n    </div>\n    <div class=\"composeButtons\">\n    <button class=\"btn btn-primary \"><span class=\"glyphicon glyphicon-send\" aria-hidden=\"true\"> </span> Send </button>\n    <button class=\"btn btn-default\"><span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=\"true\"> </span> Save </button>\n    <button class=\"btn btn-danger\" ng-click=\"$ctrl.toggleCompose($ctrl.viewPane = 'inbox')\"><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"> </span> Discard </button>\n    </div>\n</div>\n\n\n<div ng-show=\"$ctrl.viewPane=='inbox'\">\n    <ul class=\"nav nav-tabs\">\n        <li ng-repeat=\"tab in $ctrl.tabs\" ng-click=\"$ctrl.updateTab(tab.name)\" ng-class=\"{active: $ctrl.activeTab === tab.name}\">\n            <a href=\"#\" data-toggle=\"tab\"><span class=\"glyphicon {{tab.icon}}\"></span>{{tab.name}}</a>\n        </li>\n        <!-- Placeholder for future option to add tabs -->\n        <!-- <a href=\"#settings\" data-toggle=\"tab\"><span class=\"glyphicon glyphicon-plus no-margin\"></span></a>\n        </li> -->\n    </ul>\n    <!-- Tab panes -->\n    <div class=\"tab-content\">\n        <div class=\"tab-pane fade in active\" id=\"primary\" ><!-- ng-show=\"$ctrl.activeTab==='primary'\"> -->\n            <div class=\"list-group\">\n                <a href=\"#\" class=\"list-group-item\" ng-repeat=\"email in $ctrl.emails | \n                    filter: {starred: $ctrl.showStarred(starred)} | \n                    filter: $ctrl.searchText | \n                    filter: {category: $ctrl.activeTab}\" \n                    ng-click=\"$ctrl.read(email.read=true, $ctrl.viewPane = 'message')\" \n                    ng-class=\"{read : email.read}\"\n                    \n                    >\n                    <label>\n                        <input type=\"checkbox\">\n                    </label>\n                    <span class=\"glyphicon glyphicon-star\" ng-click=\"$ctrl.changeStar(email)\" \n                        ng-class=\"{starred :   email.starred}\"></span>\n                    <span class=\"name\" style=\"min-width: 120px; display: inline-block;\">{{email.name}}</span> \n                    <span class=\"\">Nice work on the lastest version</span>\n                    <span class=\"text-muted\" style=\"font-size: 11px;\">- lorem ipsum {{email.starred}}</span> \n                    <span class=\"badge\">{{email.time}}</span> \n                    <span class=\"pull-right\">\n                        <span class=\"glyphicon glyphicon-paperclip\"></span>\n                    </span>\n                </a>\n\n            </div>\n            \n            <div class=\"panel-footer\">\n                <a href=\"http://brandonspencer.me\">Made by Brandon Spencer</a> | \n                <a href=\"https://github.com/doubldragon/gmail-clone\">Fork it on Github!</a>\n            </div>\n            \n        </div>\n        \n\n</div>\n</div>\n    \n";

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _navbar = require('./navbar.html');

var _navbar2 = _interopRequireDefault(_navbar);

var _navbar3 = require('./navbar.controller');

var _navbar4 = _interopRequireDefault(_navbar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navbarComponent = {
	bindings: {},
	template: _navbar2.default,
	controller: ['$rootScope', '$interval', '$http', _navbar4.default],
	controllerAs: '$ctrl'

};

exports.default = navbarComponent;

},{"./navbar.controller":9,"./navbar.html":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var navbarController = function () {
	function navbarController($rootScope, $interval) {
		_classCallCheck(this, navbarController);

		var ctrl = this;
		ctrl.title = "Bmail";
		ctrl.$rootScope = $rootScope;
		ctrl.searchText = '';
	}

	_createClass(navbarController, [{
		key: 'search',
		value: function search(searchText) {
			var ctrl = this;
			console.log('Updating searchText: ', searchText);

			ctrl.$rootScope.searchText = searchText;
		}
	}]);

	return navbarController;
}();

exports.default = navbarController;

},{}],10:[function(require,module,exports){
module.exports = "<div class=\"row top-row \">\n    <div class=\"col-sm-3 col-md-2\"><img class='logo center-block' src='/app/assets/images/bmail.jpg'></div>\n    <div class=\"col-lg-6\">\n        <div class=\"input-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Search Bmail..\" ng-model=\"$ctrl.searchText\" ng-change='$ctrl.search($ctrl.searchText)'>\n            <span class=\"input-group-btn\">\n        <button class=\"btn btn-primary\" type=\"button\" ng-click='$ctrl.search($ctrl.searchText)'><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span> </button>\n            </span>\n        </div>\n        <!-- /input-group -->\n    </div>\n    <!-- /.col-lg-6 -->\n    <span id='right-search'>\n  <!-- Split button -->\n  <div class=\"btn-group\">\n      <button type=\"button\" class=\"btn btn-danger\">Action</button>\n      <button type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n      <span class=\"caret\"></span>\n    <span class=\"sr-only\">Toggle Dropdown</span>\n    </button>\n    <ul class=\"dropdown-menu\">\n        <li><a href=\"#\">Help</a></li>\n        <li><a href=\"#\">Another action</a></li>\n        <li><a href=\"#\">Something else here</a></li>\n        <li role=\"separator\" class=\"divider\"></li>\n        <li><a href=\"#\">Logout</a></li>\n    </ul>\n</div>\n<img class='profile' src='/app/assets/images/profile.png'></span>\n\n</div>\n<hr>\n\n<!-- <ul class=\"nav nav-tabs nav-justified\">\n  <li><a href=\"#\">Inbox</a></li>\n  <li><a href=\"#\">Social</a></li>\n  <li><a href=\"#\">Promotions</a></li>\n  <li><a href=\"#\">Updates</a></li>\n</ul> -->\n\n<!-- /.row -->\n<!-- <link rel=\"stylesheet\" href=\"navbar.scss\"> -->\n";

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sidebar = require('./sidebar.html');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _sidebar3 = require('./sidebar.controller');

var _sidebar4 = _interopRequireDefault(_sidebar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sidebarComponent = {
	bindings: {},
	template: _sidebar2.default,
	controller: ['$rootScope', '$interval', _sidebar4.default],
	controllerAs: '$ctrl'

};

exports.default = sidebarComponent;

},{"./sidebar.controller":12,"./sidebar.html":13}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sidebarController = function () {
	function sidebarController($rootScope, $interval) {
		_classCallCheck(this, sidebarController);

		var ctrl = this;
		ctrl.title = "Bmail";
		ctrl.$rootScope = $rootScope;
		ctrl.activeNav = "Inbox";
		ctrl.viewStarred = false;
		ctrl.viewPane = 'inbox';
		ctrl.$rootScope.$watch('unread', function () {
			ctrl.unread = ctrl.$rootScope.unread;
		});
		ctrl.toggleNav("Inbox");
		ctrl.toggleCompose(ctrl.viewPane);

		ctrl.$rootScope.$watch('viewPane', function () {
			ctrl.viewPane = ctrl.$rootScope.viewPane;
			ctrl.toggleCompose(ctrl.viewPane);
		});
	}

	_createClass(sidebarController, [{
		key: "toggleNav",
		value: function toggleNav(selection) {
			var ctrl = this;
			ctrl.toggleCompose(ctrl.viewPane = 'inbox');
			if (selection === 'Starred') {
				ctrl.viewStarred = true;
			} else {
				ctrl.viewStarred = false;
			}
			ctrl.$rootScope.viewStarred = ctrl.viewStarred;
			ctrl.activeNav = selection;
		}
	}, {
		key: "toggleCompose",
		value: function toggleCompose(viewPane) {
			var ctrl = this;
			ctrl.$rootScope.viewPane = viewPane;
		}
	}]);

	return sidebarController;
}();

exports.default = sidebarController;

},{}],13:[function(require,module,exports){
module.exports = "<div > <!-- class=\"col-sm-3 col-md-2\" -->\n    <a href=\"#\" class=\"btn btn-danger btn-sm btn-block\" role=\"button\" ng-click=\"$ctrl.toggleCompose($ctrl.viewPane = 'compose')\"><i class=\"glyphicon glyphicon-edit\"></i> Compose</a>\n    <hr>\n    <ul class=\"nav nav-pills nav-stacked\">\n        <li id='inbox' ng-class=\"{active : $ctrl.activeNav === 'Inbox'}\" ng-click=\"$ctrl.toggleNav('Inbox')\"><a href=\"#\">\n            <span class=\"badge pull-right\">{{$ctrl.unread}}</span> Inbox </a></li>\n        <li id ='starred' ng-class=\"{active : $ctrl.activeNav === 'Starred'}\" \n            ng-click=\"$ctrl.toggleNav('Starred')\"><a href=\"#\">Starred</a>\n        </li>\n        <li><a href=\"#\">Sent Mail</a></li>\n        <li><a href=\"#\"><span class=\"badge pull-right\">3</span>Drafts</a></li>\n    </ul>\n</div>\n\n";

},{}]},{},[4]);
