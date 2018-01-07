import React from 'react';
import { connect } from 'react-redux';

const classUponState = isActive => isActive ? 'li-item li-item__active' : 'li-item';

const Routes = ({ onAddToggle, onRemoveToggle, isAddActive, isRemoveActive }) =>
    <ul className="li">
        <li className="li-header li-header__small">Drogi Transportowe</li>

        <li className={classUponState(isAddActive)} onClick={() => onAddToggle()}>
            <span>Dodaj</span>
        </li>

        <li className={classUponState(isRemoveActive)} onClick={() => onRemoveToggle()}>
            <span>Usuń</span>
        </li>
    </ul>;

const mapDispatchToProps = dispatch => ({
    onAddToggle: () => dispatch({ type: 'TOGGLE_ADD_ROUTES' }),
    onRemoveToggle: () => dispatch({ type: 'TOGGLE_REMOVE_ROUTES' }),
});
const mapStateToProps = state => ({
    devices: state.devices.devices,
    isAddActive: state.hallPlanView.isAddRoutesActive,
    isRemoveActive: state.hallPlanView.isRemoveRoutesActive
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);