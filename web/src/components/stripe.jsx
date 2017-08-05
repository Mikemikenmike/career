import React from 'react';
console.log(Stripe);

export default class StripeClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            user: null,
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

        };
    }

    componentDidMount() {
        if (this.props.user) {
            this.componentWillReceiveProps(this.props);
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log("will receive");
        if (nextProps.user && !this.state.user) {
            firebase.database().ref(`/stripe_customers/${nextProps.user.uid}/customer_id`).on('value', snapshot => {
                this.stripeCustomerInitialized = (snapshot.val() !== null);
            }, () => {
                this.stripeCustomerInitialized = false;
            });
            firebase.database().ref(`/stripe_customers/${nextProps.user.uid}/sources`).on('value', snapshot => {
                this.sources = snapshot.val();
            }, () => {
                this.sources = {};
            });
            firebase.database().ref(`/stripe_customers/${nextProps.user.uid}/charges`).on('value', snapshot => {
                this.charges = snapshot.val();
            }, () => {
                this.charges = {};
            });
            console.log(nextProps.user.uid);
            this.setState({user: nextProps.user});
        }
    }

    render() {
        return (
            this.state.user ?
                <div>
                    <h2>{this.state.user.uid}</h2>
                    <h3>Credit Cards</h3>
                    <ul>
                        {Object.entries(this.state.sources).map(([name, val], i) => {
                            return <li>
                                {name} {JSON.stringify(val)}
                            </li>
                        })}
                    </ul>

                    <div>
                        <h4>New</h4>
                        <div>
                            <label>
                                Number {this.state.newCreditCard.number}
                            </label>
                        </div>
                        <div>
                            <label>
                                CCV {this.state.newCreditCard.cvc}>
                            </label>
                        </div>
                        <div>
                            <label>
                                Exp
                                {this.state.newCreditCard.exp_month} /
                                {this.state.newCreditCard.exp_year}
                            </label>
                        </div>
                        <div>
                            <label>
                                Zip {this.state.newCreditCard.address_zip}
                            </label>
                        </div>
                        <div>
                            <button onClick={this.submitNewCreditCard}>Add</button>
                        </div>
                    </div>

                    <h3>Charges</h3>
                    <ul>
                        {Object.entries(this.state.charges).map(([key, val], i) => {
                            return <li>
                                {key}
                            </li>

                        })}
                    </ul>

                    <h4>New</h4>
                    <div>
                        <label>
                            Card
                            {/*<select v-model="newCharge.source">*/}
                            {/*<option:value="null">Default payment method</option>*/}
                            {/*<option v-for="(source, id) in sources" v-bind:value="source.id" v-if="source.id">*/}
                            {/*{{source.brand }} &hellip;{{source.last4 }}*/}
                            {/*(exp. {{source.exp_month }}/{{source.exp_year }})*/}
                            {/*</option>*/}
                        </label>
                    </div>

                    <div>
                        <label>
                            Amount {this.state.newCharge.amount}
                        </label>
                    </div>
                    <div>
                        <button onClick={this.submitNewCharge}>Charge</button>
                    </div>
                </div>


                :
                <div>Loggin in</div>
        );
    }

    submitNewCreditCard = () => {
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
                firebase.database().ref(`/stripe_customers/${this.state.user.uid}/sources`).push({token: response.id}).then(() => {
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
    };

    submitNewCharge = () => {
        firebase.database().ref(`/stripe_customers/${this.state.user.uid}/charges`).push({
            source: this.newCharge.source,
            amount: parseInt(this.newCharge.amount)
        });
    };
}