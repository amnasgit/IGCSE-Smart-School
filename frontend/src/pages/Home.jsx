import Hero from '../components/Hero.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import ProgramCards from '../components/ProgramCards.jsx';
import AdmissionProcess from '../components/AdmissionProcess.jsx';
import AboutSnapshot from '../components/AboutSnapshot.jsx';
import { SupportSnapshot } from '../components/SupportSnapshot.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ProgramCards />
      <AdmissionProcess />
      <AboutSnapshot />
      <SupportSnapshot />
    </>
  );
}
