import {useState} from "react";

export function replaceCamelWithSpaces(colorName) {
    return colorName.replace(/\B([A-Z]\B)/g, ' $1');
}

const ColorButton = () => {
    const [color, setColor] = useState('red');
    const [disabled, setDisabled] = useState(false);
    const nextColor = color === 'red' ? 'blue' : 'red';

    const handleClick = () => {
        setColor(nextColor)
    }

    return <div>
        <button style={{backgroundColor: disabled ? 'gray' : color}}
                onClick={handleClick}
                disabled={disabled}>
            Change to {nextColor}
        </button>
        <label htmlFor="disable-button-checkbox">Disable button</label>
        <input id="disable-button-checkbox" type="checkbox" onClick={() => setDisabled(v => !v)}/>
    </div>
}

export default ColorButton;