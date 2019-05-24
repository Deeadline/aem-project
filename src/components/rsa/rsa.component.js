import React from 'react';
import rsa from 'node-rsa';

import { Input } from '../shared/input';
import { PrimaryButton } from '../shared/button';
import {
    RsaWrapper,
    PrivateKey,
    KeyWrapper,
    PublicKey,
    TextWrapper,
    ButtonWrapper,
    DecryptText,
    EncryptText,
    EncodersDecodersWrapper,
} from './rsa.styles';

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
