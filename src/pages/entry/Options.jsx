import axios from "axios";
import {useEffect, useState} from "react";
import ScoopOption from "./ScoopOption";
import {Row} from "react-bootstrap";

const Options = ({optionType}) => {
    const [items, setItems] = useState([]);

    // optionType is 'scoops' or 'toppings'
    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then(response => {
                setItems(response.data);
            })
            .catch(e => {
                // TODO: handle error response
            })
    }, [optionType]);

    // TODO: replace 'null' with ToppingOption when available
    const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

    return <div>
        <Row>
            {items.map(item => <ItemComponent key={item.name}
                                              name={item.name}
                                              imagePath={item.imagePath}/>)}
        </Row>
    </div>
}

export default Options;