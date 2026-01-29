
import Button from './components/Button';
import ImagCard from './components/ImagCard';
import FourumCard from './components/FourumCard';
import FullHome from './components/FullHome';
import BackgroundWave from './components/Wave';

export default function Home() {
  const abhayData = {
    image: "https://scontent.fknu1-4.fna.fbcdn.net/v/t39.30808-6/473134353_1797331867702105_3172409557775362407_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=9F4x1-wiGlsQ7kNvwELPEF5&_nc_oc=AdnGD2pfLPbdvqm3AfI4c_venoSwpWTB958qT-z_SGvcgvsbRap2E8Spm1k4VEWajf8&_nc_zt=23&_nc_ht=scontent.fknu1-4.fna&_nc_gid=IE3IqhWUMBEpgP86IewrWw&oh=00_AfqpFpcdEN9RThRyYyA1D08720pKLu8GrO18csHMTzjRZQ&oe=697E2066",
    title: "Developer",
    name: "Abhay Patel",
    description: "I am a frontend developer with 5 years of experience building web applications, specializing in Next.js and modern React ecosystems."
  };  const abhayData2 = {
    image: "https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-1/334998150_2915813855229526_2877140648363160727_n.jpg?stp=c74.0.790.790a_dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=98eOaJc3IG0Q7kNvwEXIXGG&_nc_oc=AdnJ0KvCLq_iSQaCG4fMC0yhWMoFIROUq9yaw8n-TTyZT8fJmtz3eyzYWE5uAJWI-pE&_nc_zt=24&_nc_ht=scontent.fknu1-6.fna&_nc_gid=IE3IqhWUMBEpgP86IewrWw&oh=00_AfoVkF9Ja5nhaqMX67heagOlg0c-GZ-20xDLTBt8sj70wA&oe=697E2A45",
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