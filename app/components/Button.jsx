import Link from "next/link"

const Button = ({name}) => {
  return (
    <Link target="_blank" href="https://github.com/PatelAbhay550" className="main-btn">{name}</Link>
  )
}

export default Button