import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <header className="p-5 bg-white bg-opacity-10 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">Matcha</h1>
          <nav>
            <Button variant="outline" className="mr-2">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button>
              <Link to="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Contenu random*/}

      <main className="container mx-auto mt-10 p-5">
        <section className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-4">Find Your Perfect Blend</h2>
          <p className="text-xl text-white mb-8">Matcha brings together like-minded individuals, creating connections that last.</p>
          <Button size="lg" className="text-lg px-8 py-4"><Link to="/login">Get Started</Link></Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Matches</CardTitle>
            </CardHeader>
            <CardContent>
              Our advanced algorithm ensures you meet people who truly complement your personality and interests.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Safe & Secure</CardTitle>
            </CardHeader>
            <CardContent>
              Your privacy and safety are our top priorities. Enjoy peace of mind while you connect.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Success Stories</CardTitle>
            </CardHeader>
            <CardContent>
              Join thousands of happy couples who found their special someone on Matcha.
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="mt-20 bg-white bg-opacity-10 backdrop-blur-md py-10">
        <div className="container mx-auto text-center text-white">
          <p>&copy; 2024 Matcha Dating. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;