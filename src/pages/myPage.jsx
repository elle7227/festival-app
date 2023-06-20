import {ArtistFavoritter} from '../components/artistList';
import styles from "@/styles/Home.module.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/footer";

const Home = () => {
  return (
    <div className={styles.minSide_Body}>
     <Navigation/>
     <h1>MY FAVORITES</h1>
      <ArtistFavoritter />
      <Footer/>s
    </div>
  );
};

export default Home;

        