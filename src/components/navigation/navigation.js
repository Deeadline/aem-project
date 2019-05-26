import React from 'react';
import styled from 'styled-components';

import { NavigationItem } from '../navigation/navigation-item';

const Wrapper = styled.nav`
    padding: 1rem 0;
    width: 100%;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
`;
export const Navigation = () => (
    <Wrapper>
        <List>
            <NavigationItem />
        </List>
    </Wrapper>
);
