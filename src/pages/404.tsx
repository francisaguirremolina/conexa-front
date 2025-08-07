import Image from 'next/image';

import { Logos } from '@/components/Logos';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import styles from './404.module.sass';

const Index = () => {
  return (
    <Main meta={<Meta title="Página no encontrada" description="Not found" />}>
      <div className="container-fluid" id={`${styles.notFoundPage}`}>
        <div className="row">
          <div className="col-12 p-0 d-flex flex-column justify-content-center align-items-center">
            <Logos size="md" />
            <Image src="/assets/images/not-found.gif" alt="404, not found" width={400} height={400} />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Index;
