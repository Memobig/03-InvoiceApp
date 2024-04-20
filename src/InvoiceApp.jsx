import { getInvoice } from "./services/getInvoice";

export const InvoiceApp = () => {

    const { id, name, client, company, items } = getInvoice();
    const { name: clientName, lastName, address } = client;
    const { country, city, street, number } = address;

    return (
        <>
            <h1>Ejemplo Factura</h1>
            <ul>
                <li>Id: {id}</li>
                <li>Name: {name}</li>
            </ul>
            <h3>Datos del Cliente</h3>
            <ul>
                <li>{clientName} {lastName}</li>
                <li>{country}</li>
                <li>{city}</li>
                <li>{street} {number}</li>
            </ul>
            <h3>Datos de la empresa</h3>
            <ul>
                <li>{company.name}</li>
                <li>{company.fiscalNumber}</li>
            </ul>
            <h4>Productos de la Factura</h4>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>

                    {items.map(({key, product, price, quantity}) => (

                            <tr key = {key}>
                                <td>{product}</td>
                                <td>{price}</td>
                                <td>{quantity}</td>
                            </tr>
                        ))
                    }

                    
                </tbody>
            </table>

        </>
    )
}