import { Printer } from "@/lib/Printer";
import { useRef, useState } from "react";

type PrinterWriteProps = {
    ip?: string
}

//Componente di test che permette di stampare un documento fiscale dato l'indirizzo IP della stampante
export function PrinterWriteFiscal(props: PrinterWriteProps) {
    const [error, setError] = useState<string>(); //stato di errore
    const [loading, setLoading] = useState<boolean>(false); //stato di attesa
    const descriptionRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);


    // Effettua la richiesta per stampare un messaggio di prova non fiscale
    async function print() {
        if (!props.ip) {
            setError("Indirizzo IP non valido");
            return;
        }
        const description = descriptionRef.current?.value ?? '';
        const quantity = quantityRef.current?.valueAsNumber ?? 1;
        const price = priceRef.current?.valueAsNumber ?? 0;

        const xml = `<printerFiscalReceipt>
        <beginFiscalReceipt  />
        <printRecItem  operator="1" description="${description}" quantity="${quantity}" unitPrice="${price}" department="1" justification="1" />
        <printRecTotal description="Pagamento"  paymentType="0" index="0" justification="1" />
        <endFiscalReceipt />
        </printerFiscalReceipt>
        `;

        setLoading(true);

        const response = await Printer.send(`http://${props.ip}/cgi-bin/fpmate.cgi`, xml, 5000)
        if (response.success) {
            alert("Stampa completata con successo");
        } else {
            //Se la richiesta non è andata a buon fine, mostro l'errore
            setError(response.code);
        }
        //Modifico il valore di loading per nascondere il messaggio di attesa
        setLoading(false);
    }

    return <div style={{ border: '1px solid black', padding: '1rem' }}>
        <h3>Test di stampa fiscale:</h3>


        <label htmlFor="description">Descrizione:</label>
        <input id="description" ref={descriptionRef} ></input>
        <br />

        <label htmlFor="quantity">Quantità:</label>
        <input id="quantity" ref={quantityRef} type="number" ></input>
        <br />

        <label htmlFor="price">Prezzo:</label>
        <input id="price" ref={priceRef} type="number"  ></input>
        <br />


        <button onClick={print}>Stampa</button>
        {loading && <p>In attesa di risposta...</p>}
        {error && <p>Errore: {error}</p>}
    </div>
}