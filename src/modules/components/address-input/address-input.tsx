// Dependencies
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import axios from 'axios';
import React, { ClipboardEvent, KeyboardEventHandler, useEffect, useState } from 'react';
import { AddressCheckResponseModel } from '../../home/models/address-check.model';
import { Container, SearchContainer } from './address-input.style';

const AddressInputComponent: React.FC<{ valid: any, valueChange }> = ({ valid, valueChange }) => {
    useEffect(() => { }, []);
    const { toChecksumAddress } = require('ethereum-checksum-address');

    const [addresValidaton, setAddressValidation] = useState<{ err: number, message: string, active: boolean }>()
    const [addressLoading, setAddressLoading] = useState<boolean>(false);

    const validadeAddress = (address: string) => {
        return axios.get(`https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokenorwalletinfo/${address}`)

    }

    const validateInput = (e) => {
        try {
            toChecksumAddress(e.currentTarget.value)
            setAddressValidation({
                err: 0,
                message: '',
                active: false
            })
            searchTokenOrWallet();
        } catch (e) {
            setAddressValidation({
                err: 0,
                message: 'Input a valid address',
                active: true
            })
            valid(false);
        
        }
        // buttonDisabled()
    }

    const handleSearchEnter: KeyboardEventHandler<HTMLInputElement> | undefined = (event) => {
        if (event.code === 'Enter') {
            setAddressLoading(true);
            let addr = '';
            try {
                if (!inputRef.state.value || inputRef.state.value === undefined) {
                    valid(false);
                    throw new Error('Empty Address');
                }
                addr = toChecksumAddress(inputRef.state.value);
                if (addr === '') {
                    valid(false);
                    throw new Error('Invalid token address')
                }
            } catch (err) {
                const e: Error = err as Error;
                setAddressValidation({
                    err: 0,
                    message: e.message,
                    active: true
                })
                setAddressLoading(false);

            }


            try {
                if (addr !== undefined && addr !== '') {
                    validadeAddress(addr).then(
                        ({ data }) => {
                            setAddressLoading(false);
                            const addressCheckResponse: AddressCheckResponseModel | null = data.smartContractInfo;
                            if (addressCheckResponse == null) {
                                valid(false);
                                throw new Error('Invalid Token Address');
                            }
                            if (addressCheckResponse.contractType === 'Token') {
                                valid(true);
                                setAddressValidation({
                                    err: 0,
                                    message: '',
                                    active: false
                                })
                            } else {
                                valid(false);
                                throw new Error('Invalid Token Addres');

                            }
                        },

                    ).catch(e => {
                        setAddressValidation({
                            err: 0,
                            message: 'No tokens were found with that address!',
                            active: true
                        })
                        setAddressLoading(false);
                    })
                } else {
                    valid(false);
                    throw new Error('Invalid token address');

                }
            } catch (err) {
                const e = err as Error;
                setAddressValidation({
                    err: 0,
                    message: e.message,
                    active: true
                })
                setAddressLoading(false);

            }
        }

    };

    let inputRef: any;
    const searchTokenOrWallet = () => {
        setAddressLoading(true);
        let addr = '';
        try {
            if (!inputRef.state.value || inputRef.state.value === undefined) {
                valid(false);
                throw new Error('Empty Address');
            }
            addr = toChecksumAddress(inputRef.state.value);
            if (addr === '') {
                valid(false);
                throw new Error('Invalid token address')
            }
        } catch (err) {
            const e: Error = err as Error;
            setAddressValidation({
                err: 0,
                message: e.message,
                active: true
            })
            setAddressLoading(false);

        }


        try {
            if (addr !== undefined && addr !== '') {
                validadeAddress(addr).then(
                    ({ data }) => {
                        setAddressLoading(false);
                        const addressCheckResponse: AddressCheckResponseModel | null = data.smartContractInfo;
                        if (addressCheckResponse == null) {
                            valid(false);
                            throw new Error('Invalid Token Address');
                        }
                        if (addressCheckResponse.contractType === 'Token') {
                            // navigate(`token/${addr}`);
                            valid(true);
                            setAddressValidation({
                                err: 0,
                                message: '',
                                active: false
                            })

                        } else {
                            valid(false);
                            throw new Error('Invalid Token Addres');

                        }
                    },

                ).catch(e => {
                    setAddressValidation({
                        err: 0,
                        message: 'No tokens were found with that address!',
                        active: true
                    })
                    setAddressLoading(false);
                })
            } else {
                valid(false);
                throw new Error('Invalid token address');

            }
        } catch (err) {
            const e = err as Error;
            setAddressValidation({
                err: 0,
                message: e.message,
                active: true
            })
            setAddressLoading(false);

        }
    }


    const searchTokenOrWalletOnPaste = (event: ClipboardEvent<HTMLInputElement>) => {
        const value = event.clipboardData?.getData('Text');
        setAddressLoading(true);
        let addr = '';
        try {
            if (!value || value === undefined) {
                valid(false);
                throw new Error('Empty Address');
            }
            addr = toChecksumAddress(value);
            if (addr === '') {
                valid(false);
                throw new Error('Invalid token address')
            }
        } catch (err) {
            const e: Error = err as Error;
            setAddressValidation({
                err: 0,
                message: e.message,
                active: true
            })
            setAddressLoading(false);

        }


        try {
            if (addr !== '') {
                validadeAddress(addr).then(
                    ({ data }) => {
                        setAddressLoading(false);
                        const addressCheckResponse: AddressCheckResponseModel | null = data.smartContractInfo;
                        if (addressCheckResponse == null) {
                            valid(false);
                            throw new Error('Invalid Token Address');
                        }
                        if (addressCheckResponse.contractType === 'Token') {
                            valid(true);
                            setAddressValidation({
                                err: 0,
                                message: '',
                                active: false
                            })

                        } else {
                            valid(false);
                            throw new Error('Invalid Token Addres');

                        }
                    },

                ).catch(e => {
                    setAddressValidation({
                        err: 0,
                        message: 'No tokens were found with that address!',
                        active: true
                    })
                    setAddressLoading(false);
                })
            } else {
                valid(false);
                throw new Error('Invalid token address');

            }
        } catch (err) {
            const e = err as Error;
            setAddressValidation({
                err: 0,
                message: e.message,
                active: true
            })
            setAddressLoading(false);

        }
    }
    return <Container>
        <SearchContainer>
            <Input
                ref={e => { inputRef = e }}
                prefix={<Button
                    onClick={searchTokenOrWallet}
                    type='ghost' style={{ background: 'transparent !important' }}
                    loading={addressLoading} icon={<SearchOutlined />} > </Button>}
                onKeyDown={handleSearchEnter}
                placeholder="0xC2D0f6b7513994A1Ba86CEf3AAc181a371A4CA0c"
                onPaste={searchTokenOrWalletOnPaste}
                onChange={(e) => { valueChange(e.target.value) }}
                onInput={validateInput}
                onBlur={validateInput}
            />
            {
                addresValidaton?.active && <span className="address-validation-error"> {addresValidaton?.message} </span>
            }

        </SearchContainer>
    </Container>;
};

export default AddressInputComponent;

