import React from 'react';
import { connect } from 'react-redux';
import { ArrowUp, ArrowDown } from './Arrows';

const captionContainerStyle = { height: '33%', width: '100%', display: 'flex', cursor: 'default' }

const captionStyleUponLength = length => ({
    fontFamily: 'Work Sans',
    fontSize: length >= 3 ? '3em' : '5em',
    textAlign: 'center',
    color: 'rgb(60, 61, 72)',
    margin: '0',
    writingMode: length >= 3 ? 'vertical-rl' : 'inherit',
    transform: length >= 3 ? 'rotateX(180)' : 'inherit'
});

const subCaptionStyle = {
    fontFamily: 'Work Sans',
    fontSize: '1.5em',
    textAlign: 'center',
    color: 'rgb(60, 61, 72)'
};

const LevelSelector = ({ onLevelUp, onLevelDown, caption }) => (

    <div style={{ height: '100%' }}>

        <ArrowUp onClick={onLevelUp} />

        <div style={captionContainerStyle}>
            <div style={{ alignSelf: 'center', margin: '0 auto' }}>
                <p style={captionStyleUponLength(caption.length)}>
                    {caption}
                </p>
                <p style={subCaptionStyle}>
                    {caption.length <= 3 && 'Poziom'}
                </p>
            </div>
        </div>
        <ArrowDown onClick={onLevelDown} />

    </div >
);

import { onLevelUp, onLevelDown } from '../actions';

const mapDispatchToProps = dispatch => ({
    onLevelUp: () => dispatch(onLevelUp()),
    onLevelDown: () => dispatch(onLevelDown())
});

const mapStateToProps = state => {

    const level = state.levelSelector.level;
    const caption = state.levelSelector.captions.hasOwnProperty(level) ?
        state.levelSelector.captions[level] : String(level);

    return {
        level: state.levelSelector.level,
        caption
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelector);