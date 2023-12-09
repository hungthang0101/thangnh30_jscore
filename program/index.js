import * as inventoryManage from './inventory_management.js';
import * as product from './product.js';

/**
 * Function run program
 * @return void
 */
function main() {
    let inventory = []; //initialize new array
    let choose;

    //initialize sample records
    for (let index = 1; index <= 10; index++) {
        inventory.push(new product.Product(undefined, 'Product ' + index, 'Dec ' + index, index, index));
    }

    do {
        choose = inventoryManage.chooseFunctionMenu();
        if (choose == 8) break;
        inventoryManage.exeTaskMenu(choose, inventory);
    } while (true)
}

main();