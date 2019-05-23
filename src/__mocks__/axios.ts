/**
 * Allows us to overide the 'axios' module to mock responses when testing
 */
export default {
    post: jest.fn(() => Promise.resolve({ data: {} }))
};