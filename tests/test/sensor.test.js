let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = "http://localhost/api/v1";
let sensor = require('../config/sensor');

chai.use(chaiHttp);

// if the sensor exists delete it
chai.request(server)
	.delete('/domains/cdupont/sensors/0d710b12-27e8-433d-ab3a-e05b7127eeaa')
	.end((err, rss)=>{
		
	})

describe('Sensors ', () => {

	describe('/domains/{domain}/sensors/{sensor_id} Get Sensors', () => {
		it('it should GET all the the senseors', (done) => {
			chai.request(server)
				.get('/domains/cdupont/sensors')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
	});
	describe('/domains/{domain}/sensors/{sensor_id} Create sensors', ()=>{
		it('it should POST a sensor ', (done) => {
			chai.request(server)
				.post('/domains/cdupont/sensors')
				.send(sensor)
				.end((err, res) => {
					res.should.have.status(200);
				  done();
				});
		  });
	});

	describe('/domains/{domain}/sensors/{sensor_id} sensor', () => {
		it('it should GET a sensor by the given id', (done) => {
		
			chai.request(server)
				.get( '/domains/cdupont/sensors/0d710b12-27e8-433d-ab3a-e05b7127eeaa')
				.end((err, res) => {
					if(err){
						console.log(err);
						return;
					}
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('gateway_id');
					res.body.should.have.property('name');
					res.body.should.have.property('owner');
					res.body.should.have.property('sensor_kind');
					res.body.should.have.property('measurements');
					res.body.should.have.property('location');
					res.body.should.have.property('id').eql(sensor.id);
					done();
				});

		});
	});

	describe('/domains/{domain}/sensors/{sensor_id}/owner	insert owner', () => {
		it('it should update the owner field', (done) => {
			chai.request(server)
				.put(`/domains/cdupont/sensors/${sensor.id}/owner`)
				.set('content-type', 'text/plain')
				.send("henok")
				.end((err, res) => {
					res.should.have.status(200);
					chai.request(server)
						.get(`/domains/cdupont/sensors/${sensor.id}`)
						.end((err, res)=>{
							res.body.should.be.a('object');
							res.body.should.have.property('owner').eql('henok');
							done();
						})
						
				});

		});
	});
	describe('/domains/{domain}/sensors/{sensor_id}/name	insert name', () => {
		it('it should update the name field', (done) => {
			chai.request(server)
				.put(`/domains/cdupont/sensors/${sensor.id}/name`)
				.set('content-type', 'text/plain')
				.send("SEN1")
				.end((err, res) => {
					res.should.have.status(200);
					chai.request(server)
						.get(`/domains/cdupont/sensors/${sensor.id}`)
						.end((err, res)=>{
							res.body.should.be.a('object');
							res.body.should.have.property('name').eql('SEN1');
							done();
						})
						
				});

		});
	
	
	});
	describe('/domains/{domain}/sensors/{sensor_id}/location	insert location', () => {
		it('it should update the location field', (done) => {
			chai.request(server)
				.put(`/domains/cdupont/sensors/${sensor.id}/location`)
				.send({
					"latitude": 5.36,
					"longitude": 4.0083
				  })
				.end((err, res) => {
					res.should.have.status(200);
					chai.request(server)
						.get(`/domains/cdupont/sensors/${sensor.id}`)
						.end((err, res)=>{
							res.body.should.be.a('object');
							res.body.location.should.have.property('latitude').eql(5.36);
							res.body.location.should.have.property('longitude').eql(4.0083);
							done();
						})
						
				});

		});	
	});

	describe('/domains/{domain}/sensors/{sensor_id}/sensor_kind	insert sensor kind', () => {
		it('it should update the sensor kind field', (done) => {
			chai.request(server)
				.put(`/domains/cdupont/sensors/${sensor.id}/sensor_kind`)
				.set('content-type', 'text/plain')
				.send("Soil moisture sensor")
				.end((err, res) => {
					res.should.have.status(200);
					chai.request(server)
						.get(`/domains/cdupont/sensors/${sensor.id}`)
						.end((err, res)=>{
							res.body.should.be.a('object');
							res.body.should.have.property('sensor_kind').eql('Soil moisture sensor');
							done();
						})
						
				});

		});
	});

	describe('/domains/{domain}/sensors/{sensor_id} Remove sensor', () => {
		it('it should Remove a sensor by the given id', (done) => {
		
			chai.request(server)
				.delete( `/domains/cdupont/sensors/${sensor.id}`)
				.end((err, res) => {
					if(err){
						console.log(err);
						return;
					}
					done();
				});

		});
	});

});