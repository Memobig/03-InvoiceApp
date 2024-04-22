import { getInvoice } from "./services/getInvoice";
import { InvoiceView } from "./components/InvoiceView";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { ListItemsView } from "./components/ListItemsView";

export const InvoiceApp = () => {

    const { id, name, client, company, items } = getInvoice();
    

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
                    </div>
                </div>
            </div>
        </>
    )
}