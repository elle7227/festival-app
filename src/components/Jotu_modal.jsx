import React, { useState } from "react";
import styles from "@/styles/Home.module.css";

export function ScheduleCardJOTU({
  scheduleData,
  selectedTent,
  showModal,
  handleCloseModal,
}) {
  const [currentDay, setCurrentDay] = useState("mon"); // Initial day

  //hvis enten showModal eller selctedTent er tilsvarende deres state (false og nul) renderes modal ikke.
  if (!showModal || !selectedTent) {
    return null;
  }

  function handleDayChange(day) {
    setCurrentDay(day);
  }

  function renderScene(day) {
    return scheduleData.Jotunheim[day]
    //.filter metoden til: hvis IKKE scenenavnet(act) = break, viser vi navnet når vi mapper gennem.
      .filter((scene) => scene.act !== "break")
      //mapper gennem scheduleData for valgte dag på jotuheim scenen og viser data for start, slut og act.
      .map((scene) => (
        <section className={styles.navnTidContainer} key={scene.start}value={scene.end}>
          <p className={styles.scene_modal_tidspunkt}>
            {scene.start} <br /> {scene.end}
          </p>
          <div className={styles.column}>
            <h3 className={styles.scene_modal_BandName}>{scene.act}</h3>
          </div>
        </section>
      ));
  }

  return (
    <div className={styles.scene_modal_body_jotu}>
      <button
        className={styles.ModalButton}
        onClick={() => handleCloseModal(false)}
      >
        Back to map
      </button>
      <div className={styles.scene_modal_sceneNavn}>
        <h1>JOTUNHEIM</h1>
      </div>

      <div className={styles.scene_modal_knapper}>
        <button
          className={currentDay === "mon" ? styles.active : ""}
          onClick={() => handleDayChange("mon")}
        >
          Monday
        </button>
        <button
          className={currentDay === "tue" ? styles.active : ""}
          onClick={() => handleDayChange("tue")}
        >
          Tuesday
        </button>
        <button
          className={currentDay === "wed" ? styles.active : ""}
          onClick={() => handleDayChange("wed")}
        >
          Wednesday
        </button>
        <button
          className={currentDay === "thu" ? styles.active : ""}
          onClick={() => handleDayChange("thu")}
        >
          Thursday
        </button>
        <button
          className={currentDay === "fri" ? styles.active : ""}
          onClick={() => handleDayChange("fri")}
        >
          Friday
        </button>
        <button
          className={currentDay === "sat" ? styles.active : ""}
          onClick={() => handleDayChange("sat")}
        >
          Saturday
        </button>
        <button
          className={currentDay === "sun" ? styles.active : ""}
          onClick={() => handleDayChange("sun")}
        >
          Sunday
        </button>
      </div>

      <div className={styles.scene_modal_day}>{renderScene(currentDay)}</div>
    </div>
  );
}
