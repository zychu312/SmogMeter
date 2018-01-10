import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const AmCharts = require('@amcharts/amcharts3-react');

const configBase = {
    'type': 'serial',
    'theme': 'light',
    'autoMargin': true,
    'autoMarginOffset': 20,
    'dataProvider': null,
    'minSelectedTime': 0,
    'valueAxes': [{
        'axisAlpha': 0.2,
        'dashLength': 1,
        'position': 'left'
    }],
    'mouseWheelZoomEnabled': true,
    'graphs': [{
        'id': 'g1',
        'balloonText': 'PM<sub>2.5</sub> [[value]]',
        'bullet': 'round',
        'bulletBorderAlpha': 1,
        'bulletColor': '#FFFFFF',
        'hideBulletsCount': 50,
        'title': 'red line',
        'valueField': 'pm25',
        'useLineColorForBulletBorder': true,
        'balloon': {
            'drop': true
        }
    }, {
        'id': 'g2',
        'balloonText': 'PM<sub>10</sub> [[value]]',
        'bullet': 'round',
        'bulletBorderAlpha': 1,
        'bulletColor': '#FFFFFF',
        'hideBulletsCount': 50,
        'title': 'red line',
        'valueField': 'pm10',
        'useLineColorForBulletBorder': true,
        'balloon': {
            'drop': true
        }
    }
    ],
    'chartScrollbar': {
        'autoGridCount': true,
        'graph': 'g1',
        'scrollbarHeight': 40
    },
    'chartCursor': {
        'limitToGraph': 'g1'
    },
    'categoryField': 'date',
    'categoryAxis': {
        'parseDates': true,
        'minPeriod': 'ss',
        'axisColor': '#DADADA',
        'dashLength': 1,
        'minorGridEnabled': true
    },
    'export': {
        'enabled': false
    }
};

import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import Loading from '../../Loading/views/Loading';
import RaisedButton from 'material-ui/RaisedButton';


const optionsStyle = {
    maxWidth: 255,
    marginRight: 'auto',
};

export default class History extends React.Component {

    constructor(props) {
        super(props);

        const minDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const maxDate = new Date();

        this.state = {
            minDate,
            maxDate,
            autoOk: false,
            disableYearSelection: false,
            records: null
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleChangeMinDate = this.handleChangeMinDate.bind(this);
        this.handleChangeMaxDate = this.handleChangeMaxDate.bind(this);

        this.fetchData();

    }

    fetchData() {

        this.setState({ records: null });

        fetch(`/records/${this.state.minDate.getTime()}/${this.state.maxDate.getTime()}`)
            .then(data => data.json())
            .then(records => this.formatRecords(records))
            .then(records => this.setState({ records }))
            .catch(err => console.log(`Err while fetching records ${err}`));
    }

    handleChangeMinDate(event, date) {
        this.setState({
            minDate: date,
        });
    }

    handleChangeMaxDate(event, date) {
        this.setState({
            maxDate: date,
        });
    }

    formatRecords(records) {
        return new Promise(
            resolve => resolve(records
                .map(({ pm10, pm25, date }) => ({ pm10: pm10.toFixed(0), pm25: pm25.toFixed(0), date }))));
    }

    render() {

        if (this.state.records == null) return <Loading />;

        const config = { ...configBase, dataProvider: this.state.records };

        return <div style={{ display: 'flex', flexDirection: 'row', width: '100vw' }}>
            <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                <h2><i className="fa fa-calendar" aria-hidden="true" /> Timespan </h2>
                <DatePicker
                    onChange={this.handleChangeMinDate}
                    autoOk={this.state.autoOk}
                    floatingLabelText="Start Date"
                    defaultDate={this.state.minDate}
                    disableYearSelection={this.state.disableYearSelection}
                    maxDate={this.state.maxDate}
                />

                <DatePicker
                    onChange={this.handleChangeMaxDate}
                    autoOk={this.state.autoOk}
                    floatingLabelText="End Date"
                    minDate={this.state.minDate}
                    defaultDate={this.state.maxDate}
                    disableYearSelection={this.state.disableYearSelection}
                />

                <RaisedButton label="Apply" primary={true} onClick={this.fetchData} />


            </div>

            <div style={{ flexGrow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {this.state.records.length == 0 ?
                    <h1>No data in selected timespan <i className="fa fa-frown-o" aria-hidden="true"></i></h1>
                    :
                    <AmCharts.React style={{ height: '100%', width: '100%' }} options={config} />}
            </div>
        </div >;

    }


}