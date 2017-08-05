Stripe.setPublishableKey("pk_test_uQtir08DEfJyETWW4I8DbUD8");

var app = new Vue({
    data: {
        currentUser: null,
        sources: {},
        stripeCustomerInitialized: false,
        newCreditCard: {
            number: '4242424242424242',
            cvc: '111',
            exp_month: 1,
            exp_year: 2020,
            address_zip: '00000'
        },
        charges: {},
        newCharge: {
            source: null,
            amount: 2000
        }
    },
    ready: () => {
    },
    methods: {
        listen: function () {
            firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/customer_id`).on('value', snapshot => {
                this.stripeCustomerInitialized = (snapshot.val() !== null);
            }, () => {
                this.stripeCustomerInitialized = false;
            });
            firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/sources`).on('value', snapshot => {
                this.sources = snapshot.val();
            }, () => {
                this.sources = {};
            });
            firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/charges`).on('value', snapshot => {
                this.charges = snapshot.val();
            }, () => {
                this.charges = {};
            });
        },
        submitNewCreditCard: function () {
            Stripe.card.createToken({
                number: this.newCreditCard.number,
                cvc: this.newCreditCard.cvc,
                exp_month: this.newCreditCard.exp_month,
                exp_year: this.newCreditCard.exp_year,
                address_zip: this.newCreditCard.address_zip
            }, (status, response) => {
                if (response.error) {
                    this.newCreditCard.error = response.error.message;
                } else {
                    firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/sources`).push({token: response.id}).then(() => {
                        this.newCreditCard = {
                            number: '',
                            cvc: '',
                            exp_month: 1,
                            exp_year: 2017,
                            address_zip: ''
                        };
                    });
                }
            });
        },
        submitNewCharge: function () {
            firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/charges`).push({
                source: this.newCharge.source,
                amount: parseInt(this.newCharge.amount)
            });
        },
        signOut: function () {
            firebase.auth().signOut()
        }
    }
});