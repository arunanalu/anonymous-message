const chai = require('chai');
const {
  describe, it, before, after,
} = require('mocha');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const app = require('../../../index');
const { getConnection } = require('./mongoMockConnection');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  const ID_TEST = '61ff1f3455c3bfd1a4fa0c97';

  describe('Quando o login é feito com sucesso', () => {
    let response;

    before(async () => {
      const user = {
        _id: ID_TEST,
        name: 'teste',
        password: 'password-ok',
        type: 'user',
      };

      await connectionMock.db('anonymous').collection('users').insertOne(user);

      response = await chai.request(app)
        .post('/login')
        .send({
          name: 'teste',
          password: 'password-ok',
        });
    });

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('objeto de resposta deve possuir as propriedades "type" e "token"', () => {
      expect(response.body).to.have.property('type');
      expect(response.body).to.have.property('token');
    });

    it('o valor das propriedades "type" e "token" deve ser uma "string"', () => {
      expect(response.body.type).to.be.a('string');
      expect(response.body.token).to.be.a('string');
    });

    it('a propriedade token deve conter um token JWT com o usuario usado no login no seu payload', () => {
      const { token } = response.body;
      const payload = jwt.decode(token);

      expect(payload.data.name).to.be.equal('teste');
    });
  });
});
