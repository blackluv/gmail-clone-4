class emailController {
    constructor($rootScope, $interval) {
        let ctrl = this;
        ctrl.title = "Bmail";
        ctrl.$rootScope = $rootScope;
        ctrl.emails = [];
        $interval(() => {ctrl.getEmails()}, 2000,[20]);
    
    }
    
    getEmails() {
    	let ctrl = this;
        $.ajax({
            url: 'https://randomuser.me/api/?results=1?nat=us',
            dataType: 'json',
            success: function(data) {
                console.log(data.results[0]);
                data.results.forEach(each => {
                        ctrl.emails.push({
                            name: each.name.first + ' ' + each.name.last,
                            email: each.email
                        });
                    }

                );
                console.log(ctrl.emails);

            }
        });

    }

}

export default emailController;
