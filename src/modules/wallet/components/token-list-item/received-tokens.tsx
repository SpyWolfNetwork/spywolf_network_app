// Dependencies
import React, { useEffect, useState } from 'react';
import { Transfer, Currency } from '../../models/dto/currency-transaction.dto';

const TokenListItem: React.FC<{ currency: Currency, token: Transfer, rule: string }> = (props) => {
    const { currency, token } = props
    const [transferValue, setTransferValue] = useState<number>();

    useEffect(() => {
        setTransferValue((token as any)['sum_' + props.rule])
    }, []);

    return <tr>
        <td>
            <span className="text-dark fw-bolder mb-1 fs-8">
                {token.amount.toFixed(2) + currency?.symbol}</span>

        </td>
        <td>
            <span className="badge badge-light-primary fw-bold me-1">{ props?.rule == 'in' ? 'Received from' : 'Sent to' }</span>

        </td>
        <td>
            <span className="text-muted fs-8">
                {token.transaction.hash.substr(0, 4) + '...' + token?.transaction?.hash.substr(token.transaction.hash.length - 7)}
                </span>
        </td>
        <td>
            <span className="text-muted fw-bold fs-8">
                {/* {token.block.timestamp} */}
                {/* {token?.block?.timestamp} */}
                {new Date(token?.block?.timestamp?.time as any).toDateString().slice(4)}
            </span>
        </td>
    </tr>

};

export default TokenListItem;

