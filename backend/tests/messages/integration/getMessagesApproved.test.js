const chai = require('chai');
const {
  describe, it, before, after,
} = require('mocha');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../..');
const messages = require('../../utils/messages');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /messages', () => {
  describe('quando as mensagen aprovadas são encontradas com sucesso', () => {
    let response;
    const DBServer = new MongoMemoryServer();

    before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient.connect(
        URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true },
      );

      sinon.stub(MongoClient, 'connect')
        .resolves(connectionMock);

      Promise.all(
        messages.map(
          async (message) => {
            (await chai.request(app)
              .post('/messages').send(message));
          },
        ),
      );

      response = await chai.request(app)
        .get('/messages');
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array', () => {
      expect(response.body).to.be.a('array');
    });

    it('o array tem uma mensagem', () => {
      expect(response.body).to.be.length(1);
    });

    it('a mensagem é "Mandar mensagem é legal"', () => {
      expect(response.body[0].message).to.be.equal('Mandar mensagem é legal');
    });
  });
});
