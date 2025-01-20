'use client';

import React, {
    createContext,
    useContext,
    useRef,
    useState,
    useEffect,
} from 'react';

// create a context to store the Mollie object for components

export const MollieContext = createContext();

// Provider component to wrap the app with
// this is needed so that the Mollie object is available to all components

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

// Custom hook to use the Mollie object
export const useMollie = () => {
    return useContext(MollieContext);
};
