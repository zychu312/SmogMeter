import React from 'react';
import { connect } from 'react-redux';
import LevelSelector from '../../LevelSelector/views/LevelSelector';
import Details from '../../DetailsView/views/DetailsView';
import Devices from '../../DevicesList/views/DevicesList';
import Routes from '../../Routes/views/Routes';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { onCellChosen, onSaveHall, getHall } from '../actions';
import Snackbar from 'material-ui/Snackbar';
import Loading from '../../Loading/views/Loading';
import BackToHalls from '../../BackTo/views/BackTo';

const uuid = require('uuid/v4');

class HallPlanView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dragOverCords: {
                x: null,
                y: null
            },
            translation: null,
            inDraw: false,
            selectedDevice: null,
            saveError: false,
            saveSuccess: false,
            saveInProgress: false,
            devices: [],
            routes: [],
            domain: '0.1'
        }
    }

    stateToHall = () => ({
        devices: this.state.devices,
        routes: this.state.routes,
        domain: this.state.domain
    })

    componentDidMount() {
        getHall('0.1')
            .then(state => {
                state.saveError = false;
                state.saveSuccess = false;
                state.saveInProgress = false;
                state.isLoaded = false;
                this.setState(state);
                this.setState({ isLoaded: true })
            })
            .catch(error => error == 'isNull' && this.setState({ isLoaded: true }))
    }

    addToRoutes = ({ x, y }) => {
        this.setState({ routes: [...this.state.routes, { x, y }] })
    }

    removeFromRoutes = ({ x, y }) => {
        this.setState({ routes: this.state.routes.filter(({ x: X, y: Y }) => !(x == X && y == Y)) });
    }

    cellFillUponParams = (x, y, color) => {

        const { x: dragX, y: dragY } = this.state.dragOverCords;
        const { width: dragWidth, length: dragLength } = this.props.draggedSize;

        if (!(dragX && dragY)) return color;

        if (x >= dragX && x < dragX + dragWidth &&
            y >= dragY && y < dragY + dragLength)
            return '#99ff66'

        return color;
    }

    getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        const { onCellChosen, cells, backToHalls, draggedSize, level, lastPhysicalLevel } = this.props;
        const { isAddRoutesActive, isRemoveRoutesActive } = this.props;
        const { devices, routes } = this.state;

        if (cells == null) return <BackToHalls
            onClick={backToHalls}
            header="Wybierz Hale" />

        return <div style={{ width: '100%', height: '100%', padding: '30px', paddingBottom: '10px' }}>
            <div className="col-xs-1" style={{ height: '100%', padding: '0' }}>
                <LevelSelector />
            </div>

            {this.state.isLoaded ?
                <div className="col-xs-9" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}>
                    <svg
                        style={{ height: 'auto', display: 'flex', flexGrow: '1' }}
                        draggable="true" width="100%" viewBox="0 0 27 15">
                        {cells.map(({ id, x, y, color, isActive }) => {
                            if (!isActive) return;

                            return <rect
                                draggable="true"
                                onDragOver={
                                    ev => {
                                        ev.preventDefault();
                                        this.setState({ dragOverCords: { x, y } });
                                    }
                                }

                                onMouseDown={ev => {
                                    if (isAddRoutesActive) {
                                        this.setState({ inDraw: true })
                                        this.addToRoutes({ x, y });
                                    } else if (isRemoveRoutesActive) {
                                        this.setState({ inDraw: true })
                                        this.removeFromRoutes({ x, y })
                                    }
                                }}

                                onMouseOver={
                                    ev => {

                                        if (this.state.inDraw) {
                                            if (isAddRoutesActive) this.addToRoutes({ x, y });
                                            if (isRemoveRoutesActive) this.removeFromRoutes({ x, y })
                                        }

                                        if (!this.state.translation) return;

                                        const { activeDevice, xp, yp } = this.state.translation;

                                        const newDevices = this.state.devices.map(device => {
                                            if (device.id == activeDevice) {
                                                const device0 = { ...device, x: x - xp };
                                                return { ...device0, y: y - yp }
                                            } else return device;
                                        })

                                        this.setState({ devices: newDevices })
                                    }
                                }
                                onMouseUp={
                                    ev => {
                                        this.setState({ translation: null })
                                        if (isAddRoutesActive || isRemoveRoutesActive) {
                                            this.setState({ inDraw: false })
                                        }
                                    }
                                }
                                onClick={ev => this.setState({ selectedDevice: null })}

                                onDrop={
                                    ev => {
                                        ev.preventDefault();
                                        this.setState({ dragOverCords: { x: null, y: null } });
                                        const device = JSON.parse(ev.dataTransfer.getData('text'));
                                        this.setState({
                                            devices: [...this.state.devices, {
                                                id: uuid(),
                                                name: device.name,
                                                description: device.description,
                                                x,
                                                y,
                                                points: device.checked,
                                                width: device.columns,
                                                length: device.rows,
                                                color: this.getRandomColor(),
                                                height: device.height,
                                                level
                                            }]
                                        });
                                    }
                                }

                                key={id}
                                x={x}
                                y={y}
                                style={{ fill: this.cellFillUponParams(x, y, color) }}
                                height="1"
                                width="1"
                                className={isAddRoutesActive || isRemoveRoutesActive ? 'cell cell__edit-routes' : 'cell'}
                            />
                        })}

                        {devices && devices
                            .filter(device => level >= lastPhysicalLevel ? device.level == level : true)
                            .filter(device => level < device.level + device.height)
                            .filter(device => level >= device.level)
                            .map(device => {
                                const { id, x, y, points, color, rotation = 0 } = device;
                                return points
                                    .map(({ x, y }) => ({
                                        x: (x * Math.cos(rotation) - y * Math.sin(rotation)),
                                        y: (x * Math.sin(rotation) + y * Math.cos(rotation))
                                    }))
                                    .map(point => <rect
                                        x={x + point.x}
                                        y={y + point.y}
                                        style={{
                                            fill: color,
                                        }}
                                        height="1"
                                        width="1"
                                        className="cell"
                                        onContextMenu={
                                            ev => {
                                                ev.preventDefault();
                                                this.setState({
                                                    devices: devices.map((device) => {
                                                        if (id == device.id) {
                                                            return { ...device, rotation: device.rotation == null ? Math.PI / 2 : device.rotation + Math.PI / 2 }
                                                        }
                                                        return device;
                                                    })
                                                })
                                            }
                                        }
                                        onMouseDown={
                                            ev => this.setState({
                                                translation: {
                                                    activeDevice: id,
                                                    x0: x,
                                                    y0: y,
                                                    xp: point.x,
                                                    yp: point.y
                                                }
                                            })
                                        }
                                        onMouseOver={
                                            ev => {
                                                if (!this.state.translation) return;

                                                const { activeDevice, xp, yp } = this.state.translation;

                                                const newDevices = this.state.devices
                                                    .map(device => {
                                                        if (device.id == activeDevice) {
                                                            const device0 = { ...device, x: x + point.x - xp };
                                                            return { ...device0, y: y + point.y - yp }
                                                        } else return device;
                                                    })

                                                this.setState({ devices: newDevices })
                                            }
                                        }
                                        onMouseUp={
                                            ev => this.setState({ translation: null })
                                        }
                                        onClick={
                                            ev => this.setState({ selectedDevice: id })
                                        }
                                    />)
                            })}

                        {routes.map(({ x, y }) => <rect
                            height="1"
                            width="1"
                            className="cell cell__route"
                            x={x}
                            y={y}
                            onMouseUp={
                                ev => {
                                    if (isAddRoutesActive || isRemoveRoutesActive)
                                        this.setState({ inDraw: false })
                                }
                            }

                            onMouseDown={ev => {
                                if (isRemoveRoutesActive) {
                                    this.setState({ inDraw: true })
                                    this.removeFromRoutes({ x, y })
                                }
                            }}

                            onMouseOver={
                                ev => {
                                    if (isRemoveRoutesActive && this.state.inDraw) {
                                        this.removeFromRoutes({ x, y })
                                    }

                                    if (!this.state.translation) return;

                                    const { activeDevice, xp, yp } = this.state.translation;

                                    const newDevices = this.state.devices.map(device => {
                                        if (device.id == activeDevice) {
                                            const device0 = { ...device, x: x - xp };
                                            return { ...device0, y: y - yp }
                                        } else return device;
                                    })

                                    this.setState({ devices: newDevices })
                                }
                            }
                        />)}

                    </svg>

                    <div style={{ display: 'flex', padding: '10px' }}>
                        <FloatingActionButton
                            disabled={this.state.saveInProgress}
                            style={{ margin: '0 auto' }}
                            onClick={() => {

                                const timer = setTimeout(() => this.setState({ saveInProgress: true }), 100)

                                onSaveHall(this.stateToHall())
                                    .then(() => {
                                        clearInterval(timer)
                                        this.setState({ saveSuccess: true })
                                        this.setState({ saveInProgress: false })

                                    })
                                    .catch(err => {
                                        clearInterval(timer)
                                        this.setState({ saveError: true })
                                        this.setState({ saveInProgress: false })
                                    })
                            }}
                        >
                            {this.state.saveInProgress ?
                                <i className="fa fa-cog fa-spin fa-3x fa-fw" />
                                :
                                <i className="fa fa-2x fa-floppy-o" aria-hidden="true" />
                            }
                        </FloatingActionButton>
                    </div>
                </div>
                :
                <div className="col-xs-9" style={{ height: '100%', display: 'flex' }}>
                    <Loading />
                </div>
            }

            <div className="col-xs-2" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Details device={this.state.devices.reduce((result, device) => device.id == this.state.selectedDevice ? device : result, {})} />
                <Devices />
                <Routes />
            </div>

            <Snackbar
                bodyStyle={{ backgroundColor: 'green', textAlign: 'center' }}
                open={this.state.saveSuccess}
                message="Zapisano kofiguracje"
                autoHideDuration={4000}
                onRequestClose={() => this.setState({ saveSuccess: false })}
            />

            <Snackbar
                bodyStyle={{ backgroundColor: 'red', textAlign: 'center' }}
                open={this.state.saveError}
                message="Wystąpił błąd"
                autoHideDuration={4000}
                onRequestClose={() => this.setState({ saveError: false })}
            />
        </div >
    }
}

const mapStateToProps = state => {

    const building = state.buildingChooser.chosen;
    const hall = state.hallChooser.chosen;

    const id = state.hallChooser.chosen.toString();
    const level = state.levelSelector.level;

    if (id == null || level == null || building == null || hall == null) return {};

    if (state.hallPlanView.cells[id] == null) return {};

    const cells = state.hallPlanView.cells[id];

    const { draggedSize, isAddRoutesActive, isRemoveRoutesActive } = state.hallPlanView;

    const lastPhysicalLevel = state.levelSelector.lastPhysicalLevel;

    return { cells, draggedSize, level, lastPhysicalLevel, isAddRoutesActive, isRemoveRoutesActive }
}


const mapDispatchToProps = dispatch => ({
    onCellChosen: id => dispatch(onCellChosen(id)),
    backToHalls: () => dispatch({ type: 'VIEW_CHANGED', value: 1 })
})

export default connect(mapStateToProps, mapDispatchToProps)(HallPlanView)