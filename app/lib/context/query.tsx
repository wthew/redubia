'use client';

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";


const client = new QueryClient()

export function QueryProvider(props: React.PropsWithChildren) {
    return <QueryClientProvider client={client}>
        {props.children}
    </QueryClientProvider>
}