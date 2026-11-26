import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { Mission } from "../components/Mission";
import { Ecosystem } from "../components/Ecosystem";
import { Features } from "../components/Features";
import { CTA } from "../components/CTA";

import "../styles/pages/Home.css";

export default function Home() {
  return (
    <main className="rf-home">
      <Hero />
      <Stats />
      <Mission />
      <Ecosystem />
      <Features />
      <CTA />
    </main>
  );
}
