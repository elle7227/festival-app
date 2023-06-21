import { useEffect, useState } from 'react';
import styles from "@/styles/Home.module.css";


export function ArtistFavoritter (){
    //state variablen artist sættes som et tomt array
  const [artists, setArtist] = useState([]);


//fetche data fra api når component er renderet
  useEffect(() => {
    async function fetchArtister() {
        const response = await fetch("https://ggufspwjbdpzmyqymijq.supabase.co/rest/v1/wines", {
          method: "get",
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndWZzcHdqYmRwem15cXltaWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzNjcsImV4cCI6MTk5NTQ5NTM2N30.OszSJm-lZ8YMuK32u4ZmLBGGhl5BzkB8ieK_XUEVY04",
          },
        });
        //henter data fra api endpoint med response.json metoden
        const data = await response.json();
        setArtist(data);
    }
    //kører useEffect fetch functionen
    fetchArtister();
  }, []);
 


  
  function deleteArtist(id) {
    //delete request til sepcifikt id i API 
    fetch(
      `https://ggufspwjbdpzmyqymijq.supabase.co/rest/v1/wines?id=eq.${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          //return en response = opdateret liste
          Prefer: "return=representation",
          apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndWZzcHdqYmRwem15cXltaWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzNjcsImV4cCI6MTk5NTQ5NTM2N30.OszSJm-lZ8YMuK32u4ZmLBGGhl5BzkB8ieK_XUEVY04",
        },
      }
    )
    //callback-  konverterer response til json format
      .then((response) => response.json())
      //tager fat i responsen eferfølgende
      .then((data) => {
        // Updatere artist staten ved, at flitrere tidligere state og laver nyt filtreret array.
        setArtist((prevArtists) => prevArtists.filter((artist) => artist.id !== id));
      });
  }

  return (
    <section>
      {artists.map((artist) => (
      <section className={styles.favoritKolonne} >
        <div className={styles.navnWrapper}>
          <h3>{artist.name}</h3>
          <p>{artist.day}day</p>
      </div>
      <div>
      <button className={styles.deleteArtist} onClick={() => deleteArtist(artist.id)}>
        remove
      </button>
      </div>
    </section>
      ))}
  </section>
  );
}