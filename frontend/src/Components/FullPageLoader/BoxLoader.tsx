
import { Icon } from '@iconify-icon/react';
import { CSSProperties, useState } from 'react';
import { MoonLoader, PulseLoader } from 'react-spinners';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",//29B612
};

type Props = {
};

const PoxLoader = (props: Props) => {
  let [color, setColor] = useState("#29B612");
//   let [color, setColor] = useState("#ffffff");
let loading = true;

  return (
    loading && (
      <div className="w-full py-10  flex justify-center items-center">
        <div className="z-50 ">
          {/* =====MoonLoader FadeLoader PropagateLoader BeatLoader BarLoader */}
          <MoonLoader
            className="text-Darkgreen"
            color={color}
            loading={true}
            cssOverride={override}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    ) 
  );
};

export default PoxLoader;
