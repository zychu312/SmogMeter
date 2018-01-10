import React from 'react';
import { CircleGauge } from 'react-launch-gauge';

export default class Gauge extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: 0 };

        const ws = new WebSocket(`ws://${window.location.hostname}:8080`);

        ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            this.setState({ pm25: data.pm25, pm10: data.pm10 });
        };
    }

    colorFormatterPM25(value) {
        if (value < 0) return 'hsl(115,100%, 70%)';
        if (value >= 0 && value < 100) return `hsl(${-0.82 * value + 115}, 100%, 70%`;
        if (value >= 100 && value < 200) return `hsl(${-0.33 * value + 66}, 100%, 70%`;
        if (value >= 200) return 'hsl(0,100%, 70%)';
    }

    colorFormatterPM10(value) {
        if (value < 0) return 'hsl(115,100%, 70%)';
        if (value >= 0 && value < 200) return `hsl(${-0.45 * value + 115}, 100%, 70%`;
        if (value >= 200 && value < 300) return `hsl(${-0.25 * value + 75}, 100%, 70%`;
        if (value >= 300) return 'hsl(0,100%, 70%)';
    }

    render() {
        return <div style={{ display: 'flex', flexDirection: 'row', flexGrow: '1' }}>
            <div style={{ flexGrow: '1', alignSelf: 'center' }}>
                <h2 style={{ textAlign: 'center' }}>PM<sub> 2.5</sub></h2>
                <CircleGauge
                    progressColor={this.colorFormatterPM25(this.state.pm25)}
                    progressBkg='lightgray'
                    highColor='lightgray'
                    startAngle={-110}
                    endAngle={110}
                    id='gauge'
                    value={this.state.pm25}
                    max={150}
                    wrapStyle={{ margin: '0 auto' }}
                />
            </div>

            <div style={{ flexGrow: '1', alignSelf: 'center' }}>
                <h3 style={{ textAlign: 'center' }}>% of PM<sub> 2.5</sub> norm</h3>
                <CircleGauge
                    progressColor={this.colorFormatterPM25(this.state.pm25)}
                    progressBkg='lightgray'
                    highColor='lightgray'
                    startAngle={-110}
                    endAngle={110}
                    id='gauge'
                    value={(this.state.pm25 / 25) * 100}
                    max={100}
                    wrapStyle={{ margin: '0 auto' }}
                />
            </div>


            <div style={{ flexGrow: '1', alignSelf: 'center' }}>
                <h2 style={{ textAlign: 'center' }}>PM<sub> 10</sub></h2>
                <CircleGauge
                    progressColor={this.colorFormatterPM10(this.state.pm10)}
                    progressBkg='lightgray'
                    highColor='lightgray'
                    startAngle={-110}
                    endAngle={110}
                    id='gauge'
                    value={this.state.pm10}
                    max={300}
                    wrapStyle={{ margin: '0 auto' }}
                />
            </div>

            <div style={{ flexGrow: '1', alignSelf: 'center' }}>
                <h3 style={{ textAlign: 'center' }}>% of PM<sub> 10</sub> norm</h3>
                <CircleGauge
                    progressColor={this.colorFormatterPM10(this.state.pm10)}
                    progressBkg='lightgray'
                    highColor='lightgray'
                    startAngle={-110}
                    endAngle={110}
                    id='gauge'
                    value={((this.state.pm10 / 50) * 100)}
                    max={100}
                    wrapStyle={{ margin: '0 auto' }}
                />
            </div>
        </div>;
    }
}