import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

const polygonStyle = {
    stroke: '#3C3D48',
    strokeWidth: '0.005',
    fill: 'lightgrey'
}

const iconAsBlock = {
    display: 'block'
}

class AddDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: 3,
            rows: 3,
            height: 1,
            checked: [],
            name: '',
            description: '',
            success: null,
            error: false,
            inProgress: false
        }
    }

    stateToDevice = () => ({
        columns: this.state.columns,
        rows: this.state.rows,
        height: this.state.height,
        checked: this.state.checked,
        name: this.state.name,
        description: this.state.description
    })

    handleTextFactory = ev => {
        this.setState(state => ({ ...state, name: ev.target.value }))
    }

    render() {
        const { onDeviceResized, onClose } = this.props;
        const { columns, rows, inProgress } = this.state;

        return <div style={{ display: 'flex', height: '100%' }}>

            <div style={{ alignSelf: 'center' }}>
                <i
                    onClick={() => this.setState(state => ({ ...state, rows: state.rows > 1 ? state.rows - 1 : state.rows }))}
                    style={iconAsBlock}
                    className="resize-control fa fa-3x fa-minus-circle"
                    aria-hidden="true"
                />

                <h3>Długość {this.state.rows}</h3>

                <i
                    onClick={() => this.setState(state => ({ ...state, rows: state.rows + 1 }))}
                    style={iconAsBlock}
                    className="resize-control fa fa-3x fa-plus-circle"
                    aria-hidden="true"
                />
            </div>

            <div style={{ flexGrow: '1', display: 'flex', flexDirection: 'column' }}>
                <div style={{ margin: '0 auto', textAlign: 'center' }}>
                    <i
                        onClick={() => this.setState(state => ({ ...state, columns: state.columns > 1 ? state.columns - 1 : state.columns }))}
                        className="resize-control fa fa-3x fa-minus-circle"
                        aria-hidden="true"
                    />

                    <h3
                        style={{ display: 'inline', verticalAlign: 'super', margin: '0 10px' }}
                    >Szerokość {this.state.columns}
                    </h3>

                    <i
                        style={{ marginLeft: '10px' }}
                        onClick={() => this.setState(state => ({ ...state, columns: state.columns + 1 }))}
                        className="resize-control fa fa-3x fa-plus-circle"
                        aria-hidden="true"
                    />
                </div>
                <svg
                    width="auto"
                    height="100%"
                    viewBox={`0 0 ${columns} ${rows}`}
                    style={{ padding: '10px' }}
                >
                    {this.drawGrid(rows, columns)}
                </svg>


                <div>

                    <i
                        style={{ display: 'inline' }}
                        onClick={() => this.setState(state => ({ ...state, height: this.state.height > 1 ? --this.state.height : this.state.height }))}
                        className="resize-control fa fa-3x fa-minus-circle"
                        aria-hidden="true"
                    />

                    <h3
                        style={{ display: 'inline', verticalAlign: 'super', margin: '0 10px' }}
                    >Wysokość {this.state.height}</h3>

                    <i
                        style={{ marginLeft: '10px' }}
                        onClick={() => this.setState(state => ({ ...state, height: ++this.state.height }))}
                        className="resize-control fa fa-3x fa-plus-circle"
                        aria-hidden="true"
                    />

                </div>

            </div>

            <div style={{ display: 'flex' }}>

                <div style={{ alignSelf: 'center', marginRight: '5em' }}>
                    <h3 style={{ width: '100%', textAlign: 'center' }}>Dane</h3>
                    <TextField
                        hintText="np. Piec Indukcyjny"
                        floatingLabelText="Nazwa"
                        value={this.state.name}
                        onChange={ev => this.setState({ name: ev.target.value })}
                    /><br />
                    <TextField
                        floatingLabelText="Opis urządznia"
                        hintText="..."
                        value={this.state.description}
                        onChange={ev => this.setState({ description: ev.target.value })}

                    /><br />

                    <RaisedButton
                        label="Zapisz"
                        primary={true}
                        disabled={inProgress}
                        onClick={() => {
                            this.setState({ inProgress: true });
                            this.props.onDeviceAdded(this.stateToDevice())
                                .then(() => {
                                    this.setState(
                                        {
                                            success: true,
                                            inProgress: false,
                                            name: '',
                                            description: '',
                                            checked: []
                                        })
                                })
                                .catch(err => this.setState({ error: true, inProgress: false }))
                            this.setState({
                                name: '',
                                description: '',
                                checked: [],
                            })
                        }}
                    />
                    <RaisedButton
                        label="Zamknij"
                        primary={true}
                        style={{ margin: '12px' }}
                        onClick={() => onClose != null && onClose()}
                    />
                    <Snackbar
                        open={this.state.success}
                        message="DODANO URZĄDZENIE"
                        autoHideDuration={4000}
                        onRequestClose={() => this.setState({ success: false })}
                    />

                    <Snackbar
                        bodyStyle={{ backgroundColor: 'red' }}
                        open={this.state.error}
                        message="WYSTĄPIŁ BŁĄD"
                        autoHideDuration={4000}
                        onRequestClose={() => this.setState({ error: false })}
                    />
                </div>
            </div>

        </div>
    }

    isChecked(x, y) {
        return this.state.checked.reduce((result, { x: X, y: Y }) => {
            if (X == x && Y == y) result = true;
            return result
        }, false)
    }
    toggleCell(x, y) {

        const { checked } = this.state;

        if (this.isChecked(x, y)) {
            this.setState(state => ({
                ...state, checked: checked.filter(({ x: X, y: Y }) => !(X == x && Y == y))
            }))
        } else {
            this.setState(state => ({ ...state, checked: [...state.checked, { x, y }] }))
        }
    }

    drawGrid(rows, columns) {
        return Array.from({ length: rows * columns })
            .map((el, index) => {

                const coords = {
                    x: index % columns,
                    y: Math.floor(index / columns)
                }
                return <rect
                    id={index}
                    {...coords}
                    width="1"
                    height="1"
                    className={this.isChecked(coords.x, coords.y) ?
                        'add-device_cell--selected' : 'add-device_cell'}
                    onClick={() => this.toggleCell(coords.x, coords.y)}
                />
            }
            );
    }

}

import { onDeviceAdd } from '../../Devices/actions'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    onDeviceAdded: device => dispatch(onDeviceAdd(device))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDevice)