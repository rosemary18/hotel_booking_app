import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

/** Component for flux-routes */
import {
  AuthScreen,
  SplashScreen,
  AdminAuthScreen,
} from './src/view/AuthScreens';
import {DrawerRoutes} from './src/config/routes';

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
          <Scene
            key="AdminAuth"
            component={AdminAuthScreen}
            hideNavBar={true}
          />
          <Scene
            key="DrawerRoutes"
            component={DrawerRoutes}
            hideNavBar={true}
          />
        </Scene>
      </Router>
    );
  }
}

export default App;
