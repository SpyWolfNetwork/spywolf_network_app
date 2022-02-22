/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import { Spin } from 'antd';
import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Token } from '../../models/token.model';
import { Container, DashedCard } from './token-info-highlight.style';

const TokenInfoHighlight: React.FC<{ loading: boolean }> = (props) => {

    const { ctx } = useContext(ApplicationContext) as any;
    const [tokenData] = ctx as Array<Token>;
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 3

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    const formatterToLow = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 8

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });


    useEffect(() => {



    }, []);

    return <Container>

        <DashedCard>
            {
                tokenData?.basicInfo?.symbol === undefined && <Spin />
            }
            {
                tokenData?.basicInfo?.symbol !== undefined &&
                <div>
                    <h1 id="value" className='fs-1 fw-bolder text-gray-800 lh-1'>
                        {tokenData?.basicInfo?.symbol ? tokenData?.basicInfo?.symbol : '-'}
                    </h1>
                    <span id="label" className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>
                        Symbol
                    </span>
                </div>
            }

        </DashedCard>

        <DashedCard>
            {tokenData?.currentMarketCap === undefined && <Spin />}
            {tokenData?.currentMarketCap !== undefined &&
                <div>
                    <h1 id="value" className='fs-1 fw-bolder text-gray-800 lh-1'>
                        {tokenData?.currentMarketCap ? formatter.format(tokenData?.currentMarketCap) : '-'}
                    </h1>
                    <span id="label" className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>
                        Current Market Cap
                    </span>
                </div>
            }
        </DashedCard>
        <DashedCard>
            {tokenData?.currentPrice === undefined && <Spin />}
            {tokenData?.currentPrice !== undefined &&
                <div>
                    <h1 id="value" className='fs-1 fw-bolder text-gray-800 lh-1'>
                        {tokenData?.currentPrice ? formatterToLow.format(tokenData?.currentPrice) : '-'}
                    </h1>

                    <span id="label" className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>
                        Current Price
                    </span>
                </div>
            }

        </DashedCard>



        <DashedCard>
            {tokenData?.currentLiquidity === undefined && <Spin />}
            {tokenData?.currentLiquidity !== undefined &&
                <div>
                    <h1 id="value" className='fs-1 fw-bolder text-gray-800 lh-1'>
                        {tokenData?.currentLiquidity ? formatter.format(tokenData?.currentLiquidity) : '-'}
                    </h1>
                    <span id="label" className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>
                        Current Liquidity
                    </span>
                </div>
            }
        </DashedCard>
    </Container>;
};

export default TokenInfoHighlight;

