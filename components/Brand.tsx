import { Orbitron } from 'next/font/google';

const font = Orbitron({ subsets: ['latin'] });

const Brand = () => {
  return (
    <div className={font.className}>
      <h1>Rhythmix</h1>
    </div>
  );
}
export default Brand;
