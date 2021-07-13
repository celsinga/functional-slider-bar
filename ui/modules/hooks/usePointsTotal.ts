import {useAppSelector} from '../../store';

const usePointsTotal = () => {
  const pointsTotal = useAppSelector(state => state.points.points) || 0;

  return pointsTotal;
};

export default usePointsTotal;
