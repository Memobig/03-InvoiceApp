import { useEffect, useState } from "react";

export const FormItemsView = ({handler}) => {

    const [formItemsState, setFormItemsState] = useState({
        product: '',
        price: '',
        quantity: '',
    });

    const { product, price, quantity } = formItemsState;

    useEffect(() => {
        // console.log('el precio ha sido modificado');
    }, [price]);
    useEffect(() => {
        // console.log('un campo del formulario cambio');
    }, [formItemsState]);

    const onInputChange = ({ target: { value, name } }) => {
        // console.log(name);
        // console.log(value);
        setFormItemsState({
            ...formItemsState,
            [name]: value,
        });
    }

    const onInvoiceItemSubmit = (event) => {
        event.preventDefault();
        if (product.trim().length <= 1) return;
        if (price.trim().length <= 1) return;
        if (isNaN(price.trim())) {
            alert('Error el valor ingresado no es un número');
            return;
        }
        if (quantity.trim().length < 1) return;
        if (isNaN(quantity.trim())) return;


        handler(formItemsState);

        setFormItemsState({
            product: '',
            price: '',
            quantity: '',
        });

        // setCounter(counter +1);
    }

    return (
        <>
            <form className="w-50" onSubmit={event => onInvoiceItemSubmit(event)}>
                <input
                    type="text"
                    name="product"
                    value={product}
                    placeholder="Producto"
                    className="form-control m-3" onChange={onInputChange} />
                <input
                    type="text"
                    name="price"
                    value={price}
                    placeholder="Precio"
                    className="form-control m-3" onChange={event => onInputChange(event)} />
                <input
                    type="text"
                    name="quantity"
                    value={quantity}
                    placeholder="Cantidad"
                    className="form-control m-3" onChange={onInputChange} />
                <button
                    type="submit"
                    className="btn btn-primary m-3">
                    Nuevo Item
                </button>
            </form>
        </>
    )
}