import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeRoutes from './routes/home.routes';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#f66095',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'center',
            }
        }}>
            <Stack.Screen name="Home" component={HomeRoutes} options={{ title: 'Beauty Bia' }} />
        </Stack.Navigator>
    );
}