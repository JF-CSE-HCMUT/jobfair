import Navbar from "../../components/NavBar.tsx";
import HeroSection from "../../components/HeroSection.tsx";
import AboutSponsor from "../../components/AboutSponsor.tsx";
import AchievementsSection from "../../components/AchievementSection.tsx";
import Footer from "../../components/footer.tsx";
import "./checkin.css";
import Sponsor from "../../components/theSponsor.tsx";
import View from "../../components/MapView.tsx";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Sponsor />
      <AboutSponsor />
      <AchievementsSection />
      <View modelUrl="/a.glb" />
      <Footer />
    </div>
  );
};

export default Index;