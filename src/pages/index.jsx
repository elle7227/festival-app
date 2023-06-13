import styles from "@/styles/Home.module.css";
import React from "react";
import { ProgramSection } from "@/components/programSection";
import { EventSection } from "@/components/eventSection";
import { MapSection } from "@/components/mapSection";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/footer";


export function Overskrift() {
  return (
    <>
      <article className={styles.overskrift}>
        <Navigation></Navigation>
        <h2 className="fadeIn">FOO <br/> FESTIVAL</h2>
      </article>
      <svg className="pil_forside" xmlns="http://www.w3.org/2000/svg" width="50" height="200" fill="currentColor" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
</svg>
    </>
  );
}

/*giver tekster der skal animeres en class "fadeIN" 
og sætter elements til at være alle elementer med denne class gør at teksten på forsiden fader in*/

export default function Home({ bandData }) {
  useEffect(() => {
    const elements = document.querySelectorAll(".fadeIn");
    const fadeInElements = Array.from(elements);

    function fadeInHandler() {
      fadeInElements.forEach((element) => {
        //fortæller hvor elemnet stopper (fylder)
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight) {
          element.classList.add("show");
        }
      });
    }

    window.addEventListener("scroll", fadeInHandler);
    fadeInHandler();

    return () => {
      window.removeEventListener("scroll", fadeInHandler);
    };
  }, []);

  return (
    <div className={styles.index_body}>
      <Overskrift></Overskrift>
      <ProgramSection className="fadeIn" bandData={bandData}></ProgramSection>
      <EventSection className="fadeIn"></EventSection>
      <MapSection className="fadeIn"></MapSection>
      <Footer></Footer>
    </div>
  );
}

export async function getServerSideProps() {
  //const apiEndpoints = ["http://localhost:8080/bands"];
  const apiEndpoints = ["https://nova-enchanted-confidence.glitch.me/bands"];

  // mapper igennem hver array alt efter hvilket endpoint det er og fetcher
  const apiRequest = apiEndpoints.map((endpoint) => fetch(endpoint));
  // Promise.all venter på alle apiRequest er kørt igennem før den går videre (ikke nødvendig der fetches kun fra 1 api)
  const [bandRes] = await Promise.all(apiRequest);

  const bandData = await bandRes.json();

  return {
    props: {
      bandData
    },
  };
}
