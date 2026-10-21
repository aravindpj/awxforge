import { Belief } from "@/components/sections/Belief";
import { Closing } from "@/components/sections/Closing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Introducing } from "@/components/sections/Introducing";
import { Method } from "@/components/sections/Method";
import { Mission } from "@/components/sections/Mission";
import { Nav } from "@/components/sections/Nav";
import { Philosophy } from "@/components/sections/Philosophy";
import { Problem } from "@/components/sections/Problem";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Problem />
        <Belief />
        <Introducing />
        <Philosophy />
        <Method />
        <Mission />
        <Closing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
