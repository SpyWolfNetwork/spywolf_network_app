// Dependencies
import { Transfer } from 'antd';
import React, { useEffect, useState } from 'react';
import { Currency, TokenGroup, Transfers } from '../../models/wallet.model';

const TokenListItem: React.FC<{ currency: Transfers.TransferCurrency, token: Transfers.TransfersInfoModel, rule: string }> = (props) => {
    const { currency, token } = props
    const [transferValue, setTransferValue] = useState<number>();

    useEffect(() => {
        setTransferValue((token as any)['sum_' + props.rule])
    }, []);

    return <tr>
        <td>
            <span className="text-dark fw-bolder mb-1 fs-8">{(token as any)['sum_' + props.rule] && (token as any)['sum_' + props.rule].toFixed(2) + currency.symbol}</span>

        </td>
        <td>
            <span className="badge badge-light-primary fw-bold me-1">Received from </span>

        </td>
        <td>
            <span className="text-muted fs-8">{currency.address.substr(0, 4) + '...' + currency.address.substr(currency.address.length - 7)}</span>
        </td>
        <td>
            <span className="text-muted fw-bold fs-8">Dec 3, 2021</span>
        </td>
    </tr>

};

export default TokenListItem;

