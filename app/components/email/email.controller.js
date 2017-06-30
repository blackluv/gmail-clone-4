class emailController {
    constructor($rootScope, $interval, $http) {
        let ctrl = this;
        ctrl.title = "BMail";
        ctrl.$rootScope = $rootScope;
        ctrl.$http = $http
        ctrl.emails = [];
        ctrl.emailData;
        ctrl.getEmails();
        $interval(() => { ctrl.getEmails(); }, 5000, [50]);

        ctrl.$rootScope.$watch('searchText', () => {
            // watches for when the text box gets updated
            ctrl.searchText = ctrl.$rootScope.searchText;
        });



    }

    getEmails() {
        let ctrl = this;
        
        ctrl.$http ({
            method: 'GET',
            url: 'https://randomuser.me/api/?results=2&nat=us',
            dataType: 'json'
        }).then(function success(data) {
                ctrl.processEmails(data);
            })


    }

    processEmails(emailData) {
        let ctrl = this;
        let now = new Date();
        emailData.data.results.forEach(each => {
                ctrl.emails.push({
                    name: each.name.first + ' ' + each.name.last,
                    email: each.email,
                    read: false,
                    starred: false,
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

        console.log('hello');
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

}

export default emailController;
