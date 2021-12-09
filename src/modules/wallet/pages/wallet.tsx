/* eslint-disable jsx-a11y/anchor-is-valid */
// Dependencies
import React, { useEffect, useState } from 'react';
import Card from '../components/card/card';
import OrderToolbar from '../components/order-toolbar/order-toolbar';
import { Container } from './wallet.style';

import axios from 'axios';
import { TokenGroup, Transfers, WalletResponse } from '../models/wallet.model';

import { Collapse } from "antd";

import "antd/dist/antd.css";
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import ArrowIcon from '../components/arrow-icon/arrow.';
import WalletAddress from '../components/wallet-address/wallet-address';
import { groupBy, transfersGroupBy } from '../utils/utils';
import TokenListItem from '../components/token-list-item/received-tokens';

import { Bar, ResponsiveBar } from '@nivo/bar'
import { chartmock } from '../mocks/chart.mock';


const Wallet: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState('');
    // const [walletInfo, setWalletInfo] = useState<WalletResponse>();
    // const [receivedCurrencies, setReceivedWalletCurrencies] = useState<WalletResponse>();
    // const [sentCurrencies, setSentWalletCurrencies] = useState<WalletResponse>();
    const [receivedTokenGroups, setReceivedTokenGroups] = useState<Transfers.TransfersGroup[]>();
    const [sentTokenGroups, setSentTokenGroups] = useState<Transfers.TransfersGroup[]>();
    // const [tokenKeys, setTokenKeys] = useState<any>();


    useEffect(() => {
        setWalletAddress('bc1qx067yt3mf2hmqyvyz02m06zwa8rgzald43m295');
        const receivedEndpoint = process.env.REACT_APP_WALLET_ENDPOINT_RECEIVED_TOKEN as string;
        const transfersEndpoint = process.env.REACT_APP_WALLET_ENDPOINT_SENT_TOKEN as string;
        const addr = {
            address: "0x377e0D8e62788Cab207D56C097b89D225A182D31"
        }

        fetchTransfers(transfersEndpoint,addr );


    }, []);

    const fetchTransfers = (endpoint: string, addr: { address: string }) => {
        axios.post(endpoint, addr).then(
            (res) => {
                const transfers: Transfers.TransfersInfoModel[] = res.data.transfers.transfersInfo;

                // const walletInfo: WalletResponse = res.data;
                console.log(transfers);
                // setReceivedWalletCurrencies(walletInfo);
                // setWalletInfo(walletInfo);
            
                // fetchReceivedTokens();
                // fetchSentTokens();
                setReceivedTokenGroups(transfersGroupBy(transfers));
                setSentTokenGroups(transfersGroupBy(transfers));
            }
        );
    }
    const fetchReceivedTokens = (transferGroups: Transfers.TransfersModel) => {
                // setReceivedTokenGroups(groups);
    }

    const fetchSentTokens = (endpoint: string, addr: { address: string }) => {
        axios.post(endpoint, addr).then(
            (res) => {
                const transfers: { transfersInfo: any[] } = res.data.transfers
                const currencies = transfers.transfersInfo.map((
                    transfer: { currency: any }) => {
                    return transfer.currency
                }
                )

                const groups = groupBy(currencies, 'symbol')
                    .filter((group: TokenGroup) => group.symbol);

                setSentTokenGroups(groups);

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
                    <OrderToolbar />
                </div>
                <Collapse accordion ghost expandIcon={(props) => <ArrowIcon rotate={props.isActive ? 'rotate' : 'initial'} />} expandIconPosition="left"  >
                    {
                        receivedTokenGroups?.map((transfer, index) =>
                            <CollapsePanel className="collapsed-panel-override" key={index} header={<div>
                                <div style={{ height: '60px', display: 'flex', alignItems: 'center' }} className="me-3">
                                    <div className="d-flex">
                                        <div className="text-gray-800 fw-bolder fs-3">{transfer.symbol}</div>

                                        {/* <div className="text-gray-800 fw-bolder ms-20 fs-3">{token?.priceInWallet?.toFixed(1)}</div> */}
                                    </div>

                                </div>
                            </div>}>

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
                                        {
                                            transfer.transfers.map(
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
                <div className="row mb-10" style={{ width: "100%" }}>
                    <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                        <div className="dataTables_paginate paging_simple_numbers"
                            id="kt_customer_details_invoices_table_1_paginate">

                        </div>
                    </div>
                </div>
            </Card>

            <Card>
                <div className="card-header border-0" style={{ width: "100%" }}>
                    <div className="card-title">
                        <h2 className="fw-bolder mb-0">Sent Tokens</h2>
                    </div>
                    <OrderToolbar />
                </div>
                <Collapse accordion ghost expandIcon={(props) => <ArrowIcon rotate={props.isActive ? 'rotate' : 'initial'} />} expandIconPosition="left"  >
                    {
                        sentTokenGroups?.slice(0, 11).map((transferGroup, index) =>
                            <CollapsePanel className="collapsed-panel-override" key={index} header={<div>
                                <div style={{ height: '60px', display: 'flex', alignItems: 'center' }} className="me-3">
                                    <div className="d-flex">
                                        <div className="text-gray-800 fw-bolder fs-3">{transferGroup.symbol && transferGroup.symbol}</div>
                                        

                                        {/* <div className="text-gray-800 fw-bolder ms-20 fs-3">{token?.priceInWallet && token?.priceInWallet?.toFixed(1)}</div> */}
                                    </div>

                                </div>
                            </div>}>

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
                                        {
                                            transferGroup.transfers.map(
                                                transfer => (
                                                    <TokenListItem token={transfer} currency={transfer.currency} rule="out" />
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </CollapsePanel>
                        )
                    }
                </Collapse>
                <div className="row mb-10" style={{ width: "100%" }}>
                    <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
                        <div className="dataTables_paginate paging_simple_numbers"
                            id="kt_customer_details_invoices_table_1_paginate">

                        </div>
                    </div>
                </div>
            </Card>
        </div >
        <Card>
            <div className="chart-wrapper">
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
            </div>
        </Card>
    </Container >;
};

export default Wallet;