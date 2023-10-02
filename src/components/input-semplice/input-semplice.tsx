import { useState } from "react"

type InputSempliceProps = {
    onPrint: (value: number) => void
}

export default function InputSemplice(props: InputSempliceProps) {
    const [inputValue, setInputValue] = useState<number>(0)

    return <div>
        <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.valueAsNumber)}></input>
        <button onClick={() => props.onPrint(inputValue)}>STAMPA</button>
    </div>
}