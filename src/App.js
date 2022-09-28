import {Container} from "react-bootstrap";
import {OrderDetailsProvider} from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
    return (
        <Container>
            <OrderDetailsProvider>
                {/* summary page and entry page need provider*/}
                <OrderEntry/>
            </OrderDetailsProvider>
        </Container>
    );
}

export default App;
