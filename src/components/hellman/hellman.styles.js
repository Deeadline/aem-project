import styled from 'styled-components';

const colors = {
    '0': '#627C31',
    '1': '#F18F01',
    '3': '#f44141',
};

export const DiffieHellmanWrapper = styled.div`
    width: 100%;
    overflow: auto;
`;

export const ResultGrid = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.columns},1fr)`};
    grid-template-rows: ${props => `repeat(${props.rows},1fr)`};
    grid-gap: 5px;
`;
export const Row = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 0 2px;
    align-items: center;
    grid-row: ${props => `${props.row}`};
`;
export const Cell = styled.span`
    grid-column: ${props => `${props.column}`};
    width: 10%;
    border: 1px solid #eff;
    text-align: center;
    background-color: ${props => colors[props.color]};
`;
