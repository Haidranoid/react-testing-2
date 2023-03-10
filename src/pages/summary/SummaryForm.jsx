import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export default function SummaryForm({setOrderPhase}) {
    const [tcChecked, setTcChecked] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        // pass along to the next phase.
        // The next page will handle submitting order from context.
        setOrderPhase('completed');
    }

    const popover = (
        <Popover id="popover-positioned-left">
            <span style={{color: 'black'}}>no ice cream will actually be delivered</span>
        </Popover>
    );

    const checkboxLabel = (
        <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{color: 'blue'}}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    checked={tcChecked}
                    onChange={(e) => setTcChecked(e.target.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!tcChecked}>
                Confirm order
            </Button>
        </Form>
    );
}