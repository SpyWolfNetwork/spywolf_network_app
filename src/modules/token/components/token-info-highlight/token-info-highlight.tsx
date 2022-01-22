/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import React, { useContext, useEffect } from 'react';
import { ApplicationContext } from '../../../../core/routes/providers/application.provider';
import { Container, DashedCard } from './token-info-highlight.style';

const TokenInfoHighlight: React.FC = () => {
  
    const { ctx } = useContext(ApplicationContext) as any;
    const [tokenData, setTokenData] = ctx;
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
            <h1 id="value" className='fs-1 fw-bolder text-gray-800 lh-1'>
                {tokenData?.currency?.symbol ? tokenData?.currency?.symbol : '-'}
            </h1>
            <span id="label" className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>
                Symbol
            </span>
        </DashedCard>

        <DashedCard>
            <h1 id="value" className='fs-1 fw-bolder text-gray-800 lh-1'>
                {tokenData?.currentMarketCap ? formatter.format(tokenData?.currentMarketCap) : '-'}
            </h1>
            <span id="label" className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>
                Current Market Cap
            </span>
        </DashedCard>
        <DashedCard>
            <h1 id="value" className='fs-1 fw-bolder text-gray-800 lh-1'>
                {tokenData?.currentPrice ? formatterToLow.format(tokenData?.currentPrice) : '-'}
            </h1>
            <span id="label" className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>
                Current Price
            </span>
        </DashedCard>



        <DashedCard>
            <h1 id="value" className='fs-1 fw-bolder text-gray-800 lh-1'>
                {tokenData?.currentLiquidity ? formatter.format(tokenData?.currentLiquidity) : '-'}
            </h1>
            <span id="label" className='fs-6 fw-bold text-muted d-block lh-1 pt-2'>
                Current Liquidity
            </span>
        </DashedCard>
    </Container>;
};

export default TokenInfoHighlight;

