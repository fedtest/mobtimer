import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import UserList from '../UserList/UserList.jsx';
// import Intermezzo from '../Intermezzo/Intermezzo.jsx';
import Notification from '../Notification/Notification.jsx';
// import CountDownWrapper from '../CountdownWrapper/CountDownWrapper.jsx';
import SettingsView from '../SettingsView/SettingsView';
import TimeControl from '../TimeControl/TimeControl.jsx';
import SimpleTimeView from '../SimpleTimeView/SimpleTimeView';
// import RadialCounter from '../RadialCounter/RadialCounter';
import { nextUser } from '../../redux/user/user_actions';
import { setRunning } from '../../redux/time/time_actions';

import Icon from '../Icon/Icon';

class App extends Component {
  constructor() {
      super();
      this.state = { showSettings: false };
      this.onTime = this.onTime.bind(this);
      this.onToggleStart = this.onToggleStart.bind(this);
      this.onToggleSettings = this.onToggleSettings.bind(this);
  }
  onTime() {
      this.props.dispatch(setRunning(false));
      this.props.dispatch(nextUser());
  }
  onToggleStart() {
      this.props.dispatch(setRunning(!this.props.running));
  }
  onToggleSettings() {
      this.setState({ showSettings: !this.state.showSettings });
  }
  render() {
        // const { rotation, secondsLeft, sessionLength } = this.props;
        const { showSettings } = this.state;
        const paneOpen = showSettings;
        return (
            <div className={`App ${paneOpen ? 'App--pane-open' : ''}`}>
                <div className="App-mainView" onClick={paneOpen ? this.onToggleSettings : () => (false)}>
                    <Notification />
                    <SimpleTimeView onClick={this.onToggleStart} />
                    <UserList />
                </div>
                <div className="App-controls">
                    <TimeControl onTime={this.onTime} />
                    <Icon icon='settings' onClick={this.onToggleSettings} className={`App-settings-button App-settings-button--${showSettings ? 'open' : 'closed'}`} />
                </div>
                <SettingsView className={showSettings ? 'App-settings App-settings--open' : 'App-settings'} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // rotation: state.user.rotation,
    // secondsLeft: state.time.secondsLeft,
    // sessionLength: state.settings.sessionLength,
    running: state.time.running,
});

export default connect(mapStateToProps)(App);
