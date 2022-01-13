// Dependencies
import { Card, Collapse } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';
import React, { useEffect } from 'react';
import { Container } from './faq.style';

const Faq: React.FC = () => {
    useEffect(() => { }, []);

    return <Container>
        <Card style={{ width: '100%' }} title={
            <h1 className='section-title fs-2x text-gray-800 w-bolder mb-6'>
                Frequently Asked Questions
            </h1>
        }>
            <div className="grid">
                <div className="section">
                    <h2 className='section-title text-gray-800 fw-bolder mb-4'>
                        About SpyWolf Network
                    </h2>

                    <Collapse defaultActiveKey={['1']} ghost>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="What is the goal of this portal?" key="1">
                            <p>SpyWolf Network aims to educate and help crypto investors during their
                                research process to avoid falling into the hands of crypto criminals.
                                From weekly tips to exposing multi-token scams and even projects we consider trusted.
                                Our full-time researchers will take care of all the due diligence for you!
                            </p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="Can I submit a token or a scam?" key="2">
                            <p>Yes! All you need to do is fill out the form that popups after clicking on the 'Submit" button in the nav.
                                After we have reviewed your submission, we will make it live on the site.
                            </p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="I am a scam survivor. How do I use the 10% reward promo?" key="3">
                            <p>First of all, sorry that you have fallen for a scam. We would like to reward you with an extra 10% when you buy $SPY, our anti-scam token. All you need to do is input the wallet the has the scammed tokens and your purchased SPYs into this form and you will receive your reward within 24 hours!</p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="What future updates will we see?" key="3">
                            <p>We are constantly adding new fetures to this portal. From adding tons of new data to adding sections and pages.
                                <br></br>
                                <br></br>

                                Some of the bigger features include:
                                <br></br>
                                <br></br>
                                - Bounty system
                                <br></br>
                                - Wallet tracker
                                <br></br>
                                - Reward tracker
                                <br></br>
                                - User login
                                <br></br>
                                - Articles and guides
                                <br></br>
                                - Upcoming and recorded AMAs
                                <br></br>
                                - Scam investigation pools</p>
                        </CollapsePanel>

                    </Collapse>

                </div>

                <div className="section ">
                    <h2 className='section-title text-gray-800 fw-bolder mb-4'>
                        Audits by SpyWolf
                    </h2>

                    <Collapse defaultActiveKey={['1']} ghost>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="Why is an audit important in crypto?" key="1">
                            <p>
                                There are very few regulations in the crypto space. Just about anyone with some coding skills can create a project and a digital token to raise millions of dollars within minutes and instantly disappear with everybody's funds.
                            </p>
                            <p>
                                This is why it is important for investors to see that a project was properly reviewed in every aspect by a security company in order to ensure that they won't lose their hard-earned money.

                            </p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="What aspects of a project does SpyWolf review?" key="2">
                            <p>
                                Our easy-to-read audit report contains every aspect of a project that will allow an investor to make an informed decision before investing.
                            </p>
                            <p>
                                Here is what we evaluate:
                            </p>
                            <p>
                                1. Team: The first thing we do is ask the team important questions like overall plans, location, experience, etc. If they are doxxed, we review their social media presence. If not, they can opt for our private doxxing services (KYC) that will allow them to remain anonymous.
                                <br></br>
                                2. Website and social media: We look at the project's website and look for key things that would raise concerns, like age of domain registration, grammatical errors, lack of important content mobile-friendliness, etc. We also evaluate all social media accounts and look for fake followers/comments and overall activity. This is usually a good indicator of a malicious project.
                                <br></br>
                                3. Technical audit: We do a straight-forward technical audit to look for common vulnerabilities in the smart contract. We also analyze top wallets as well as the team wallets to raise any flags of possible dumping.
                            </p>


                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="Does every project get a Certificate of Trust NFT?" key="3">
                            <p>
                                No, we only award the NFT to projects that score over 90/100 in our point system. Even then, there is a slight chance of a project to do something malicious to hurt their investors.

                            </p>
                            <a className="primary-link" href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/99844844277068474025626073867816441448450620712689519536016720659450041466881" target={'__blank'}>
                                See example

                            </a>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="I'm ready to audit my project. How do I contact you?" key="3">
                            <p>You can contact our team at audit@spywolf.co or by joining our <a className="primary-link" href="https://t.me/SpyWolfNetwork" target={'__blank'}>Telegram group.</a></p>
                        </CollapsePanel>

                    </Collapse>

                </div>


                <div className="section">
                    <h2 className='section-title text-gray-800 fw-bolder mb-4'>
                        $SPY Token
                    </h2>

                    <Collapse defaultActiveKey={['1']} ghost>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="What is the SPY token for?" key="1">
                            <p>When you hold SPY, you are directly contributing into the search, tracking and potentially stopping of crypto criminals and their future projects as well as helping alert the community about potential scams and educate them on how to identify them, while getting a financial incentive for holding long-term.</p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="Do I get rewards for holding SPY?" key="2">
                            <p>Yes! You will earn 3% in BNB. By simply holding $SPY you will earn a share of the BNB rewards pool (Once every hour), proportional to the amount of $SPY you hold.</p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="What are some upcoming associated projects?" key="3">
                            <p>We have a scam investigation pool platform coming out soon as well as a launchpad and an educational platform. All set to come out this year!</p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="How do I buy SPY?" key="3">
                            <p>You can currently buy $SPY on the PancakeSwap exchange. Click here to buy.</p>
                        </CollapsePanel>
                    </Collapse>

                </div>

                <div className="section">
                    <h2 className='section-title text-gray-800 fw-bolder mb-4'>
                        About SpyWolf
                    </h2>

                    <Collapse defaultActiveKey={['1']} ghost>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="What is SpyWolf's background?" key="1">
                            <p>SpyWolf is a team of crypto security experts that have been performing audits for projects for several months in order to ensure safety in the crypto space.
                            </p>
                            <p>
                                Due to our experience identifying red flags and potential scams, we decided to start our own "safe space" for the community to seek help and learn how not to fall for scams while allowing them to invest in safer projects. After our channel grew significantly, we decided to scale our project to reach as many people as possible that could use all the help we were providing, while also providing some unique tools to help them invest safely.
                            </p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="What services does SpyWolf provide?" key="2">
                            <p>We provide the following services:
                            </p>
                            <p>
                                - Audits
                                <br />
                                - KYCs
                                <br />
                                - AMAs
                                <br />
                                - Contract development
                                <br />
                                - Launching projects
                                <br />
                                - Promotion
                            </p>
                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="Who are some of your partners?" key="3">
                            <p>We are currently official security partners of <a className="primary-link" href="https://www.pinksale.finance/#/" target={'__blank'}>
                                Pinksale

                            </a>, <a className="primary-link" href="https://www.nexusecosystem.io/" target={'__blank'}>
                                Nexus Ecosystem

                            </a>, <a className="primary-link" href="https://www.busdx.com/" target={'__blank'}>
                                BUSDX

                            </a> and <a className="primary-link" href="https://www.assuredefi.io/" target={'__blank'}>
                                Assure

                            </a>.</p>

                        </CollapsePanel>
                        <CollapsePanel className='text-gray-700 fw-bolder cursor-pointer mb-0' header="How can I learn more about SpyWolf?" key="3">
                            <p>You can visit our website at <a className="primary-link" href="" target={'__blank'}>
                                spywolf.co

                            </a></p>
                        </CollapsePanel>
                    </Collapse>

                </div>


            </div>
        </Card>
    </Container>;
};

export default Faq;

