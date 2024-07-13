
// react-router-dom
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// importing all the required components and pages
// navbar 
import Navbar from "./Component/Navbar";
// details page for showing habit stats
import HomePage from "./Pages/HomePage";
// error page in case of error
import { Error } from "./Pages/Error";


// to render the habit tracker app
function App() {

  // defining different routes 
  const router = createBrowserRouter([
    {
      // default path 
      path:"/",
      element: <Navbar />,
      errorElement: <Error />,
      children:[
        // to render the homepage
        {index:true, element: <HomePage />},
        
      ]
    }
  ]);


  return (
    // rendering the page based on routes
    <RouterProvider router={router} />
  );
}

// export the component
export default App;
