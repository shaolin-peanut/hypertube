import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-background-start to-background-end">
      <Header />
      <main className="container mx-auto mt-10 p-5">
        <section className="text-center mb-20">
          <h2 className="text-5xl font-bold text-text-light mb-4">Find Your Perfect Blend</h2>
          <p className="text-xl text-text-light mb-8">Matcha brings together like-minded individuals, creating connections that last.</p>
          <Button size="lg" className="text-lg px-8 py-4 bg-primary text-text-light">
            <Link to="/login">Get Started</Link>
          </Button>
        </section>
        <section className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card-background">
            <CardHeader>
              <CardTitle className="text-card-text">Personalized Matches</CardTitle>
            </CardHeader>
            <CardContent className="text-card-text">
              Our advanced algorithm ensures you meet people who truly complement your personality and interests.
            </CardContent>
          </Card>
          <Card className="bg-card-background">
            <CardHeader>
              <CardTitle className="text-card-text">Safe & Secure</CardTitle>
            </CardHeader>
            <CardContent className="text-card-text">
              Your privacy and safety are our top priorities. Enjoy peace of mind while you connect.
            </CardContent>
          </Card>
          <Card className="bg-card-background">
            <CardHeader>
              <CardTitle className="text-card-text">Success Stories</CardTitle>
            </CardHeader>
            <CardContent className="text-card-text">
              Join thousands of happy couples who found their special someone on Matcha.
            </CardContent>
          </Card>
        </section>
      </main>
      <footer className="mt-20 bg-white bg-opacity-10 backdrop-blur-md py-10">
        <div className="container mx-auto text-center text-text-light">
          <p>&copy; 2024 Matcha Dating. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;