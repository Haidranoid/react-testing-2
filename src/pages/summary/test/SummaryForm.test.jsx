import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("SummaryForm", () => {

    test("should be unchecked and disabled by default", () => {
        render(<SummaryForm/>);

        const checkboxElement = screen.getByRole("checkbox", {name: /terms and conditions/i});
        const buttonElement = screen.getByRole("button", {name: "Confirm order"});

        expect(checkboxElement).not.toBeChecked();
        expect(buttonElement).toBeDisabled();
    });

    test("should enable and disable the button when the checkbox is clicked", () => {
        render(<SummaryForm/>);

        const checkboxElement = screen.getByRole("checkbox", {name: /terms and conditions/i});
        const buttonElement = screen.getByRole("button", {name: "Confirm order"});

        // clicks the checkbox and enable the button
        userEvent.click(checkboxElement)
        expect(buttonElement).toBeEnabled();

        // clicks the checkbox again and disable the button
        userEvent.click(checkboxElement);
        expect(buttonElement).toBeDisabled();
    });

    test("should be displayed the popover with hover", async () => {
        render(<SummaryForm/>);

        // popover starts out hidden
        const nullPopupElement = screen.queryByText(/no ice cream will actually be delivered/i);
        expect(nullPopupElement).not.toBeInTheDocument();

        // popover appears upon mouseover of checkbox label
        const termsAndConditions = screen.getByText(/Terms and Conditions/i)
        userEvent.hover(termsAndConditions);

        const popupElement = screen.getByText(/no ice cream will actually be delivered/i);
        expect(popupElement).toBeInTheDocument();

        // popover disappears when we mouse out
        userEvent.unhover(termsAndConditions);
        // expect(popupElement).not.toBeInTheDocument();
        await waitForElementToBeRemoved(() =>
            screen.queryByText(/no ice cream will actually be delivered/i)
        );
    })
})