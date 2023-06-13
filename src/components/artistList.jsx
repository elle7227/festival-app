import { useEffect, useState } from 'react';

export function ArtistFavoritter (){
    //sætter en state variablen artist som et tomt array, og opdateres af functionen setArtist.
  const [artists, setArtist] = useState([]);

//fetcher fra wines table fordi jeg har brugt gammel table i supabase
// bruger useEffect til at fetche data fra api når component er renderet (vist på side).
  useEffect(() => {
    const fetchArtister = async () => {
        const response = await fetch("https://ggufspwjbdpzmyqymijq.supabase.co/rest/v1/wines", {
          method: "get",
          headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndWZzcHdqYmRwem15cXltaWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzNjcsImV4cCI6MTk5NTQ5NTM2N30.OszSJm-lZ8YMuK32u4ZmLBGGhl5BzkB8ieK_XUEVY04",
          },
        });
        //henter data fra api endpoint med response.json metoden
        const data = await response.json();
        setArtist(data);
    };
    //kalder fetch function -> fetcher data når component renderes.
    fetchArtister();
  }, []);
  //array er sat som andet argument til useEffect -->kører 1 gang når component renders.


  
  function deleteArtist(id) {
    //sender delete request til sepcifikt id på artist i API 
    fetch(
      `https://ggufspwjbdpzmyqymijq.supabase.co/rest/v1/wines?id=eq.${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Prefer: "return=representation",
          apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndWZzcHdqYmRwem15cXltaWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzNjcsImV4cCI6MTk5NTQ5NTM2N30.OszSJm-lZ8YMuK32u4ZmLBGGhl5BzkB8ieK_XUEVY04",
        },
      }
    )
    //callback funktion der løber array igennem og fjerner slettede artister (database) fra viste array.
      .then((response) => response.json())
      .then((data) => {
        // Update the artist state by removing the deleted wine
        setArtist((prevArtists) => prevArtists.filter((artist) => artist.id !== id));
      });
  }

//returnerer og viser den opdatrede liste af artister tilsavrende databasens + slet knap·
  return (
    <main>
      {artists.map((artist) => (
        <div key={artist.id}>
          <h2>{artist.name}</h2>
          <button className="delete" onClick={() => deleteArtist(artist.id)}>
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}