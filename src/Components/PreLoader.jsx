import React from 'react';
import styled from 'styled-components';
import "../Styles/PreLoader.css"
import Logo from "../assets/Logo2.png"

const PreLoader = () => {
  return (
    <div className="StyledWrapper min-h-screen w-full overflow-x-hidden flex flex-col justify-center items-center">
      <img src={Logo} className='w-75 h-auto object-cover' />
      <section className="dots-container object-cover flex items-center justify-between sm:w-50 md:w-70">
        <div className="dot"/>
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </section>
    </div>
  );
}

export default PreLoader;
