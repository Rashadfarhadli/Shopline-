import React from "react";
import AboutSection from "./AboutSection";
import AboutHero from "./AboutHero";
import Footer from "../../components/Footer";
import AboutOneSection from "./AboutOneSction";
import AboutTeamSection from "./AboutTimeSection";
import StatsSection from "./StatsSections";

export default function About() {
  return (
    <div>
      < AboutHero />
      < AboutSection />
     < AboutOneSection />
     < AboutTeamSection />
     < StatsSection />
      < Footer />

      

    </div>
  );
}
