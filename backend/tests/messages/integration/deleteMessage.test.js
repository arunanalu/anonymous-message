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

describe('DELETE /messages/:id', () => {
  describe('quando a mensagem é deletada com sucesso', () => {
    let response;
    let messagesNotApproved;
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

      const messagesGet = await chai.request(app)
        .get('/messages/approve');
      const { _id: id } = messagesGet.body[0];

      response = await chai.request(app)
        .delete(`/messages/approve/${id}`);

      messagesNotApproved = await chai.request(app)
        .get('/messages/approve');
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

    it('a mensagem é "This message was deleted"', () => {
      expect(response.body.message).to.be.equal('This message was deleted');
    });

    it('o endpoint de mensagens aprovadas, deve ter duas mensagens', async () => {
      expect(messagesNotApproved.body).to.be.length(1);
    });
  });
});
