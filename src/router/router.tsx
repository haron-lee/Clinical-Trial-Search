import App from 'App';
import Home from 'pages/Home';
import { createBrowserRouter } from 'react-router-dom';
import { InputKeywordProvider } from 'context/useInputKeywordContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <InputKeywordProvider>
            <Home />
          </InputKeywordProvider>
        ),
      },
    ],
  },
]);

export default router;
