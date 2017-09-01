import React from "react";
import update from "immutability-helper";


export default class Clearance extends React.Component {
    constructor(props) {
        super(props);
        this.synth = window.speechSynthesis;
        this.dummy = null;
        this.state = {
            step: 0,
            script: [
                {
                    role: "Greenwood Radio",
                    text: "Jackson Low, Greenwood Radio, Clearance.",
                    speech: "Jackson Low, Greenwood Radio, Clearance.",
                    read: false
                },
                {
                    role: "Jackson Lo",
                    vocab: ["Jackson Low"],
                    text: "Say: Jackson Lo"
                },
                {
                    role: "Greenwood Radio",
                    text: "N24D requesting clearance from VKS to SFE at 1400.",
                    speech: "November two 4 delta requesting clearance from vicksburg airport to santa fe airport at 1 4000",
                    read: false
                },
                {
                    role: "Jackson Lo",
                    vocab: ["Will the pilot of november two 4 delta accept a north east departure with turns"],
                    text: "Say: Will the pilot of november two 4 delta accept a north east departure with turns?"
                },
                {
                    role: "Greenwood Radio",
                    text: "Affirmative",
                    speech: "Affirmative",
                    read: false
                },
                {
                    role: "Jackson Lo",
                    vocab: ["Expect departure clearance 1800"],
                    text: "Say: Expect departure clearance 1800, <initials>"
                },
                {
                    role: "Jackson Lo",
                    vocab: ["Monroe Lo, Jackson Lo, APREQ"],
                    text: "Say: Monroe Lo, Jackson Lo, apreq"
                },
                {
                    role: "Monroe Lo",
                    text: "Monroe Lo, go ahead",
                    speech: "Monroe Low, go ahead",
                    read: false
                },
                {
                    role: "Jackson Lo",
                    vocab: ["In suspense, november two four delta assumed vicksburg departure 1800 climbing to 1400 via victor 417, monroe vortac, then as filed."],
                    text: "Say: In suspense, N24D assumed VKS departure 1800, climbing to 1400, via V417, Monroe, then as filed."
                },
                {
                    role: "Monroe Lo",
                    text: "Approved, CG",
                    speech: "Approved, CG",
                    read: false
                },
                {
                    role: "Jackson Lo",
                    vocab: [""],
                    text: "Say: <initials>"
                },
                {
                    role: "Jackson Lo",
                    vocab: ["Greenwood radio, Jackson Lo, Clearance"],
                    text: "Say: Greenwood radio, jackson lo, clearance"
                },
                {
                    role: "Greenwood Radio",
                    text: "Greenwood Radio",
                    speech: "Greenwood Radio",
                    read: false
                },
                {
                    role: "Jackson Lo",
                    vocab: ["November two 4 delta cleared from vicksburg airport to santa fe airport via depart northeast, turn left fly heading 330 until joining victor 417. " +
                    "Victor 417, Monroe, then as filed. Cross 31 miles southeast Monroe VORTAC estabilished on Victor 417 at or above 7000, climb and maintain 1400. " +
                    "If not off by 1800, advise Aero Center not later than 1810 of intentions. Verify this clearance allows for compliance with local traffic pattern and terrain or obstruction clearance."],
                    text: "Say: N24D cleared from VKS airport to santa fe airport via depart northeast, turn left fly heading 330 until joining V417. " +
                    "V417, Monroe, then as filed. Cross 31 miles southeast Monroe VORTAC, established on V417, at or above 7000. Climb and maintain 14000. " +
                    "If not off by 1800, advise Aero Center not later than 1810 of intentions. Verify this clearance allows for compliance with local traffic pattern and terrain or obstruction clearance. [Initials]"
                },
                {
                    role: "Greenwood Radio",
                    text: "Sure, cool man.",
                    speech: "Sure, cool man",
                    read: false
                }
            ]
        }
    }

    componentDidMount() {
        this.read();
    }

    componentDidUpdate() {
        this.read();
    }

    read = () => {
        if (this.state.script[this.state.step].role != "Jackson Lo" && !this.state.script[this.state.step].read) {
            setTimeout(() => {
                try {
                    let utterThis = new SpeechSynthesisUtterance(this.state.script[this.state.step].speech);

                    utterThis.onend = () => {
                        this.update_state({
                            step: {$set: (this.state.step < this.state.script.length - 1 ) ? this.state.step + 1 : this.state.step},
                            script: {[this.state.step]: {read: {$set: true}}}
                        })
                    };

                    utterThis.onerror = () => {
                        console.log("oh no!")
                    };

                    this.synth.speak(utterThis);
                } catch (err) {
                    console.log(err);
                }
            }, 500);
        }
        this.dummy.scrollIntoView();
    };

    update_state = (inc) => {
        this.setState(update(this.state, inc));
    };


    render() {
        return (
            <div>
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            {this.state.script.map((script, i) => {
                                if (i <= this.state.step) {
                                    return <article className={`message ${script.role == "Greenwood Radio" && "is-info"} ${script.role == "Monroe Lo" && "is-primary"} ${script.role == "Jackson Lo" && "is-dark"}`} key={i}>
                                        <div className="message-header">
                                            <p>{script.role}</p>
                                            <button className="delete" aria-label="delete"/>
                                        </div>
                                        <div className="message-body">{script.text}</div>
                                    </article>
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div ref={dummy => this.dummy = dummy}>

                </div>


                <a className="button is-large is-primary" style={{position: "fixed", bottom: 24, right: 24}} disabled={this.state.script[this.state.step].role != "Jackson Lo" && true} onClick={() => {
                    try {
                        let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                        let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
                        let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
                        let grammar = '#JSGF V1.0; grammar colors; public <clearance> = ' + this.state.script[this.state.step].vocab.join(' | ') + ' ;'
                        let recognition = new SpeechRecognition();
                        let speechRecognitionList = new SpeechGrammarList();
                        speechRecognitionList.addFromString(grammar, 1);
                        recognition.grammars = speechRecognitionList;
                        //recognition.continuous = false;
                        recognition.lang = 'en-US';
                        recognition.interimResults = false;
                        recognition.maxAlternatives = 1;

                        recognition.start();

                        recognition.onresult = (event) => {
                            let last = event.results.length - 1;
                            let color = event.results[last][0].transcript;
                            console.log(color);
                            console.log('Confidence: ' + event.results[0][0].confidence);
                            this.update_state({
                                script: {[this.state.step]: {text: {$set: event.results[last][0].transcript}}},
                                step: {$set: this.state.step + 1}
                            })

                        };

                        recognition.onspeechend = () => {
                            recognition.stop();
                        };

                    } catch (e) {
                        console.log(e);
                    }
                }}><span
                    className="icon is-large">
      <i className="fa fa-microphone"/>
    </span></a>
            </div>
        );
    }
}