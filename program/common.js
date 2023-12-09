import promptSync from 'prompt-sync';

const prompt = promptSync();
const regexID = /^_\w{8}$/; //regex check ID

/**
 * Function access user input a integer number
 * @param {*} msgInput - message inform to user
 * @param {*} minValueToInput - minimum value that the user is allowed to enter
 * @param {*} maxValueToInput - maximum value that the user is allowed to enter
 * @param {*} isCheckBlank - validate check blank from user (default off)
 * @returns a integer number if user input blank and isCheckBlank is true, will return undefined
 */
export function inputIntegerNumber(msgInput, minValueToInput, maxValueToInput, isCheckBlank = false) {
    do {
        try {
            let integetNum = prompt(msgInput).trim(); //input value
            if (integetNum == '' && isCheckBlank) {  //access input blank with return undefined
                return;
            } else if (integetNum == '') {  //no access input blank and back to input again
                console.log(`Please enter somthing!`);
                continue;
            }
            integetNum = Number(integetNum); // convert string to number
            if (!Number.isSafeInteger(integetNum)) {
                console.log(`Please enter a integer number!`);
                continue;
            } else if (integetNum >= minValueToInput && integetNum <= maxValueToInput) { //check input value in [min,max] unless will be backed to input again
                return integetNum;
            } else {
                console.log(`Please enter ${minValueToInput}-${maxValueToInput}!`);
            }
        } catch (error) {
            console.log(`Something wrong!\n${error}`);
        }
    } while (true)
}

/**
 * Function access user input a string value
 * @param {*} msgInput - message inform to user
 * @param {*} isCheckBlank - validate check blank from user (default off)
 * @returns a string if user input blank and isCheckBlank is true, will return undefined
 */
export function inputString(msgInput, isCheckBlank = false) {
    do {
        try {
            let description = prompt(msgInput).trim(); //input value
            if (!description && isCheckBlank) { //access input blank with return undefined
                return;
            } else if (!description) {  //no access input blank and back to input again
                console.log(`Please enter somthing!`);
                continue;
            } else {
                return description;
            }
        } catch (error) {
            console.log(`Something wrong!\n${error}`);
        }
    } while (true)
}

/**
 * Function access user input a string value which is ID of product and check matching with format
 * @param {*} msgInput - message inform to user
 * @return ID value
 */
export function inputID(msgInput) {
    do {
        try {
            let id = prompt(msgInput).trim();

            if (!id) {
                console.log(`Please enter something!`);
                continue;
            } else if (id.match(regexID)) { //check matching with format
                return id; 
            } else {
                console.log(`Please enter a valid value (_XXXXXXXX).`);
            }
        } catch (error) {
            console.log(`Something wrong!\n${error}`);
        }
    } while (true)
}

/**
 * Function capitalize the beginning of the sentence
 * @param {*} str - value to capitalize
 * @return a string value which is capitalized the beginning of the sentence
 */
export function capitalizeTheFirstCharacterOnString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Function capitalizes the beginning of each letter
 * @param {*} str 
 * @return a string value which is capitalizes the beginning of each letter
 */
export function capitalizeName(str) {
    return str.replace(/\b(\w)/g, s => s.toUpperCase());
}

/**
 * Function check object exist on list
 * @param {*} list - the array check value has or not
 * @param {*} valueCheck - value need to check
 * @return true if find on array
 */
export function hasObjInList(list, valueCheck) {
    let flag = false;
    list.forEach(element => {
        if (element.name == valueCheck) {
            flag = true;
        }
    });
    return flag;
}

/**
 * Function executing sort array with ascending order
 * @param {*} list - the array need to sort
 * @param {*} key - sort base on this value
 * @return array is sorted array with ascending order base on key value
 */
export function sortAsc(list, key) {
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - 1 - i; j++) {
            if (list[j][key] > list[j + 1][key] || list[j][key].length > list[j + 1][key].length) {
                [list[j], list[j + 1]] = [list[j + 1], list[j]];
            }
        }
    }
    return list;
}

/**
 * Function executing sort array with descending order
 * @param {*} list - the array need to sort
 * @param {*} key - sort base on this value
 * @return array is sorted array with descending order base on key value
 */
export function sortDesc(list, key) {
    list = sortAsc(list, key).reverse(); //execute sort ascending and reversing to return array is sorted with descending
    return list;   
}

/**
 * Function filter list obj contain value
 * @param {*} list - the array need to filter
 * @param {*} valueSearch - filter base on this value
 * @return list obj contain value
 */
export function filterValueInList(list, valueSearch) {
    return list.filter(product => product.name.includes(valueSearch) || product.description.includes(valueSearch));
}

/**
 * Function find index of object with key has value corresponding
 * @param {*} list - the array need to sort
 * @param {*} key - param of obj need to find
 * @param {*} valueToFind - value need to check
 * @return index of object
 */
export function findIndexValueInArray(list, key, valueToFind) {
    return list.findIndex(object => {
        return object[key] === valueToFind;
    });
}

/**
 * Function update value of object
 * @param {*} list - the array get object need to update
 * @param {*} index - index of object
 * @param {*} nameUpdate - name value need to update
 * @param {*} descriptionUpdate - description value need to update
 * @param {*} priceUpdate - price value need to update
 * @param {*} quantityUpdate - quantity value need to update
 * @return list after update value of object successfully
 */
export function updateValueInArray(list, index, nameUpdate, descriptionUpdate, priceUpdate, quantityUpdate) {
    try {
        //check value is changed or not
        nameUpdate = nameUpdate == undefined ?
            list[index].name : capitalizeName(nameUpdate);
    
        descriptionUpdate = descriptionUpdate == undefined ?
            list[index].description : capitalizeTheFirstCharacterOnString(descriptionUpdate);
    
        priceUpdate = priceUpdate == undefined ?
            list[index].price : priceUpdate;
    
        quantityUpdate = quantityUpdate == undefined ?
            list[index].quantity : quantityUpdate;
    
        //update value
        list[index].setName(nameUpdate);
        list[index].setDescription(descriptionUpdate);
        list[index].setPrice(priceUpdate);
        list[index].setQuantity(quantityUpdate);        
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }

    return list;
}