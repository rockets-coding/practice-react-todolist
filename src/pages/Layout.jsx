import React from 'react';
import { Outlet } from 'react-router-dom';
// import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      {/* <nav>
        <ul className="text-blue-700">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/signup">SIGN-UP</Link>
          </li>
          <li>
            <Link to="/login">LOG-IN</Link>
          </li>
          <li>
            <Link to="/todos">TODOS</Link>
          </li>
          <li>
            <Link to="dev">Dev</Link>
          </li>
          <li>
            <Link to="idontknowwheretogo">404</Link>
          </li>
        </ul>
      </nav>

      <hr className="h-2 bg-slate-300" /> */}

      <div className="bg-[#FFD370]">
        <div className="container mx-auto min-h-screen">
          <section className="px-4 py-8">
            <Outlet />
          </section>
        </div>
      </div>
    </>
  );
}

export default Layout;
