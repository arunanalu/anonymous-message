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

describe('PUT /messages', () => {
  describe('quando as mensagens aprovadas são encontradas com sucesso', () => {
    let response;
    let messagesApproved;
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

      const messagesNotApproved = await chai.request(app)
        .get('/messages/approve');
      const { _id: id } = messagesNotApproved.body[0];

      response = await chai.request(app)
        .put(`/messages/approve/${id}`);

      messagesApproved = await chai.request(app)
        .get('/messages');
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto tem uma "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a mensagem é "This message was approved"', () => {
      expect(response.body.message).to.be.equal('This message was approved');
    });

    it('o endpoint de mensagens aprovadas, deve ter duas mensagens', async () => {
      expect(messagesApproved.body).to.be.length(2);
    });
  });
});
