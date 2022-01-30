/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

export const RequestAuditContext = React.createContext({});

export const RequestAuditProvider = (props: any) => {
    const ORIGINAL_PRICES = {
        audit: 1.5,
        ama: 2,
        kyc: 3,
        ad: 2,
        '1.5': 1.5,
        '2': 2,
        '2.5': 2.5,
        '3': 3,
    }


    const ORIGINAL_DISCOUNT_PRICES = {
        audit: 1.5,
        ama: 1.5,
        kyc: 2,
        ad: 0,
        '1.5': 1.5,
        '2': 2,
        '2.5': 2.5,
        '3': 3,
    }


    const PROMO_PRICES = {
        audit: 1.5,
        ama: 3,
        kyc: 3,
        ad: 2,
        '1.5': 1.5,
        '2': 2,
        '2.5': 2.5,
        '3': 3,
    }

    const [products, setProducts] = useState<any>();
    const [formData, setFormData] = useState<any>();
    const [totalPrice, setTotalPrice] = useState<any>(0);
    const [bundleDiscount, setBundleDiscount] = useState<any>(0);


    const [prices, setPrices] = useState<any>();
    const [originalPrices, setOriginalPrices] = useState<any>();
    const [discountPrices, setDiscountPrices] = useState<any>();
    const [promoPrices, setPromoPrices] = useState<any>();
    const [auditPrices, setAuditPrices] = useState<any>();

    const [totalItemsSelecteds, setTotalItemsSelecteds] = useState<number>(0);

    const [productNames, setProductNames] = useState<any>(['audit', 'ama', 'kyc', 'deadline', 'ad']);

    const state = {
        productCart: [products, setProducts],
        formDataState: [formData, setFormData],
        cartData: { totalPrice, bundleDiscount },
        pricesState: {
            prices,
            discountPrices,
            promoPrices,
            auditPrices,
            originalPrices
        },
        productsConfig: {
            productNames
        },
        cartInfo: {
            totalItemsSelecteds
        }
    }
    useEffect(() => {
        setPrices(ORIGINAL_PRICES)
        setDiscountPrices(ORIGINAL_DISCOUNT_PRICES)
        setPromoPrices(PROMO_PRICES)
        setOriginalPrices(ORIGINAL_PRICES);
    }, [])

    useEffect(() => {
        validateAndApplyDiscount();
    }, [totalItemsSelecteds]);

    const validateAndApplyDiscount = () => {
        if (products !== undefined) {
            let _discount = 0;
            let _prices = ORIGINAL_PRICES;
            if (totalItemsSelecteds > 3 && products.audit && products.ama && products.kyc && products.ad) {
                if (products.ad) {
                    _discount = (_discount + ORIGINAL_PRICES['ad']);
                }
                _prices = applyDiscount('ad', _prices)
            }
            if (totalItemsSelecteds > 1) {
                if (products.kyc) {
                    _discount = (_discount + (ORIGINAL_PRICES['kyc'] - discountPrices['kyc']));
                }
                _prices = applyDiscount('kyc', _prices)

            }
            if (totalItemsSelecteds > 1) {
                if (products.ama) {
                    _discount = (_discount + (ORIGINAL_PRICES['ama'] - discountPrices['ama']));
                }
                _prices = applyDiscount('ama', _prices)
            }
            setBundleDiscount(_discount);
            setPrices(_prices)
            applyValues(_prices);
        }
    }

    const applyValues = (_prices) => {
        const calc = Object.entries(products).reduce((prev, curr, index, array) => {
            const [entrie, value] = curr;
            if (entrie && entrie === 'deadline' && products.audit) {
                return prev + (value as number);

            } else if (entrie && entrie === 'audit' && value && products.deadline === undefined) {
                return prev + ORIGINAL_DISCOUNT_PRICES['1.5'];

            } else if (value && value !== undefined && typeof value !== 'number') {
                return prev + _prices[entrie];
            } else {
                return prev;
            }
        }, 0);
        setTotalPrice(calc ? calc : 0);
    }

    const calculateQuantity = () => {
        const values = Object.values(products);
        const _totalItemsSelecteds = values.filter(item => item === true).length;
        if (_totalItemsSelecteds === totalItemsSelecteds) {
            validateAndApplyDiscount();

        }
        setTotalItemsSelecteds(_totalItemsSelecteds);
    }

    const applyDiscount = (productName, _prices) => {
        _prices[productName] = discountPrices[productName];
        return _prices;
    }

    useEffect(() => {
        if (products !== undefined) {
            calculateQuantity();
        }
    }, [products]);

    return (
        <RequestAuditContext.Provider value={state}>
            {props.children}
        </RequestAuditContext.Provider >
    )

}
