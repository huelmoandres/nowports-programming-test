import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./components/login/Login";
import Register from './components/register/Register';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRouter from './app/AppRouter';

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            // These defaults are overriden to avoid data inconsistencies in the application, because not every API request is done using RQ.
            queries: {
                staleTime: Infinity,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                cacheTime: Infinity,
            },
        },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <AppRouter />
        </div>
      </QueryClientProvider>
  );
}

export default App;
