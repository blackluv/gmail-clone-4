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
        ctrl.subject = "This is the subject";
        ctrl.body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quibusnam praeteritis? Quo tandem modo? Sed virtutem ipsam inchoavit, nihil amplius. Facit enim ille duo seiuncta ultima bonorum, quae ut essent vera, coniungi debuerunt; Quod ea non occurrentia fingunt, vincunt Aristonem; Positum est a nostris in iis esse rebus, quae secundum naturam essent, non dolere; Duo Reges: constructio interrete. Non igitur de improbo, sed de callido improbo quaerimus, qualis Q. Maximas vero virtutes iacere omnis necesse est voluptate dominante. Illis videtur, qui illud non dubitant bonum dicere -; Eaedem enim utilitates poterunt eas labefactare atque pervertere. Que Manilium, ab iisque M. Ita multa dicunt, quae vix intellegam. Quos quidem tibi studiose et diligenter tractandos magnopere censeo. Quid de Pythagora? Qui autem diffidet perpetuitati bonorum suorum, timeat necesse est, ne aliquando amissis illis sit miser. Consequens enim est et post oritur, ut dixi. Illis videtur, qui illud non dubitant bonum dicere -; Hoc non est positum in nostra actione. Quoniam, si dis placet, ab Epicuro loqui discimus. Sed nunc, quod agimus; Ut pulsi recurrant? Facit enim ille duo seiuncta ultima bonorum, quae ut essent vera, coniungi debuerunt; Sed eum qui audiebant, quoad poterant, defendebant sententiam suam. Si quae forte-possumus. Sed plane dicit quod intellegit. Sed tempus est, si videtur, et recta quidem ad me. Tibi hoc incredibile, quod beatissimum. Iam id ipsum absurdum, maximum malum neglegi. Septem autem illi non suo, sed populorum suffragio omnium nominati sunt. Non ego tecum iam ita iocabor, ut isdem his de rebus, cum L. Quid igitur, inquit, eos responsuros putas? Non est igitur summum malum dolor. An me, inquam, nisi te audire vellem, censes haec dicturum fuisse?";

    }

    starredEmail(email) {
        let ctrl = this;
        console.log("email: ", email);
        email.starred = !email.starred;
        ctrl.$rootScope.emails = ctrl.emails;

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
