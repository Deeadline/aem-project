import styled from 'styled-components';

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
export {
    RsaWrapper,
    PrivateKey,
    KeyWrapper,
    PublicKey,
    TextWrapper,
    ButtonWrapper,
    DecryptText,
    EncryptText,
    EncodersDecodersWrapper,
};
