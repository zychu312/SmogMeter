import React from 'react';

import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import BuildingChooser from '../../BuildingChooser/views/BuildingChooser';
import HallChooser from '../../HallChooser/views/HallChooser';
import HallPlanView from '../../HallPlanView/views/HallPlanView';
import Wrapper from '../../FullScreenWrapper/views/FullScreenWrapper';
import Loading from '../../Loading/views/Loading';
import Authorization from '../../Authorization/views/Authorization';
import TimeSeries from '../../TimeSeries/views/TimeSeries';

import Gauge from '../../Gauge/views/Gauge';

const Index = () => {

    return <div>
        <Gauge />
        <TimeSeries />
    </div>;
};

const mapStateToProps = state => ({
    view: state.index.view,
    isAuthorized: state.authorization.token != null
});

const mapDispatchToProps = dispatch => ({
    onViewChanged: value => dispatch({ type: 'VIEW_CHANGED', value })
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);
