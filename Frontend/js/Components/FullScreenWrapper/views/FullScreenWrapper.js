import React from 'react'

export default ({ children }) =>
    <div style={{
        position: 'absolute',
        top: '46px',
        bottom: '0',
        width: '100%'
    }}>
        {children}
    </div>