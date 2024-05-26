
import CardReservationsList from '../Lists/CardReservationsList';

type Props = {};

const ReservationCurrent: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="flex justify-center items-center w-full">
      <CardReservationsList filter="current" />
    </div>
  );
};

export default ReservationCurrent;
