import styled from 'styled-components';

export const Container = styled.main`
    display: flex;
    justify-content: center;
    height: calc(100vh - 80px);
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 2rem 1rem 1rem;
`;
