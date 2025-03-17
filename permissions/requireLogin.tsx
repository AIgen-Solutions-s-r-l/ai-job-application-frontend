import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from "next/navigation";
import { getServerCookie } from "@/libs/cookies";
import config from '@/config';
import { useUserContext } from '@/contexts/user-context';

type ComponentType<Props = {}> = React.ComponentType<Props>;

const RequireLogin = <P extends object>(Component: ComponentType<P>, Resume: boolean = true): React.FC<P> => {
    const LoginComponent: React.FC<P> = (props) => {
        const { user } = useUserContext();
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

        const checkAuthentication = useCallback(async () => {
            const accessToken = await getServerCookie('accessToken');
            if (!accessToken) {
                setIsAuthenticated(false);
                router.replace(config.auth.loginUrl);
            }
            else {
                setIsAuthenticated(true);
            }
            if (user) {
                if (user.exists && !Resume) {
                    router.replace("/dashboard");
                } else if (!user.exists && Resume) {
                    router.replace("/onboarding");
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
