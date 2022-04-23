import React from "react";
import Layout from "../components/Layout";

const PageNotFound = () => {
  return (
    <Layout pageName="Page Not Found">
      <div className="flex flex-col w-[100%] h-[100%] justify-center items-center">
        <img src="404.png" alt="" height={'500px'} width='500px' />
        <h1 className="mt-3 font-bold">404 Page Not Found</h1>
      </div>
    </Layout>
  );
};

export default PageNotFound;