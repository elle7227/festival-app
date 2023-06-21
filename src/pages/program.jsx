import stylesProgram from "../styles/Program.module.css";
import { useState } from "react";
import Modal from "@/components/ModalArtist";
import Head from "next/head";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/footer";


export default function Program({ scheduleData, bandData }) {
  const [selectedBand, setSelectedBand] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // callback der kaldes når bandEvent klikkes tager bandEvent og day som parameter som stores data om bands.
  //sætter variable for stage som bandevents der spilles pågældenen dag på valgte secne. sætter staten udfra dette
  //.flter metoden filtrere bandevents på betingelse at artistnvan-act i array == navn på valgt artist.
  //.length giver længden af array og ? fortæller om længende er større end 0, og hvis ja sætter staten til navn på scene.
  //hvis array er kortere end 0 sættes state til false.
  //
  function handleBandSelection(bandEvent, day) {
    let stage = scheduleData.Jotunheim[day].filter((act) => act.act === bandEvent.act).length ? "Jotunheim" : false;
    if (!stage) {
      stage = scheduleData.Midgard[day].filter((act) => act.act === bandEvent.act).length ? "Midgard" : false;
    }
    if (!stage) {
      stage = scheduleData.Vanaheim[day].filter((act) => act.act === bandEvent.act).length ? "Vanaheim" : false;
    }
    //finder info om bandet (dag, scnene og bandInfo) ved at finde tilsvarende bandnavn (act) i bandInfo array
    let bandInfo = bandData.find((band) => band.name === bandEvent.act);
    //funktionen setselctedband opdaterer Selectedband staten med info fra bandData.
    setSelectedBand({
      ...bandEvent,
      day,
      stage,
      bandInfo,
    });
    //sætter state til true, så modal vises.
    setShowModal(true);
  }

  
  const Midmon = scheduleData.Midgard.mon;
  const Midtue = scheduleData.Midgard.tue;
  const Midwed = scheduleData.Midgard.wed;
  const Midthu = scheduleData.Midgard.thu;
  const Midfri = scheduleData.Midgard.fri;
  const Midsat = scheduleData.Midgard.sat;
  const Midsun = scheduleData.Midgard.sun;

  // JOTUNHEIM
  const Jotmon = scheduleData.Jotunheim.mon;
  const Jottue = scheduleData.Jotunheim.tue;
  const Jotwed = scheduleData.Jotunheim.wed;
  const Jotthu = scheduleData.Jotunheim.thu;
  const Jotfri = scheduleData.Jotunheim.fri;
  const Jotsat = scheduleData.Jotunheim.sat;
  const Jotsun = scheduleData.Jotunheim.sun;

  // VANAHEIM
  const Vanmon = scheduleData.Vanaheim.mon;
  const Vantue = scheduleData.Vanaheim.tue;
  const Vanwed = scheduleData.Vanaheim.wed;
  const Vanthu = scheduleData.Vanaheim.thu;
  const Vanfri = scheduleData.Vanaheim.fri;
  const Vansat = scheduleData.Vanaheim.sat;
  const Vansun = scheduleData.Vanaheim.sun;

  //   const monday = { Midmon, Jotmon, Vanmon };

  return (
    <section className={stylesProgram.program_body}>
        <Navigation></Navigation>
      <Head>
        <title>Program</title>
      </Head>

      <Modal selectedBand={selectedBand} showModal={showModal} handleCloseModal={setShowModal} />
      {/* program site wraped inside a conditional rendering */}
      {/* tjekker om showmodal er false, hvis ja vises indholdet i section */}
      {!showModal && (
        <section className={stylesProgram.programBackground}>
          <h1 className={stylesProgram.programHeading}>Program</h1>
          <Link className={stylesProgram.link} href="/schedule">
            / Schedule
          </Link>

    
          <section className={stylesProgram.programContainer}>
            <h2>Monday</h2>
            {/*.concat kombinerer bandevents fra de 3 scener og laver nyt array. .map mapper gennem denne liste*/}
            {Midmon.concat(Jotmon, Vanmon).map((bandEvent) => {
              if (bandEvent.act.includes("break")) {
                // viser ikke band event hvis act indeholder "break" 
                return null;
              }
              return (
                //viser bandnavne og kalder handleBandSelection med parameter bandEvent og mon. key definerer hvert element i liste.
                <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "mon")}>
                  <span>{" " + bandEvent.act}</span> /
                </p>
              );
            })}
          </section>

          <section className={stylesProgram.programContainer}>
            <h2>Tuesday</h2>
            {Midtue.concat(Jottue, Vantue).map((bandEvent) => {
              if (bandEvent.act.includes("break")) {
                // Skip rendering the band event if it includes "break"
                return null;
              }
              return (
                <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "tue")}>
                  <span>{" " + bandEvent.act}</span> /
                </p>
              );
            })}
          </section>

          <section className={stylesProgram.programContainer}>
            <h2>Wednesday</h2>
            {Midwed.concat(Jotwed, Vanwed).map((bandEvent) => {
              if (bandEvent.act.includes("break")) {
                // Skip rendering the band event if it includes "break"
                return null;
              }
              return (
                <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "wed")}>
                  <span>{" " + bandEvent.act}</span> /
                </p>
              );
            })}
          </section>

          <section className={stylesProgram.programContainer}>
            <h2>Thursday</h2>
            {Midthu.concat(Jotmon, Vanmon).map((bandEvent) => {
              if (bandEvent.act.includes("break")) {
                // Skip rendering the band event if it includes "break"
                return null;
              }
              return (
                <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "thu")}>
                  <span>{" " + bandEvent.act}</span> /
                </p>
              );
            })}
          </section>

          <section className={stylesProgram.programContainer}>
            <h2>Friday</h2>
            {Midfri.concat(Jotfri, Vanfri).map((bandEvent) => {
              if (bandEvent.act.includes("break")) {
                // Skip rendering the band event if it includes "break"
                return null;
              }
              return (
                <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "fri")}>
                  <span>{" " + bandEvent.act}</span> /
                </p>
              );
            })}
          </section>

          <section className={stylesProgram.programContainer}>
            <h2>Saturday</h2>
            {Midsat.concat(Jotmon, Vanmon).map((bandEvent) => {
              if (bandEvent.act.includes("break")) {
                // Skip rendering the band event if it includes "break"
                return null;
              }
              return (
                <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "sat")}>
                  <span>{" " + bandEvent.act}</span> /
                </p>
              );
            })}
          </section>
          <section className={stylesProgram.programContainer}>
            <h2>Sunday</h2>
            {Midsun.concat(Jotsun, Vansun).map((bandEvent) => {
              if (bandEvent.act.includes("break")) {
                // Skip rendering the band event if it includes "break"
                return null;
              }
              return (
                <p className={stylesProgram.programText} key={bandEvent.act} onClick={() => handleBandSelection(bandEvent, "sun")}>
                  <span>{" " + bandEvent.act}</span> /
                </p>
              );
            })}
          </section>

        </section>
      )}
      <Footer></Footer>
    </section>
  );
}


export async function getServerSideProps() {
  //const apiEndpoints = ["http://localhost:8080/bands", "http://localhost:8080/schedule"];
  const apiEndpoints = ["https://nova-enchanted-confidence.glitch.me/bands", "https://nova-enchanted-confidence.glitch.me/schedule"];

  // mapper igennem hver array alt efter hvilket endpoint det er og fetcher
  const apiRequest = apiEndpoints.map((endpoint) => fetch(endpoint));
  // Promise.all venter på alle apiRequest er kørt igennem før den går videre.
  const [bandRes, scheduleRes] = await Promise.all(apiRequest);

  const bandData = await bandRes.json();
  const scheduleData = await scheduleRes.json();

  return {
    props: {
      bandData,
      scheduleData,
    },
  };
}
