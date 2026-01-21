import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dash from '../view/screen/Dashboard';
import Task from '../view/screen/Task';
import AuthView from '../view/screen/loginScreen';
import ProfileScreen from '../view/screen/profileScreen';
import ProjectScreen from '../view/screen/projectScreen';
import CreateProjectScreen from '../view/screen/createScreen';
import TaskScreen from '../view/screen/taskScreen';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
const Stack = createNativeStackNavigator();

const Navigate = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AuthView" component={AuthView} />
          <Stack.Screen name="Dash" component={Dash} />
          <Stack.Screen name="Task" component={Task} />
          <Stack.Screen name="CreateProjectScreen" component={CreateProjectScreen}/>
          <Stack.Screen name='ProjectScreen' component={ProjectScreen}/>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="TaskScreen" component={TaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default Navigate;
