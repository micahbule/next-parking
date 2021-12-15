import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from 'react-query'

// import { Provider } from "react-redux";
// import store from "../src/redux/store/store";

const client = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    // <Provider store={store}>
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
    // </Provider>
  );
}

export default MyApp;
