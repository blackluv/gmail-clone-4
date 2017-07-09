class emailController {
    constructor($rootScope, $interval, $http) {
        let ctrl = this;
        ctrl.title = "BMail";
        ctrl.$rootScope = $rootScope;
        ctrl.$http = $http
        ctrl.emails = [];
        ctrl.emailData;
        ctrl.getEmails();
        ctrl.activeNav= "inbox";
        $interval(() => { ctrl.getEmails(); }, 5000, [50]);
        
        // watches for when the text box gets updated
        ctrl.$rootScope.$watch('searchText', () => {
            ctrl.searchText = ctrl.$rootScope.searchText;
        });

        $interval(() => {ctrl.getEmails();}, 2000,[2]);
        ctrl.tabs = [{
            name: 'Primary',
            icon: 'glyphicon-inbox'
        },{
            name: 'Social',
            icon: 'glyphicon-user'
        }, {
            name: 'Promotions',
            icon: 'glyphicon-tags'

        }];
        ctrl.activeTab=ctrl.tabs[0].name;
    }
    //Makes the API call to get info for email
    getEmails() {
        //ADD multiple API call for email subject/ content

        let ctrl = this;
        ctrl.$http ({
            method: 'GET',
            url: 'https://randomuser.me/api/?results=2&nat=us',
            dataType: 'json'
        }).then(function success(data) {
                ctrl.processEmails(data,ctrl.tabs);
            })


    }
    //parses json data into array of emails
    processEmails(emailData,tabs) {
        let ctrl = this;
        let now = new Date();
        emailData.data.results.forEach(each => {
                let tag = tabs[Math.floor(Math.random() * tabs.length)].name;
                ctrl.emails.push({
                    name: each.name.first + ' ' + each.name.last,
                    email: each.email,
                    read: false,
                    starred: false,
                    category: tag,
                    time: [
                        [now.getMonth() + 1,
                         now.getDate()]
                         .join("/"), [AddZero(now.getHours()),
                            AddZero(now.getMinutes())
                        ].join(":"),
                        now.getHours() >= 12 ? "PM" : "AM"
                    ].join(" ")
                });
            }

        );

        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
            }
        ctrl.read();
    }

    read() {
        let ctrl= this;
        ctrl.unread = 0;
        ctrl.emails.forEach(e => {
            console.log("read = ", e.read);
            if (!e.read){
                ctrl.unread++;
            }
        });
        ctrl.$rootScope.unread = ctrl.unread;
    }

    starredEmail(email) {
        let ctrl = this;
        console.log("email: ", email);
        email.starred = !email.starred;
        ctrl.$rootScope.emails = ctrl.emails;

    }

    selectedTab(category) {
        console.log("Should this email show: ", (ctrl.activeTab == category ? true : false));
        return(ctrl.activeTab == category ? true : false);
    }

}

export default emailController;
