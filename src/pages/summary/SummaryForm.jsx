import {useState} from "react";
import {Form, Button} from "react-bootstrap";

const SummaryForm = () => {
    const [checked, setChecked] = useState(false);

    const checkboxLabel = (
        <span>
            I agree to <span style={{color: 'blue'}}>Terms and Conditions</span>
        </span>
    )

    return <Form>
        <Form.Group controlId="terms-and-conditions">
            <Form.Check type="checkbox"
                        checked={checked}
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