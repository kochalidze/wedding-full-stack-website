import React from 'react';
import HomeHeader from './HomeHeader';
import HomeHeroSection from './HomeHeroSection';
import Packages from './Packages';
import HomeServices from './HomeServices';
import UsersComment from './UsersComment';

//* Hooks
// import useInfiniteScroll from '../../hooks/useInfiniteScroll';

import '../pagesStyle/Home.css';

function Home() {
  // const infiniteScrollRef = useInfiniteScroll(2);
  return (
	<div className='home'>
    <HomeHeader />
    <div style={{ width: "100%", display: "flex", justifyContent: "center", overflow: "hidden", whiteSpace: "nowrap", margin: "40px 0" }}>
      <div className="infinite-scroll" style={{ display: "inline-flex", gap: "40px" }}>
        <p>Wedding • Love • Forever • </p>
        <p>Wedding • Love • Forever • </p>
        <p>Wedding • Love • Forever • </p>
        <p>Wedding • Love • Forever • </p>        <p>Wedding • Love • Forever • </p>
        <p>Wedding • Love • Forever • </p>        <p>Wedding • Love • Forever • </p>
        <p>Wedding • Love • Forever • </p>        <p>Wedding • Love • Forever • </p>
        <p>Wedding • Love • Forever • </p>
      </div>
    </div>
    <HomeHeroSection />
    <Packages />
    <HomeServices />
    <UsersComment />
  </div>
  )
}

export default Home;