import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import Loading from '../screens/Loading';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

//switch navigator for the auth stack
export default AppNavigator = createSwitchNavigator( {
	Loading: {
		screen: Loading
	},
	AppStack: {
		screen: AppStack
	},
	AuthStack: {
		screen: AuthStack
	}
}, {
	initialRouteName: 'Loading'
} );