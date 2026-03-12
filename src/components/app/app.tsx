import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import { Header } from "../header";
import { Content } from "../content";

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Header />
      <Content />
      <Footer />
    </QueryClientProvider>
  );
};
