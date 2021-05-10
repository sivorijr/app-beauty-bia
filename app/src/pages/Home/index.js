import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Space, Container, Text, Button } from '../../components';
import api from '../../services/api';
import colors from '../../styles/colors';

const image = { uri: "https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-pink-watercolor-ink-background-image_51985.jpg" };

export default function HomeScreen({ navigation }) {
    const [scheduledWeek, setScheduledWeek] = useState(0);
    const [scheduledMonth, setScheduledMonth] = useState(0);

    useEffect(() => {
        api
            .get("/getScheduled")
            .then((response) => {
                let count = 0;

                response.data.map((element) => {
                    element["schedules"][element["data"]]["events"].map(() => {
                        count++;
                    })
                });

                setScheduledWeek(count);
            })
            .catch((error) => {
                alert("Ocorreu um erro ao buscar os items");
            });

        api
            .get("/getScheduled")
            .then((response) => {
                let count = 0;

                response.data.map((element) => {
                    element["schedules"][element["data"]]["events"].map(() => {
                        count++;
                    })
                });

                setScheduledMonth(count);
            })
            .catch((error) => {
                alert("Ocorreu um erro ao buscar os items");
            });
    }, []);

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
                <Container
                    backgroundColor={colors.green}
                    paddingVertical={20}
                    marginHorizontal={20}
                    borderRadius='6px'
                >
                    <AnimatedCircularProgress
                        size={120}
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
                    marginHorizontal={20}
                    borderRadius='6px'
                >
                    <AnimatedCircularProgress
                        size={120}
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