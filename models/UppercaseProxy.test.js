const proxyquire = require('proxyquire');
const MockAdapter = require("axios-mock-adapter");

const mock = new MockAdapter(require('axios'));
const UppercaseProxy = proxyquire('./UppercaseProxy', { axios: mock });

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mock.resetHistory();
});

describe('UppercaseProxy', () => {
  it("gets response from server and converts to UPPERCASE", async () => {
    const clientMessage = "client is saying hello!";
    mock.onPost('/web-service-url').reply(200, 'server says hello!');
    const result = await UppercaseProxy(clientMessage);
    expect(result).toBe('SERVER SAYS HELLO!');
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].data).toBe(JSON.stringify({data: clientMessage}));
  });
});
