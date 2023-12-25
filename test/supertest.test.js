import { app } from "../src/app.js";
import { faker } from "@faker-js/faker";
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest(app)


describe("Testing de  tienda_online", () => {

    describe('Testing router session', () => {
        it('Endpoint POST de api/sessions/signup - Registrar un usuario', function () {
            console.log("Iniciando prueba");
            this.timeout(5000);
            const person = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.string.alphanumeric({ length: 10 })
            };

            // Enviar la solicitud POST al endpoint
            requester.post('/api/sessions/signup')
                .send(person)
                .then(response => {
                    expect(response.status).to.equal("susses");
                    expect(text).to.be.equal('Found. Redirecting to /sessions/login')
                    expect(response.body.data).to.have.property("_id");

                    done();
                })
                .catch(error => {
                    console.error(error);
                    done(error);
                });
        });

        it('Endpoint POST de api/session/signup - No se debe registrar si se repite el usuario', function () {
            console.log("Iniciando prueba");
            this.timeout(5000);

            const person = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: "estefanialeiba@gmail.com",
                age: faker.string.numeric({ length: 2 }),
                password: faker.string.alphanumeric({ length: 10 })
            }
            requester.post('/api/session/signup')
                .send(person)
                .then(response => {
                    expect(response.status).to.equal("susses");
                    expect(text).to.be.eq('Found. Redirecting to /api/sessions/fail-signup')
                    done();
                })
                .catch(error => {
                    console.error(error);
                    done(error);
                });
        });
    }),

    describe('Testing router product', () => {
            it('Endpoint POST de api/products - Funcion para la creacion de productos', function (){
                const product = {
                    title: " cafetera",
                    description: "cafetera electrica prueba test",
                    price: 50000,
                    code:"12345",
                    category: "electro",
                    stock:10,
                };
            requester.post('/api/products')
            .send(product)
            .then(response => {
                 //  console.log(response);
                 expect(response.body.data).to.have.property("title")
                 expect(response.body.data.title).to.be.equal(product.title);
                
                done();
            })
            .catch(error => {
                console.error(error);
                done(error);
            });
    
        })    

            it('Endpoint GET de api/products - Funcion de la paginacion de productos', function (done) {
                this.timeout(5000);    
                requester.get('/api/products')
                    .then((response) => {
                        const _body = response.body;
            
                        console.log(response);
                        expect(_body.status).to.be.eq('success');
            
                        done();
                    })
                    .catch((error) => {
                        console.error('Error durante la prueba:', error);
                        done(error);
                    });
            });

            it('Endpoint GET de api/products - Traer producto por su id', function (done) {
                this.timeout(5000);            
                console.log('Iniciando prueba...');
            
                requester
                    .get('/api/products/6551dbf68f3e8c32e7be76dd')
                    .then((response) => {
                        console.log('Respuesta recibida:', response.body);
                        expect(response.body.status).to.be.eq('success');
                        console.log('Fin de la prueba...');
                        done();
                    })
                    .catch((error) => {
                        console.error('Error durante la prueba:', error);
                        done(error);
                    });
            });
            
    })


        describe('Testing router carts', () => {
            it('Endpoint POST de api/carts - Funcion para la creacion de un carrito', async () => {
                const response = await requester.post('/api/carts')
                const { _body } = response
                // expect(response.body.data).to.have.property("_id");
                //  expect(_body.status).to.be.equal('200')

            })

            it('Endpoint GET de api/carts - traer carrito por su ID', async () => {
                const response = await requester.get('/api/carts/64ec19491a23f8305b81e93e')
                const { _body } = response
                console.log(response)

                // expect(_body.status).to.be.eq('success')

            })

        })
})