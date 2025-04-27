import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from "next/navigation";
import { getServerCookie } from "@/libs/cookies";
import config from '@/config';
import { useUserContext } from '@/contexts/user-context';
import { decodeToken } from '@/libs/api/auth';
import LogoutAndRedirect from '@/components/LogoutAndRedirect';

type ComponentType<Props = {}> = React.ComponentType<Props>;

const RequireLogin = <P extends object>(Component: ComponentType<P>, Resume: boolean = true): React.FC<P> => {
    const LoginComponent: React.FC<P> = (props) => {
        const { user } = useUserContext();
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

        const checkAuthentication = useCallback(async () => {
            const accessToken = await getServerCookie('accessToken');
            setIsAuthenticated(!!accessToken);

            if (!accessToken) {
                router.replace(config.auth.loginUrl);
                return <></>;
            }

            const decoded = await decodeToken(accessToken);

            if (!decoded.exp || decoded.exp < Math.floor(Date.now() / 1000)) {
                return <LogoutAndRedirect />;
            }

            if (user) {
                if (user.exists && !Resume) {
                    window.location.href = "/search";
                } else if (!user.exists && Resume) {
                    window.location.href = "/onboarding";
                }
            }
        }, [router, user]);

        useEffect(() => {
            checkAuthentication();
        }, [checkAuthentication]);

        if (!isAuthenticated) {
            return null;
        }
        return <Component {...props} />;

    };

    return LoginComponent;
};

export default RequireLogin;
