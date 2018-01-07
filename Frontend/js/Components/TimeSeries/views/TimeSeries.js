import React from 'react';

const AmCharts = require('@amcharts/amcharts3-react');

const configBase = {
    'type': 'serial',
    'theme': 'light',
    'marginRight': 80,
    'autoMarginOffset': 20,
    'marginTop': 7,
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

export default class TimeSeries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            records: []
        };

        fetch('/records')
            .then(data => data.json())
            .then(records => this.formatRecords(records))
            .then(records => this.setState({ records }))
            .catch(err => console.log(`Err while fetching records ${err}`));
    }

    formatRecords = records => new Promise(
        resolve => resolve(records
            .map(({ pm10, pm25, date }) => ({ pm10: pm10.toFixed(0), pm25: pm25.toFixed(0), date }))));

    render() {
        const config = { ...configBase, dataProvider: this.state.records };
        return <AmCharts.React style={{ height: '100vh' }} options={config} />;

    }


}