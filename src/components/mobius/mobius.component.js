import React from 'react';
import { Line } from 'react-chartjs-2';

import { Input } from '../shared/input';
import { PrimaryButton } from '../shared/button';
import { MainWrapper, ChartWrapper, TextWrapper } from '../shared/wrapper';

import { options, chartData } from '../../utils/charts';

import { generateMobius } from './mobius.algorithm';

export class Mobius extends React.Component {
    state = {
        nNumber: '',
        data: null,
    };
    handleInput = event => {
        this.setState({ nNumber: event.target.value });
    };

    runMobius = () => {
        const { nNumber } = this.state;
        if (nNumber !== '') {
            const n = parseInt(nNumber);

            const mobiusResult = generateMobius(n);

            const data = chartData(n + 1, mobiusResult);
            this.setState({ data: data });
        }
    };

    render() {
        const { data, nNumber } = this.state;
        let chart;
        if (data !== null) {
            chart = <Line ref="chart" data={data} options={options} />;
        }
        return (
            <MainWrapper>
                <TextWrapper>
                    <Input
                        id="nNumber"
                        name="nNumber"
                        type="text"
                        placeholder="Enter n"
                        value={nNumber}
                        handleChange={this.handleInput}
                    />
                </TextWrapper>
                <PrimaryButton onClick={this.runMobius}>
                    Run Mobius
                </PrimaryButton>
                <ChartWrapper>{chart}</ChartWrapper>
            </MainWrapper>
        );
    }
}
