const chai = require('chai');
const {
  describe, it, before, after,
} = require('mocha');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../../index');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('Quando o usuário é cadastrado com sucesso', () => {
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

      response = await chai.request(app)
        .post('/users')
        .send({
          name: 'name-ok',
          password: 'password-ok',
          type: 'user',
        });
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('retorna código de status "201"', () => {
      expect(response).to.have.status(201);
    });
  });
});
