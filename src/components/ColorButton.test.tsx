import {render, screen, fireEvent} from "@testing-library/react";
import ColorButton, {replaceCamelWithSpaces} from "./ColorButton";


describe("when the button is rendered", () => {

    test('should be enabled', function () {
        /* render the components */
        render(<ColorButton/>);

        /* get the elements */
        const checkboxElement = screen.getByRole("button", {name: 'Change to blue'});

        /* assertions */
        expect(checkboxElement).toBeEnabled();
    });

    test("should has correct initial color ('red')", () => {
        /* render the components */
        render(<ColorButton/>);

        /* get the elements */
        const buttonElement = screen.getByRole("button", {name: 'Change to blue'});

        /* assertions */
        expect(buttonElement).toHaveStyle({backgroundColor: 'red'});
    });

    test("should has correct initial text ('Change to blue')", () => {
        /* render the components */
        render(<ColorButton/>);

        /* get the elements */
        const buttonElement = screen.getByRole("button", {name: 'Change to blue'});

        /* assertions */
        expect(buttonElement).toHaveTextContent("Change to blue");
    });
});

describe("when the user interact with the button", () => {

    test("should turn its color when is clicked ('blue')", () => {
        /* render the components */
        render(<ColorButton/>);

        /* get the elements */
        const buttonElement = screen.getByRole("button", {name: 'Change to blue'});

        // fire events
        fireEvent.click(buttonElement);

        /* assertions */
        expect(buttonElement).toHaveStyle({backgroundColor: 'blue'});
    });

    test("should change its text when is clicked ('Change to red')", () => {
        /* render the components */
        render(<ColorButton/>);

        /* get the elements */
        const buttonElement = screen.getByRole("button", {name: 'Change to blue'});

        // fire events
        fireEvent.click(buttonElement);

        /* assertions */
        expect(buttonElement).toHaveTextContent('Change to red');
    });
});

describe("when the checkbox is rendered", () => {

    test('should be unchecked', function () {
        /* render the components */
        render(<ColorButton/>);

        /* get the elements */
        const checkboxElement = screen.getByRole("checkbox");

        /* assertions */
        expect(checkboxElement).not.toBeChecked();
    });
})

describe("when the user interact with the checkbox", () => {

    test("should disable the button", () => {
        /* render the components */
        render(<ColorButton/>);

        /* get the elements */
        const buttonElement = screen.getByRole("button", {name: 'Change to blue'});
        const checkboxElement = screen.getByRole("checkbox");

        // fire events
        fireEvent.click(checkboxElement);

        /* assertions */
        expect(buttonElement).toBeDisabled();
    });

    test("should disable and enable the button", () => {
        /* render the components */
        render(<ColorButton/>);

        /* get the elements */
        const buttonElement = screen.getByRole("button", {name: 'Change to blue'});
        const checkboxElement = screen.getByRole("checkbox", {name: 'Disable button'});

        fireEvent.click(checkboxElement); // fire events
        expect(buttonElement).toBeDisabled(); // assertion

        fireEvent.click(checkboxElement); // fire events
        expect(buttonElement).toBeEnabled(); // assertion
    });

    test("should turn the button gray and reverts to red", () => {
        /* render the components */
        render(<ColorButton/>);

        /* get the elements */
        const buttonElement = screen.getByRole("button", {name: 'Change to blue'});
        const checkboxElement = screen.getByRole("checkbox", {name: 'Disable button'});

        // check if there is not checked
        expect(checkboxElement).not.toBeChecked();

        // disable the button
        fireEvent.click(checkboxElement);

        // expects to be in gray
        expect(buttonElement).toHaveStyle({backgroundColor: 'gray'});

        // uncheck it
        fireEvent.click(checkboxElement);

        // expects to be in red again
        expect(buttonElement).toHaveStyle({backgroundColor: 'red'});
    });

    test("should turn the button gray and reverts to blue", () => {
        /* render the components */
        render(<ColorButton/>);

        /* get the elements */
        const buttonElement = screen.getByRole("button", {name: 'Change to blue'});
        const checkboxElement = screen.getByRole("checkbox", {name: 'Disable button'});

        // check if there is not checked
        expect(checkboxElement).not.toBeChecked();

        // change the button color to blue
        fireEvent.click(buttonElement);

        // disable the button
        fireEvent.click(checkboxElement);

        // expects to be in gray
        expect(buttonElement).toHaveStyle({backgroundColor: 'gray'});

        // uncheck it
        fireEvent.click(checkboxElement);

        // expects to be in red again
        expect(buttonElement).toHaveStyle({backgroundColor: 'blue'});
    });
});

describe("when spaces before camel-case capital letters", () => {

    test("should work for no inner capital letters", () => {
        const result = replaceCamelWithSpaces('Red');
        expect(result).toBe('Red');
    });

    test("should work one inner capital letters", () => {
        const result = replaceCamelWithSpaces('MidnightBlue');
        expect(result).toBe('Midnight Blue');
    });

    test("should work multiple inner capital letters", () => {
        const result = replaceCamelWithSpaces('MediumVioletRed');
        expect(result).toBe('Medium Violet Red');
    });
})