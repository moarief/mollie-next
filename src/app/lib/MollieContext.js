'use client';

import React, {
    createContext,
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

export const MollieContext = createContext();

export const MollieProvider = ({ children }) => {
    const mollieRef = useRef(null);
    const [mollie, setMollie] = useState(null);

    useEffect(() => {
        // Load Mollie script and initialize
        const loadMollie = async () => {
            if (!mollieRef.current) {
                mollieRef.current = Mollie(
                    process.env.NEXT_PUBLIC_MOLLIE_PROFILE,
                    {
                        locale: 'en_US',
                        testmode: true,
                    }
                );
                setMollie(mollieRef.current);
            }
        };

        loadMollie();

        // Cleanup function to unload Mollie object
        return () => {
            if (mollieRef.current) {
                mollieRef.current = null;
                setMollie(null);
            }
        };
    }, []);

    return (
        <MollieContext.Provider value={{ mollie }}>
            {children}
        </MollieContext.Provider>
    );
};

export const useMollie = () => {
    return useContext(MollieContext);
};
