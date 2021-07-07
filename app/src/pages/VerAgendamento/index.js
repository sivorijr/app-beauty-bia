import React from 'react';
import { Alert, ImageBackground } from 'react-native';

import { Space, Container, Text, Button, Div } from '../../components';
import api from '../../services/api';
import colors from '../../styles/colors';

const image = { uri: "https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-pink-watercolor-ink-background-image_51985.jpg" };

export default function VerAgendamentoScreen({ navigation, route }) {
    let showCancelar = true

    if(new Date().getTime() >= new Date(route.params.data + "T" + route.params.item.hora).getTime()) {
        showCancelar = false;
    } else if(route.params.item.status == "Cancelado") {
        showCancelar = false;
    }

    const onPressCancelarAgendamento = () => {
        api
            .put("/agendamento/" + route.params.item.key, { data: JSON.stringify({ status: "Cancelado" }) })
            .then(response => {
                if(response.data.id) {
                    Alert.alert(
                        "Sucesso!",
                        response.data.message,
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
                        <Text color={colors.white} fontSize={35} fontWeight='bold'>{route.params.item.cliente}</Text>
                    </Container>
                    <Space height={10} />
                    <Container flexDirection='row' justifyContent='space-between'>
                        <Text color={colors.white} fontSize={20} fontWeight='bold'>Atendimento: </Text>
                        <Text color={colors.white} fontSize={20} fontWeight='normal'>{route.params.item.atendimento}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='space-between'>
                        <Text color={colors.white} fontSize={20} fontWeight='bold'>Especialidade: </Text>
                        <Text color={colors.white} fontSize={20} fontWeight='normal'>{route.params.item.especialidade}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='space-between'>
                        <Text color={colors.white} fontSize={20} fontWeight='bold'>Data: </Text>
                        <Text color={colors.white} fontSize={20} fontWeight='normal'>{new Date(route.params.data).toISOString().substr(0, 10).split('-').reverse().join('/')}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='space-between'>
                        <Text color={colors.white} fontSize={20} fontWeight='bold'>Hora: </Text>
                        <Text color={colors.white} fontSize={20} fontWeight='normal'>{route.params.item.hora}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='space-between'>
                        <Text color={colors.white} fontSize={20} fontWeight='bold'>Duração: </Text>
                        <Text color={colors.white} fontSize={20} fontWeight='normal'>{route.params.item.tempo}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Container flexDirection='row' justifyContent='space-between'>
                        <Text color={colors.white} fontSize={20} fontWeight='bold'>Status: </Text>
                        <Text color={colors.white} fontSize={20} fontWeight='normal'>{route.params.item.status}</Text>
                    </Container>
                    <Div border={'1px solid ' + colors.pinkLight} />
                    <Space height={10} />
                    {
                        showCancelar
                        ?
                        <Container paddingTop={20} paddingHorizontal={20}>
                            <Button
                                title='Cancelar Agendamento'
                                color={colors.pink}
                                fontSize={20}
                                fontWeight='bold'
                                textAlign='center'
                                onPress={onPressCancelarAgendamento}
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