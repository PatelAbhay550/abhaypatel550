import Link from "next/link";
import { FaGithub } from 'react-icons/fa';
import { playClick } from '../../utils/sounds';

const Button = ({ name }) => (
  <Link target="_blank" onClick={()=>{playClick.play();}} href="https://github.com/PatelAbhay550" className="flex main-btn mb-6 items-center gap-4"><FaGithub />{name}</Link>
);

export default Button;
