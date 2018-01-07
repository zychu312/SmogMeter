import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { onHallChosen } from '../actions';
import BackToBuildings from '../../BackTo/views/BackTo';

const HallChooser = props => {

    const { halls, properties, chosenHall } = props;
    const { onHallChosen, backToBuildings } = props;

    if (halls == null) return <BackToBuildings
        onClick={backToBuildings}
        header="Wybierz Budynek" />;

    return <svg
        height="100%"
        width="auto"
        viewBox={properties.viewBox}
    >
        <g transform={properties.transformMatrix}>
            <g transform={properties.transformScale}>
                {halls.map(({ id, points, isContainer }) => <path
                    className={hallClassProvider(isContainer, id, chosenHall)}
                    d={points}
                    onClick={!isContainer ? () => onHallChosen(id) : null}
                />)}
            </g>
        </g>
    </svg>;
};

const hallClassProvider = (isContainer, id, choosenHall) => {
    if (isContainer) return 'shape shape--free-space';
    if (id == choosenHall) return 'shape shape--selected';
    return 'shape';
};

const mapStateToProps = state => {

    const chosenBuilding = state.buildingChooser.chosen;
    const chosenHall = state.hallChooser.chosen;

    if (chosenBuilding == null) return {};

    return {
        halls: state.hallChooser[chosenBuilding].halls,
        properties: state.hallChooser[chosenBuilding].properties,
        chosenHall
    }
}

const mapDispatchToProps = dispatch => ({
    onHallChosen: id => {
        dispatch(onHallChosen(id));
        dispatch({ type: 'VIEW_CHANGED', value: 2 })
    }
    ,
    backToBuildings: () => dispatch({ type: 'VIEW_CHANGED', value: "0" })
})

export default connect(mapStateToProps, mapDispatchToProps)(HallChooser)