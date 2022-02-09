const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')

class ProductService {
    constructor() {
        this.products = [];
        this.generateProducts()
    }

    generateProducts() {
        const limit = 100
        for(var i = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: faker.image.imageUrl()
            })
        }
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products)
            }, 5000)
        });
    }

    async getById(id) {
        return this.products.find(p => p.id === id);
    }

    async create(product) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...product
        }
        this.products.push(newProduct);
        return newProduct;
    }

    async update(id, product) {
        const index = this.products.findIndex(p => p.id === id);
        if(index === -1) {
            throw new Error("Product not found")
        }
        const current = this.products[index]
        this.products[index] = {
            ...current,
            ...product
        };
        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex(p => p.id === id);
        if(index === -1) {
            throw new Error("Product not found");
        }
        this.products.splice(index, 1);
        return { id };
    }
}

module.exports = ProductService