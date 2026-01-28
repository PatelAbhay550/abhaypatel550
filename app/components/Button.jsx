import Link from "next/link";
import { FaGithub } from 'react-icons/fa';

const Button = ({ name }) => (
  <Link target="_blank" href="https://github.com/PatelAbhay550" className="flex main-btn mb-6 items-center gap-4"><FaGithub />{name}</Link>
);

export default Button;
