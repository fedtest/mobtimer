import React from 'react';
import { connect } from 'react-redux';
import RadialCounter from '../RadialCounter/RadialCounter';

import './SimpleTimeView.css';

const SimpleTimeView = ({ children, secondsLeft, sessionLength, onClick = () => (false) }) => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return (
        <div className="SimpleTimeView" onClick={onClick}>
            <RadialCounter className="SimpleTimeView-circle" value={secondsLeft} maxValue={sessionLength} size="400" />
            <div className="SimpleTimeView-clock">
                <span>{`${mins}:${secs < 10 ? '0' : ''}${secs}`}</span>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    secondsLeft: state.time.secondsLeft,
    sessionLength: state.settings.sessionLength,
});
export default connect(mapStateToProps)(SimpleTimeView);
