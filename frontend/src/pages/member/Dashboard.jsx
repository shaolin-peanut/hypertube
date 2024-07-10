// libs
import React from 'react';
// homemade components
import MatchaLayout from '../../components/MatchaLayout';

const Dashboard = () => {
  return (
    <MatchaLayout>
      <div className="container mx-auto mt-10 p-5">
        <section className="text-center mb-20">
          <h2 className="text-5xl font-bold text-text-light mb-4">Your Profiles</h2>
          <p className="text-xl text-text-light mb-8">View your profiles and start a match.</p>
        </section>
      </div>
    </MatchaLayout>
  );
};

export default Dashboard;
