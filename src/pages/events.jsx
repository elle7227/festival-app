import styles from "@/styles/Home.module.css";
import React, { useState } from 'react';
import Navigation from "@/components/Navigation";
import Footer from "@/components/footer";

export default function Events() {
  const [showLongText, setShowLongText] = useState(false);
  const [buttonText, setButtonText] = useState('Read More');

  const handleReadMore = () => {
    //kører setShowLongTekst når showLongTekst ikke er false
    setShowLongText(!showLongText);
    //sætter button teksten til modstte af hvad den er
    setButtonText(showLongText ? 'Read More' : 'Read Less');
  };

  return (
    <section className="body_event">
      <Navigation />
      <h1 className={styles.eventOverskrift}>EVENTS THIS WEEK</h1>
      <article className={styles.eventCard}>
        <img src="/neonParty.jpg" alt="billede1" />
        <h3>NEON PARTY AT VANAHEIM</h3>
        <p className={styles.dato}>10th of august</p>
        <p className={styles.kort_tekst}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
          temporibus laboriosam
        </p>
        <button onClick={handleReadMore}>{buttonText}</button>
        {showLongText && (
          <>
            <p className={styles.lang_tekst}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
              temporibus laboriosam Lorem ipsum dolor sit amet, consectetur
            </p>
        
          </>
        )}
      </article>
      <article className={styles.eventCard}>
        <img src="/seafood.jpg" alt="billede1" />
        <h3>FISKEBAREN POP UP</h3>
        <p className={styles.dato}>11th - 13th of august</p>
        <p className={styles.kort_tekst}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
          temporibus laboriosam
        </p>
        <button onClick={handleReadMore}>{buttonText}</button>
        {showLongText && (
          <>
            <p className={styles.lang_tekst}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
              temporibus laboriosam Lorem ipsum dolor sit amet, consectetur
            </p>
        
          </>
        )}
      </article>
      <article className={styles.eventCard}>
        <img src="/socialDining.jpg" alt="billede1" />
        <h3>SOCIAL DINING</h3>
        <p className={styles.dato}>Every wednesday</p>
        <p className={styles.kort_tekst}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
          temporibus laboriosam
        </p>
        <button onClick={handleReadMore}>{buttonText}</button>
        {showLongText && (
          <>
            <p className={styles.lang_tekst}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore
              temporibus laboriosam Lorem ipsum dolor sit amet, consectetur
            </p>
        
          </>
        )}
      </article>
      <Footer />
    </section>
  );
}


       
