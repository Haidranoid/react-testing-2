import axios from "axios";
import {useEffect, useState} from "react";
import ScoopOption from "./ScoopOption";
import {Row} from "react-bootstrap";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../../components/AlertBanner";
import {pricePerItem} from "../../constants";
import {useOrderDetails} from "../../contexts/OrderDetails";

const Options = ({optionType}) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);
    const [orderDetails, updateItemCount] = useOrderDetails();

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
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    if (error) return <AlertBanner/>

    return <>
        <h2>{title}</h2>
        <p>{pricePerItem[optionType]} each</p>
        <p>
            {title} total: {orderDetails.totals[optionType]}
        </p>
        <Row>
            {items.map(item => <ItemComponent key={item.name}
                                              name={item.name}
                                              imagePath={item.imagePath}
                                              updateItemCount={(itemName, newItemCount) => updateItemCount(itemName, newItemCount, optionType)}
            />)}
        </Row>
    </>
}

export default Options;