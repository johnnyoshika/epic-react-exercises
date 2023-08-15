import { ReactNode, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface VanillaTiltElement extends HTMLDivElement {
  vanillaTilt: {
    destroy(): void;
  };
}

const vanillaTiltOptions = { max: 25, perspective: 150 };

const Tilt = ({
  children,
  setData,
  style,
}: {
  children: ReactNode;
  setData: (data: any) => void;
  style: object;
}) => {
  const divRef = useRef<VanillaTiltElement>(null);

  useEffect(() => {
    const node = divRef.current;
    if (!node) return;

    VanillaTilt.init(node, vanillaTiltOptions);
    node.addEventListener('tiltChange', (e: any) =>
      setData(e.detail),
    );
    return () => node.vanillaTilt.destroy();
  }, [setData]);

  return (
    <div
      ref={divRef}
      style={{
        width: '200px',
        background: '#eee',
        border: '1px solid #aaa',
        borderRadius: '4px',
        padding: '8px',
        position: 'absolute',
      }}
    >
      {children}
    </div>
  );
};

export default Tilt;
