"use client"

import {useSession} from "next-auth/react";
import {logout} from "@/actions/logout";
import {useCurrentUser} from "@/hooks/use-current-user";

const SettingsPage = () => {
    const user = useCurrentUser()
    const session = useSession()

    const onClick = () => {
        logout()
    }
    return (
        <div>
            <button type="submit" onClick={onClick} className="bg-white p-10 rounded-xl">Sign Out</button>
        </div>
    )
}

export default SettingsPage;