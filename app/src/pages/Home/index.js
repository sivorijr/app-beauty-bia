import React from 'react';
import { ImageBackground } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Space, Container, Text, Button } from './styles';

const image = { uri: "https://png.pngtree.com/thumb_back/fw800/background/20190222/ourmid/pngtree-pink-watercolor-ink-background-image_51985.jpg" };

export default function Home() {

    return (
        <Container height='100%'>
            <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
                <Container backgroundColor='#38817aa0' paddingVertical={5}>
                    <Text color='#fff' fontSize={28} fontWeight='bold' textAlign='center'>Visão Geral</Text>
                </Container>
                <Space height={20} />
                <Container backgroundColor='#38817aa0' paddingVertical={20} marginHorizontal={20} borderRadius='6px'>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={60}
                        tintColor="#f66095"
                        backgroundColor="#fff"
                        style={{ alignItems: 'center', transform: [{ rotate: '-90deg'}] }}
                    />
                    <Space height={10} />
                    <Text color='#fff' fontSize={20} fontWeight='bold' textAlign='center'>12</Text>
                    <Text color='#fff' fontSize={20} fontWeight='bold' textAlign='center'>Agendamentos essa semana</Text>
                </Container>
                <Space height={20} />
                <Container backgroundColor='#38817aa0' paddingVertical={20} marginHorizontal={20} borderRadius='6px'>
                    <AnimatedCircularProgress
                        size={120}
                        width={15}
                        fill={10}
                        tintColor="#f66095"
                        backgroundColor="#fff"
                        style={{ alignItems: 'center', transform: [{ rotate: '-90deg'}] }}
                    />
                    <Space height={10} />
                    <Text color='#fff' fontSize={20} fontWeight='bold' textAlign='center'>12</Text>
                    <Text color='#fff' fontSize={20} fontWeight='bold' textAlign='center'>Agendamentos esse mês</Text>
                </Container>
                <Space height={10} />
                <Container backgroundColor='#38817aa0' paddingVertical={20}>
                    <Button
                        title='Criar Novo Agendamento'
                        color='transparent'
                        fontSize={20}
                        fontWeight='bold'
                        textAlign='center'
                        borderWidth={0}
                    />
                </Container>
            </ImageBackground>
        </Container>
    );
}