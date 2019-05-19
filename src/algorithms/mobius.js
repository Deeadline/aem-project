import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Input } from '../components/shared/input';
import { PrimaryButton } from '../components/shared/button';

const MobiusWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
`;
const ChartContainer = styled.div`
    height: 50vh;
    width: 50vw;
`;
const TextWrapper = styled.div`
    padding: 1rem;
    text-align: center;
    width: 50%;
`;
export class Mobius extends React.Component {
    state = {
        nNumber: '',
        data: null,
    };
    handleInput = event => {
        this.setState({ nNumber: event.target.value });
    };
    mobius = n => {
        if (n === 1) return 1;
        else if (n === 2) return -1;
        let p = 0;
        if (n % 2 === 0) {
            n /= 2;
            p++;
            if (n % 2 === 0) return 0;
        }
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i === 0) {
                n /= i;
                p++;
                if (n % i === 0) return 0;
            }
        }
        return p % 2 === 0 ? -1 : 1;
    };
    runMobius = () => {
        const { nNumber } = this.state;
        if (nNumber !== '') {
            const n = parseInt(nNumber);
            const mobiusResult = [];
            for (let i = 1; i <= n; i++) {
                mobiusResult[i] = this.mobius(i);
                const xaxis = n + 1;
                const data = {
                    labels: Array.from(Array(xaxis), (x, index) => index),
                    datasets: [
                        {
                            label: 'Mobius function result',
                            data: mobiusResult,
                            showLine: false,
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                        },
                    ],
                };
                this.setState({ data: data });
            }
        }
    };
    render() {
        const { data, nNumber } = this.state;
        const options = {
            maintainAspectRatio: false,
        };
        let chart;
        if (data !== null) {
            chart = <Line ref="chart" data={data} options={options} />;
        }
        return (
            <MobiusWrapper>
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
                <ChartContainer>{chart}</ChartContainer>
            </MobiusWrapper>
        );
    }
}
