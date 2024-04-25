import { invoice } from "../data/invoice";

export const getInvoice = () => {
    // console.log(invoice);

    // let total = 0;
    
    // invoice.items.forEach(item => {

    //     total = total + item.price * item.quantity;
    // })

    let total = invoice.items
    .map(item => item.price * item.quantity)
    .reduce((accoumulator, currentValue) => accoumulator + currentValue, 0)

    return {...invoice, total};
}