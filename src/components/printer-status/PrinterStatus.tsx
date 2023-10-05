import { Printer } from "@/lib/Printer";
import { DecodedFpStatus, decodeFpStatus } from "@/utils/decodeFpStatus";
import { useState } from "react";

type PrinterStatusProps = {
    ip?: string
}

//Componente di test che permette di richiedere e visualizzare lo stato della stampante dato il suo indirizzo IP
export function PrinterStatus(props: PrinterStatusProps) {

    const [fpStatus, setFpStatus] = useState<DecodedFpStatus>(); //stato della stampante
    const [error, setError] = useState<string>(); //stato di errore
    const [loading, setLoading] = useState<boolean>(false); //stato di attesa

    //Effettua la richiesta per ottenere lo stato alla stampante
    async function getStatus() {
        if (!props.ip) {
            setError("Indirizzo IP non valido");
            return;
        }
        //Modifico il valore di loading per mostrare il messaggio di attesa
        setLoading(true);
        //Effettuo la richiesta
        const response = await Printer.send(`http://${props.ip}/cgi-bin/fpmate.cgi`, `<printerCommand><queryPrinterStatus /></printerCommand>`, 5000)
        if (response.success) {
            //Se la richiesta è andata a buon fine, decodifico lo stato della stampante
            const decoded = decodeFpStatus(response.additionalInfo?.fpStatus);
            //Aggiorno lo stato della stampante
            setFpStatus(decoded);
            setError("");
        } else {
            //Se la richiesta non è andata a buon fine, mostro l'errore
            setError(response.code);
            setFpStatus(undefined);
        }
        //Modifico il valore di loading per nascondere il messaggio di attesa
        setLoading(false);
    }

    return <div style={{ border: '1px solid black', padding: '1rem' }}>
        <h3>Richiesta stato stampante:</h3>
        <button onClick={getStatus}>Ottieni stato</button>
        {loading && <p>In attesa di risposta...</p>}
        {error && <p>Errore: {error}</p>}
        <ul>
            {
                fpStatus && Object.entries(fpStatus)
                    .map(
                        ([key, value]) =>
                            <li key={key}>
                                <b>{key}</b>: {value}
                            </li>
                    )
            }
        </ul>
    </div>



}