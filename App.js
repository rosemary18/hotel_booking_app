import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

/** Component for flux-routes */
import {
  AuthScreen,
  SplashScreen,
  AdminAuthScreen,
  LoadingScreen,
} from './src/view/AuthScreens';
import {DrawerRoutes, AdminDrawerRoutes} from './src/config/routes';
import {Provider} from 'react-redux';
import store from './src/store';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
            <Scene
              key="AdminDrawer"
              component={AdminDrawerRoutes}
              hideNavBar={true}
            />
            <Scene
              key="LoadingScreen"
              component={LoadingScreen}
              hideNavBar={true}
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

export default App;
