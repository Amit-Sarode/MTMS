import React, { createContext, useContext } from 'react';

// Define the structure for a single API route
export interface ApiRoute {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    path: string;
    description?: string; // Optional description for better understanding
}

// Define the shape of the context value
interface ApiRoutesContextType {
    routes: ApiRoute[];
    getRoute: (path: string, method?: ApiRoute['method']) => ApiRoute | undefined;
}

// Create the context with a default undefined value
const ApiRoutesContext = createContext<ApiRoutesContextType | undefined>(undefined);

// Define the API routes extracted from your Express files
const allApiRoutes: ApiRoute[] = [
    // BOM Routes
    { method: 'POST', path: '/bom', description: 'Create a new Bill of Materials' },
    { method: 'GET', path: '/bom', description: 'Get all Bills of Materials' },
    { method: 'GET', path: '/bom/:id', description: 'Get a single Bill of Materials by ID' },
    { method: 'PUT', path: '/bom/:id', description: 'Update a Bill of Materials by ID' },
    { method: 'PATCH', path: '/bom/:id', description: 'Update the status of a Bill of Materials' },
    { method: 'DELETE', path: '/bom/:id', description: 'Delete a Bill of Materials by ID' },
    { method: 'GET', path: '/bom/export/pdf', description: 'Export Bills of Materials to PDF' },
    { method: 'GET', path: '/bom/export/csv', description: 'Export Bills of Materials to CSV' },
    { method: 'PATCH', path: '/bom/approved/:id', description: 'Update product approval status for a BOM' },

    // Auth Routes
    { method: 'POST', path: '/login', description: 'User sign-in' },
    { method: 'POST', path: '/signup', description: 'User sign-up' },
    { method: 'POST', path: '/verify', description: 'Verify OTP' },
    { method: 'POST', path: '/forgotPassword', description: 'Initiate forgot password process' },
    { method: 'POST', path: '/resentOtp', description: 'Resend OTP' },
    { method: 'POST', path: '/resetPassword', description: 'Reset user password' },
    { method: 'PUT', path: '/updatePassword', description: 'Update authenticated user password' },
    { method: 'GET', path: '/user', description: 'Get authenticated user details' },
    { method: 'PUT', path: '/user', description: 'Update authenticated user profile' },
    { method: 'GET', path: '/approval', description: 'Update admin status (internal/admin)' },
    { method: 'POST', path: '/resentApproval', description: 'Re-request admin approval' },

    // Product Routes
    { method: 'POST', path: '/product', description: 'Create a new product' },
    { method: 'GET', path: '/product', description: 'Get all products' },
    { method: 'GET', path: '/product/:id', description: 'Get a single product by ID' },
    { method: 'PUT', path: '/product/:id', description: 'Update a product by ID' },
    { method: 'DELETE', path: '/product/:id', description: 'Delete a product by ID' },
    { method: 'POST', path: '/products/bulk', description: 'Create multiple products in bulk' },
    { method: 'GET', path: '/product/verify', description: 'Get products for verification' },
];

interface ApiRoutesProviderProps {
    children: React.ReactNode;
}

/**
 * Provides the API routes context to its children components.
 * @param {ApiRoutesProviderProps} props - The props for the component.
 * @returns {JSX.Element} The provider component.
 */
export const ApiRoutesProvider: React.FC<ApiRoutesProviderProps> = ({ children }) => {
    /**
     * Helper function to get a specific route by path and optional method.
     * This is useful for dynamically constructing URLs or validating route existence.
     * @param {string} path - The path of the route (e.g., '/bom/:id').
     * @param {ApiRoute['method']} [method] - The HTTP method (e.g., 'GET', 'POST').
     * @returns {ApiRoute | undefined} The matching API route object, or undefined if not found.
     */
    const getRoute = (path: string, method?: ApiRoute['method']): ApiRoute | undefined => {
        return allApiRoutes.find(route =>
            route.path === path && (method ? route.method === method : true)
        );
    };

    const contextValue: ApiRoutesContextType = {
        routes: allApiRoutes,
        getRoute,
    };

    return (
        <ApiRoutesContext.Provider value={contextValue}>
            {children}
        </ApiRoutesContext.Provider>
    );
};

/**
 * Custom hook to consume the ApiRoutesContext.
 * Throws an error if used outside of an ApiRoutesProvider.
 * @returns {ApiRoutesContextType} The API routes context value.
 */
export const useApiRoutes = (): ApiRoutesContextType => {
    const context = useContext(ApiRoutesContext);
    if (context === undefined) {
        throw new Error('useApiRoutes must be used within an ApiRoutesProvider');
    }
    return context;
};

// Example App component to demonstrate usage
const App: React.FC = () => {
    return (
        <ApiRoutesProvider>
            <div className="min-h-screen bg-gray-100 p-4 font-inter text-gray-800 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">API Routes Explorer</h1>
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-600">Available API Endpoints:</h2>
                    <RouteList />
                    <RouteFinder />
                </div>
            </div>
        </ApiRoutesProvider>
    );
};

const RouteList: React.FC = () => {
    const { routes } = useApiRoutes();

    return (
        <div className="mb-8">
            <h3 className="text-xl font-medium mb-3 text-gray-700">All Defined Routes:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routes.map((route, index) => (
                    <li key={index} className="bg-blue-50 p-3 rounded-md shadow-sm border border-blue-200">
                        <span className={`font-bold mr-2 ${route.method === 'GET' ? 'text-green-600' :
                                route.method === 'POST' ? 'text-blue-600' :
                                    route.method === 'PUT' ? 'text-yellow-600' :
                                        route.method === 'PATCH' ? 'text-purple-600' :
                                            route.method === 'DELETE' ? 'text-red-600' : ''
                            }`}>{route.method}</span>
                        <span className="font-mono text-gray-800">{route.path}</span>
                        {route.description && (
                            <p className="text-sm text-gray-500 mt-1">{route.description}</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const RouteFinder: React.FC = () => {
    const { getRoute } = useApiRoutes();
    const [pathInput, setPathInput] = React.useState('');
    const [methodInput, setMethodInput] = React.useState<ApiRoute['method'] | ''>('');
    const [foundRoute, setFoundRoute] = React.useState<ApiRoute | undefined>(undefined);

    const handleSearch = () => {
        if (pathInput) {
            const result = getRoute(pathInput, methodInput as ApiRoute['method']);
            setFoundRoute(result);
        } else {
            setFoundRoute(undefined);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-medium mb-3 text-gray-700">Find a Specific Route:</h3>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Enter path (e.g., /bom/:id)"
                    value={pathInput}
                    onChange={(e) => setPathInput(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                    value={methodInput}
                    onChange={(e) => setMethodInput(e.target.value as ApiRoute['method'])}
                    className="p-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Any Method</option>
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                    Search Route
                </button>
            </div>
            {foundRoute ? (
                <div className="bg-green-50 p-3 rounded-md shadow-sm border border-green-200">
                    <p className="font-semibold text-green-700">Route Found:</p>
                    <span className={`font-bold mr-2 ${foundRoute.method === 'GET' ? 'text-green-600' :
                            foundRoute.method === 'POST' ? 'text-blue-600' :
                                foundRoute.method === 'PUT' ? 'text-yellow-600' :
                                    foundRoute.method === 'PATCH' ? 'text-purple-600' :
                                        foundRoute.method === 'DELETE' ? 'text-red-600' : ''
                        }`}>{foundRoute.method}</span>
                    <span className="font-mono text-gray-800">{foundRoute.path}</span>
                    {foundRoute.description && (
                        <p className="text-sm text-gray-500 mt-1">{foundRoute.description}</p>
                    )}
                </div>
            ) : (
                pathInput && (
                    <div className="bg-red-50 p-3 rounded-md shadow-sm border border-red-200 text-red-700">
                        Route not found.
                    </div>
                )
            )}
        </div>
    );
};

export default App;
