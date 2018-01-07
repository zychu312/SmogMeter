import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import AddDevices from '../../AddDevices/views/AddDevices';
import { getDevices } from '../../Devices/actions';

const EMPTY_IMG = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

class DevicesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModelOpen: false
        };
    }

    componentDidMount() {
        this.props.getDevices();
    }

    
    render() {
        const { devices, onDeviceDragged } = this.props;
        const { isModelOpen } = this.state;

        return <ul className="li">
            <li className="li-header">Urządzenia</li>

            {devices.map(device => <li
                className="li-item"
                draggable="true"
                onDragStart={ev => {
                    onDeviceDragged(device);
                    ev.dataTransfer.setData('text', JSON.stringify(device));
                    var img = document.createElement('img');
                    img.src = EMPTY_IMG;
                    ev.dataTransfer.setDragImage(img, 0, 0);
                }}
            >
                {device.name}
            </li>)}
    
            <li className="li-item" onClick={() => {
                this.setState({ isModelOpen: true });
            }}>

                Dodaj
            </li>


            {isModelOpen && <div style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                margin: '0',
                padding: '1em',
                backgroundColor: 'rgb(252,252,252)',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                overflow: 'hidden',

            }}>
                <AddDevices onClose={() => this.setState({ isModelOpen: false })} />
            </div>}

        </ul>;
    }
}

const mapDispatchToProps = dispatch => ({
    onDeviceDragged: device => {

        const size = {
            width: device.columns,
            length: device.rows
        };
        dispatch({ type: 'DEVICE_DRAGGED', size });
    },
    getDevices : () => dispatch(getDevices())
});
const mapStateToProps = state => {
    return {
        devices: state.devices.devices
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesList);