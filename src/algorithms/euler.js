import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { Input } from '../components/shared/input';
import { PrimaryButton } from '../components/shared/button';

const EulerWrapper = styled.div`
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
export class Euler extends React.Component {
    state = {
        nNumber: '',
        data: null,
    };

    SieveOfEratosthenes = (n, prime, primesquare, a) => {
        for (let i = 2; i <= n; i++) {
            prime[i] = true;
        }
        for (let i = 0; i < n * n + 1; i++) {
            primesquare[i] = false;
        }
        prime[1] = false;
        for (let p = 2; p * p <= n; p++) {
            if (prime[p]) {
                for (let i = p * 2; i <= n; i += p) {
                    prime[i] = false;
                }
            }
        }
        let j = 0;
        for (let p = 2; p <= n; p++) {
            if (prime[p]) {
                a[j++] = p;
                primesquare[p * p] = true;
            }
        }
    };
    countDivisors = n => {
        if (n === 1) return 1;
        const prime = [n + 1];
        const primesquare = [n * n + 1];
        const a = [n];
        this.SieveOfEratosthenes(n, prime, primesquare, a);
        let ans = 1;
        for (let i = 0; ; i++) {
            if (a[i] * a[i] * a[i] > n) break;
            let cnt = 1;
            while (n % a[i] === 0) {
                n /= a[i];
                cnt += 1;
            }
            ans *= cnt;
        }
        if (prime[n]) ans *= 2;
        else if (primesquare[n]) ans *= 3;
        else if (n !== 1) ans *= 4;
        return ans;
    };
    runEuler = () => {
        const { nNumber } = this.state;
        if (nNumber !== '') {
            const n = parseInt(nNumber);
            const eulerResults = [];
            for (let i = 1; i <= n; i++) {
                eulerResults[i] = this.countDivisors(i);
            }
            const xaxis = n + 1;
            const data = {
                labels: Array.from(Array(xaxis), (x, index) => index),
                datasets: [
                    {
                        label: 'Euler function result',
                        data: eulerResults,
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
    };
    handleInput = event => {
        this.setState({ nNumber: event.target.value });
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
            <EulerWrapper>
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
                <ChartContainer>{chart}</ChartContainer>
            </EulerWrapper>
        );
    }
}
