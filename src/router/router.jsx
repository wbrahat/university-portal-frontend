import { createBrowserRouter } from "react-router-dom";
import privateRouter from "./privateRouter";
import publicRouter from "./publicRouter";

// create browser router
const router = createBrowserRouter([...publicRouter, ...privateRouter], {
  future: {
    v7_relativeSplatPath: true,
    v7_startTransition: true,
  },
});

// export router
export default router;
