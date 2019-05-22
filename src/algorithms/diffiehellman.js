import React from 'react';
import styled from 'styled-components';

import { Form, FormContent } from '../components/shared/form';
import { Input } from '../components/shared/input';
import { PrimaryButton } from '../components/shared/button';

const DiffieHellmanWrapper = styled.div`
    width: 100%;
    overflow: auto;
`;

const colors = {
    '0': '#627C31',
    '1': '#F18F01',
    '3': '#f44141',
};

const ResultGrid = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.columns},1fr)`};
    grid-template-rows: ${props => `repeat(${props.rows},1fr)`};
    grid-gap: 5px;
`;
const Row = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 0 2px;
    align-items: center;
    grid-row: ${props => `${props.row}`};
`;
const Cell = styled.span`
    grid-column: ${props => `${props.column}`};
    width: 10%;
    border: 1px solid #eff;
    text-align: center;
    background-color: ${props => colors[props.color]};
`;

export class DiffieHellman extends React.Component {
    state = {
        p: '',
        g: '',
        myArray: [],
    };
    handleSubmit = event => {
        event.preventDefault();
        const { p, g } = this.state;
        this.setState({ p: '' });
        this.setState({ g: '' });
        this.runDiffHellman(p, g);
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    generateColumn = (array, column) => {
        let columns = [];
        for (let i = 1; i < array.length; i++) {
            columns.push(array[i][column]);
        }
        return columns;
    };

    checkColumn = columns => {
        return columns.filter(x => x === 1).length > 0 ? 1 : 0;
    };

    transferArrayColumnsToObject = array => {
        const transferred = {};
        for (let i = 1; i < array.length; i++) {
            const columns = this.generateColumn(array, i);
            transferred[i] = this.checkColumn(columns);
        }
        return transferred;
    };

    runDiffHellman = (p, g) => {
        const pNumber = parseInt(p);
        const gNumber = parseInt(g);
        const array = new Array(gNumber);
        for (let i = 0; i <= gNumber; i++) {
            array[i] = new Array(gNumber);
        }
        array[0][0] = 'k/g';
        for (let i = 1; i <= gNumber; i++) {
            array[0][i] = i;
        }
        for (let i = 0; i <= gNumber; i++) {
            for (let j = 1; j <= gNumber; j++) {
                array[j][i] = 0;
            }
        }
        for (let i = 1; i <= gNumber; i++) {
            array[i][0] = i;
            for (let j = 1; j <= gNumber; j++) {
                const power = Math.pow(j, i) % pNumber;
                array[i][j] = power;
            }
        }
        this.setState({ myArray: array });
    };

    render() {
        const { p, g, myArray } = this.state;
        let display;

        if (myArray.length > 0) {
            const transferredArray = this.transferArrayColumnsToObject(myArray);
            console.log(transferredArray);
            const children = myArray.map((row, i) => {
                return (
                    <Row key={`${i}_row`} row={i + 1}>
                        {row.map((cell, j) => {
                            let color = 2;
                            if (i !== 0 && j !== 0) {
                                color = transferredArray[j];
                                color = cell === 1 ? 3 : color;
                                console.log('j,color', j, color);
                            }
                            /* console.log('(i,j), [i,j]', i, j, myArray[i][j]); */
                            return (
                                <Cell
                                    key={`${i}row_${j}_cell`}
                                    column={j + 1}
                                    color={color}
                                >
                                    {cell}
                                </Cell>
                            );
                        })}
                    </Row>
                );
            });
            display = (
                <ResultGrid rows={g} columns={g}>
                    {children}
                </ResultGrid>
            );
        } else {
            display = (
                <Form onSubmit={this.handleSubmit}>
                    <FormContent>
                        <Input
                            id="p"
                            name="p"
                            type="text"
                            placeholder="Enter p number"
                            value={p}
                            handleChange={this.handleChange}
                        />
                    </FormContent>
                    <FormContent>
                        <Input
                            id="g"
                            name="g"
                            type="text"
                            placeholder="Enter g number"
                            value={g}
                            handleChange={this.handleChange}
                        />
                    </FormContent>
                    <FormContent>
                        <PrimaryButton>Start</PrimaryButton>
                    </FormContent>
                </Form>
            );
        }
        return <DiffieHellmanWrapper>{display}</DiffieHellmanWrapper>;
    }
}