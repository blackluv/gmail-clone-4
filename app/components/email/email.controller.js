class emailController {
    constructor($rootScope, $interval) {
        let ctrl = this;
        ctrl.title = "BMail";
        ctrl.$rootScope = $rootScope;
        ctrl.emails = [];
        ctrl.emailData;
        $interval(() => { ctrl.getEmails(); }, 5000, [30]);

        ctrl.$rootScope.$watch('searchText', () => {
            // watches for when the text box gets updated
            ctrl.searchText = ctrl.$rootScope.searchText;
            console.log('searchText: ', ctrl.searchText);
        });



    }

    getEmails() {
        let ctrl = this;
        $.ajax({
            url: 'https://randomuser.me/api/?results=2&nat=us',
            dataType: 'json',
            success: function(data) {
                ctrl.processEmails(data);
            }
        })


    }

    processEmails(emailData) {
        let ctrl = this;
        let now = new Date();
        emailData.results.forEach(each => {
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
        // ctrl.$rootScope.unread = ctrl.emails.length;
        ctrl.read();
        // ctrl.$rootScope.time = ctrl.emails
            // crtl.$rootScope.$applyAsync();
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

}

export default emailController;
