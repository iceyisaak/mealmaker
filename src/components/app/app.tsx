import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { Header } from "../header";

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Header />
      <Footer />
    </QueryClientProvider>
  );
};
