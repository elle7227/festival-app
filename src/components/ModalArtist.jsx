// import styles from "@/styles/Home.module.css";
import styles from "@/styles/Modal.module.css";

export default function Modal({ selectedBand, handleCloseModal, showModal }) {
  // Checks if either selectedBand is null or showModal is false using the logical OR operator ||.
  // if true, the modal will not be displayed -> component returns null to prevent rendering anything.
  if (!selectedBand || !showModal) {
    return null;
  }
  const { act, start, end, bandInfo, stage, day } = selectedBand;
  console.log(selectedBand);

  // Check if the logo includes "http"
  const logoSrc = bandInfo.logo.includes("http")
    ? bandInfo.logo
    : `https://nova-enchanted-confidence.glitch.me/logos/${bandInfo.logo}`;

  return (
    <div className={styles.modal_artister_body}>
      <section className={styles.ModalSection}>
        {/* Button to close the modal */}
        <button
          className={styles.ModalButton}
          onClick={() => handleCloseModal(false)}
        >
          Back to program
        </button>
        <img className={styles.ModalImg} src={logoSrc} alt="Logo" />
        <h1 className={styles.ModalArtistName}>{act}</h1>
        {/* <h1 className={`${styles.ModalArtistName} ${act.length > 12 ? styles.longText : ""}`}>{act}</h1> */}
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
        </article>
        <article className={styles.ModalBio}>
          <p>
            <span>ABOUT </span>
            <br /> {bandInfo.bio}
          </p>
        </article>
        <button
          className={styles.favoritButton}
          onClick={() => makeFavorit()}>favorite
        </button>
      </section>
    </div>
  );

  function makeFavorit() {
    const newWine = {
      name: act, // Assuming `act` contains the artist name
    };

    fetch("https://ggufspwjbdpzmyqymijq.supabase.co/rest/v1/wines", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=representation",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdndWZzcHdqYmRwem15cXltaWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTkzNjcsImV4cCI6MTk5NTQ5NTM2N30.OszSJm-lZ8YMuK32u4ZmLBGGhl5BzkB8ieK_XUEVY04",
      },
      body: JSON.stringify(newWine),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Artist favorited:", data);
        // Perform any additional actions upon successful favoriting
      });
  

  return (
    <div className={styles.modal_artister_body}>
      {/* ... */}
      <button
        className={styles.favoritButton}
        onClick={makeFavorit}
      >
        Favorite
      </button>
    </div>
  );
}
}

