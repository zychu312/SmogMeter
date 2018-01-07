import React from 'react';

export default ({ device }) =>
    <ul className="li">
        <li className="li-header">Parametry</li>
        <li className={`li-item ${!device.name ? "li-item__hidden": ""}`}>Nazwa: {device.name}</li>
        <li className={`li-item ${!device.description ? "li-item__hidden": ""}`}>Opis: {device.description}</li>
    </ul>


