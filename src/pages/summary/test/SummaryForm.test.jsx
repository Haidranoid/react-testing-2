import {render, screen, fireEvent} from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("SummaryForm initial conditions", () => {

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<SummaryForm/>);
    });

    test("should be unchecked and disabled by default", () => {
        const checkboxElement = screen.getByRole("checkbox", {name: /terms and conditions/i});
        const buttonElement = screen.getByRole("button", {name: "Confirm order"});

        expect(checkboxElement).not.toBeChecked();
        expect(buttonElement).toBeDisabled();
    });

    test("should enable and disable the button when the checkbox is clicked", () => {
        const checkboxElement = screen.getByRole("checkbox", {name: /terms and conditions/i});
        const buttonElement = screen.getByRole("button", {name: "Confirm order"});

        // clicks the checkbox and enable the button
        fireEvent.click(checkboxElement)
        expect(buttonElement).toBeEnabled();

        // clicks the checkbox again and disable the button
        fireEvent.click(checkboxElement);
        expect(buttonElement).toBeDisabled();
    });

})