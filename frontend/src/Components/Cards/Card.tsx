import FmdGoodIcon from '@mui/icons-material/FmdGood';

type Props = {}

const Card = (props: Props) => {
  return (
    <div className="w-[300px] h-[300px] bg-red-800">
        <img className='w-full' src="https://th.bing.com/th/id/OIP.yhQWl1yZFjTvwjhCtGtF2QHaE7?rs=1&pid=ImgDetMain"  alt="img" />
        <p>
          <FmdGoodIcon />
        </p>
    </div>
  )
}

export default Card