import { tokenService } from "@/service/tokenService"
import { useRouter } from "next/router";
import React from "react";

export default function LogoutPage() {

    const router = useRouter();
    
    React.useEffect(() => {
        tokenService.delete();
        router.push('/');
        
    }, [])

    return (
        <div>
            Você será redirecionado em instantes...
        </div>
    )

}