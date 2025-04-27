import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from "next/navigation";
import { getServerCookie } from "@/libs/cookies";
import { useUserContext } from '@/contexts/user-context';

type ComponentType<Props = {}> = React.ComponentType<Props>;

const RequireLogout = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
    const LogoutComponent: React.FC<P> = (props) => {
        const router = useRouter();
        const { user } = useUserContext()
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

        const checkAuthentication = useCallback(async () => {
            const accessToken = await getServerCookie('accessToken');
            if (!accessToken) {
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(true);
                if (user) {

                    if (user.exists) {
                        router.replace("/brrbrrpatapim");

                    } else {
                        router.replace("/onboarding");
                    }
                }
            }
        }, [router, user]);

        useEffect(() => {
            checkAuthentication();
        }, [user]);

        if (isAuthenticated) {
            return null;
        }

        return <Component {...props} />;
    };

    return LogoutComponent;
};

export default RequireLogout;
