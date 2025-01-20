import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from "next/navigation";
import { getServerCookie } from "@/libs/cookies";

type ComponentType<Props = {}> = React.ComponentType<Props>;

const RequireLogout = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
    const LogoutComponent: React.FC<P> = (props) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

        const checkAuthentication = useCallback(async () => {
            const accessToken = await getServerCookie('accessToken');
            if (!accessToken) {
                setIsAuthenticated(false);
            } else {
                router.replace("/onboarding");
                setIsAuthenticated(true);
            }
        }, [router]);

        useEffect(() => {
            checkAuthentication();
        }, [checkAuthentication]);

        if (isAuthenticated) {
            return null;
        }

        return <Component {...props} />;
    };

    return LogoutComponent;
};

export default RequireLogout;
