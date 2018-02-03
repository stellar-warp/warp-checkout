import React from 'react';
import classNames from 'classnames';
import request from 'request-promise';
import './fonts.css';
import './Button.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Input } from 'semantic-ui-react'

class StellarAddressInputStep extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validating: false,
            valid: false
        }
    }

    onChange = (event) => {
        this.setState({valid: false, validating: true});
        request(`https://horizon.stellar.org/accounts/${event.target.value}`)
            .then(() => this.setState({valid: true, validating: false}))
            .catch(() => this.setState({valid: false, validating: false}))
    };

    onClick = (event) => {

        event.preventDefault();
    };

    render() {
        console.log(this.state);
        return (
            <div className="warp-entering">
                <div>
                    <Input type="text" error={!this.state.valid} size='mini' style={{width: "100%"}} name="source" placeholder="Enter your Stellar address..." onChange={this.onChange}/>
                </div>
                <div>
                    <Button primary loading={this.state.validating} disabled={!this.state.valid} size='mini' autocompete={"off"} onClick={this.onClick}>Next</Button>
                </div>
            </div>
        );
    }
}

export default StellarAddressInputStep;