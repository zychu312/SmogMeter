import React from 'react';

const AmCharts = require('@amcharts/amcharts3-react');

const configBase = {
    'type': 'serial',
    'theme': 'light',
    'autoMargin' : true,
    'marginRight': 10,
    'autoMarginOffset': 20,
    'marginTop': 50,
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
        'type': 'smoothedLine',
        'fillAlphas': 0.1,
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
        'fillAlphas': 0.1,
        'valueField': 'pm10',
        'type': 'smoothedLine',
        'useLineColorForBulletBorder': true,
        'balloon': {
            'drop': true
        }
    }
    ],
    // 'chartScrollbar': {
    //     'autoGridCount': true,
    //     'graph': 'g1',
    //     'scrollbarHeight': 40
    // },
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

        const ws = new WebSocket(`ws://${window.location.hostname}:8080`);

        ws.onmessage = msg => {
            const data = JSON.parse(msg.data);
            const withAddedRecord = [...this.state.records,
                { pm25: data.pm25.toFixed(0), pm10: data.pm10.toFixed(0), date: data.date }];

            const last1000 = withAddedRecord.filter((val, index, array) => array.length > 1000 && index == 0 ? false : true);

            this.setState({ records: last1000 });
        };
    }

    render() {
        const config = { ...configBase, dataProvider: this.state.records };
        return <AmCharts.React style={{ height: 'auto', width:'100vw' }} options={config} />;

    }


}