/**
 * Display the number with 2 digits
 * 
 * @param {string | number} number 
 */

export const twoDecimals = (number) =>{
   return parseFloat(number).toFixed(2)+' $';
}