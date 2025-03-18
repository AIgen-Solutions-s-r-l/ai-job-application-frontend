import { FC } from 'react';
import { Container } from '../Container';
import Image from 'next/image';
import Link from 'next/link';
export const OngoingNabvar: FC = () => {
  return (
    <Container className='pt-[30px] pb-[12px] md:pt-[55px] md:pb-[25px]'>
      <Link href='/'>
        <Image src="/laboro.png" alt="Logo" width={214} height={58} />
      </Link>
    </Container>
  );
};