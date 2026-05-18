
import Button from './components/Button';
import ImagCard from './components/ImagCard';
import FourumCard from './components/FourumCard';
import FullHome from './components/FullHome';
import BackgroundWave from './components/Wave';

export default function Home() {
  const abhayData = {
    image: "https://avatars.githubusercontent.com/u/90134639?v=4",
    title: "Developer",
    name: "Abhay Patel",
    description: "I am a frontend developer with 5 years of experience building web applications, specializing in Next.js and modern React ecosystems."
  };  const abhayData2 = {
    image: "https://ibb.co/Ng1J9qND",
    title: "Developer",
    name: "Abhay Patel",
    description: "I am a frontend developer with 5 years of experience building web applications, specializing in Next.js and modern React ecosystems."
  };

  return (
    <>
      <FullHome />
      <BackgroundWave />
    </>
  );
}
