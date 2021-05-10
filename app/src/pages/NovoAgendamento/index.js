import React, { useState, useEffect } from 'react';
import { ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Button, Space, Container, Text, Div } from '../../components';
import api from '../../services/api';
import colors from '../../styles/colors';

const image = { uri: "https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-pink-watercolor-ink-background-image_51985.jpg" };

Icon.loadFont();

LocaleConfig.defaultLocale = 'br';
LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    today: 'Hoje'
};

export default function NovoAgendamentoScreen({ navigation }) {
    const [markedDates, setMarkedDates] = useState(null);
    const [daySchedules, setDaySchedules] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        api
            .get("/getScheduled")
            .then((response) => {
                const arr = {};

                response.data.map(element => {
                    arr[element["data"]] = element["schedules"][element["data"]];
                });

                setMarkedDates(arr);
            })
            .catch((error) => {
                alert("Ocorreu um erro ao buscar os items");
            });
    }, []);

    function onDayPress(day) {
        setDaySchedules(day);
    }

    function onPressButton() {
        setShowCalendar(!showCalendar);
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("VerAgendamento", { item, data: daySchedules.dateString })}>
                <Container
                    backgroundColor={colors.green}
                    paddingTop={10}
                    paddingBottom={15}
                    paddingHorizontal={10}
                    marginHorizontal={20}
                    borderRadius='6px'
                >
                    <Container flexDirection='row' justifyContent='center'>
                        <Text color={colors.white} fontSize={18} fontWeight='bold'>Cliente: </Text>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{item.cliente}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='center'>
                        <Text color={colors.white} fontSize={18} fontWeight='bold'>Especialização: </Text>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{item.trabalho}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='center'>
                        <Text color={colors.white} fontSize={18} fontWeight='bold'>Horário: </Text>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{item.hora}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='center'>
                        <Text color={colors.white} fontSize={18} fontWeight='bold'>Duração: </Text>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{item.tempo}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                </Container>
                <Space height={20} />
            </TouchableOpacity>
        );
    }

    return (
        <Container height='100%'>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
                <Container paddingVertical={20} paddingHorizontal={20}>
                    <Button
                        title='Criar Novo Agendamento'
                        color={colors.pink}
                        fontSize={20}
                        fontWeight='bold'
                        textAlign='center'
                        onPress={onPressButton}
                    />
                </Container>
                <Container backgroundColor={colors.green} paddingVertical={5}>
                    <Text
                        color={colors.white}
                        fontSize={28}
                        fontWeight='bold'
                        textAlign='center'
                    >Agendamentos</Text>
                </Container>
                {
                    showCalendar
                    ?
                    <>
                        <Calendar
                            onDayPress={onDayPress}
                            markedDates={markedDates}
                        />
                        <Space height={20} />
                        {
                            !daySchedules
                            ?
                            <Container
                                backgroundColor={colors.green}
                                paddingVertical={20}
                                paddingHorizontal={10}
                                marginHorizontal={20}
                                borderRadius='6px'
                            >
                                <Text
                                    color={colors.white}
                                    fontSize={28}
                                    fontWeight='bold'
                                    textAlign='center'
                                >
                                    <Icon name="search" size={32} color={colors.white} />{'\n'}
                                    Escolha uma data</Text>
                            </Container>
                            :
                                markedDates && markedDates[daySchedules.dateString]
                                ?
                                <FlatList
                                    data={markedDates[daySchedules.dateString]['events']}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.key}
                                />
                                :
                                <Container
                                    backgroundColor={colors.green}
                                    paddingVertical={20}
                                    paddingHorizontal={10}
                                    marginHorizontal={20}
                                    borderRadius='6px'
                                >
                                    <Text
                                        color={colors.white}
                                        fontSize={28}
                                        fontWeight='bold'
                                        textAlign='center'
                                    >
                                        <Icon name="search-off" size={32} color={colors.white} />{'\n'}
                                        Nenhum horario agendado para esse dia</Text>
                                </Container>
                        }
                    </>
                    :
                    <>
                    </>
                }
            </ImageBackground>
        </Container>
    );
}