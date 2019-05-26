import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '../shared/button';
const Item = styled.li`
    padding: 0.6rem;
`;

export const NavigationItem = () => (
    <>
        <Item>
            <PrimaryButton as={props => <Link {...props} to="/mobius" />}>
                Mobius Function
            </PrimaryButton>
        </Item>
        <Item>
            <PrimaryButton as={props => <Link {...props} to="/euler" />}>
                Euler Function
            </PrimaryButton>
        </Item>
        <Item>
            <PrimaryButton
                as={props => <Link {...props} to="/diffie-hellman" />}
            >
                Diffie-Hellman algorithm
            </PrimaryButton>
        </Item>
        <Item>
            <PrimaryButton as={props => <Link {...props} to="/rsa" />}>
                RSA algorithm
            </PrimaryButton>
        </Item>
    </>
);
