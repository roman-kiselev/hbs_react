import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const withQuery = (component: () => React.ReactNode) => {
    return (
        <QueryClientProvider client={queryClient}>
            {component()}
        </QueryClientProvider>
    );
};
