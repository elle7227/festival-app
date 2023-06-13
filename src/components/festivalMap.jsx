import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Navigation from "@/components/Navigation";
import { ScheduleCardMID } from "./Mid_modal";
import { ScheduleCardJOTU } from "./Jotu_modal";
import { ScheduleCardVAN } from "./Van_modal";
import Footer from "@/components/footer";

export default function FestivalMap({ scheduleData }) {
  const [hoveredImg, setHoveredImg] = useState(null);

  const [selectedTent, setSelectedTent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const containerWidth = 180;

  //prøver at placere teltene ifht window.
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  
  //funktion der kører ved klik på telt og sætter tent værdi alt efter hvilket img vi klikker på + sætter setShowModal = true 
  function handleTentClick(tent) {
    setSelectedTent(tent), setShowModal(true);
  }

  //hover effect på telte
  function handleMouseOver(index) {
    setHoveredImg(index);
  }

  function handleMouseOut() {
    setHoveredImg(null);
  }
  function getImageStyle(index) {
    const scale = hoveredImg === index ? 1.2 : 1;

    // Define custom sizes and positions for each image - kunne slettes
    const imageStyles = {
      1: {
        width: windowWidth * 0.3,
        height: windowHeight * 0.3,
        
      },
      2: {
        width: windowWidth * 0.3,
        height: windowHeight * 0.3,
        
      },
      3: {
        width: windowWidth * 0.25,
        height: windowHeight * 0.25,
        
      },
    };
    const imageStyle = imageStyles[index];

    return {
      position: "absolute",
      width: `${imageStyle.width}px`,
      height: `${imageStyle.height}px`,
      left: `${imageStyle.left}px`,
      top: `${imageStyle.top}px`,
      transform: `scale(${scale})`,
    };
  }

  //vores return statemnet i festivalMap funktionen tjekker showmodal værdi og selectedTent værdi
  return (
    <>
      {showModal ? (
        selectedTent === "Telt1" ? (
          <ScheduleCardMID
            scheduleData={scheduleData}
            selectedTent={selectedTent}
            showModal={showModal}
            handleCloseModal={setShowModal}
          />
        ) : selectedTent === "Telt2" ? (
          <ScheduleCardJOTU
            scheduleData={scheduleData}
            selectedTent={selectedTent}
            showModal={showModal}
            handleCloseModal={setShowModal}
          />
        ) : (
          <ScheduleCardVAN
            scheduleData={scheduleData}
            selectedTent={selectedTent}
            showModal={showModal}
            handleCloseModal={setShowModal}
          />
        )
      ) : (
        <div className={styles.mapDiv}>
          <div className={styles.map_top}>
          <Navigation></Navigation>
            <h1 className={styles.map_overskrift}>FESTIVAL MAP </h1>
            <p className={styles.map_underOverskrift}>
              click on the tents to see schedule{" "}
            </p>
          </div>
          <img
            src="/map.svg"
            alt="Map"
            style={{ height: "100%", objectFit: "cover", width: "100%" }}
          />

          <img
            className={styles.telt1}
            src="/telt1.svg"
            alt="Telt1"
            style={{
              ...getImageStyle(1),
            }}
            onMouseOver={() => handleMouseOver(1)}
            onMouseOut={handleMouseOut}
            onClick={() => handleTentClick("Telt1")}
          />

          <img
            className={styles.telt2}
            src="/telt2.svg"
            alt="Telt2"
            style={{
              ...getImageStyle(2),
            }}
            onMouseOver={() => handleMouseOver(2)}
            onMouseOut={handleMouseOut}
            onClick={() => handleTentClick("Telt2")}
          />

          <img
            className={styles.telt3}
            src="/telt3.svg"
            alt="Telt3"
            style={{
              ...getImageStyle(3),
            }}
            onMouseOver={() => handleMouseOver(3)}
            onMouseOut={handleMouseOut}
            onClick={() => handleTentClick("Telt3")}
          />
        </div>
      )}{" "}
    </>
  );
}
