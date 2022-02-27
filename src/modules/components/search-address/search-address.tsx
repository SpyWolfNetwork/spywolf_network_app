/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import axios, { AxiosResponse } from 'axios';
import React, { ClipboardEvent, KeyboardEventHandler, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { HomeContext } from '../../../core/routes/providers/home.provider';
import { AddressCheckResponseModel } from '../../home/models/address-check.model';
import { Container, SearchContainer } from './search-address.style';

const SearchAdressInput: React.FC = () => {
    useEffect(() => { }, []);

    // const { allTokensState } = useContext<any>(HomeContext);
    // const { allTokens } = allTokensState;
    const { toChecksumAddress } = require('ethereum-checksum-address');

    const [addresValidaton, setAddressValidation] = useState<{ err: number, message: string, active: boolean }>()
    const [addressLoading, setAddressLoading] = useState<boolean>(false);

    const validadeAddress = (address: string) => {

        return axios.get(`https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokenorwalletinfo/${address}`)

    }
    const navigate = useNavigate();

    const handleSearchEnter: KeyboardEventHandler<HTMLInputElement> | undefined = (event) => {
        setAddressValidation({
            err: 0,
            message: '',
            active: false
        })

        if (event.code === 'Enter') {
            setAddressLoading(true);
            let addr = '';
            try {
                const persistedPotentialScams = JSON.parse(localStorage.getItem('potentialScams') as string);
                const persistedLatestScams = JSON.parse(localStorage.getItem('latestScams') as string);
                const persistedFeaturedTokens = JSON.parse(localStorage.getItem('featuredTokens') as string);
                const persistedAmaTokens = JSON.parse(localStorage.getItem('amaTokens') as string);
                const persistedRecentlyAddedTokens = JSON.parse(localStorage.getItem('recentlyAdded') as string);
                const allTokens = [
                    ...persistedPotentialScams, ...persistedLatestScams, ...persistedFeaturedTokens, ...persistedAmaTokens,
                    ...persistedRecentlyAddedTokens
                ]
                const token = allTokens.find(persisted => persisted.name.toLowerCase().includes(inputRef.state.value.toLowerCase()) && persisted.name.toLowerCase() === inputRef.state.value.toLowerCase())
                if (token) {
                    navigate(`token/${token.address}`);
                    setAddressLoading(false);
                    return true;

                }
                if (inputRef.state.value.includes('0x') && !token) {
                    const token = allTokens.find(persisted => persisted.address === inputRef.state.value)
                    setAddressLoading(false);
                    if (token) {
                        navigate(`token/${token.address}`);
                        setAddressLoading(false);
                        return true;
    
                    }
                }
            } catch (e) {
                console.log(e);
                return false;
            }
            try {
                if (!inputRef.state.value || inputRef.state.value === undefined) {
                    throw new Error('Empty Address');
                }
                addr = toChecksumAddress(inputRef.state.value);
                if (addr === '') {
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
                                throw new Error('Invalid Token Address');
                            }
                            if (addressCheckResponse.contractType === 'Token') {
                                navigate(`token/${addr}`);
                            } else {
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
            const persistedPotentialScams = JSON.parse(localStorage.getItem('potentialScams') as string);
            const persistedLatestScams = JSON.parse(localStorage.getItem('latestScams') as string);
            const persistedFeaturedTokens = JSON.parse(localStorage.getItem('featuredTokens') as string);
            const persistedAmaTokens = JSON.parse(localStorage.getItem('amaTokens') as string);
            const persistedRecentlyAddedTokens = JSON.parse(localStorage.getItem('recentlyAdded') as string);
            const allTokens = [
                ...persistedPotentialScams, ...persistedLatestScams, ...persistedFeaturedTokens, ...persistedAmaTokens,
                ...persistedRecentlyAddedTokens
            ]
            const token = allTokens.find(persisted => persisted.name.toLowerCase()
            .includes(inputRef.state.value.toLowerCase()) && persisted.name.toLowerCase() === inputRef.state.value.toLowerCase())
            if (token) {
                navigate(`token/${token.address}`);
                setAddressLoading(false);
                return true;

            }
            if (inputRef.state.value.includes('0x') && !token) {
                const token = allTokens.find(persisted => persisted.address === inputRef.state.value)
                setAddressLoading(false);
                if (token) {
                    navigate(`token/${token.address}`);
                    setAddressLoading(false);
                    return true;

                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
        try {
            if (!inputRef.state.value || inputRef.state.value === undefined) {
                throw new Error('Empty Address');
            }
            addr = toChecksumAddress(inputRef.state.value);
            if (addr === '') {
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
                            throw new Error('Invalid Token Address');
                        }
                        if (addressCheckResponse.contractType === 'Token') {
                            navigate(`token/${addr}`);
                        } else {
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
            const persistedPotentialScams = JSON.parse(localStorage.getItem('potentialScams') as string);
            const persistedLatestScams = JSON.parse(localStorage.getItem('latestScams') as string);
            const persistedFeaturedTokens = JSON.parse(localStorage.getItem('featuredTokens') as string);
            const persistedAmaTokens = JSON.parse(localStorage.getItem('amaTokens') as string);
            const persistedRecentlyAddedTokens = JSON.parse(localStorage.getItem('recentlyAdded') as string);
            const allTokens = [
                ...persistedPotentialScams, ...persistedLatestScams, ...persistedFeaturedTokens, ...persistedAmaTokens,
                ...persistedRecentlyAddedTokens
            ]
            const token = allTokens.find(persisted => persisted.name.toLowerCase().includes(value.toLowerCase()) && persisted.name.toLowerCase() === value.toLowerCase())
            if (token) {
                navigate(`token/${token.address}`);
                setAddressLoading(false);
                return true;

            }
            if (inputRef.state.value.includes('0x') && !token) {
                const token = allTokens.find(persisted => persisted.address === value)
                setAddressLoading(false);
                if (token) {
                    navigate(`token/${token.address}`);
                    setAddressLoading(false);
                    return true;

                }
            }
        } catch (e) {
            console.log(e);
        }

        try {
            if (!value || value === undefined) {
                throw new Error('Empty Address');
            }
            addr = toChecksumAddress(value);
            if (addr === '') {
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
                            throw new Error('Invalid Token Address');
                        }
                        if (addressCheckResponse.contractType === 'Token') {
                            navigate(`token/${addr}`);
                        } else {
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
                placeholder="Search by Token Address..."
                onPaste={searchTokenOrWalletOnPaste}
            />
            {
                addresValidaton?.active && <span className="address-validation-error"> {addresValidaton?.message} </span>
            }

        </SearchContainer>
    </Container>;
};

export default SearchAdressInput;

