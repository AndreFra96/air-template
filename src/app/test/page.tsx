"use client";

import { PrinterStatus } from "@/components/printer-status/PrinterStatus";
import { PrinterWriteNonFiscal } from "@/components/printer-write-non-fiscal/PrinterWriteNonFiscal";
import { useState } from "react";

export default function Test() {

    const [ip, setIp] = useState<string>();

    return <div>
        <div style={{ border: '1px solid black', padding: '1rem' }}>
            <h3>Configurazione:</h3>
            <label htmlFor="printerIP">IP stampante:</label>
            <input value={ip} onChange={(e) => setIp(e.target.value)} id="printerIP"></input>
        </div>
        <PrinterStatus ip={ip} />
        <PrinterWriteNonFiscal ip={ip} />
    </div>
}