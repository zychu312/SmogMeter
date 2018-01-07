import React from 'react';
import { setInterval } from 'timers';
import { CircleGauge } from 'react-launch-gauge' ;

export default class Gauge extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value : 50};

        setInterval(()=>{
            this.setState({value: this.state.value + (Math.random()*5) - 2.5});
        },1000)

        const ws = new WebSocket("ws://localhost:8080");

        ws.onmessage = msg => console.log(msg);

    }

    render = () => <CircleGauge 
    progressColor='blue'
    progressBkg='lightblue'
    highColor='lightblue'
    startAngle='-110'
    endAngle='110'
    id='gauge'
    value={this.state.value}
    max='300'
     />
}