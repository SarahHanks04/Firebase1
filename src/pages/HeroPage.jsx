import WelcomeSection from "@/components/HeroForm/WelcomeSection";
import React from "react";
import HeroForm from "@/components/HeroForm/HeroForm";

const HeroPage = () => {
  return (
    <section className="bg-[var(--background)] text-[var(--text)] mt-[3rem]">
      <WelcomeSection />
      <HeroForm />
    </section>
  );
};

export default HeroPage;
