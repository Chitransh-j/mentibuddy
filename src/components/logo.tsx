import Image from "next/image"
import Link from "next/link"
import logo from '../../public/logo.svg'

export const Logo = () => {
  return <Link href='/'>
    <Image src={logo} alt="logo" />
    </Link>
}
