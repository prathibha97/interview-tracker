import { FC } from 'react'

interface pageProps {
  params: {
    positionId: string;
  };
}

const page: FC<pageProps> = ({}) => {
  return <div>page</div>
}

export default page