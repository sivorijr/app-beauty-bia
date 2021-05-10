import React from 'react';
import { ImageBackground } from 'react-native';

import { Space, Container, Text, Button, Div } from '../../components';
import api from '../../services/api';
import colors from '../../styles/colors';

const image = { uri: "https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-pink-watercolor-ink-background-image_51985.jpg" };

function trataDate(date) {
    date = date.split("-");
    return date[2] + "/" + date[1] + "/" + date[0];
}

function splitString(string, delimitador) {
    string = string.split(delimitador);
    return string;
}

export default function VerAgendamentoScreen({ navigation, route }) {
    const hora = splitString(route.params.item.hora, ":");

    return (
        <Container height='100%'>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
                <Container backgroundColor={colors.green} paddingVertical={5}>
                    <Text
                        color={colors.white}
                        fontSize={28}
                        fontWeight='bold'
                        textAlign='center'
                    >Detalhes</Text>
                </Container>
                <Space height={20} />
                <Container
                        backgroundColor={colors.green}
                        paddingVertical={20}
                        paddingHorizontal={10}
                        marginHorizontal={20}
                        borderRadius='6px'
                >
                    <Container flexDirection='row' justifyContent='center'>
                        <Text color={colors.white} fontSize={18} fontWeight='bold'>Cliente: </Text>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{route.params.item.cliente}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='center'>
                        <Text color={colors.white} fontSize={18} fontWeight='bold'>Atendimento: </Text>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{route.params.item.atendimento}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='center'>
                        <Text color={colors.white} fontSize={18} fontWeight='bold'>Especialidade: </Text>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{route.params.item.trabalho}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='center'>
                        <Text color={colors.white} fontSize={18} fontWeight='bold'>Data: </Text>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{trataDate(route.params.data)}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='center'>
                        <Text color={colors.white} fontSize={18} fontWeight='bold'>Hora: </Text>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{hora[0] + ":" + hora[1]}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='center'>
                        <Text color={colors.white} fontSize={18} fontWeight='bold'>Duração: </Text>
                        <Text color={colors.white} fontSize={18} fontWeight='normal'>{route.params.item.tempo}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Space height={10} />
                    {
                        new Date().getTime() < new Date(route.params.data + "T" + route.params.item.hora).getTime()
                        ?
                        <Container paddingTop={20} paddingHorizontal={20}>
                            <Button
                                title='Deletar Agendamento'
                                color={colors.pink}
                                fontSize={20}
                                fontWeight='bold'
                                textAlign='center'
                                onPress={() => alert("Agendamento cancelado!")}
                            />
                        </Container>
                        :
                        <>
                        </>
                    }
                </Container>
            </ImageBackground>
        </Container>
    );
}