import * as React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import { addStock } from '../lib/actions';

declare module "react" {
  interface HTMLProps<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

const StockInput = ({ addStock }) => {
  let input: HTMLInputElement | null = null;

  const handleSubmit = (e: React.FormEvent<Form>): void => {
    e.preventDefault();
    addStock(input);
  }

  return (
    <Form onSubmit={handleSubmit} inline>
      <FormGroup>
        <FormControl
          inputRef={node => input = node}
          placeholder="Stock Symbol"
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Button className="form-space" type="submit">Add</Button>
      </FormGroup>
      <style>{`
        .form-space {
          margin: 0 5px;
        }
      `}</style>
    </Form>
  );
}

const mapDispatchToProps = dispatch => ({
  addStock: (input) => {
    const stock = input.value.trim();
    if (stock.length > 0) dispatch(addStock(stock));
    input.value = ''
  }
});

export default connect(null, mapDispatchToProps)(StockInput);
