/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import React, { useEffect, useMemo, useState } from 'react';
// import Card from '../../../shared/components/card/card';
import OrderToolbar from '../components/order-toolbar/order-toolbar';
import { Container } from './wallet.style';

import axios from 'axios';
import { Transfers, WalletDTO } from '../models/dto/wallet.model';

import { Card, Collapse, Descriptions, Empty, Pagination, Popover, Spin } from "antd";

import "antd/dist/antd.css";
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import ArrowIcon from '../../../shared/components/arrow-icon/arrow.';
import WalletAddress from '../components/wallet-address/wallet-address';
import TokenListItem from '../components/token-list-item/received-tokens';

import { Bar, ResponsiveBar } from '@nivo/bar'
import { chartmock } from '../mocks/chart.mock';
import { RectSeries } from 'react-vis';
import { Wallet } from '../models/classes/wallet.model';


import ArrowRed from '../../../assets/png-icons/arrow_red.png';
import ArrowGreen from '../../../assets/png-icons/arrow_green.png';
// import { format } from 'path';
import { Block, Transfer, Transfers as TransfersResponse } from '../models/dto/currency-transaction.dto';
import { ChartCurrencyData } from '../models/classes/chart-data';
import { useParams } from 'react-router-dom';



const WalletComponent: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState('');
    const [pageReceived, setPageReceived] = useState(1);
    const [pageSent, setPageSent] = useState(1);
    const [perpage, setPerpage] = useState(7);
    const [receivedPeriod, setReceivedPeriod] = useState<string | number>(7);
    const [sentPeriod, setSentPeriod] = useState<string | number>(7);
    const [walletInfo, setWalletInfo] = useState<Wallet | null>();
    const [receivedTokenGroups, setReceivedTokenGroups] = useState<Transfers.TransfersInfoModel[] | null>();
    const [sentTokenGroups, setSentTokenGroups] = useState<Transfers.TransfersInfoModel[] | null>();
    const [receivedTransfersPerToken, setReceivedTransfersPerToken] = useState<Transfer[] | null>();
    const [sentTransfersPerToken, setSentTransfersPerToken] = useState<Transfer[] | null>();
    const [transactionsPerTokenEndpoint] = useState<any>(process.env.REACT_APP_TRANSACTIONS_PER_TOKEN_ENDPOINT);
    const [walletEndpoint] = useState<any>(process.env.REACT_APP_WALLET_ENDPOINT_RECEIVED_TOKEN);
    const [transfersEndpoint] = useState<any>(process.env.REACT_APP_WALLET_ENDPOINT_SENT_TOKEN);
    let keys: string[] | undefined = [];

    const [chartData, setChartData] = useState<any>();

    const format = (v: any) => `${v}%`

    const [loading, setLoading] = useState<boolean>(true);

    const from = (days: number) => {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString();
    }

    const getMonthDays = () => {
        const dt = new Date();
        const month = dt.getMonth();
        const year = dt.getFullYear();
        const daysInMonth = new Date(year, month, 0).getDate();
        setSentPeriod(daysInMonth);
        setReceivedPeriod(daysInMonth);
        return daysInMonth;
    }

    const { walletid } = useParams();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    useEffect(() => {
        setWalletAddress(walletid as string);
        const requestTransfersDataBody = {
            address: (walletid as string),
            from: from(7)
        }
        const requestWaletDataBody = {
            address: (walletid as string),
        }

        const transactionPerTokenDataBody = {
            isSend: true,
            address: "0x377e0d8e62788cab207d56c097b89d225a182d31",
            currency: "0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd",
            from: "2021-11-06",
            till: "2021-12-05T23:59:59"

        }

        fetchTransfersReceived(transfersEndpoint, requestTransfersDataBody);
        fetchTransfersSent(transfersEndpoint, requestTransfersDataBody);
        fetchWalletData(walletEndpoint, requestWaletDataBody);

    }, []);



    const fetchTransfersReceived = (endpoint: string, addr: { address: string, from: string }) => {
        axios.post(endpoint, addr).then(
            ({ data }) => {
                if (data) {
                    const { transfers } = data;
                    setReceivedTokenGroups(transfers);
                    setLoading(false);
                } else {
                    setReceivedTokenGroups(null);
                }

            }
        );
    }


    const fetchTransfersSent = (endpoint: string, addr: { address: string, from: string }) => {
        axios.post(endpoint, addr).then(
            ({ data }) => {
                if (data) {
                    const { transfers } = data;
                    setSentTokenGroups(transfers);
                    setLoading(false);
                } else {
                    setSentTokenGroups(null)
                }
            }
        );
    }

    const updatePeriod = (days: number | string, type: string) => {
        if (days === 'month') {
            const daysInAMonth = getMonthDays();
            const requestTransfersDataBody = {
                address: "0x377e0D8e62788Cab207D56C097b89D225A182D31",
                from: from(daysInAMonth as number)
            }
            if (type === 'receivedPeriod') {
                setReceivedPeriod(daysInAMonth);

            } else {
                setSentPeriod(daysInAMonth);

            }
            setLoading(true)
            fetchTransfersReceived(transfersEndpoint, requestTransfersDataBody);

        } else {
            const requestTransfersDataBody = {
                address: "0x377e0D8e62788Cab207D56C097b89D225A182D31",
                from: from(days as number)
            }

            if (type === 'receivedPeriod') {
                setReceivedPeriod(days);

            } else {
                setSentPeriod(days);

            }
            setLoading(true)
            fetchTransfersReceived(transfersEndpoint, requestTransfersDataBody);
        }

    }

    const fetchWalletData = (endpoint: string, addr: { address: string }) => {
        axios.post(`${endpoint}`, addr).then(
            ({ data }) => {
                const walletInfoData: WalletDTO = data;
                const wallet = new Wallet(walletInfoData);
                setWalletInfo(wallet);
                const chartdata = walletInfoData?.result?.Payload?.currencies?.filter(() => true).map(token => token.symbol ? new ChartCurrencyData(walletInfoData, token) : null)?.filter(data => data && data);
                setChartData(chartdata);

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
        setReceivedTransfersPerToken([])
        setReceivedTransfersPerToken([])
        axios.post(transactionsPerTokenEndpoint, body
        ).then(
            ({ data }) => {
                const res = data.transfers as TransfersResponse;
                const { transfers } = res;
                if (body.isSend) {
                    setSentTransfersPerToken(transfers);
                } else {
                    setReceivedTransfersPerToken(transfers)
                }
            }
        );

    }

    return <Container>
        <Card style={{ width: '100%' }}>
            <WalletAddress address={walletAddress} />
        </Card>
        <div className="card-row">
            <Card className='min'
                title={
                    <div className="card-header border-0" style={{ width: "100%" }}>
                        <div className="card-title">
                            <h2 className="fw-bolder mb-0">Received Tokens</h2>
                        </div>
                    </div>
                }
                extra={
                    <OrderToolbar setPeriod={updatePeriod} />
                }
                actions={
                    [
                        <Pagination current={pageReceived} total={receivedTokenGroups?.length} onChange={(page) => setPageReceived(page)} />
                    ]
                }>

                <Collapse accordion ghost expandIcon={(props) => <ArrowIcon rotate={props.isActive ? 'rotate' : 'initial'} />} expandIconPosition="left"  >
                    {
                        receivedTokenGroups == null && <span> <Empty /></span>
                    }
                    {
                        receivedTokenGroups?.length === 0 && <span> <Empty /></span>
                    }

                    <span>
                        {
                            receivedTokenGroups?.length
                        }
                    </span>
                    {
                        receivedTokenGroups?.slice((pageReceived - 1) * perpage, pageReceived * perpage).map((transfer, index) =>
                            <CollapsePanel className="collapsed-panel-override" key={index} header={
                                <div className="panel-header-wrapper" onClick={() => fetchCurrencyTransatcions({
                                    isSend: false,
                                    address: walletAddress,
                                    currency: transfer.currency.address,
                                    from: from(receivedPeriod as number),
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
                                        {receivedTransfersPerToken === undefined &&
                                            <Spin />
                                        }
                                        {
                                            (receivedTransfersPerToken && receivedTransfersPerToken?.length === 0) ?
                                                <Empty /> :
                                                receivedTransfersPerToken?.map(
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

            </Card>

            <Card className='min'
                title={<div className="card-header border-0" style={{ width: "100%" }}>
                    <div className="card-title">
                        <h2 className="fw-bolder mb-0">Sent Tokens</h2>
                    </div>
                </div>}
                extra={
                    <OrderToolbar setPeriod={updatePeriod} />
                }
                actions={[<Pagination current={pageSent} defaultPageSize={7} total={sentTokenGroups?.length} onChange={(page) => setPageSent(page)} />]}>

                <Collapse accordion ghost expandIcon={(props) => <ArrowIcon rotate={props.isActive ? 'rotate' : 'initial'} />} expandIconPosition="left"  >
                    {
                        receivedTokenGroups == null && <span> <Empty /></span>
                    }
                    {
                        receivedTokenGroups?.length === 0 && <span> <Empty /></span>
                    }
                    {
                        sentTokenGroups?.slice((pageSent - 1) * perpage, pageSent * perpage).map((transfer, index) =>
                            <CollapsePanel className="collapsed-panel-override" key={index} header={
                                <div className="panel-header-wrapper" onClick={() => fetchCurrencyTransatcions({
                                    isSend: true,
                                    address: walletAddress,
                                    currency: transfer.currency.address,
                                    from: from(sentPeriod as number),
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
                                        {sentTransfersPerToken === undefined &&
                                            <Spin />
                                        }
                                        {
                                            sentTransfersPerToken && sentTransfersPerToken?.length === 0 ?
                                                <Empty /> :
                                                sentTransfersPerToken?.map(
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
            </Card>
        </div >
        <Card className='min' title={<div className="card-header border-0" style={{ width: "100%" }}>
            <div className="card-title">
                <h2 className="fw-bolder mb-0">Token Allocation</h2>
                {/* <h3>Select Token to see its value</h3> */}
            </div>

        </div>}
            extra={<div className="token-total-info-wrapper">
                <h1 className='text-gray-800 text-hover-primary fs-2 fw-bolder me-3'> {walletInfo?.currencies?.length} Tokens Total</h1>
                <h1 className='fs-6 fw-bold text-gray-400'> {walletInfo?.totalPrice?.toFixed(2)}BNB Value</h1>
            </div>}>
            {
                chartData == null && <span> <Empty /></span>
            }
            {
                chartData?.length === 0 && <span> <Empty /></span>
            }
            <div className="chart-wrapper">
                {
                    chartData && <ResponsiveBar
                        data={chartData as any}
                        keys={['percentageInWallet']}
                        indexBy="symbol"
                        groupMode="grouped"
                        margin={{ top: 100, right: 30, bottom: 50, left: 60 }}
                        padding={0.7}
                        innerPadding={1}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={'#a0d5da'}
                        colorBy='indexValue'
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

                        ]}

                        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                        axisTop={null}
                        axisRight={null}
                        axisLeft={{
                            format,
                            tickValues: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        }}
                        theme={{
                            axis: {
                                ticks: {
                                    text: {
                                        fontFamily: "Poppins",
                                        fill: "#454547",
                                        fontWeight: '700'
                                    }
                                }
                            },
                            grid: {
                                line: {
                                    stroke: "#b5b5c3",
                                    strokeWidth: 2,
                                    strokeDasharray: "4 4",
                                    opacity: '0.3'
                                }
                            }
                        }}
                        gridYValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                        // axisBottom={{
                        //     tickSize: 5,
                        //     tickPadding: 5,
                        //     tickRotation: 0,
                        //     legend: 'symbol',
                        //     legendPosition: 'middle',
                        //     legendOffset: 32
                        // }}
                        // axisLeft={{
                        //     tickSize: 5,
                        //     tickPadding: 5,
                        //     tickRotation: 0,
                        //     legend: 'percentage',
                        //     legendPosition: 'middle',
                        //     legendOffset: -40,
                        // }}
                        // labelSkipWidth={12}
                        // labelSkipHeight={12}
                        // labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}

                        // chart tooltip - token price, price in dollar, percentage, 
                        tooltip={(e, i) => {
                            return <Card style={{ width: 'fit-content' }}>
                                <div className="card-tooltip-wrapper" >
                                    <p><span className='fw-bold text-gray-400'>Name: </span>
                                        <span className='fw-bold'>{e.data.name}</span></p>
                                    <p><span className='fw-bold text-gray-400'>Price: </span>
                                        <span className='fw-bold'>{(e.data.price as number).toString().slice(0, 5)}BNB</span></p>
                                    <p><span className='fw-bold text-gray-400'>Total in Wallet: </span>
                                        <span className='fw-bold' >{(e.data.amountInWallet as number).toString().slice(0, 5)}BNB</span></p>
                                    <p><span className='fw-bold text-gray-400'>Price in Dollar: </span>
                                        <span className='fw-bold'>{formatter.format((e.data.amountInWallet as any * walletInfo?.priceBNBInDollar) as number)}</span></p>
                                    <p><span className='fw-bold text-gray-400'>Percentage: </span>
                                        <span className='fw-bold'>{e.value.toFixed(2)}%</span></p>
                                </div>
                            </Card>
                        }
                        }
                        enableLabel={false}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                    // barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}

                    />
                }
            </div>

        </Card>
        <Card style={{ width: 'fit-content' }}>

        </Card>
    </Container >;
};

export default WalletComponent;