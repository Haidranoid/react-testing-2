import {Col, Form, Row} from "react-bootstrap";

const ToppingOption = ({name, imagePath, updateItemCount}) => {
    const handleOnChange = e => {
        updateItemCount(name, e.target.checked ? 1: 0);
    }

    return <Col xs={12} sm={6} md={4} lg={3} style={{textAlign: 'center'}}>
        <img style={{width: '75%'}}
             src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`}/>
        <Form.Group
            controlId={`${name}-count`}
            as={Row}
            style={{marginTop: '10px'}}>
            <Form.Label column xs="6" style={{textAlign: 'right'}}>
                {name}
            </Form.Label>
            <Col xs="5" style={{textAlign: 'left'}}>
                <Form.Control
                    type="checkbox"
                    defaultValue={0}
                    onChange={handleOnChange}/>
            </Col>
        </Form.Group>
    </Col>
}

export default ToppingOption;