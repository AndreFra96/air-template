"use client";

import { useState } from "react";
import styles from "./tastiera.module.css"

type TastieraProps = {
    onPrint: (value: number) => void
}

type ValoreTastiera = {
    intero: number,
    decimale: number,
    prependDecimal: number,
    hasDecimal?: boolean
}


export default function Tastiera(props: TastieraProps) {

    const [activeValue, setActiveValue] = useState<ValoreTastiera>({ intero: 0, decimale: 0, prependDecimal: 0, hasDecimal: false });

    function displayValue(): string {
        if (!activeValue.hasDecimal) {
            return activeValue.intero.toString()
        }
        let prepend = '';
        for (let i = 0; i < activeValue.prependDecimal; i++) {
            prepend += '0';
        }
        return activeValue.intero.toString() + "." + prepend + activeValue.decimale.toString()
    }


    function handleComma() {
        if (activeValue.hasDecimal) {
            return
        }
        setActiveValue({ ...activeValue, hasDecimal: true })
    }


    function handleCanc() {
        setActiveValue({ intero: 0, decimale: 0, prependDecimal: 0, hasDecimal: false })
    }

    function handleDigit(input: number) {
        if (!activeValue.hasDecimal) {
            setActiveValue({ ...activeValue, intero: activeValue.intero * 10 + input })
        } else {
            if (input === 0 && activeValue.decimale === 0) {
                setActiveValue({ ...activeValue, prependDecimal: activeValue.prependDecimal + 1 })
                return
            }
            setActiveValue({ ...activeValue, decimale: activeValue.decimale * 10 + input })
        }
    }


    function handlePrint() {
        props.onPrint(parseFloat(displayValue()));
    }


    return <div className={styles.container}>
        <div className={styles.display}>
            {displayValue()}
        </div>
        <div className={styles.row}>
            <button onClick={() => handleDigit(1)} className={styles.digit}>1</button>
            <button onClick={() => handleDigit(2)} className={styles.digit}>2</button>
            <button onClick={() => handleDigit(3)} className={styles.digit}>3</button>
        </div>
        <div className={styles.row}>
            <button onClick={() => handleDigit(4)} className={styles.digit}>4</button>
            <button onClick={() => handleDigit(5)} className={styles.digit}>5</button>
            <button onClick={() => handleDigit(6)} className={styles.digit}>6</button>
        </div>
        <div className={styles.row}>
            <button onClick={() => handleDigit(7)} className={styles.digit}>7</button>
            <button onClick={() => handleDigit(8)} className={styles.digit}>8</button>
            <button onClick={() => handleDigit(9)} className={styles.digit}>9</button>
        </div>
        <div className={styles.row}>
            <button onClick={() => handleDigit(0)} className={styles.digit + ' ' + styles.large}>0</button>
        </div>
        <div className={styles.row}>
            <button onClick={handleCanc} className={styles.digit + ' ' + styles.danger}>CANC</button>
            <button onClick={handleComma} className={styles.digit}>,</button>
            <button onClick={handlePrint} className={styles.digit + ' ' + styles.success}>PRINT</button>
        </div>
    </div>
}