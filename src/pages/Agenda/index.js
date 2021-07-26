import React, { useState, useEffect } from 'react';
import { ImageBackground, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Space, Container, Text, Div } from '../../components';
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

export default function AgendaScreen({ navigation }) {
    const [markedDates, setMarkedDates] = useState(null);
    const [daySchedules, setDaySchedules] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            api
                .get("/agendamentos")
                .then(response => {
                    let arr = {};

                    response.data.map(agendamento => {
                        const dataAgendamento = agendamento.data.split("T")[0];
                        const arrIndex = Object.values(arr).indexOf(dataAgendamento);

                        if(arrIndex != -1) {
                            const evento = {
                                key: agendamento._id,
                                cliente: agendamento.clienteID.nome,
                                especialidade: agendamento.especialidadeID.nome,
                                atendimento: agendamento.atendimento,
                                hora: agendamento.data.split("T")[1].substring(0,5),
                                tempo: agendamento.especialidadeID.duracao,
                                valor: agendamento.especialidadeID.valor,
                                status: agendamento.status
                            }

                            arr[arrIndex].schedules[dataAgendamento].events.push(evento);
                        } else{
                            const schedules = {
                                [dataAgendamento]: {
                                    events: [],
                                    selected: true,
                                    selectedColor: "#f66095"
                                }
                            }

                            const evento = {
                                key: agendamento._id,
                                cliente: agendamento.clienteID.nome,
                                especialidade: agendamento.especialidadeID.nome,
                                atendimento: agendamento.atendimento,
                                hora: agendamento.data.split("T")[1].substring(0,5),
                                tempo: agendamento.especialidadeID.duracao,
                                valor: agendamento.especialidadeID.valor,
                                status: agendamento.status
                            }

                            schedules[dataAgendamento].events.push(evento);
                            
                            Object.assign(arr, schedules);
                        }
                    });

                    setMarkedDates(arr);
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

    const onDayPress = day => {
        setDaySchedules(day);
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("VerAgendamento", { item, data: daySchedules.dateString })}>
                <Container
                    backgroundColor={colors.green}
                    paddingTop={10}
                    paddingBottom={10}
                    paddingHorizontal={10}
                    marginHorizontal={20}
                    borderRadius='6px'
                >
                    <Container flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Text color={colors.white} fontSize={28} fontWeight='bold'>{item.cliente}</Text>
                        <Container
                            backgroundColor={colors.pink}
                            paddingHorizontal={10}
                            paddingVertical={3}
                            borderRadius='6px'
                        >
                            <Text color={colors.white} fontSize={18} fontWeight='bold'>{item.hora}</Text>
                        </Container>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='space-between'>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{item.especialidade}</Text>
                        <Container
                            paddingHorizontal={10}
                            paddingVertical={3}
                            borderRadius='6px'
                        >
                            <Text color={colors.white} fontSize={18} fontWeight='normal'>{item.status}</Text>
                        </Container>
                    </Container>
                </Container>
                <Space height={10} />
            </TouchableOpacity>
        );
    }

    return (
        <Container height='100%'>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
                <Container backgroundColor={colors.green} paddingVertical={5}>
                    <Text
                        color={colors.white}
                        fontSize={28}
                        fontWeight='bold'
                        textAlign='center'
                    >Agendamentos</Text>
                </Container>
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
            </ImageBackground>
        </Container>
    );
}