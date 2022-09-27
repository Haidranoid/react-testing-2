// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {server} from "./mocks/server";

// establish API mocking before all test.
beforeAll(() => server.listen())

// reset any request handlers that we may add during the test,
// so they don't affect other test.
afterEach(() => server.resetHandlers())

// clean up after the test are finished
afterAll(() => server.close())