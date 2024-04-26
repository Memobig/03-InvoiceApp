import { useEffect, useState } from "react";
import { getInvoice, calculateTotal } from "./services/getInvoice";
import { InvoiceView } from "./components/InvoiceView";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { FormItemsView } from "./components/FormItemsView";
const invoiceInitial = {
    id: 0,
    name: '',
    client: {
        name: '',
        lastName: '',
        address: {
            country: '',
            city: '',
            street: '',
            number: 0
        }
    },
    company: {
        name: '',
        fiscalNumber: 0,
    },
    items: [],
};

export const InvoiceApp = () => {

    const [counter, setCounter] = useState(4);




    

    const [invoice, setInvoice] = useState(invoiceInitial);

    const { id, name, client, company } = invoice;

    const [total, setTotal] = useState(0);

    const [items, setItems] = useState([]);
    useEffect(() => {
        const data = getInvoice();
        console.log(data);
        setInvoice(data);
        setItems(data.items);
    }, []);


useEffect(()=>{
    setTotal(calculateTotal(items));
    console.log('los items cambiaron');
},[items])

const handlerAddItem = ({product, price, quantity}) => {


    setItems([...items, {key: counter, 
        product: product.trim(), 
        price: +price.trim(), 
        quantity: parseInt(quantity.trim(), 10)}]);

        setCounter(counter +1);
}

    return (
        <>
            <div className="container">
                <div className="card my-3">
                    <div className="card-header">
                        Ejemplo Factura
                    </div>
                    <div className="card-body">
                        <InvoiceView id={id} name={name} />

                        <div className="row my-3">
                            <div className="col">

                                <ClientView title="Datos del Cliente" client={client} />
                            </div>
                            <div className="col">

                                <CompanyView title="Datos de la empresa" company={company}/>
                            </div>
                        </div>
                        <ListItemsView title="Productos de la Factura" items={items}/>
                        <TotalView total={total}/>
                        <FormItemsView handler={(newItem)=> handlerAddItem(newItem)}/>
                    </div>
                </div>
            </div>
        </>
    )
}