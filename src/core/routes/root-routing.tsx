import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Wallet from "../../modules/wallet/pages/wallet";



export default function Root() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Wallet />}>
                    </Route>
                    <Route path="/tokens" element={<Wallet />}>
                    </Route>
                    <Route path="/tokens" element={<Wallet />}>
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}