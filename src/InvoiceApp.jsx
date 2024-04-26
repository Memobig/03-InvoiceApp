import { useEffect, useState } from "react";
import { getInvoice, calculateTotal } from "./services/getInvoice";
import { InvoiceView } from "./components/InvoiceView";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
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

    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });


    const {product, price, quantity} = formItemsState;

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

    useEffect(() => {
        // console.log('el precio ha sido modificado');
    }, [price]);
    useEffect(() => {
        // console.log('un campo del formulario cambio');
    }, [formItemsState]);
useEffect(()=>{
    setTotal(calculateTotal(items));
    console.log('los items cambiaron');
},[items])





    
    const onInputChange = ({target: {value, name}}) => {
        // console.log(name);
        // console.log(value);
        setFormItemsState({
            ...formItemsState,
            [name] : value,
        });
    }

    const onInvoiceItemSubmit = (event) => {
        event.preventDefault();
        if(product.trim().length <= 1) return;
        if(price.trim().length <= 1) return;
        if(isNaN(price.trim())) {
            alert('Error el valor ingresado no es un número');
            return;
        }
        if(quantity.trim().length < 1) return;
        if(isNaN(quantity.trim())) return;

        setItems([...items, {key: counter, 
            product: product.trim(), 
            price: +price.trim(), 
            quantity: parseInt(quantity.trim(), 10)}]);

            setFormItemsState({
                product: '',
                price: '',
                quantity: '',
            });

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
                        <form className="w-50" onSubmit={event => onInvoiceItemSubmit(event)}>
                            <input 
                            type="text" 
                            name="product" 
                            value={product}
                            placeholder="Producto" 
                            className="form-control m-3" onChange={onInputChange}/>
                            <input 
                            type="text" 
                            name="price" 
                            value={price}
                            placeholder="Precio" 
                            className="form-control m-3" onChange={event => onInputChange(event)}/>
                            <input 
                            type="text" 
                            name="quantity" 
                            value={quantity}
                            placeholder="Cantidad" 
                            className="form-control m-3" onChange={onInputChange}/>
                            <button 
                            type="submit" 
                            className="btn btn-primary m-3">
                                Nuevo Item
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}