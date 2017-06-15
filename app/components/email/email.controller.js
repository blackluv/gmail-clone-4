class emailController {
    constructor($rootScope, $interval) {
        let ctrl = this;
        ctrl.title = "BMail";
        ctrl.$rootScope = $rootScope;
        ctrl.emails = [];
        ctrl.emailData;
        
        // let emailRequest = new Promise((resolve, reject) => {
        //     ctrl.getEmails();
        // });

        // emailRequest.then(() => {
        //     ctrl.processEmails();
        // });
        $interval(() => {ctrl.getEmails();}, 2000,[2]);

    }

    getEmails() {
        let ctrl = this;
        $.ajax({
            url: 'https://randomuser.me/api/?results=10&nat=us',
            dataType: 'json',
            success: function(data) {
                ctrl.emailData = data;
            }
        }).then((data) => {
            processEmails(data);
        });

        console.log("fakeEmails:", fakeEmails);
        // console.log(ctrl);
    }

    processEmails(emailData) {
        let ctrl = this;
        emailData.results.forEach(each => {
                ctrl.emails.push({
                    name: each.name.first + ' ' + each.name.last,
                    email: each.email
                });
            }

        );


        console.log(ctrl.emails.length);
        crtl.$rootScope.$applyAsync();
    }
}

export default emailController;
