import React from 'react';

const ArrowBuilder = UpOrDown => ({ onClick }) =>
    <svg
        className="arrow" 
        onClick={() => onClick()}
        style={{ cursor: 'pointer' }}
        width="100%"
        height="33%"
        viewBox="0 0 100 50" >
        <polyline
            stroke="inherit"
            points={UpOrDown === 'up' ? '5,45 50,0 95,45' : '5,5 50,50 100,5'}
        />
    </svg>;

export const ArrowUp = ArrowBuilder('up');
export const ArrowDown = ArrowBuilder('down');