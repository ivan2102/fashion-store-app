import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/configureStore";

interface Props extends RouteProps {

    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
    roles?: string[]
}



export default function PrivateRoute({component: Component, roles, ...rest}: Props) {

    const {user} = useAppSelector(state => state.auth)

    return(

       <Route {...rest} render={props => {

        if(!user) {

           return <Redirect 

            to={{pathname: "/login", state: {from: props.location}}}
            
            />
        }

        if(roles && !roles?.some(role => user.roles?.includes(role))) {

            toast.error('You need to login as admin to see this area')

            return <Redirect 

            to={{pathname: "/catalog"}}
            
            />
        }

        return <Component {...props} />
       }

   
       }
       />
    )
}