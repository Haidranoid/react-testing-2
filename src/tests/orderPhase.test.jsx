import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from '../App'
import {fireEvent} from "../test-utils/testing-library-utils";

describe("App", () => {
    test("order phases for happy path", async () => {
        // render app
        render(<App/>);

        // add ice cream scoops and toppings
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '6');

        const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '3');

        const cheetosCheckbox = await screen.findByRole('checkbox', {name: "Cheetos"});
        fireEvent.click(cheetosCheckbox);

        // find and click order button
        const orderSummaryButton = screen.getByRole('button', {
            name: /order sundae/i
        });
        userEvent.click(orderSummaryButton);

        // check summary information based on order
        const summaryHeading = screen.getByRole('heading', {name: 'Order Summary'});
        expect(summaryHeading).toBeInTheDocument();

        const scoopsHeading = screen.getByRole('heading', {name: 'Scoops: $18.00'});
        expect(scoopsHeading).toBeInTheDocument();

        const toppingsHeading = screen.getByRole('heading', {name: 'Toppings: $1.50'});
        expect(toppingsHeading).toBeInTheDocument();

        // check summary option items
        expect(screen.getByText('6 Vanilla')).toBeInTheDocument();
        expect(screen.getByText('3 Chocolate')).toBeInTheDocument();
        expect(screen.getByText('Cheetos')).toBeInTheDocument();

        // accept terms and conditions and click button to confirm order
        const checkbox = screen.getByRole('checkbox', {
            name: /terms and conditions/i
        });
        userEvent.click(checkbox);

        const confirmOrderButton = screen.getByRole('button', {
            name: /confirm order/i
        });
        userEvent.click(confirmOrderButton)

        // confirm order number on confirmation page
        const thankYouHeader = await screen.findByRole('heading', {
            name: /thank you/i
        });
        expect(thankYouHeader).toBeInTheDocument();

        const orderNumber = await screen.findByText(/order number/i);
        expect(orderNumber).toBeInTheDocument();

        // click "new order" button on button con confirmation page
        const newOrderButton = screen.getByRole('button', {name: /new order/i})
        fireEvent.click(newOrderButton);

        // check that scoops and toppings subtotals have been reset
        const scoopsTotal = screen.getByText('Scoops total: $0.00');
        expect(scoopsTotal).toBeInTheDocument();
        const toppingsTotal = screen.getByText('Scoops total: $0.00');
        expect(toppingsTotal).toBeInTheDocument();

        // do wee need to await anything to avoid test errors?
    })
})