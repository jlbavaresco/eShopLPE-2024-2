"use client";

import { useSession } from "next-auth/react";

export const User = () => {

    const { data : session } = useSession();

    return (
        <>
            <h1>Usuário autenticado</h1>
            <h2>{JSON.stringify(session)}</h2>
        </>
    )

}

export default User;