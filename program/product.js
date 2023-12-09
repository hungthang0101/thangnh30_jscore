
/**
 * Class to create a product object
 */
export class Product {
    /**
     * Funciotn to initialize a product object
     * @param {string} name - the name of the product
     * @param {string} description - a brief description of the product
     * @param {number} price - the price of the product
     * @param {number} quantity - the number of units of the product in stock
     */
    constructor(id = Product.generateId(), name, description, price, quantity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }

    /**
     * The method generates a random alphanumeric string of 9 characters prefixed with an underscore
     * @returns {string} - a unique ID for each product
     */
    static generateId() {
        return '_' + Math.random().toString(36).substring(2, 10);
    }

    setName(name) {
        return this.name = name;
    }

    setDescription(description) {
        return this.description = description;
    }

    setPrice(price) {
        return this.price = price;
    }

    setQuantity(quantity) {
        return this.quantity = quantity;
    }
}