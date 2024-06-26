
import { Icon } from '@iconify-icon/react';
import { CSSProperties, useState } from 'react';
import { PulseLoader } from 'react-spinners';

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

type Props = {
};

const FullPageLoader = (props: Props) => {
  let [color, setColor] = useState("#29B612");
//   let [color, setColor] = useState("#ffffff");
let loading = true;

  return (
    loading ? (
      <div className="fixed top-0 right-0 z-50 w-full h-full bg-GlassLoader flex justify-center items-center">
        <div className="z-50 absolute">
          {/* =====MoonLoader FadeLoader PropagateLoader BeatLoader BarLoader */}
          <Icon icon="ion:football" className=" text-6xl text-Darkgreen"/>
          <PulseLoader
            className="text-Darkgreen"
            color={color}
            loading={true}
            cssOverride={override}
            //size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    ) : <div></div>
  );
};

export default FullPageLoader;
