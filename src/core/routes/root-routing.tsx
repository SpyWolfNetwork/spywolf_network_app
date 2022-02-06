import { Breadcrumb } from "antd";
import { Link, Navigate, } from "react-router-dom";
import {
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { Disclaimer } from "../../modules/disclaimer/pages/learn-list/disclaimer";
import { Container } from "./routing.style";
import Faq from "../../modules/faq/pages/faq/sample/faq";
import { HomeComponent } from "../../modules/home/pages/home";
import { LearnList } from "../../modules/learn/pages/learn-list/learn-list";
import RewardComponent from "../../modules/reward/reward";
import { TokenDashboardComponent } from "../../modules/token/pages/dashboard/token-dashboard";
import Wallet from "../../modules/wallet/pages/wallet";
import GetAuditedComponent from "../../modules/get-audited/get-audited";
import { RequestAuditProvider } from "./providers/request-audit.provider";



export default function Root() {
    let breadcrumbNameMap: any = {
        '/token': 'Token',
        '/wallet': 'Wallet',
        '/disclaimer': 'Disclaimer',
        '/charity': 'Charity',
        '/frequently-asked-questions': 'Frequently Asked Question',
        '/request-service': 'Request an audit',
    };

    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);
    breadcrumbNameMap['/token/' + pathSnippets[pathSnippets.length - 1]] = pathSnippets[pathSnippets.length - 1];
    breadcrumbNameMap['/wallet/' + pathSnippets[pathSnippets.length - 1]] = pathSnippets[pathSnippets.length - 1];
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url as any]}</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        pathSnippets.length > 0 && <Breadcrumb.Item key="browse">
            <Link to="/">Home</Link>
        </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems);



    return (
        <Container style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', display: 'flex' }}>
            <Breadcrumb style={{ width: "100%", maxWidth: "1320px", padding: '0 2.25rem ' }}>
                {breadcrumbItems}
            </Breadcrumb>
            <div style={{ width: '100%', height: '100%', justifyContent: 'center', display: 'flex' }}>
                <Routes >
                    <Route path="/wallet/:walletid" element={<Wallet />}>
                    </Route>
                    <Route path="/token/:tokenid" element={<TokenDashboardComponent />}>
                    </Route>
                    <Route path="/" element={<HomeComponent />}></Route>
                    <Route path="/wallet" element={<Navigate replace to="/" />}></Route>
                    <Route path="/token" element={<Navigate replace to="/" />}></Route>
                    <Route path="/learn" element={<LearnList></LearnList>}></Route>
                    <Route path="/frequently-asked-questions" element={<Faq />}></Route>
                    <Route path="/disclaimer" element={<Disclaimer />}></Route>
                    <Route path="/charity" element={<RewardComponent />}></Route>
                    <Route path="/request-audit" element={<RequestAuditProvider><GetAuditedComponent /></RequestAuditProvider>}></Route>

                </Routes>
            </div>
        </Container>

    );
}