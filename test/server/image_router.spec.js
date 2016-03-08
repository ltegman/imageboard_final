'use strict';

const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/imageboard_app_dev_test';
const server = require(__dirname + '/../../index');
const Image = require(__dirname + '/../../models/image');
chai.use(require('chai-http'));

describe('image api', () => {
  it('should be able to retrieve all the images', (done) => {
    chai.request('localhost:3000')
      .get('/api/images')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create an image with a POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/images')
      .send({
        url: 'test.com',
        caption: 'test'
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.url).to.eql('test.com');
        expect(res.body.caption).to.eql('test');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('requests that require an image in db', () => {
    beforeEach((done) => {
      Image.create({ url: 'test.com', caption: 'test' }, (err, data) => {
        if (err) return console.log(err);
        this.testImage = data;
        done();
      });
    });

    it('should be able to update an image', (done) => {
      chai.request('localhost:3000')
        .put(`/api/images/${this.testImage._id}`)
        .send({ url: 'newurl.com' })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete an image', (done) => {
      chai.request('localhost:3000')
        .delete(`/api/images/${this.testImage._id}`)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    after((done) => {
      mongoose.connection.db.dropDatabase(done);
    });
  });

  after((done) => {
    server.close(done);
  });
});
