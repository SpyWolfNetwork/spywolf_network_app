/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import React, { useEffect, useMemo, useState } from 'react';
import Card from '../components/card/card';
import OrderToolbar from '../components/order-toolbar/order-toolbar';
import { Container } from './wallet.style';

import axios from 'axios';
import { Transfers, WalletDTO } from '../models/dto/wallet.model';

import { Collapse, Pagination, Spin } from "antd";

import "antd/dist/antd.css";
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import ArrowIcon from '../components/arrow-icon/arrow.';
import WalletAddress from '../components/wallet-address/wallet-address';
import TokenListItem from '../components/token-list-item/received-tokens';

import { Bar, ResponsiveBar } from '@nivo/bar'
import { chartmock } from '../mocks/chart.mock';
import { RectSeries } from 'react-vis';
import { Wallet } from '../models/classes/wallet.model';


import ArrowRed from '../../../assets/png-icons/arrow_red.png';
import ArrowGreen from '../../../assets/png-icons/arrow_green.png';
import { format } from 'path';
import { Block, Transfer, Transfers as TransfersResponse } from '../models/dto/currency-transaction.dto';



const WalletComponent: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [page, setPage] = useState(1);
    const [perpage, setPerpage] = useState(7);
    const [period, setPeriod] = useState<string | number>(30);
    const [walletInfo, setWalletInfo] = useState<Wallet>();
    const [receivedTokenGroups, setReceivedTokenGroups] = useState<Transfers.TransfersInfoModel[]>();
    const [sentTokenGroups, setSentTokenGroups] = useState<Transfers.TransfersInfoModel[]>();
    const [transfersPerToken, setTransfersPerToken] = useState<Transfer[]>();
    const [transactionsPerTokenEndpoint] = useState<any>(process.env.REACT_APP_TRANSACTIONS_PER_TOKEN_ENDPOINT);
    const [walletEndpoint] = useState<any>(process.env.REACT_APP_WALLET_ENDPOINT_RECEIVED_TOKEN);
    const [transfersEndpoint] = useState<any>(process.env.REACT_APP_WALLET_ENDPOINT_SENT_TOKEN);

    
    const from = (days: number) => {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString();
    }

    useMemo( () => {
        const dt = new Date();
        const month = dt.getMonth();
        const year = dt.getFullYear();
        const daysInMonth = new Date(year, month, 0).getDate();
        setPeriod(daysInMonth);
    }, [])

    useEffect(() => {
        setWalletAddress('0x377e0D8e62788Cab207D56C097b89D225A182D31');
        const requestTransfersDataBody = {
            address: "0x377e0D8e62788Cab207D56C097b89D225A182D31",
            from: from(15)
        }
        const requestWaletDataBody = {
            address: "0x377e0D8e62788Cab207D56C097b89D225A182D31",
        }

        const transactionPerTokenDataBody = {
            isSend: true,
            address: "0x377e0d8e62788cab207d56c097b89d225a182d31",
            currency: "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd",
            from: "2021-11-06",
            till: "2021-12-05T23:59:59"

        }
        fetchTransfers(transfersEndpoint, requestTransfersDataBody);
        fetchWalletData(walletEndpoint, requestWaletDataBody);

    }, []);

    const fetchTransfers = (endpoint: string, addr: { address: string, from: string }) => {
        axios.post(endpoint, addr).then(
            ({ data }) => {
                const { transfers } = data;
                console.log(transfers);
                setReceivedTokenGroups(transfers);
                setSentTokenGroups(transfers);
            }
        );
    }

    const updatePeriod = (days: number | string) => {
        if (days == 'month') {
            const dt = new Date();
            const month = dt.getMonth();
            const year = dt.getFullYear();
            const daysInMonth = new Date(year, month, 0).getDate();
            setPeriod(daysInMonth);

        } else {
            setPeriod(days)
        }
        const requestTransfersDataBody = {
            address: "0x377e0D8e62788Cab207D56C097b89D225A182D31",
            from: from(period as number)
        }
        const requestWaletDataBody = {
            address: "0x377e0D8e62788Cab207D56C097b89D225A182D31",
        }
        fetchTransfers(transfersEndpoint, requestTransfersDataBody);
        fetchWalletData(walletEndpoint, requestWaletDataBody);
        console.log('disparou', period)

    }

    const fetchWalletData = (endpoint: string, addr: { address: string }) => {
        axios.post(endpoint, addr).then(
            ({ data }) => {
                const walletInfoData: WalletDTO = data;
                const wallet = new Wallet(walletInfoData);
                setWalletInfo(wallet);

            }
        );
    }

    const fetchCurrencyTransatcions = (body: {
        isSend: boolean,
        address: string,
        currency: string,
        from: string,
        till: string
    }) => {
        console.log(transactionsPerTokenEndpoint, body)
        setTransfersPerToken([])
        axios.post(transactionsPerTokenEndpoint, body
        ).then(
            ({ data }) => {
                const res = data.transfers as TransfersResponse;
                const { transfers } = res;
                console.log(res, transfers)
                setTransfersPerToken(transfers)
            }
        );

    }

    return <Container>
        <Card>
            <WalletAddress address={walletAddress} />
        </Card>
        <div className="card-row">
            <Card >
                <div className="card-header border-0" style={{ width: "100%" }}>
                    <div className="card-title">
                        <h2 className="fw-bolder mb-0">Received Tokens</h2>
                    </div>
                    <OrderToolbar setPeriod={updatePeriod} />
                </div>
                <Collapse accordion ghost expandIcon={(props) => <ArrowIcon rotate={props.isActive ? 'rotate' : 'initial'} />} expandIconPosition="left"  >
                    {

                        receivedTokenGroups?.slice((page - 1) * perpage, page * perpage).map((transfer, index) =>

                            <CollapsePanel className="collapsed-panel-override" key={index} header={
                                <div className="panel-header-wrapper" onClick={() => fetchCurrencyTransatcions({
                                    isSend: false,
                                    address: walletAddress,
                                    currency: transfer.currency.address,
                                    from: from(period as number),
                                    till: new Date().toISOString()
                                })}>
                                    <div className="text-gray-800 fw-bolder fs-3 currency-simbol">{transfer.currency.symbol}</div>
                                    <img src={ArrowGreen} width="15px" height="15px" alt="" />
                                    <div className="text-gray-800 fw-bolder">{transfer.sum_in.toFixed(2)}</div>
                                    <div className="text-gray-800 fw-bolder">{transfer.count_in}Tx</div>
                                </div>
                            }>

                                <table style={{ marginLeft: "30px" }} className="table align-middle gs-0 gy-5">
                                    <thead>
                                        <tr>
                                            <th className="p-0 w-50px"></th>
                                            <th className="p-0 min-w-150px"></th>
                                            <th className="p-0 min-w-150px"></th>
                                            <th className="p-0 min-w-125px"></th>
                                            <th className="p-0 min-w-40px"></th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {(!transfersPerToken || transfersPerToken?.length == 0) && <Spin className={
                                            (transfersPerToken && transfersPerToken?.length > 0) ? 'hide' : 'show'
                                        } style={{ margin: '0 auto' }} />}
                                        {
                                            transfersPerToken?.map(
                                                transfer => (
                                                    <TokenListItem token={transfer} currency={transfer.currency} rule="in" />
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </CollapsePanel>
                        )
                    }
                </Collapse>
                <Pagination defaultCurrent={1} total={receivedTokenGroups?.length}  onChange={(page) => setPage(page)} />
            </Card>

            <Card>
                <div className="card-header border-0" style={{ width: "100%" }}>
                    <div className="card-title">
                        <h2 className="fw-bolder mb-0">Sent Tokens</h2>
                    </div>
                    <OrderToolbar setPeriod={updatePeriod}  />
                </div>
                <Collapse accordion ghost expandIcon={(props) => <ArrowIcon rotate={props.isActive ? 'rotate' : 'initial'} />} expandIconPosition="left"  >
                    {
                        sentTokenGroups?.slice((page - 1) * perpage, page * perpage).map((transfer, index) =>
                            <CollapsePanel className="collapsed-panel-override" key={index} header={
                                <div className="panel-header-wrapper" onClick={() => fetchCurrencyTransatcions({
                                    isSend: true,
                                    address: walletAddress,
                                    currency: transfer.currency.address,
                                    from: from(period as number),
                                    till: new Date().toISOString()
                                })}>
                                    <div className="text-gray-800 fw-bolder fs-3 currency-symbol">{transfer.currency.symbol}</div>
                                    <img src={ArrowRed} width="15px" height="15px" alt="" />
                                    <div className="text-gray-800 fw-bolder ">{transfer.sum_out.toFixed(2)}</div>
                                    <div className="text-gray-800 fw-bolder ">{transfer.count_out}Tx</div>
                                    {/* <div className="text-gray-800 fw-bolder ms-20 fs-3">{token?.priceInWallet && token?.priceInWallet?.toFixed(1)}</div> */}
                                </div>
                            }>

                                <table style={{ marginLeft: "30px" }} className="table align-middle gs-0 gy-5">
                                    <thead>
                                        <tr>
                                            <th className="p-0 w-50px"></th>
                                            <th className="p-0 min-w-150px"></th>
                                            <th className="p-0 min-w-150px"></th>
                                            <th className="p-0 min-w-125px"></th>
                                            <th className="p-0 min-w-40px"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(!transfersPerToken || transfersPerToken?.length == 0) && <Spin className={
                                            (transfersPerToken && transfersPerToken?.length > 0) ? 'hide' : 'show'
                                        } style={{ margin: '0 auto' }} />}
                                        {
                                            transfersPerToken?.map(
                                                transfer => (
                                                    <TokenListItem token={transfer} currency={transfer.currency} rule="in" />
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </CollapsePanel>
                        )
                    }
                </Collapse>
                <Pagination defaultCurrent={1} total={sentTokenGroups?.length}  onChange={(page) => setPage(page)} />

            </Card>
        </div >
        <Card>
            {/* <div className="chart-wrapper">
                {

                    receivedTokenGroups && <ResponsiveBar
                        data={receivedTokenGroups as any}
                        keys={['symbol']}
                        indexBy="symbol"
                        groupMode="grouped"
                        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                        padding={0.3}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={{ scheme: 'nivo' }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: '#38bcb2',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: '#eed312',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                            }
                        ]}

                        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'country',
                            legendPosition: 'middle',
                            legendOffset: 32
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'price',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        legends={[
                            {
                                dataFrom: 'keys',
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 120,
                                translateY: 0,
                                itemsSpacing: 2,
                                itemWidth: 100,
                                itemHeight: 20,
                                itemDirection: 'left-to-right',
                                itemOpacity: 0.85,
                                symbolSize: 20,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                        barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}

                    />
                }
            </div> */}
        </Card>
    </Container >;
};

export default WalletComponent;