import axios from "axios";
import {useEffect, useState} from "react";
import ScoopOption from "./ScoopOption";
import {Row} from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../../components/AlertBanner";

const Options = ({optionType}) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

    // optionType is 'scoops' or 'toppings'
    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
            .then(response => {
                setItems(response.data);
            })
            .catch(e => {
                setError(true)
            })
    }, [optionType]);

    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

    if (error) return <AlertBanner />

    return <div>
        <Row>
            {items.map(item => <ItemComponent key={item.name}
                                              name={item.name}
                                              imagePath={item.imagePath}/>)}
        </Row>
    </div>
}

export default Options;