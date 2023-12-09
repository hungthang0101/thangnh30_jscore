import * as product from './product.js';
import * as cm from './common.js';

/**
 * Take input option from user
 * @returns {number} option to choose by user
 */
export function chooseFunctionMenu() {
    console.log(`Please choose an option:
    (1). Add a new product
    (2). Remove a product
    (3). Update a product
    (4). List all products
    (5). Search for products
    (6). Calculate total value
    (7). Sort products
    (8). Exit`);

    //input number to choose task
    let chooseOption = cm.inputIntegerNumber(`Your choose: `, 1, 8);

    return chooseOption;
}

/**
 * Run funtion with the inputted option from user
 * @param {number} option - option to choose by user
 * @param {Object} inventory - list product object
 * @returns function user want to execute
 */
export function exeTaskMenu(option, inventory) {
    switch (option) {
        case 1:
            addNewProductToInventory(inventory);
            break;
        case 2:
            deleteProductOnInventory(inventory);
            break;
        case 3:
            updateDetailsOfProduct(inventory);
            break;
        case 4:
            listProductOnInventory(inventory);
            break;
        case 5:
            searchProduct(inventory);
            break;
        case 6:
            calculateTotalValue(inventory)
            break;
        case 7:
            sortProductsBy(inventory);
            break;
        default:
            console.log(`Something wrong, please try again.`);
            break;
    }
}

/**
 * Function add a new product to the inventory after inputing valid value name, description, price, quantity successfully
 * @param {Object} inventory - list product object
 * @returns inventory after adding new a product successfully
 */
function addNewProductToInventory(inventory) {
    console.log(`Add a new product to the inventory\n`);
    //print data on inventory
    if (inventory.length == 0)
        console.table(`The inventory is empty.`);
    else
        console.table(inventory);
    //input the name of the product
    let name;
    do {
        name = cm.capitalizeName(cm.inputString(`Enter name of product: `));
        //validate exist object
        if (cm.hasObjInList(inventory, name)) {
            console.log(`Product is existed. Please again!`)
        } else {
            break;
        }
    } while (true);
    let description = cm.capitalizeTheFirstCharacterOnString(cm.inputString(`Enter description of product: `));
    let price = cm.inputIntegerNumber(`Enter price of product: `, 0, Number.MAX_SAFE_INTEGER);
    let quantity = cm.inputIntegerNumber(`Enter quantity of product: `, 1, Number.MAX_SAFE_INTEGER);

    //add object to list
    inventory.push(new product.Product(undefined, name, description, price, quantity));

    console.table(inventory);
}

/**
 * Function the user to enter the id of the product to be removed
 * @param {Object} inventory - list product object
 * @returns inventory without product is removed
 */
function deleteProductOnInventory(inventory) {
    console.log(`Remove a product from the inventory\n`);
    //print data on inventory
    if (inventory.length == 0) {
        console.table(`The inventory is empty.`);
        return;
    } else
        console.table(inventory);
    //get ID of product to delete
    let removedID = cm.inputID(`Enter ID of product: `);

    inventory = inventory.filter(itemData => itemData.id != removedID);

    console.table(inventory);
}

/**
 * Function update the details of a product in the inventory, your program should prompt the user to enter the id of the 
 * product to be updated, and then prompt the user to enter the new values
 * @param {Object} inventory - list product object
 * @returns inventory after updating product successfully
 */
function updateDetailsOfProduct(inventory) {
    console.log(`Update the details of a product in the inventory\n`);
    //print data on inventory
    if (inventory.length == 0) {
        console.table(`The inventory is empty.`);
        return;
    } else {
        console.table(inventory);
    }

    //get ID of product to update
    let idProductUpdate = cm.inputID(`Enter ID of product: `);
    //get index of ID 
    const index = cm.findIndexValueInArray(inventory, 'id', idProductUpdate);


    //input the name of the product
    let nameUpdate = cm.inputString(`Enter name of product: `, true);
    let descriptionUpdate = cm.inputString(`Enter description of product: `, true);
    let priceUpdate = cm.inputIntegerNumber(`Enter price of product: `, 0, Number.MAX_SAFE_INTEGER, true);
    let quantityUpdate = cm.inputIntegerNumber(`Enter quantity of product: `, 1, Number.MAX_SAFE_INTEGER, true);

    //update new value if input blank value dont want to edit
    cm.updateValueInArray(inventory, index, nameUpdate, descriptionUpdate, priceUpdate, quantityUpdate);

    console.table(inventory);
}

/**
 * Function list all products in the inventory
 * @param {Object} inventory - list product object
 * @returns print inventory is sorted by id in ascending order.
 */
function listProductOnInventory(inventory) {
    console.log(`List all products in the inventory\n`);
    cm.sortAsc(inventory, 'id')
    console.table(inventory);
}

/**
 * Function search for products by name or description
 * @param {Object} inventory - list product object
 * @returns print inventory is searched.
 */
function searchProduct(inventory) {
    console.log(`Search for products by name or description\n`);
    let rs = [];
    let valueSearch = cm.inputString(`Search product: `);
    rs = cm.filterValueInList(inventory, valueSearch);
    if (rs.length == 0)
        console.log(`Can not search product which has ${valueSearch}.`)
    else
        console.table(rs);
}

/**
 * Function calculates the total value of the inventory by iterating through all the products, multiplying
their price by their quantity, and summing up the results
 * @param {Object} inventory - list product object
 * @returns print value total all product on the inventory.
 */
function calculateTotalValue(inventory) {
    console.log(`Calculate the total value of the inventory\n`);

    let totalInventory = 0;
    inventory.forEach(element => {
        totalInventory += element.price * element.quantity;
    });
    console.log(`The total value of all product on the inventory is ${totalInventory}$\n`)
}

/**
 * Function sort list with id, name, price or quantity order by ascending (default) and descending base on user
 * @param {Object} inventory - list product object
 * @returns print inventory is sorted 
 */
function sortProductsBy(inventory) {
    console.log(`Sort products by price or quantity\n`);
    //Select value to sort
    console.log(`Sorts products based on:
    1. ID
    2. Price
    3. Quantity`)
    let chooseOption = cm.inputIntegerNumber(`Your choose: `, 1, 4);
    //select order sort list
    console.log(`Order on:
    1. Ascending (default)
    2. Descending`)
    let orderSort = cm.inputIntegerNumber(`Your choose: `, 1, 2, true);

    if (orderSort == undefined) orderSort = 1; //Ascending is default value if input blank

    if (orderSort == 1) {  // Ascending
        switch (chooseOption) {
            case 1:
                cm.sortAsc(inventory, 'id');
                break;
            case 2:
                cm.sortAsc(inventory, 'price');
                break;
            case 3:
                cm.sortAsc(inventory, 'quantity'); 
                break;
            default:
                console.log(`Something wrong, please try again.`);
                break;
        }
    } else {  //Descending
        switch (chooseOption) {
            case 1:
                cm.sortDesc(inventory, 'id');
                break;
            case 2:
                cm.sortDesc(inventory, 'price');
                break;
            case 3:
                cm.sortDesc(inventory, 'quantity');
                break;
            default:
                console.log(`Something wrong, please try again.`);
                break;
        }
    }

    console.table(inventory);
}

