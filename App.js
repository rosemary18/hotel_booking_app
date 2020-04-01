import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

/** Component for flux-routes */
import AuthScreen from './src/view/AuthScreens/AuthScreen';
import SplashScreen from './src/view/AuthScreens/SplashScreen';

export class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="Splash"
            component={SplashScreen}
            initial={true}
            hideNavBar={true}
          />
          <Scene key="Auth" component={AuthScreen} hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}

export default App;
