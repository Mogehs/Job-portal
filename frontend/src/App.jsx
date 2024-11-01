import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import JobDescription from "./pages/JobDescription";
import Companies from "./components/admin/Companies";
import CompaniesCreate from "./components/admin/CompaniesCreate";
import CompanyDetails from "./components/admin/CompanyDetails";
import AdminJobs from "./components/admin/AdminJobs";
import JobsCreate from "./components/admin/JobsCreate";
import AdminJobsDescription from "./components/admin/AdminJobDescription";
import JobApplicants from "./components/admin/JobApplicants";
import RouteProtected from "./components/admin/RouteProtected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/jobs/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "/admin/companies",
    element: (
      <RouteProtected>
        <Companies />
      </RouteProtected>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <RouteProtected>
        <CompaniesCreate />
      </RouteProtected>
    ),
  },
  {
    path: "/admin/company/:id",
    element: (
      <RouteProtected>
        <CompanyDetails />
      </RouteProtected>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <RouteProtected>
        <AdminJobs />
      </RouteProtected>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <RouteProtected>
        <JobsCreate />
      </RouteProtected>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <RouteProtected>
        <JobApplicants />
      </RouteProtected>
    ),
  },
  {
    path: "/admin/jobs/:id",
    element: (
      <RouteProtected>
        <AdminJobsDescription />
      </RouteProtected>
    ),
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
