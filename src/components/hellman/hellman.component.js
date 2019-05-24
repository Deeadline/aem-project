import React from 'react';

import { Form, FormContent } from '../shared/form';
import { Input } from '../shared/input';
import { PrimaryButton } from '../shared/button';

import { DiffieHellmanWrapper, ResultGrid, Row, Cell } from './hellman.styles';
import { getArrayColumns, diffieHellman, getColor } from './hellman.algorithm';

export class DiffieHellman extends React.Component {
    state = {
        p: '',
        g: '',
        array: [],
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

    runDiffHellman = (p, g) => {
        const pNumber = parseInt(p);
        const gNumber = parseInt(g);
        const arrayResult = diffieHellman(pNumber, gNumber);
        this.setState({ array: arrayResult });
    };

    generateChildren = array => {
        const transferredArray = getArrayColumns(array);
        return array.map((row, i) => {
            return (
                <Row key={`${i}_row`} row={i + 1}>
                    {row.map((cell, j) => {
                        const color = getColor(i, j, cell, transferredArray[j]);
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
    };

    hellmanResult = () => {
        const { g, array } = this.state;
        const children = this.generateChildren(array);
        return (
            <ResultGrid rows={g} columns={g}>
                {children}
            </ResultGrid>
        );
    };

    hellmanForm = () => {
        const { p, g } = this.state;
        return (
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
    };

    render() {
        const { array } = this.state;
        const display =
            array.length > 0 ? this.hellmanResult() : this.hellmanForm();

        return <DiffieHellmanWrapper>{display}</DiffieHellmanWrapper>;
    }
}
