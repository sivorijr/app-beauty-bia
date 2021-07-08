import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeRoutes from './routes/home.routes';
import NovoAgendamentoScreen from './pages/NovoAgendamento';
import VerAgendamentoScreen from './pages/VerAgendamento';
import colors from './styles/colors';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.pink,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <Stack.Screen name="Home" component={HomeRoutes} options={{ title: 'Beauty Bia', headerTitleStyle: { fontWeight: 'bold', textAlign: 'center' }}} />
            <Stack.Screen name="NovoAgendamento" component={NovoAgendamentoScreen} options={{ title: 'Novo Agendamento' }} />
            <Stack.Screen name="VerAgendamento" component={VerAgendamentoScreen} options={{ title: 'Ver Agendamento' }} />
        </Stack.Navigator>
    );
}