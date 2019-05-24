import React from 'react';
import { Line } from 'react-chartjs-2';

import { Input } from '../shared/input';
import { PrimaryButton } from '../shared/button';
import { MainWrapper, ChartWrapper, TextWrapper } from '../shared/wrapper';

import { euler } from './euler.algorithm';

import { options, chartData } from '../../utils/charts';

export class Euler extends React.Component {
    state = {
        nNumber: '',
        data: null,
    };

    runEuler = () => {
        const { nNumber } = this.state;
        if (nNumber !== '') {
            const n = parseInt(nNumber);

            const eulerResults = euler(n);

            const data = chartData(n + 1, eulerResults);
            this.setState({ data: data });
        }
    };
    handleInput = event => {
        this.setState({ nNumber: event.target.value });
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
                <PrimaryButton onClick={this.runEuler}>Run Euler</PrimaryButton>
                <ChartWrapper>{chart}</ChartWrapper>
            </MainWrapper>
        );
    }
}
