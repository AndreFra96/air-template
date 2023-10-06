import { Printer } from "@/lib/Printer";
import { useState } from "react";

type PrinterWriteProps = {
    ip?: string
}

//Componente di test che permette di stampare un documento non fiscale dato l'indirizzo IP della stampante
export function PrinterWriteNonFiscal(props: PrinterWriteProps) {
    const [error, setError] = useState<string>(); //stato di errore
    const [loading, setLoading] = useState<boolean>(false); //stato di attesa
    const [message, setMessage] = useState<string>("");

    // Effettua la richiesta per stampare un messaggio di prova non fiscale
    async function printMessage() {
        if (!props.ip) {
            setError("Indirizzo IP non valido");
            return;
        }
        const xml =
            `<printerNonFiscal>
        <beginNonFiscal operator="" />
        <printNormal data="${message}" />
        <endNonFiscal operator="" />
        </printerNonFiscal>
        `
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
        <h3>Test di stampa non fiscale:</h3>
        <input value={message} onChange={(e) => setMessage(e.target.value)} ></input>
        <button onClick={printMessage}>Stampa messaggio</button>
        {loading && <p>In attesa di risposta...</p>}
        {error && <p>Errore: {error}</p>}
    </div>
}