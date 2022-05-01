import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useState, useEffect } from "react"
import fetch from "../../app/api/fetch"
import Loading from "../../app/layout/Loading"
import { useAppDispatch } from "../../app/store/configureStore"
import { setCart } from "../cart/cartSlice"
import Checkoutpage from "./Checkoutpage"

const stripePromise = loadStripe('pk_test_51IqzsQF9lI234FWgoNTMrMbHNuqGZ0qcqiPPd9kVceJeuTkjqM1JRidGL29KzZXRNgT8TvBGZj4bpTUWwbKtlZm000V1zIyjeO')


function CheckoutWrapper() {

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetch.Payments.createPaymentIntent()
    .then(cart => dispatch(setCart(cart)))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))

  }, [dispatch])

  if(loading) return <Loading message='Loading checkout...'/>

  return (
    
    <Elements stripe={stripePromise}>
      
        <Checkoutpage />
       
    </Elements>

    

  )
    
  

  
}

export default CheckoutWrapper