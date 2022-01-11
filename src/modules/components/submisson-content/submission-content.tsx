// Dependencies
import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, Switch } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { SwitchClickEventHandler } from 'antd/lib/switch';
import axios from 'axios';
import { format } from 'date-fns';
import { useForm } from 'rc-field-form';
import React, { Fragment, KeyboardEventHandler, LegacyRef, useContext, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ApplicationContext } from '../../../core/routes/providers/application.provider';
import { AddressCheckResponseModel } from '../../home/models/address-check.model';
import { Container } from './submission-content.style';

const SubmissionContent: React.FC<{ submitProp?: boolean }> = (props) => {
    const { ctx, ctxDisabled } = useContext(ApplicationContext) as any;

    const [visibleModal, setVisibleModal] = ctx;
    const [buttonDisabled, setButtonDisabled] = ctxDisabled;

    const [formOption, setFormOption] = useState();
    const [softcapValue, setSoftcapValue] = useState();
    const [isPresale, setIsPresale] = useState<boolean>(false);
    const [tokenForm] = Form.useForm();
    const [scamForm] = Form.useForm();

    const checkValidation = () => {
        const { address, presale, name, symbol, telegram, hardcap, softcap, presalelink } = tokenForm.getFieldsValue();
        if (presale) {
            const formIsInvalid = !!address && !!name && !!symbol && !!telegram && !!hardcap && !!softcap && !!presalelink;
            setButtonDisabled(!formIsInvalid || addresValidation?.active || hardcapValidation?.active || softcapValidation?.active)

        } else {
            const formIsInvalid = !!address && !!name && !!symbol && !!telegram;
            setButtonDisabled(!formIsInvalid || addresValidation?.active || hardcapValidation?.active || softcapValidation?.active)
        }
    }

    const checkValidationScam = () => {
        const { address, presale, name, symbol, telegram, hardcap, softcap, presalelink } = scamForm.getFieldsValue();
        if (presale) {
            const formIsInvalid = !!address && !!name && !!symbol && !!telegram && !!hardcap && !!softcap && !!presalelink;
            setButtonDisabled(!formIsInvalid || addresValidation?.active || hardcapValidation?.active || softcapValidation?.active)

        } else {
            const formIsInvalid = !!address && !!name && !!symbol && !!telegram;
            setButtonDisabled(!formIsInvalid || addresValidation?.active || hardcapValidation?.active || softcapValidation?.active)
        }
    }
    const handleSoftcapChange = (e) => {
        const inputFormRef = tokenForm.getFieldInstance('softcap');
        if (inputFormRef && inputFormRef.state && inputFormRef.state.value && inputFormRef.state.value.includes('-')) {
            setSoftcapValidation({
                active: true,
                message: 'Softcap should be a positive number',
                err: 1
            })
        } else {
            setSoftcapValidation({
                active: false,
                message: 'Softcap should be a positive number',
                err: 1
            })
        }

    }
    const handleHardcapChange = (e) => {
        const inputFormRefsfot = tokenForm.getFieldInstance('softcap');
        const inputFormRef = tokenForm.getFieldInstance('hardcap');
        if (inputFormRef && inputFormRef.state && inputFormRef.state.value && inputFormRef.state.value.includes('-')) {
            setHardcapValidation({
                active: true,
                message: 'Hardcap should be a positive number',
                err: 2
            })
        } else {
            setHardcapValidation({
                active: false,
                message: 'Softcap should be a positive number',
                err: 1
            })
        }
        if (inputFormRefsfot && inputFormRef && inputFormRefsfot.state && inputFormRefsfot.state && inputFormRefsfot.state.value && inputFormRef.state && inputFormRef.state && inputFormRef.state.value && inputFormRef.state.value && (inputFormRefsfot.state.value > inputFormRef.state.value)) {
            setHardcapValidation({
                active: true,
                message: 'Hardcap should be higher than softcap',
                err: 1
            })
        } else {
            setHardcapValidation({
                active: false,
                message: 'Softcap should be a positive number',
                err: 1
            })
        }
    }

    useEffect(() => {
        if (formOption === 'token') {
            checkValidation();
        } else {
            checkValidationScam();
        }
    }, [formOption])


    const formChange = (form) => {
        setIsPresale(tokenForm.getFieldValue('presale'));
        if (formOption === 'token') {
            checkValidation();
        } else {
            checkValidationScam();
        }



    }


    const changeFormOption = (option) => {
        setFormOption(option)


    }

    const navigate = useNavigate();

    const submit = () => {
        if (formOption === 'token') {
            const formdata = tokenForm.getFieldsValue();
            let submitObj = {
                httpMethod: "POST",
                resourcePath: "/tokens_info/{category}/{value}",
                isScam: false,
                item: {
                    telegram: formdata.telegram ? formdata.telegram : '',
                    website: formdata.website ? formdata.website : '',
                    symbol: formdata.symbol ? `$${formdata.symbol}` : '',
                    status: !formdata.presale ? 'LAUNCHED' : 'NOT LAUNCHED',
                    address: formdata.address ? formdata.address : '',
                    logo: formdata.logo ? formdata.logo : '',
                    name: formdata.name ? formdata.name : '',
                    votes: 0,
                    twitter: formdata.twitter ? formdata.twitter : '',
                    releaseDate: formdata.releaseDate ? format(formdata.releaseDate._d, 'yyy-MM-dd') : '',
                    isFairlaunch: formdata.presale ? false : true,
                    description: formdata.description ? formdata.description : ''
                }
            }

            if (formdata.presale) {
                submitObj.item['presaleInfo'] = {
                    presaleLink: formdata.presalelink,
                    presaleDate: format(formdata.presaledate._d, 'yyy-MM-dd'),
                    softcap: formdata.softcap ? formdata.softcap : '',
                    isWhiteListed: formdata.isWhiteListed,
                    hardcap: formdata.hardcap ? formdata.hardcap : ''
                }
            }
            tokenForm.validateFields().then(
                res => {

                    axios.post('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/submit', submitObj).then(
                        res => {
                            Swal.fire({
                                title: 'Thank you for submiting a token  ',
                                text: 'our team will review the request, once done you will see it on the platform,  now you will be redirected to the main page',
                                icon: 'success',
                                timer: 5000,
                                didClose: () => {
                                    setVisibleModal(false)

                                }
                            })
                        }
                    )
                }
            )

        } else {
            const formdata = scamForm.getFieldsValue();
            const submitObj = {
                httpMethod: "POST",
                resourcePath: "/tokens_info/{category}/{value}",
                isScam: true,
                item: {
                    telegram: formdata.telegram ? formdata.telegram : '',
                    website: formdata.website ? formdata.website : '',
                    scamReasonTooltip: formdata.description ? formdata.description : '',
                    symbol: formdata.symbol ? `$${formdata.symbol}` : '',
                    status: formdata.releaseDate ? formdata.releaseDate > new Date() ? 'NOT LAUNCHED' : 'LAUNCHED' : 'LAUNCHED',
                    address: formdata.address ? formdata.address : '',
                    logo: formdata.logo ? formdata.logo : '',
                    name: formdata.name ? formdata.name : '',
                    twitter: formdata.twitter ? formdata.twitter : '',
                    description: formdata.description ? formdata.description : '',
                    scamDate: formdata.scamDate ? format(formdata.scamDate._d, 'yyy-MM-dd') : '',
                    scamReason: [
                        formdata.scamreason
                    ],
                }
            }
            tokenForm.validateFields().then(
                res => {
                    axios.post('https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokens_info/submit', submitObj).then(
                        res => {
                            Swal.fire({
                                title: 'Thank you for submiting a scam  ',
                                text: 'our team will review the request, once done you will see it on the platform,  now you will be redirected to the main page',
                                icon: 'success',
                                timer: 5000,
                                didClose: () => {
                                    navigate('/')
                                    setVisibleModal(false)
                                }
                            })
                        }
                    )
                }
            )
        }
    }

    let twitterRef;
    let telegramRef;

    useEffect(() => {

        if (props.submitProp) {
            submit();
        }
    }, [props.submitProp]);



    const [currentAddress, setCurrentAddress] = useState<string>();
    const [addresValidation, setAddressValidation] = useState<{ err: number, message: string, active: boolean, button?: any }>()
    const [softcapValidation, setSoftcapValidation] = useState<{ err: number, message: string, active: boolean, button?: any }>()
    const [hardcapValidation, setHardcapValidation] = useState<{ err: number, message: string, active: boolean, button?: any }>()
    const [addressLoading, setAddressLoading] = useState<boolean>(false);
    const { toChecksumAddress } = require('ethereum-checksum-address');

    const validadeAddress = (address: string) => {
        return axios.get(`https://nhlm8489e3.execute-api.us-east-2.amazonaws.com/prod/tokenorwalletinfo/${address}`)

    }

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
                if (!event.currentTarget.value || event.currentTarget.value === undefined) {
                    throw new Error('Empty Address');
                }
                addr = toChecksumAddress(event.currentTarget.value);
                if (addr === '') {
                    throw new Error('Please make sure to input a correct token Address')
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
                                throw new Error('Please make sure to input a correct token Address');
                            }
                            if (addressCheckResponse.contractType.toLocaleLowerCase() === 'token') {
                            } else {
                                throw new Error('Please make sure to input a correct token Address');

                            }
                        },

                    ).catch(e => {
                        setAddressValidation({
                            err: 0,
                            message: 'Please make sure to input a correct token Address',
                            active: true
                        })
                        setAddressLoading(false);
                    })
                } else {
                    throw new Error('Please make sure to input a correct token Address');

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

    const searchTokenOrtokenOnPaste = (event) => {
        const value = event.clipboardData?.getData('Text');
        setAddressLoading(true);
        let addr = '';
        try {
            if (!value || value === undefined) {
                throw new Error('Empty Address');
            }
            addr = toChecksumAddress(value);
            if (addr === '') {
                throw new Error('Please make sure to input a correct token Address')
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
                        const addressCheckResponse: AddressCheckResponseModel | null = data.smartContractInfo;
                        if (addressCheckResponse == null) {
                            setAddressLoading(false);
                            throw new Error('Please make sure to input a correct token Address');
                        }
                        if (addressCheckResponse.contractType.toLocaleLowerCase() === 'token') {

                        } else {
                            throw new Error('Please make sure to input a correct token Address');

                        }
                    },

                ).catch(e => {
                    setAddressValidation({
                        err: 0,
                        message: 'Please make sure to input a correct token Address! ',
                        active: true
                    })
                    setAddressLoading(false);
                })
            } else {
                throw new Error('Please make sure to input a correct token Address');

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

    const validateInput = (e) => {
        try {
            toChecksumAddress(e.currentTarget.value)
        } catch (e) {
            setAddressValidation({
                err: 0,
                message: 'Input a valid address',
                active: true
            })
        }
        // buttonDisabled()
    }

    return <Container>
        <Button className={`submit-section-toggle submit-token ${formOption == 'token' ? 'active' : ''}`} onClick={() => { changeFormOption('token') }}>
            <div className="submit-section-wrapper">
                <div className="icon svg-icon svg-icon-3hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" fill="black"></path>
                        <path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" fill="black"></path>
                    </svg>
                </div>
                <div className="text-wrapper">
                    <h2 className='fs-3 fw-bolder text-gray-900 mb-2 d-block'>I want to submit a token</h2>
                    <span className='fw-bold fs-4 text-muted'>
                        Make sure to fill all required fields
                    </span>
                </div>
            </div>
        </Button>
        <Button className={`submit-section-toggle submit-scam ${formOption == 'scam' ? 'active' : ''}`} onClick={() => { changeFormOption('scam') }}>
            <div className="submit-section-wrapper">
                <span className="icon svg-icon svg-icon-3hx">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.3" d="M4.05424 15.1982C8.34524 7.76818 13.5782 3.26318 20.9282 2.01418C21.0729 1.98837 21.2216 1.99789 21.3618 2.04193C21.502 2.08597 21.6294 2.16323 21.7333 2.26712C21.8372 2.37101 21.9144 2.49846 21.9585 2.63863C22.0025 2.7788 22.012 2.92754 21.9862 3.07218C20.7372 10.4222 16.2322 15.6552 8.80224 19.9462L4.05424 15.1982ZM3.81924 17.3372L2.63324 20.4482C2.58427 20.5765 2.5735 20.7163 2.6022 20.8507C2.63091 20.9851 2.69788 21.1082 2.79503 21.2054C2.89218 21.3025 3.01536 21.3695 3.14972 21.3982C3.28408 21.4269 3.42387 21.4161 3.55224 21.3672L6.66524 20.1802L3.81924 17.3372ZM16.5002 5.99818C16.2036 5.99818 15.9136 6.08615 15.6669 6.25097C15.4202 6.41579 15.228 6.65006 15.1144 6.92415C15.0009 7.19824 14.9712 7.49984 15.0291 7.79081C15.0869 8.08178 15.2298 8.34906 15.4396 8.55884C15.6494 8.76862 15.9166 8.91148 16.2076 8.96935C16.4986 9.02723 16.8002 8.99753 17.0743 8.884C17.3484 8.77046 17.5826 8.5782 17.7474 8.33153C17.9123 8.08486 18.0002 7.79485 18.0002 7.49818C18.0002 7.10035 17.8422 6.71882 17.5609 6.43752C17.2796 6.15621 16.8981 5.99818 16.5002 5.99818Z" fill="black"></path>
                        <path d="M4.05423 15.1982L2.24723 13.3912C2.15505 13.299 2.08547 13.1867 2.04395 13.0632C2.00243 12.9396 1.9901 12.8081 2.00793 12.679C2.02575 12.5498 2.07325 12.4266 2.14669 12.3189C2.22013 12.2112 2.31752 12.1219 2.43123 12.0582L9.15323 8.28918C7.17353 10.3717 5.4607 12.6926 4.05423 15.1982ZM8.80023 19.9442L10.6072 21.7512C10.6994 21.8434 10.8117 21.9129 10.9352 21.9545C11.0588 21.996 11.1903 22.0083 11.3195 21.9905C11.4486 21.9727 11.5718 21.9252 11.6795 21.8517C11.7872 21.7783 11.8765 21.6809 11.9402 21.5672L15.7092 14.8442C13.6269 16.8245 11.3061 18.5377 8.80023 19.9442ZM7.04023 18.1832L12.5832 12.6402C12.7381 12.4759 12.8228 12.2577 12.8195 12.032C12.8161 11.8063 12.725 11.5907 12.5653 11.4311C12.4057 11.2714 12.1901 11.1803 11.9644 11.1769C11.7387 11.1736 11.5205 11.2583 11.3562 11.4132L5.81323 16.9562L7.04023 18.1832Z" fill="black"></path>
                    </svg>
                </span>
                <div className="text-wrapper">
                    <h2 className='fs-3 fw-bolder text-gray-900 mb-2 d-block'>I want to submit a scam</h2>
                    <span className='fw-bold fs-4 text-muted'>
                        Make sure to fill all required fields

                    </span>
                </div>
            </div>
        </Button>
        {
            formOption && formOption === 'token' &&
            <div className="form-token">
                <Form onChange={formChange} form={tokenForm} preserve={false}>
                    <Form.Item style={{ margin: '0 !important' }} name="address" label="Contract Address" rules={[{ required: true }]}>
                        <Input
                            placeholder="Input token Address"
                            onPaste={searchTokenOrtokenOnPaste}
                            onKeyDown={handleSearchEnter}
                            onInput={validateInput}
                            onBlur={validateInput}
                        />

                    </Form.Item>
                    {
                        addresValidation &&
                        <span className='address-validation-error'>
                            {addresValidation.message}
                        </span>
                    }
                    <div className="row-group">
                        <Form.Item name="name" label="Token Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="symbol" label="Symbol/Ticker" rules={[{ required: true }]}>
                            <Input addonBefore="$" />
                        </Form.Item>
                    </div>
                    <Form.Item name="description" label="Token Description" rules={[{ required: false }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item name="logo" label="Logo URL (200px by 200px)" rules={[{ required: false }]}>
                        <Input placeholder="Logo should be a link" />
                    </Form.Item>
                    <Form.Item name="website" label="Website" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <div className="row-group">
                        <Form.Item name="twitter" label="Twitter Handle" rules={[{ required: false }]}>
                            <Input onClick={() => {}} ref={twitterRef} addonBefore="https://twiter.com/" placeholder='Handle' />
                        </Form.Item>
                        <Form.Item name="telegram" label="Telegram Handle" rules={[{ required: true }]}>
                            <Input ref={telegramRef} addonBefore="https://t.me.com/" placeholder='Handle' />
                        </Form.Item>
                    </div>

                    <Form.Item name="releaseDate" label="Release Date" rules={[{ required: false }]}>
                        <DatePicker suffixIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="black"></path>
                                <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="black"></path>
                                <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="black"></path>
                            </svg>
                        } />
                    </Form.Item>
                    <div className="row-group inline">
                        <Form.Item valuePropName="checked" name="presale" label="Is there a presale?" rules={[{ required: false }]}>
                            <Switch onChange={(checked, evt) => {
                                setIsPresale(checked);
                                checkValidation();
                            }} />
                        </Form.Item>
                        {
                            isPresale &&
                            <Form.Item valuePropName="checked" name="isWhiteListed" label="Is there a whitelist?" rules={[{ required: false }]}>
                                <Switch />

                            </Form.Item>
                        }
                    </div>
                    {
                        isPresale &&
                        <div className="">
                            <Form.Item name="presaledate" label="Presale Date?" rules={[{ required: true }]}>
                                <DatePicker suffixIcon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="black"></path>
                                        <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="black"></path>
                                        <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="black"></path>
                                    </svg>
                                } />
                            </Form.Item>
                            <Form.Item name="presalelink" label="Presale Link" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <div className="row-group">
                                <Form.Item name="softcap" label="Softcap" rules={[{ required: true }]}>
                                    <Input pattern="[0-9]{10}"  addonBefore="BNB" min="0" type="number" />
                                </Form.Item>

                                <Form.Item name="hardcap" label="Hardcap" rules={[{ required: true }]}>
                                    <Input pattern="[0-9]{10}"  addonBefore="BNB" min="0" type="number" />
                                </Form.Item>
                            </div>
                            {
                                softcapValidation?.active &&
                                <span className='address-validation-error'>
                                    {softcapValidation?.message}
                                </span>
                            }
                            {
                                hardcapValidation?.active &&
                                <span className='address-validation-error'>
                                    {hardcapValidation?.message}
                                </span>
                            }
                        </div>
                    }
                </Form>
            </div>
        }
        {
            formOption && formOption === 'scam' &&
            <div className="form-token">
                <Form onChange={formChange} form={scamForm} preserve={false}>
                    <Form.Item name="address" label="Contact Address" rules={[{ required: true }]}>
                        <Input
                            onPaste={searchTokenOrtokenOnPaste}
                            onKeyDown={handleSearchEnter}
                            onInput={validateInput}
                        />
                    </Form.Item>
                    {
                        addresValidation &&
                        <span className='address-validation-error'>
                            {addresValidation.message}
                        </span>
                    }
                    <div className="row-group">
                        <Form.Item name="name" label="Token Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="symbol" label="Symbol/Ticker" rules={[{ required: true }]}>
                            <Input addonBefore="$" />
                        </Form.Item>
                    </div>
                    <Form.Item name="scamreason" label="Scam Reason" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: false }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item name="logo" label="Logo URL (200px by 200px)" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="website" label="Website" rules={[{ required: false }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="scamDate" label="Scam Date" rules={[{ required: false }]}>
                        <DatePicker suffixIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="black"></path>
                                <path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="black"></path>
                                <path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="black"></path>
                            </svg>
                        } />
                    </Form.Item>
                    <div className="row-group">
                        <Form.Item name="twitter" label="Twitter Handle" rules={[{ required: false }]}>
                            <Input addonBefore="http://twiter.com/" placeholder='Handle' />
                        </Form.Item>
                        <Form.Item name="telegram" label="Telegram Handle" rules={[{ required: true }]}>
                            <Input addonBefore="http://t.me.com/" placeholder='Handle' />
                        </Form.Item>
                    </div>
                </Form>
            </div>
        }

    </Container >;
};

export default SubmissionContent;

