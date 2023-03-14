import React from 'react';
import { RouterProvider } from 'react-router-dom'
import Header from './components/Header'

import routes from './routes'

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
