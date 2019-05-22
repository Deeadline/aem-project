import React from 'react';
import styled from 'styled-components';
import rsa from 'node-rsa';
import { Input } from '../components/shared/input';
import { PrimaryButton } from '../components/shared/button';

const RsaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const KeyWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
    width: 100%;
`;
const PublicKey = styled.div`
    text-align: center;
    width: 50%;
`;
const PrivateKey = styled.div`
    text-align: center;
    width: 50%;
`;
const EncodersDecodersWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
    width: 100%;
`;
const EncryptText = styled.div`
    text-align: center;
    width: 50%;
`;
const DecryptText = styled.div`
    text-align: center;
    width: 50%;
`;
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
    width: 50%;
`;
const TextWrapper = styled.div`
    text-align: center;
    width: 100%;
`;

export class Rsa extends React.Component {
    state = {
        myText: '',
        publicKey: '',
        privateKey: '',
        hashText: '',
        encodedText: '',
        key: new rsa({ b: 512 }),
    };
    handleInput = event => {
        this.setState({ myText: event.target.value });
    };
    encryptText = () => {
        const { myText, key } = this.state;
        if (myText !== '') {
            const hashText = key.encrypt(myText, 'base64');
            this.setState({ hashText: hashText });
        }
    };
    decryptText = () => {
        const { hashText, key } = this.state;
        if (hashText !== '') {
            const encodedText = key.decrypt(hashText, 'utf8');
            this.setState({ encodedText: encodedText });
        }
    };
    generateKey = () => {
        const { key } = this.state;
        const publicKey = key.exportKey('pkcs8-public-pem');
        const privateKey = key.exportKey('pkcs8-private-pem');
        this.setState({ publicKey: publicKey });
        this.setState({ privateKey: privateKey });
    };
    render() {
        const {
            publicKey,
            privateKey,
            myText,
            hashText,
            encodedText,
        } = this.state;
        let encoders_decoders;
        if (publicKey !== '' && privateKey !== '') {
            encoders_decoders = (
                <ButtonWrapper>
                    <PrimaryButton onClick={this.encryptText}>
                        Encrypt text
                    </PrimaryButton>
                    <PrimaryButton onClick={this.decryptText}>
                        Decrypt text
                    </PrimaryButton>
                </ButtonWrapper>
            );
        }
        return (
            <RsaWrapper>
                <PrimaryButton onClick={this.generateKey}>
                    Generate keys
                </PrimaryButton>
                <KeyWrapper>
                    <PublicKey>{publicKey}</PublicKey>
                    <PrivateKey>{privateKey}</PrivateKey>
                </KeyWrapper>
                <TextWrapper>
                    <Input
                        id="myText"
                        name="myText"
                        type="text"
                        placeholder="Enter text"
                        value={myText}
                        handleChange={this.handleInput}
                    />
                </TextWrapper>
                {encoders_decoders}
                <EncodersDecodersWrapper>
                    <EncryptText>{hashText}</EncryptText>
                    <DecryptText>{encodedText}</DecryptText>
                </EncodersDecodersWrapper>
            </RsaWrapper>
        );
    }
}
