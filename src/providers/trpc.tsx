import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

const TRPCContext = createContext<any>(null);

export function TRPCProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <TRPCContext.Provider value={null}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </TRPCContext.Provider>
  );
}

export function useTRPC() {
  return useContext(TRPCContext);
}
