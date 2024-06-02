
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-[#6094b7] min-h-screen flex lg:flex-row flex-col items-center justify-center gap-10" >
      <div className="bg" id="vanta"></div>
      <Image src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png" alt="preview" width={519} height={472}/>
      <div> 
        <Logo/>
        <h1 className='text-5xl font-semibold my-6 max-w-[500px]'> <span className='font-extrabold'>Mind</span> Over Matter.</h1>
        <p className='text-2xl font-medium max-w-[600px]'>Use Mentibuddy to keep track of all your patients under your care. Get lifetime Access for Rs. 199/-</p>
        <div className='mt-10 space-x-3'>
          <Button asChild><Link href='/signup'>Get Started</Link></Button>
          <Button asChild variant={'secondary'}><Link href='/signup'>Log in</Link></Button>
        </div>
      </div>
    </main>
  );
}
