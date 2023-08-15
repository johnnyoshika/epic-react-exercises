import { useState } from 'react';
import Tilt from './Tilt';
import TiltDataDisplay from './TiltDataDisplay';

const VanillaTilt = () => {
  const [data, setData] = useState<any>(null);
  console.log('data', data);

  return (
    <>
      <p>Touching the box will transform its perspective.</p>
      <div>
        <Tilt setData={setData} style={{}}>
          <TiltDataDisplay data={data} />
        </Tilt>
      </div>
    </>
  );
};

export default VanillaTilt;
