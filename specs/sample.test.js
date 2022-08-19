const client = require('./jest/client');
const { axios, root } = client;

test('Check Server Start Normally', async () => {
    const request = await axios.get(root);
    const expectedResult = 200;
    expect(request.status).toEqual(expectedResult);
});
