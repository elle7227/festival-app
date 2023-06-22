
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Modal.module.css';


export default function Modal({ selectedBand, handleCloseModal, showModal }) {
  //kræver valgt et band + shoewmodal true 
  if (!selectedBand || !showModal) {
    return null;
  }
//extracter variablerner fra selectedBand som individuelle variabler
  const { act, start, end, bandInfo, stage, day } = selectedBand;

  // tjekker om bandinfo.logo indeholder http, hvis ikke konstruerer vi en lokal url via glitch.
  const logoSrc = bandInfo.logo.includes('http')
    ? bandInfo.logo
    : `https://nova-enchanted-confidence.glitch.me/logos/${bandInfo.logo}`;


  const [isFavorited, setIsFavorited] = useState(false);

//fetcher data når modal renders - findes artist i databasen?
  useEffect(() => {
    async function fetchFavorites () {
      //url referer til objektet med valgte act.
        const response = await fetch(
          `https://ggufspwjbdpzmyqymijq.supabase.co/rest/v1/wines?name=eq.${act}`,
          {
            headers: {
              'Content-Type': 'application/json',
              apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndWZzcHdqYmRwem15cXltaWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzNjcsImV4cCI6MTk5NTQ5NTM2N30.OszSJm-lZ8YMuK32u4ZmLBGGhl5BzkB8ieK_XUEVY04',
            },
          }
        );
        const data = await response.json();

  // array længere end 0 = act findes --> setisfavorited true
        setIsFavorited(data.length > 0);
    };
    fetchFavorites();
  }, [act]);



  function makeFavorit() {
    setIsFavorited(true);
    //nyt objekt 
    const newFavorite = {
      name: act,
      day: day,
    };

    fetch('https://ggufspwjbdpzmyqymijq.supabase.co/rest/v1/wines', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndWZzcHdqYmRwem15cXltaWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzNjcsImV4cCI6MTk5NTQ5NTM2N30.OszSJm-lZ8YMuK32u4ZmLBGGhl5BzkB8ieK_XUEVY04',
      },
      //object laves til JSON string - sættes body --> så det kan sendes 
      body: JSON.stringify(newFavorite),
    })
      .then((response) => response.json())
  }
  

   function RemoveFavorite() {
    setIsFavorited(false);
    //sender delete request til endpoint 
    fetch(
      `https://ggufspwjbdpzmyqymijq.supabase.co/rest/v1/wines?name=eq.${act}`,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
          apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndWZzcHdqYmRwem15cXltaWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzNjcsImV4cCI6MTk5NTQ5NTM2N30.OszSJm-lZ8YMuK32u4ZmLBGGhl5BzkB8ieK_XUEVY04',
        },
      }
    )
      .then((response) => response.json())   
  }


  function handleBackToProgram() {
    handleCloseModal(false);
  }

  return (
    <div className={styles.modal_artister_body}>
      <section className={styles.ModalSection}>
        <button className={styles.ModalButton} onClick={handleBackToProgram}>
          Back to program
        </button>

        <img className={styles.ModalImg} src={logoSrc} alt="Logo" />
        <h1 className={styles.ModalArtistName}>{act}</h1>
      </section>
      <section className={styles.ModalInfo}>
        <article className={styles.ModalConcertInfo}>
          <p>
            <span>PLAYING AT: </span>
            {stage}
          </p>
          <p className={styles.modal_artister_dato}>
            <span></span>
            {day}
          </p>
          <p>
            <span> </span>
            {start} - {end}
          </p>
          <button className={styles.favoritButton} onClick={isFavorited ? RemoveFavorite : makeFavorit}>
            <svg
              className={styles.hjerte}
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill={isFavorited ? 'black' : 'none'}
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
          </button>
        </article>

        <article className={styles.ModalBio}>
          <p>
            <span>ABOUT </span>
            <br /> {bandInfo.bio}
          </p>
        </article>
      </section>
    </div>
  );
}
