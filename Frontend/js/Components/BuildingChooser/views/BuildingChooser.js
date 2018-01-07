import React from 'react';
import { connect } from 'react-redux';

const classUponIsSelected = isSelected => isSelected ? 'shape shape--selected' : 'shape';

const BuildingChooser = ({ buildings, onBuildingChosen, chosen }) =>
    <svg width="auto" height="100%" viewBox="0 0 224.4 170.77">
        <g transform="matrix(1.3333 0 0 -1.3333 -217.56 237.07)">
            <g transform="scale(.1)">
                {buildings.map(building => <path
                    {...building}
                    key={building.id}
                    className={classUponIsSelected(chosen == building.id)}
                    onClick={() => onBuildingChosen(building.id)} />)}
            </g>
        </g>
    </svg>;

const mapStateToProps = state => ({
    chosen: state.buildingChooser.chosen,
    buildings: [{
        id: '0',
        d: 'm2401.3 1042.1 615.01 0.11 0.01-52.539h158.23v-454.85l-773.2-0.129-0.05 507.4'
    }, {
        id: '1',
        d: 'm1669.2 1740.5h1608v-541.8h-261l0.06-49.79h-615.01l-0.05 49.19-732 0.6v541.8'
    }]
});

import { onBuildingChosen } from '../actions';

const mapDispatchToProps = dispatch => ({
    onBuildingChosen: id => {
        dispatch(onBuildingChosen(id));
        dispatch({ type: 'VIEW_CHANGED', value: 1 });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildingChooser);