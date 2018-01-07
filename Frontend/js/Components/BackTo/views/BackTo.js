import React from 'react';

export default ({onClick, header}) =>
    <div style={{ height: '100%', display: 'flex' }}>
        <div
            onClick={onClick}
            style={{
                margin: '0 auto',
                alignSelf: 'center',
                cursor: 'pointer'
            }}
        >
            <h1>{header}</h1>
            <i
                className="icon--back fa fa-4x fa-chevron-circle-left" aria-hidden="true" />
        </div>
    </div>