import React from 'react';
import { Container } from '../Container';
import Image from 'next/image';

export const OngoingNabvar: React.FC = () => {
  return (
    <Container className='pt-[30px] pb-[12px] md:pt-[55px] md:pb-[25px]'>
      <Image src="/laboro.png" alt="Logo" width={214} height={58} />
    </Container>
  );
};