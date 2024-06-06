
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import marketing from '../../../public/marketing.png'
import ParticlesComponent from '@/components/particles';
export default function Home() {
  return (
    <main className="min-h-screen flex lg:flex-row flex-col items-center justify-center gap-10" >
      <div className="absolute inset-0 z-[-10]">
        <ParticlesComponent />
      </div> 
      <Image src={marketing} alt="preview" width={519} height={472} priority/>
      <div> 
        <div className='w-24 h-24'><Logo className='w-full h-full' /></div>
        <h1 className='group text-5xl font-semibold my-6 max-w-[500px] hover:font-extralight transition'> <span className='font-extrabold'>Mind</span> Over Matter.</h1>
        <p className='text-2xl font-medium max-w-[600px] '>Use Mentibuddy to keep track of all your patients under your care. Get lifetime Access for Rs. 199/-</p>
        <div className='mt-10 space-x-3'>
          <Button asChild><Link href='/signup'>Get Started</Link></Button>
          <Button asChild variant={'secondary'}><Link href='/login'>Log in</Link></Button>
        </div>
      </div>
    </main>
  );
}
