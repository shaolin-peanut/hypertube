import React from 'react';
import Header from '../../components/Header';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // should have the same colors as other pages
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-background-start to-background-end">
      <Header />
      <div className="container mx-auto mt-10 p-5">
        <section className="text-center mb-20">
          <h2 className="text-5xl font-bold text-text-light mb-4">Your Profiles</h2>
          <p className="text-xl text-text-light mb-8">View your profiles and start a match.</p>
        </section>
      </div>
      <footer className="mt-20 bg-white bg-opacity-10 backdrop-blur-md py-10">
        <div className="container mx-auto text-center text-text-light">
          <p>&copy; 2024 Matcha Dating. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
  // return (
  //   <div>
  //     <Header />
  //     <div className="container mx-auto mt-10 p-5">
  //       <section className="text-center mb-20">
  //         <h2 className="text-5xl font-bold text-text-light mb-4">Your Profiles</h2>
  //         <p className="text-xl text-text-light mb-8">View your profiles and start a match.</p>
  //       </section>
  //     </div>
  //     <footer className="mt-20 bg-white bg-opacity-10 backdrop-blur-md py-10">
  //       <div className="container mx-auto text-center text-text-light">
  //         <p>&copy; 2024 Matcha Dating. All rights reserved.</p>
  //       </div>
  //     </footer>
  //   </div>
  // );
};

export default Dashboard;
