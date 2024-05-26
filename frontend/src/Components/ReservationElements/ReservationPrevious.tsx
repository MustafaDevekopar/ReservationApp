
import CardReservationsList from '../Lists/CardReservationsList';

type Props = {};

const ReservationPrevious: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="flex justify-center items-center w-full">
      <CardReservationsList filter="past" />
    </div>
  );
};

export default ReservationPrevious;
