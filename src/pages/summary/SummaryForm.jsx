import {useState} from "react";
import {Form, Button, Popover, OverlayTrigger} from "react-bootstrap";

const SummaryForm = () => {
    const [checked, setChecked] = useState(false);

    const popover = (
        <Popover id="popover-positioned-left">
            <span style={{color:'black'}}>no ice cream will actually be delivered</span>
        </Popover>
    );

    const checkboxLabel = (
        <span>
            I agree to
            <OverlayTrigger placement="right" overlay={popover}>
                 <span style={{color: 'blue'}}>Terms and Conditions</span>
            </OverlayTrigger>
        </span>
    )

    return <Form>
        <Form.Group controlId="terms-and-conditions">
            <Form.Check checked={checked}
                        onChange={() => setChecked(v => !v)}
                        label={checkboxLabel}>
            </Form.Check>
            <Button variant="primary" type="submit" disabled={!checked}>
                Confirm order
            </Button>
        </Form.Group>
    </Form>
};

export default SummaryForm;