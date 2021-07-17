import React, { useState, useEffect } from 'react';
import { Alert, ImageBackground } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Space, Container, Text, Button } from '../../components';
import api from '../../services/api';
import colors from '../../styles/colors';

const image = { uri: "https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-pink-watercolor-ink-background-image_51985.jpg" };

export default function HomeScreen({ navigation }) {
    const [scheduledWeek, setScheduledWeek] = useState(0);
    const [scheduledMonth, setScheduledMonth] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const currWeek = new Date();
            
            const firstWeek = currWeek.getDate() - currWeek.getDay() + 1;
            const lastWeek = firstWeek + 6;
            
            const firstWeekDay = new Date(currWeek.setDate(firstWeek)).toISOString().split('T')[0];
            const lastWeekDay = new Date(currWeek.setDate(lastWeek)).toISOString().split('T')[0];

            const filterWeek = {
                dataInicio: firstWeekDay,
                dataFim: lastWeekDay
            };

            api
                .get("/agendamentos/" + JSON.stringify(filterWeek))
                .then(response => {
                    setScheduledWeek(response.data.length);
                })
                .catch((error) => {
                    Alert.alert(
                        "Ops...",
                        "Ocorreu um erro ao buscar os itens.",
                        [
                            {
                                text: "OK"
                            }
                        ]
                    );
                });
                
            const currMonth = new Date();
            const firstMonthDay = new Date(currMonth.getFullYear(), currMonth.getMonth(), 1).toISOString().split('T')[0];
            const lastMonthDay = new Date(currMonth.getFullYear(), currMonth.getMonth() + 1, 0).toISOString().split('T')[0];

            const filterMonth = {
                dataInicio: firstMonthDay,
                dataFim: lastMonthDay
            };

            api
                .get("/agendamentos/" + JSON.stringify(filterMonth))
                .then(response => {
                    setScheduledMonth(response.data.length);
                })
                .catch((error) => {
                    Alert.alert(
                        "Ops...",
                        "Ocorreu um erro ao buscar os itens.",
                        [
                            {
                                text: "OK"
                            }
                        ]
                    );
                });
        });

        return () => unsubscribe
    }, [navigation]);

    return (
        <Container height='100%'>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
                <Container backgroundColor={colors.green} paddingVertical={5}>
                    <Text
                        color={colors.white}
                        fontSize={28}
                        fontWeight='bold'
                        textAlign='center'
                    >Visão Geral</Text>
                </Container>
                <Space height={20} />
                <Container flexDirection='row' justifyContent='center'>
                    <Container
                        backgroundColor={colors.green}
                        paddingVertical={20}
                        marginHorizontal={5}
                        borderRadius='6px'
                        width='45%'
                    >
                        <AnimatedCircularProgress
                            size={100}
                            width={15}
                            fill={!scheduledWeek || scheduledWeek == 0 ? 0.1 : scheduledWeek * 5}
                            tintColor={colors.pink}
                            backgroundColor={colors.white}
                            style={{ alignItems: 'center', transform: [{ rotate: '-90deg'}] }}
                        />
                        <Space height={10} />
                        <Text
                            color={colors.white}
                            fontSize={20}
                            fontWeight='bold'
                            textAlign='center'
                        >{scheduledWeek}</Text>
                        <Text
                            color={colors.white}
                            fontSize={20}
                            fontWeight='bold'
                            textAlign='center'
                        >Agendamentos essa semana</Text>
                    </Container>
                    <Space height={20} />
                    <Container
                        backgroundColor={colors.green}
                        paddingVertical={20}
                        marginHorizontal={5}
                        borderRadius='6px'
                        width='45%'
                    >
                        <AnimatedCircularProgress
                            size={100}
                            width={15}
                            fill={!scheduledMonth || scheduledMonth == 0 ? 0.1 : scheduledMonth}
                            tintColor={colors.pink}
                            backgroundColor={colors.white}
                            style={{ alignItems: 'center', transform: [{ rotate: '-90deg'}] }}
                        />
                        <Space height={10} />
                        <Text
                            color={colors.white}
                            fontSize={20}
                            fontWeight='bold'
                            textAlign='center'
                        >{scheduledMonth}</Text>
                        <Text
                            color={colors.white}
                            fontSize={20}
                            fontWeight='bold'
                            textAlign='center'
                        >Agendamentos esse mês</Text>
                    </Container>
                </Container>
                <Space height={20} />
                <Container flexDirection='row' justifyContent='center'>
                    <Container
                        backgroundColor={colors.green}
                        paddingVertical={20}
                        marginHorizontal={5}
                        borderRadius='6px'
                        width='45%'
                    >
                        <AnimatedCircularProgress
                            size={100}
                            width={15}
                            fill={!scheduledWeek || scheduledWeek == 0 ? 0.1 : scheduledWeek / 1.5}
                            tintColor={colors.pink}
                            backgroundColor={colors.white}
                            style={{ alignItems: 'center', transform: [{ rotate: '-90deg'}] }}
                        />
                        <Space height={10} />
                        <Text
                            color={colors.white}
                            fontSize={20}
                            fontWeight='bold'
                            textAlign='center'
                        >{scheduledWeek}</Text>
                        <Text
                            color={colors.white}
                            fontSize={20}
                            fontWeight='bold'
                            textAlign='center'
                        >Ganhos essa semana</Text>
                    </Container>
                    <Space height={20} />
                    <Container
                        backgroundColor={colors.green}
                        paddingVertical={20}
                        marginHorizontal={5}
                        borderRadius='6px'
                        width='45%'
                    >
                        <AnimatedCircularProgress
                            size={100}
                            width={15}
                            fill={!scheduledMonth || scheduledMonth == 0 ? 0.1 : scheduledMonth / 6}
                            tintColor={colors.pink}
                            backgroundColor={colors.white}
                            style={{ alignItems: 'center', transform: [{ rotate: '-90deg'}] }}
                        />
                        <Space height={10} />
                        <Text
                            color={colors.white}
                            fontSize={20}
                            fontWeight='bold'
                            textAlign='center'
                        >{scheduledMonth}</Text>
                        <Text
                            color={colors.white}
                            fontSize={20}
                            fontWeight='bold'
                            textAlign='center'
                        >Ganhos esse mês</Text>
                    </Container>
                </Container>
                <Space height={10} />
                <Container paddingVertical={20} paddingHorizontal={20}>
                    <Button
                        title='Criar Novo Agendamento'
                        color={colors.pink}
                        fontSize={20}
                        fontWeight='bold'
                        textAlign='center'
                        onPress={() => navigation.navigate('NovoAgendamento')}
                    />
                </Container>
            </ImageBackground>
        </Container>
    );
}