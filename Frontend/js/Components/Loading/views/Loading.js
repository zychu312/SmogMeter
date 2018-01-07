import React from 'react';

export default ({caption = 'Wczytywanie...'}) =>
    <div style={{ alignSelf: 'center', margin: '0 auto', textAlign: 'center' }}>
        <i className="fa fa-cog fa-spin fa-4x fa-fw"></i>
        <h1>{caption}</h1>
    </div>;


