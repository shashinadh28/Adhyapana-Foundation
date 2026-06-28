import Hero from '../components/Hero';
import AskingForHelp from '../components/AskingForHelp';
import MakeDifference from '../components/MakeDifference';
import ChangingLives from '../components/ChangingLives';
import Blog from '../components/Blog';

export default function Home() {
  return (
    <main>
      <Hero />
      <AskingForHelp />
      <MakeDifference />
      <ChangingLives />
      <Blog />
    </main>
  );
}
