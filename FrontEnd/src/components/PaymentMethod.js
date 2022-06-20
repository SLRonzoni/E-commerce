import React, { useContext, useState} from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Store } from "../Store";
import { Link } from "react-router-dom";

export default function PaymentMethod() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: {  paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "Debito"
  );

  
  const submit = (e) => {
    //e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
  };

  return (
    <div className='container small-container'>
      <title>Métodos de pago</title>
      <h1 className='my-5'>Métodos de pago</h1>
      <Form onSubmit={submit}>
        
        <div className='mb-4'>
          <Form.Check
            type='radio'
            id='Debito'
            label='Tarjeta de Debito'
            value='Debito'
            checked={paymentMethodName === "Debito"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <Form.Check
            type='radio'
            id='Credito'
            label='Tarjeta de Credito'
            value='Credito'
            checked={paymentMethodName === "Credito"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <Form.Check
            type='radio'
            id='Stripe'
            label='Stripe'
            value='Stripe'
            checked={paymentMethodName === "Stripe"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <Form.Check
            type='radio'
            id='mercadoPago'
            label='Mercado Pago'
            value='MercadoPago'
            checked={paymentMethodName === "MercadoPago"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <Form.Check
            type='radio'
            id='Paypal'
            label='Paypal'
            value='Paypal'
            checked={paymentMethodName === "Paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </div>
        <div className='d-grid gap-4 d-md-flex justify-content-md-center'>
          <Link
            to={"/shipping"}
            className='m-2 btn btn-warning'
            role='button'
            aria-pressed='true'
          >
            {" "}
            Atras{" "}
          </Link>
          <Link to={'/placeOrder'} className=''>
            <Button
              type='submit'
              variant='primary'
              onClick={() => submit()}
              className='m-2 btn btn-primary'
            >
              Continúe{" "}
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
