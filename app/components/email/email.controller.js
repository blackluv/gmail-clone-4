class emailController {
    constructor($rootScope, $interval, $http, $q) {
        let ctrl = this;
        ctrl.title = "BMail";
        ctrl.$rootScope = $rootScope;
        ctrl.$http = $http;
        ctrl.$q = $q;
        ctrl.emails = [];
        ctrl.emailData;
        ctrl.getEmails();
        ctrl.activeNav= "inbox";
        ctrl.viewStarred = false;
        $interval(() => { ctrl.getEmails(); }, 5000, [50]);
        $interval(() => { ctrl.getEmails(); }, 2000, [2]);
        // watches for when the text box gets updated
        ctrl.$rootScope.$watch('searchText', () => {
            ctrl.searchText = ctrl.$rootScope.searchText;
        });

        ctrl.$rootScope.$watch('viewStarred', () => {
            ctrl.viewStarred = ctrl.$rootScope.viewStarred;
        });

        ctrl.$rootScope.$watch('viewPane', () => {
            ctrl.viewPane = ctrl.$rootScope.viewPane;
        });
        
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
         ctrl.$q.all([
                ctrl.$http.get('https://randomuser.me/api/?nat=us'),
                ctrl.$http.get('https://baconipsum.com/api/?type=meat-and-filler&paras=1'),
                ctrl.$http.get('http://www.randomtext.me/api/gibberish/p-1/3-6')
            ])
        
        .then(function success(data) {
                ctrl.processEmails(data,ctrl.tabs);
            });
    }
    processEmails(emailData,tabs) {
        let ctrl = this;
        let tag = tabs[Math.floor(Math.random() * tabs.length)].name;
        let now = new Date();
        let sub = emailData[2].data.text_out
        let subject = sub.substring(3,sub.length-6);
        let preview = emailData[1].data[0].slice(0,30) + '...';
        let fullname = emailData[0].data.results[0].name.first.charAt(0).toUpperCase() + 
                       emailData[0].data.results[0].name.first.slice(1) + ' ' + 
                       emailData[0].data.results[0].name.last.charAt(0).toUpperCase() + 
                       emailData[0].data.results[0].name.last.slice(1);

        let email = {
            name: fullname,
            email: emailData[0].data.results[0].email,
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
                    ].join(" "),
            subject: subject,
            body: emailData[1].data[0],
            preview: preview,
            thumbnail: emailData[0].data.results[0].picture.thumbnail
        };

        function AddZero(num) {
            return (num >= 0 && num < 10) ? "0" + num : num + "";
            }
        ctrl.emails.push(email);
        ctrl.read();
    }

    read() {
        
        let ctrl= this;
        ctrl.unread = 0;
        ctrl.emails.forEach(e => {
            if (!e.read){
                ctrl.unread++;
            }
        });
        ctrl.$rootScope.unread = ctrl.unread;
        ctrl.toggleCompose(ctrl.viewPane);
    }

    readMessage(email) {
        let ctrl= this;
        ctrl.read();
        ctrl.sender = email.name;
        ctrl.senderEmail = email.email;
        ctrl.time = email.time;
        ctrl.subject = email.subject;
        ctrl.body = email.body;
        ctrl.thumb = email.thumbnail;
    }
    updateTab(tabName) {
        const ctrl = this;
        ctrl.activeTab = tabName;
    };
    
    showStarred(star) {
        let ctrl = this;
        if (!ctrl.viewStarred) {
            return star;
        } else if (star){
            return star;
        }
        return !star;
    }

    changeStar(email) {
        email.starred = !email.starred;
    }

    toggleCompose(viewPane) {
        let ctrl = this;
        ctrl.viewPane = viewPane;
        ctrl.$rootScope.viewPane = viewPane;
    }
}

export default emailController;
