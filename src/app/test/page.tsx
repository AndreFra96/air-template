"use client";

import InputSemplice from "@/components/input-semplice/input-semplice";
import Tastiera from "@/components/tastiera/tastiera";
import { useState } from "react";

export default function Test() {

    const [useKeyboard, setUseKeyboard] = useState(true)

    function onPrint(value: number) {
        alert("Stampo: " + value)
    }

    return <div>
        <input id="useKeyboard" type="checkbox" checked={useKeyboard} onChange={() => setUseKeyboard(!useKeyboard)} />
        <label htmlFor="useKeyboard">USA TASTIERA </label>
        {useKeyboard ? <Tastiera onPrint={onPrint} /> : <InputSemplice onPrint={onPrint} />}
    </div>
}