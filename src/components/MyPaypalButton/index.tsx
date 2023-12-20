import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import React, {useEffect, useState} from 'react';
import { useSelector } from "react-redux";
// import { createCheckOutServiceReservationRequesting } from "../../redux/checkOutService/actions";

interface IMyPayPalButtonProps{
    money_to_contribute: string,
    values:{
        user: string,
        userName: string,
        email: string,			
        bookingType: string,	
        activity?: string,				
        lodging?: string,				
        room?: string,			
        language: string,				
        experience: number,				
        phone:string,		
        entryDate: string,			
        departureDate: string,	 //los servicios demoran 1 solo dia	
        numberPeople: number,				
        companion: any
    }
}


function MyPayPalButton({values, money_to_contribute}:IMyPayPalButtonProps) {
    const router = useRouter();

    const { token } = useSelector((state:any) => state.clientReducer);
   
    const [CLIENT_ID, SETCLIENT_ID] = useState<string>(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);

    useEffect(() =>{
        SETCLIENT_ID(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
    },[process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID])

    
    useEffect(() => {
        SETCLIENT_ID(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
    }, [money_to_contribute])
    
  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
    <PayPalButtons
         style={{layout:"horizontal"}}
         forceReRender={[money_to_contribute]}
         createOrder={(data, actions) => {
             return actions.order.create({
                 purchase_units: [
                 {
                     amount: {
                        value: money_to_contribute,
                     },
                 },
                 ],
             });
         }}
            onApprove={(data, actions) => {
                // Captura la respuesta de la transacción
                return actions.order.capture().then(function(details) {
                  // Utiliza los datos de la transacción
                    // console.log(details);
                    // console.log(values);
                  // Envía una petición POST al servidor con los detalles de la transacción
                //   handlePayReservation(values, token)
                fetch(`https://api.diveandbed.com/booking`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(values)
            
                })
                .then(response => {
                    // console.log(response.status)
                    if (response.status === 500)
                        throw "Error interno del servidor";
            
                    return response.json()
                }).then(json => {
                        if(json.hasOwnProperty('error')){
                            throw json;
                        }
            
                        if (json.statusCode === 500){
                            throw json;
                        }
                        if (json.statusCode === 400){
                            throw json;
                        }
                        if (json.statusCode === 401){
                            throw json;
                        }
            
                        if (json.statusCode === 200){
                            router.push("/checkout/success")
                        }
                        if (json.statusCode === 201){
                            router.push("/checkout/success")
                        }
            
                    }).catch((error) => {
                        throw error;
                    });
                });
            }}
    />
    </PayPalScriptProvider>

  );
}

export default MyPayPalButton;
