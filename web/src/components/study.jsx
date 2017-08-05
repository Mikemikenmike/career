import React from "react";

export default class Study extends React.Component {
    constructor(props) {
        super(props);
        this.words = ["nice", "salad"];
        this.state = {
            authorized: false,
            init: false,
            grammar: `#JSGF V1.0; grammar colors; public <color> = ${this.words.join('|') };`
        };
    }


    async componentDidMount() {
        let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        let SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
        let SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

        let recognition = new SpeechRecognition();
        let speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(this.state.grammar, 1);
        recognition.grammars = speechRecognitionList;
        //recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        let permissions = await this.props.Database.Get(`permissions/${this.props.user.uid}/modules`);
        this.setState({
            authorized: this.props.name in permissions,
            recognition: recognition
        })
    }

    render() {
        return (
            <div className="row">{this.props.match.params.module}
                Nice or Salad


            </div>
            // this.state.authorized ?
            //     <div>study</div>
            //     : <div>unauthorized</div>

        );
    }
}