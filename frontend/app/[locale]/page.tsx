// import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//     </div>
//   );
// }
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

import Hero from '../components/Hero';

import Navbar from '../components/Navbar';
import ModulesGrid from '../components/ModulesGrid';
import UserProfiles from '../components/profile';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import TamTrackDNA from '../components/adn';



 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <Navbar />

      <Hero />
      <ModulesGrid />
      <UserProfiles />
      <Testimonials />
      <TamTrackDNA />
      <Footer />

    
    </div>
  );
}