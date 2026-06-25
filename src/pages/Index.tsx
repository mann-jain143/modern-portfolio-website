import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Projects } from '@/components/portfolio/Projects';
import { Experience } from '@/components/portfolio/Experience';
import { Services } from '@/components/portfolio/Services';
import { Testimonials } from '@/components/portfolio/Testimonials';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { ScrollProgress } from '@/components/portfolio/ScrollProgress';

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
