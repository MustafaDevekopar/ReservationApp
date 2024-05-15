
type infoProps = {
    imageSrc: string;
}

const ImageShowField = ({imageSrc}: infoProps) => {
  return (
    <div className="relative lg:flex-1 xl:flex-1 ">
        <img 
        className="aspect-[16/9] w-full object-cover lg:rounded-3xl xl:rounded-3xl"
        src={imageSrc} alt="" />
        <div className='w-full h-6 bg-bgWhight absolute bottom-0 left-0 right-0 rounded-t-3xl'></div>
    </div>
  )
}

export default ImageShowField