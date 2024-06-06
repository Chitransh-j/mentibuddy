import Image from "next/image"
import Link from "next/link"
import logo from '../../public/logo.svg'

export const Logo = ({className} :{ className: string}) => {
  return <Link href='/'>
    <Image className={className} src={logo} alt="logo" />
    </Link>
}
