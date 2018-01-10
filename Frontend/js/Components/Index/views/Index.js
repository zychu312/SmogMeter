import React from 'react';

import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import Loading from '../../Loading/views/Loading';
import History from '../../History/views/History';

import Live from '../../LiveTimeSeries/views/LiveTimeSeries';
import AppBar from 'material-ui/AppBar';
import Gauge from '../../Gauge/views/Gauge';


export default class Index extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
    }

    render() {

        return <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'rgb(0, 188, 212)' }}>
                <h2 style={{ color: '#fffffe', margin: '0', padding: '10px' }}>
                    <i className="fa fa-cloud" aria-hidden="true"></i>
                    <span style={{ marginLeft: '10px' }}>SmogMeter</span>
                </h2>
            </div>

            <div style={{ display: 'flex', alignContent: 'center', flexGrow: 1 }}>
                {this.state.selected == 0 ? <Gauge /> :
                    this.state.selected == 1 ? <Live /> :
                        this.state.selected == 2 ? <History /> : null
                }
            </div>

            <div style={{
                backgroundColor: 'rgb(0, 188, 212)',
                display: 'flex',
                flexDirection: 'row',
                width: '100vw',
                color: '#fffffe',
                textAlign: 'center'
            }}>

                <div
                    className={this.state.selected == 0 ? 'menu__item menu__item--selected' : 'menu__item'}
                    style={{ flexGrow: '1', padding: '10px', paddingBottom: '10px' }}
                    onClick={ev => this.setState({ selected: 0 })}
                >
                    <p className="fa fa-2x fa-tachometer" aria-hidden="true" />
                    <p>Gauges</p>
                </div>
                <div
                    className={this.state.selected == 1 ? 'menu__item menu__item--selected' : 'menu__item'}
                    style={{ flexGrow: '1', padding: '10px', paddingBottom: '10px' }}
                    onClick={ev => this.setState({ selected: 1 })}
                >
                    <p className="fa fa-2x fa-area-chart" aria-hidden="true" />
                    <p>Live Chart</p>
                </div>
                <div
                    className={this.state.selected == 2 ? 'menu__item menu__item--selected' : 'menu__item'}           
                    style={{ flexGrow: '1', padding: '10px', paddingBottom: '10px' }}
                    onClick={ev => this.setState({ selected: 2 })}
                >
                    <p className="fa fa-2x fa-history" aria-hidden="true" />
                    <p>History</p>
                </div>
            </div>
        </div>;
    }
}