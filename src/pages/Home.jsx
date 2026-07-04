import Hero from '../components/Hero';
import AskingForHelp from '../components/AskingForHelp';
import WhoWeAreSection from '../components/WhoWeAreSection';
import GalleryPreview from '../components/GalleryPreview';
import MakeDifference from '../components/MakeDifference';
import ChangingLives from '../components/ChangingLives';
import Blog from '../components/Blog';

export default function Home() {
  return (
    <main>
      <Hero />
      <AskingForHelp />
      <WhoWeAreSection />
      <GalleryPreview />
      <MakeDifference />
      <ChangingLives />
      <Blog />
    </main>
  );
}
