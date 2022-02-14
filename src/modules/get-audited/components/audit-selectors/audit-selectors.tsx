/* eslint-disable @typescript-eslint/no-unused-vars */
// Dependencies
import { Button, Form, Radio, Space } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { useContext, useEffect, useState } from 'react';
import { FaMicrophone, FaSearch, FaLaptop } from 'react-icons/fa';
import { HiOutlineIdentification } from 'react-icons/hi';

import { RequestAuditContext } from '../../../../core/routes/providers/request-audit.provider';
import { Container } from './audit-selectors.style';

import tg_14472 from '../../../../assets/get-audited/tg_14472.png';

const AUDIT_24H_PRICE = 3;
const AUDIT_4DAYS_PRICE = 1.5;
const AUDIT_3DAYS_PRICE = 2;
const AUDIT_2DAYS_PRICE = 2.5;


const AuditSelectorsComponent: React.FC = () => {
    useEffect(() => { }, []);

    const [selectorsForm] = useForm();
    const { productCart, pricesState, cartInfo } = useContext<any>(RequestAuditContext) as any;

    const [products, setProducts] = productCart;

    const { totalItemsSelecteds } = cartInfo;

    const { prices, discountPrices, originalPrices } = pricesState;
    const [auditChecked, setAuditChecked] = useState<boolean>(false)
    const [disableAD, setDisableAD] = useState<boolean>(false)



    const formChange = (form) => {
        setProducts(selectorsForm.getFieldsValue());
        const { audit, kyc, ama, ad, deadline } = selectorsForm.getFieldsValue();
        if (audit && kyc && ama && !ad) {
            selectorsForm.setFieldsValue({
                ...selectorsForm.getFieldsValue(), ad: true
            })
            setDisableAD(true)
        }

        setProducts(selectorsForm.getFieldsValue());
        setDisableAD(false)
        setAuditChecked(selectorsForm.getFieldsValue().audit);
        if (audit && deadline === undefined) {
            setTimeout(() => {
                selectorsForm.setFieldsValue({
                    ...selectorsForm.getFieldsValue(), deadline: 1.5
                })
                setProducts(selectorsForm.getFieldsValue());
                setDisableAD(false)
                setAuditChecked(selectorsForm.getFieldsValue().audit);
            }, 10)
        }
    }


    return <Container>

        {
            prices !== undefined && <Form style={{ marginTop: '20px' }} onChange={formChange} form={selectorsForm} preserve={true} >
                <FormItem label={<Button icon={<FaSearch type='text' />} ></Button>} name={'audit'} valuePropName="checked" initialValue={false} >
                    <Checkbox >
                        <div className="chekbox-title">
                            <h2>Audit</h2>
                            <p>Starting from {AUDIT_4DAYS_PRICE} BNB</p>
                        </div>
                    </Checkbox>
                </FormItem>
                {
                    selectorsForm.getFieldsValue().audit &&
                    <Form.Item name='deadline' initialValue={AUDIT_4DAYS_PRICE}>
                        <Radio.Group value={0} defaultValue={AUDIT_4DAYS_PRICE}>
                            <Space direction="vertical">
                                <Radio value={AUDIT_24H_PRICE}>
                                    <div className="chekbox-title">
                                        <h3>24 Hours</h3>
                                        <p>{AUDIT_24H_PRICE} BNB</p>
                                    </div>
                                </Radio>
                                <Radio value={AUDIT_2DAYS_PRICE}>
                                    <div className="chekbox-title">
                                        <h3>2 days</h3>
                                        <p>{AUDIT_2DAYS_PRICE} BNB</p>
                                    </div>
                                </Radio>
                                <Radio value={AUDIT_3DAYS_PRICE}>
                                    <div className="chekbox-title">
                                        <h3>3 Days</h3>
                                        <p>{AUDIT_3DAYS_PRICE} BNB</p>
                                    </div>
                                </Radio>
                                <Radio value={AUDIT_4DAYS_PRICE}>
                                    <div className="chekbox-title">
                                        <h3>4 Days</h3>
                                        <p>{AUDIT_4DAYS_PRICE} BNB</p>
                                    </div>
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>

                }

                <Form.Item
                    label={<Button icon={<FaMicrophone type='text' />} ></Button>} name={'ama'}
                    valuePropName="checked"
                    initialValue={false}>
                    <Checkbox  >
                        <div className="chekbox-title">
                            <h2>AMA</h2>
                            <p>
                                {
                                    originalPrices.ama !== prices.ama &&
                                    <span style={{ textDecoration: `line-through` }}>{originalPrices['ama']} BNB</span>
                                }
                                <span
                                    style={
                                        {
                                            marginLeft: `${discountPrices.ama === prices.ama ? '10px' : ''}`,
                                            color: `${discountPrices.ama === prices.ama ? 'green' : ''}`
                                        }
                                    }
                                >{prices['ama']} BNB</span>
                            </p>
                        </div></Checkbox>
                </Form.Item>


                <Form.Item
                    label={<Button icon={<HiOutlineIdentification type='text' />} ></Button>}
                    name={'kyc'}
                    valuePropName="checked"
                    initialValue={false} >
                    <Checkbox >
                        <div className="chekbox-title">
                            <h2>KYC</h2>
                            <p>
                                {
                                    originalPrices.kyc !== prices.kyc &&
                                    <span style={{ textDecoration: `line-through` }}>{originalPrices['kyc']} BNB</span>
                                }
                                <span
                                    style={
                                        {
                                            marginLeft: `${discountPrices.kyc === prices.kyc ? '10px' : ''}`,
                                            color: `${discountPrices.kyc === prices.kyc ? 'green' : ''}`
                                        }
                                    }
                                >{prices['kyc']} BNB</span>
                            </p>
                        </div></Checkbox>
                </Form.Item>
                <Form.Item label={<Button icon={<FaLaptop type='text' />} ></Button>}
                    name={'ad'}
                    valuePropName="checked"
                    initialValue={false}

                >
                    <Checkbox disabled={disableAD} >
                        <div className="chekbox-title">
                            <h2>1 Week Portal Ad</h2>
                            <p> {
                                originalPrices.ad !== prices.ad &&
                                <span style={{ textDecoration: `line-through` }}>{originalPrices['ad']} BNB</span>
                            }
                                <span
                                    style={
                                        {
                                            marginLeft: `${discountPrices.ad === prices.ad ? '10px' : ''}`,
                                            color: `${discountPrices.ad === prices.ad ? 'green' : ''}`
                                        }
                                    }
                                >{prices['ad']} BNB
                                    <span style={{ fontSize: '12px', color: "green", marginLeft: '10px' }}>
                                        {
                                            prices.ad !== 0 && '(Free when you select all)'
                                        }
                                    </span>
                                </span>
                            </p>

                        </div>
                    </Checkbox>
                </Form.Item>
            </Form>
        }
        <div className="ad-banner">
            <a href="https://t.me/SpyWolf_audits" target="__blank">
                <img width="100%" src={tg_14472} alt="" />
            </a>

        </div>
    </Container >;
};

export default AuditSelectorsComponent;

