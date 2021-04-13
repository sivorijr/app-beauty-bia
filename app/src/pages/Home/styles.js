import styled from 'styled-components/native';

export const Space = styled.View`
    height: ${props => `${props.height}px`};
`;

export const Container = styled.View`
    height: ${props => `${props.height}`};
    backgroundColor: ${props => `${props.backgroundColor}`};
    borderRadius: ${props => `${props.borderRadius}`};
`;

export const Text = styled.Text`
    color: ${props => `${props.color}`};
    fontSize: ${props => `${props.fontSize}px`};
    fontWeight: ${props => `${props.fontWeight}`};
    textAlign: ${props => `${props.textAlign}`};
`;

export const Button = styled.Button`
    color: ${props => `${props.color}`};
    fontSize: ${props => `${props.fontSize}px`};
    fontWeight: ${props => `${props.fontWeight}`};
    textAlign: ${props => `${props.textAlign}`};
    borderWidth: ${props => `${props.borderWidth}`};
`;