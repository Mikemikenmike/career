import React from "react";
import uuid from 'uuid';
// import j4 from "../images/j4";

// console.log(uuid);


export default class Study extends React.Component {
    constructor(props) {
        super(props);
        this.words = ["descend and maintain flight level two eight zero"];
        this.state = {
            authorized: false,
            init: false,
            grammar: `#JSGF V1.0; grammar colors; public <color> = ${this.words.join('|') };`
        };
    }

    async componentDidMount() {
        let recognition = new SpeechRecognition();
        let speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(this.state.grammar, 1);
        recognition.grammars = speechRecognitionList;
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onresult = this.recognitionOnResult.bind(this);
        recognition.onspeechend = this.recognitionOnSpeechEnd.bind(this);

        recognition.start();

        let permissions = await this.props.Database.Get(`permissions/${this.props.user.uid}/modules`);

        this.setState({
            authorized: this.props.name in permissions,
            recognition: recognition
        })
    }

    componentWillUnmount() {
        if (this.state.recognition) {
            this.state.recognition.stop();
        }
    }

    render() {
        return (
            <div className="row">
                {airplanes.map((aircraft, i) => {
                    return <Flashcard key={i} data={aircraft}/>
                })}
                {/*<div className="col s12 m8 offset-m2">*/}
                {/*<div className="card-panel default-secondary-color center-align">*/}
                {/*Descend and Maintain FL280*/}
                {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }

    recognitionOnResult(event) {
        let last = event.results.length - 1;
        let word = event.results[last][0].transcript;
        console.log(`${word}: ${event.results[0][0].confidence}`);
        console.log(`Match: ${this.words.indexOf(word.toLowerCase()) > -1}`);
        // console.log('Confidence: ' + event.results[0][0].confidence);
    }

    recognitionOnSpeechEnd(event) {
        this.state.recognition.stop();
    }
}

let speech = [
    "descend and maintain flight level two three zero",
    "reduce speed by 50 knots"
];


export class Flashcard extends React.Component {
    constructor(props) {
        super(props);
        this.uuid = uuid.v4();
        console.log(this.uuid);
        this.state = {
            selected: '',
            correct: null
        }
    }

    render() {
        return (
            <div className="col s12 m8 offset-m2">
                <div className={`card ${this.state.correct ? "success-color" : this.state.answered && "danger-color"}`}>
                    <div className="card-image">
                        <img src={this.props.data.img}/>
                        {this.state.correct && <span className="card-title">{this.props.data.ans}</span>}
                    </div>
                    <div className={`card-content`}>
                        <div onChange={(event) => {
                            this.setState({selected: event.target.value})
                        }}>
                            {this.props.data.choices.map(choice => {
                                return <p key={choice + this.uuid}>
                                    <input name={this.uuid}
                                           className="with-gap"
                                           type="radio"
                                           id={choice + this.uuid}
                                           value={choice}
                                           checked={choice == this.state.selected}/>
                                    <label htmlFor={choice + this.uuid} className={'primary-text'}>{choice}</label>
                                </p>
                            })}
                        </div>
                    </div>
                    <div className={`card-action`}>
                        <a onClick={() => {
                            if (this.state.selected == this.props.data.ans) {
                                this.setState({correct: true, answered: true});
                            } else {
                                this.setState({correct: false, answered: true});
                            }
                        }}>Check</a>
                    </div>
                </div>
            </div>
        );
    }
}

let airplanes = [
    {
        img: 'https://c1.staticflickr.com/3/2597/3821785284_12ba4cd904_b.jpg',
        choices: ["B747", "Bonanza", "C172", "Cub"],
        ans: "Cub",
        vocal: "cub"
    },
    {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Cessna172-CatalinaTakeOff.JPG/640px-Cessna172-CatalinaTakeOff.JPG',
        choices: ["B747", "Bonanza", "C172", "Cub"],
        ans: "C172",
        vocal: "cessna one seventy two"
    },
    {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Beech_Bonanza_35.jpg/1280px-Beech_Bonanza_35.jpg',
        choices: ["B747", "Bonanza", "C172", "Cub"],
        ans: "Bonanza",
        vocal: "bonanza"
    },
    {
        img: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Lufthansa_Boeing_747-8_%2816278574162%29.jpg',
        choices: ["B747", "Bonanza", "C172", "Cub"],
        ans: "B747",
        vocal: "boeing seven forty seven"
    }
];
