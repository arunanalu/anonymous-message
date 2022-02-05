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

describe('GET /messages/approve', () => {
  describe('quando as mensagen a serem aprovadas são encontradas com sucesso', () => {
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
        .get('/messages/approve');
        console.log(response.body)
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

    it('o array tem duas mensagens', () => {
      expect(response.body).to.be.length(2);
    });

    it('a primeira mensagem é "Nunca mais é tempo demais, baby, o tempo é rei"', () => {
      expect(response.body[0].message).to.be.equal('Nunca mais é tempo demais, baby, o tempo é rei');
    });
  });
});
