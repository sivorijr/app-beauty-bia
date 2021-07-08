import React, { useState, useEffect } from 'react';
import { ImageBackground, FlatList, TouchableOpacity, TextInput, Alert, SafeAreaView, ScrollView, } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text';

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
    const [txtButton, setTxtButton] = useState("Mostrar Agenda");
    const [dadosForm, setDadosForm] = useState(
        {
            nomeCliente: "",
            telefoneCliente: "",
            atendimento: "",
            especialidade: "",
            duracao: "00:00",
            data: new Date(),
            // valor: 0
        }
    );
    const [especialidades, setEspecialidades] = useState([]);
    const [showDate, setShowDate] = useState(false);
    const [showHour, setShowHour] = useState(false);

    useEffect(() => {
        api
            .get("/especialidades")
            .then(response => {
                const arr = [];

                response.data.map(element => {
                    const especialidade = {
                        nome: element.nome,
                        duracao: element.duracao,
                        // valor: element.valor
                    }

                    arr.push(especialidade);
                });
                
                setEspecialidades(arr);
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
    }, []);

    const onDayPress = day => {
        setDaySchedules(day);
    }

    const onPressButtonAgenda = () => {
        setShowCalendar(!showCalendar);
        setMarkedDates(null);
        setDaySchedules(null);

        if(!showCalendar) {
            setTxtButton("Ocultar Agenda");

            api
                .get("/agendamentos")
                .then(response => {
                    const arr = {};

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
                                tempo: agendamento.tempo,
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
                                tempo: agendamento.tempo,
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
        } else{
            setTxtButton("Mostrar Agenda");
        }
    }

    const onPressButtonSubmit = () => {
        let error = false;

        Object.values(dadosForm).forEach(element => {
            if(!element) {
                error = true;
            }
        });

        if(new Date().getTime() > dadosForm.data.getTime()) {
            error = true;
        }

        if(!error) {
            api
                .post("/agendamento/", { data: JSON.stringify(dadosForm) })
                .then(response => {
                    if(response.data._id) {
                        Alert.alert(
                            "Sucesso!",
                            "Agendamento criado com sucesso!",
                            [
                                {
                                    text: "OK",
                                    onPress: () => navigation.goBack()
                                }
                            ]
                        );
                    }
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
        } else{
            Alert.alert(
                "Ops...",
                "Preencha o formulario corretamente para continuar!",
                [
                    {
                        text: "OK"
                    }
                ]
            );
        }
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

    const onChangeEspecialidade = value => {
        setDadosForm(prevDadosForm => ({ ...prevDadosForm, especialidade: value }));

        if(value) {
            especialidades.map(element => {
                if(element.nome == value) {
                    setDadosForm(prevDadosForm => ({ ...prevDadosForm, duracao: element.duracao }));
                }
            });
        } else{
            setDadosForm(prevDadosForm => ({ ...prevDadosForm, duracao: "00:00" }));
        }
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dadosForm.data;
        setShowDate(false);
        setDadosForm(prevDadosForm => ({ ...prevDadosForm, data: currentDate }));
    };

    const showDatepicker = () => {
        setShowDate(true);
    };

    const onChangeHour = (event, selectedHour) => {
        const currentHour = selectedHour || dadosForm.data;
        setShowHour(false);
        setDadosForm(prevDadosForm => ({ ...prevDadosForm, data: currentHour }));
    };

    const showTimepicker = () => {
        setShowHour(true);
    };

    const renderAgendamentos = () => {
        return (
            <>
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
                <Space height={20} />
            </>
        );
    }

    const renderDetalhes = () => {
        return (
            <>
                <Container backgroundColor={colors.green} paddingVertical={5}>
                    <Text
                        color={colors.white}
                        fontSize={28}
                        fontWeight='bold'
                        textAlign='center'
                    >Detalhes</Text>
                </Container>
                <Space height={20} />
                <ScrollView>
                    <Container
                        backgroundColor={colors.green}
                        paddingTop={10}
                        paddingBottom={15}
                        paddingHorizontal={10}
                        marginHorizontal={20}
                        borderRadius='6px'
                    >
                        <Text
                            color={colors.white}
                            fontSize={18}
                            fontWeight='normal'
                        >Cliente</Text>
                        <TextInput
                            color={colors.white}
                            placeholder="Nome do cliente"
                            value={dadosForm.nomeCliente}
                            onChangeText={value => { setDadosForm(prevDadosForm => ({ ...prevDadosForm, nomeCliente: value })) }}
                        />
                        <Space height={10} />
                        <Div border={'1px solid ' + colors.pinkLight} />
                        <Space height={10} />
                        <Text
                            color={colors.white}
                            fontSize={18}
                            fontWeight='normal'
                        >Telefone</Text>
                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            color={colors.white}
                            placeholder="Telefone do cliente"
                            value={dadosForm.telefoneCliente}
                            onChangeText={value => { setDadosForm(prevDadosForm => ({ ...prevDadosForm, telefoneCliente: value })) }}
                        />
                        <Space height={10} />
                        <Div border={'1px solid ' + colors.pinkLight} />
                        <Space height={10} />
                        <Text
                            color={colors.white}
                            fontSize={18}
                            fontWeight='normal'
                        >Atendimento</Text>
                        <Picker
                            color={colors.white}
                            selectedValue={dadosForm.atendimento}
                            onValueChange={value => { setDadosForm(prevDadosForm => ({ ...prevDadosForm, atendimento: value })) }}
                            mode='dialog'
                            style={{ color:colors.white }}
                        >
                            <Picker.Item label="Selecione" value="" />
                            <Picker.Item label="À Domicilio" value="À Domicilio" />
                            <Picker.Item label="Estabelecimento" value="Estabelecimento" />
                        </Picker>
                        <Space height={10} />
                        <Div border={'1px solid ' + colors.pinkLight} />
                        <Space height={10} />
                        <Text
                            color={colors.white}
                            fontSize={18}
                            fontWeight='normal'
                        >Especialidade</Text>
                        <Picker
                            color={colors.white}
                            selectedValue={dadosForm.especialidade}
                            onValueChange={onChangeEspecialidade}
                            mode='dialog'
                            style={{ color:colors.white }}
                        >
                            <Picker.Item label="Selecione" value="" />
                            {
                                especialidades.map((especialidade, key) => {
                                    return <Picker.Item key={key} label={especialidade.nome} value={especialidade.nome} />
                                })
                            }
                        </Picker>
                        <Div border={'1px solid ' + colors.pinkLight} />
                        <Space height={10} />
                        <Text
                            color={colors.white}
                            fontSize={18}
                            fontWeight='normal'
                        >Duração</Text>
                        <TextInput
                            editable={false}
                            color={colors.white}
                            value={dadosForm.duracao}
                        />
                        <Space height={10} />
                        <Div border={'1px solid ' + colors.pinkLight} />
                        <Space height={10} />
                        <Text
                            color={colors.white}
                            fontSize={18}
                            fontWeight='normal'
                        >Data</Text>
                        <TouchableOpacity onPress={showDatepicker}>
                            <TextInput
                                editable={false}
                                color={colors.white}
                                value={dadosForm.data.toISOString().split("T")[0].split('-').reverse().join('/')}
                            />
                        </TouchableOpacity>
                        {
                            showDate
                            ?
                                <DateTimePicker
                                    value={dadosForm.data}
                                    mode={"date"}
                                    onChange={onChangeDate}
                                    minimumDate={new Date()}
                                />
                            :
                                <>
                                </>
                        }
                        <Space height={10} />
                        <Div border={'1px solid ' + colors.pinkLight} />
                        <Space height={10} />
                        <Text
                            color={colors.white}
                            fontSize={18}
                            fontWeight='normal'
                        >Hora</Text>
                        <TouchableOpacity onPress={showTimepicker}>
                            <TextInput
                                editable={false}
                                color={colors.white}
                                value={dadosForm.data.toLocaleTimeString("pt-BR").substr(0, 5)}
                            />
                        </TouchableOpacity>
                        {
                            showHour
                            ?
                                <DateTimePicker
                                    value={dadosForm.data}
                                    mode={"time"}
                                    onChange={onChangeHour}
                                />
                            :
                                <>
                                </>
                        }
                    </Container>
                    {/* <Space height={10} />
                    <Text
                        color={colors.white}
                        fontSize={18}
                        fontWeight='normal'
                    >R$ {dadosForm.valor}</Text>
                    <Space height={10} /> */}
                    <Container paddingVertical={20} paddingHorizontal={20}>
                        <Button
                            title='Agendar'
                            color={colors.pink}
                            fontSize={20}
                            fontWeight='bold'
                            textAlign='center'
                            onPress={onPressButtonSubmit}
                        />
                    </Container>
                </ScrollView>
            </>
        );
    }

    return (
        <Container height='100%'>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
                <Container paddingVertical={20} paddingHorizontal={20}>
                    <Button
                        title={txtButton}
                        color={colors.pink}
                        fontSize={20}
                        fontWeight='bold'
                        textAlign='center'
                        onPress={onPressButtonAgenda}
                    />
                </Container>
                {
                    showCalendar
                    ?
                        renderAgendamentos()
                    :
                        renderDetalhes()
                }
            </ImageBackground>
        </Container>
    );
}