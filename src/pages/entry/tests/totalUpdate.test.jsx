import {render, screen, fireEvent} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";
import {waitFor} from "@testing-library/dom";

describe("totalUpdate", () => {
    test("update scoop subtotal when scoops change", async () => {

        render(<Options optionType="scoops"/>)
        // make sure total starts out $0.00
        const scoopsSubtotal = screen.getByText('Scoops total: $', {exact: false});
        expect(scoopsSubtotal).toHaveTextContent('0.00');

        // update vanilla scoops to 1 and check the subtotal
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');
        expect(scoopsSubtotal).toHaveTextContent('2.00');

        // update chocolate scoops to 2 and check subtotal
        const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '2');
        expect(scoopsSubtotal).toHaveTextContent('6.00');
    });

    test("update topping subtotal when toppings change", async () => {
        render(<Options optionType="toppings"/>);

        // make sure total starts out $0.00
        const toppingsSubtotal = screen.getByText('Toppings total: $', {exact: false});
        expect(toppingsSubtotal).toHaveTextContent('0.00');

        // select Cheetos
        const cheetosCheckbox = await screen.findByRole('checkbox', {name: "Cheetos"});
        fireEvent.click(cheetosCheckbox);
        expect(toppingsSubtotal).toHaveTextContent('1.50');

        // select Cherries
        const cherriesCheckbox = await screen.findByRole('checkbox', {name: "Cherries"});
        fireEvent.click(cherriesCheckbox);
        expect(toppingsSubtotal).toHaveTextContent('3.00');

        // unselect Cheetos and assert again the subtotal
        fireEvent.click(cheetosCheckbox);
        expect(toppingsSubtotal).toHaveTextContent('1.50');
    });
})

describe("grand total", () => {
    test("grand total starts at $0.00", () => {
        render(<OrderEntry/>);

        const grandTotalElement = screen.getByRole("heading", {name: /Grand total:/i});
        expect(grandTotalElement).toHaveTextContent('0.00');
    });

    test("grand total updates properly if scoop is added first", async() => {
        render(<OrderEntry/>);

        // update vanilla scoops to 1 and check the subtotal
        const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '3');

        // gets grand total
        const grandTotalElement = screen.getByRole("heading", {name: /Grand total:/i});
        expect(grandTotalElement).toHaveTextContent('6.00');
    });

    test("grand total updates properly if topping is added first", async () => {
        render(<OrderEntry/>);

        // select Cheetos
        const cheetosCheckbox = await screen.findByRole('checkbox', {name: "Cheetos"});
        fireEvent.click(cheetosCheckbox);

        // gets grand total
        const grandTotalElement = screen.getByRole("heading", {name: /Grand total:/i});
        expect(grandTotalElement).toHaveTextContent('1.50');
    });

    test("grand total updates properly if item is removed", async () => {
        render(<OrderEntry/>);

        // gets grand total
        const grandTotalElement = screen.getByRole("heading", {name: /Grand total:/i});

        // update chocolate scoops to 5 and check the grand total
        const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '5');
        expect(grandTotalElement).toHaveTextContent('10.00');

        // select Cheetos
        const cheetosCheckbox = await screen.findByRole('checkbox', {name: "Cheetos"});
        fireEvent.click(cheetosCheckbox);
        expect(grandTotalElement).toHaveTextContent('11.50');

        // select Cherries
        const cherriesCheckbox = await screen.findByRole('checkbox', {name: "Cherries"});
        fireEvent.click(cherriesCheckbox);
        expect(grandTotalElement).toHaveTextContent('13.00');

        // unselect Cherries
        fireEvent.click(cherriesCheckbox);
        expect(grandTotalElement).toHaveTextContent('11.50');

        // update chocolate scoops to 3 and check the grand total
        userEvent.clear(chocolateInput);
        userEvent.type(chocolateInput, '3');
        expect(grandTotalElement).toHaveTextContent('7.50');
    });
})