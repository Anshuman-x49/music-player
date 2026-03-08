import React from 'react';
import TopHeader from '../components/TopHeader';
import Hero from '../components/Hero';
import TrackList from '../components/TrackList';

const Home = () => {
  return (
    <main className="main-content">
      <TopHeader />
      <Hero />
      <TrackList />
    </main>
  );
};

export default Home;
