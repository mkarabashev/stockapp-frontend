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
    <Form className="bottom-space" onSubmit={handleSubmit}>
      <FormControl
        inputRef={node => input = node}
        placeholder="Stock Symbol"
        type="text"
        className="input"
      />
      <Button className="horizontal-space btn-primary" type="submit">Add</Button>
      <style jsx>{`
        :global(.horizontal-space) {
          margin: -3px 0 0 -5px;
        }
        :global(.bottom-space) {
          margin-bottom: 50px;
          float: right;
        }
        :global(.input) {
          display: inline;
          width: 250px;
        }
        @media (max-width: 400px) {
          :global(.bottom-space) {
            margin: 0 0 25px 60px;
            float: left;
          }
          :global(.input) {
            width: 150px;
          }
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
