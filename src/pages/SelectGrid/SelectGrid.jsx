import { useNavigate } from 'react-router-dom';
import GridPicker from '../../components/select/GridPicker.jsx';
import PageFrame from '../../components/layout/PageFrame.jsx';
import { useBooth } from '../../context/BoothContext.jsx';

export default function SelectGrid() {
  const navigate = useNavigate();
  const { dispatch } = useBooth();

  const next = () => {
    dispatch({ type: 'CONFIRM_GRID' });
    navigate('/camera');
  };

  return (
    <PageFrame title="Choose layout" nav={{ onBack: () => navigate('/'), backLabel: 'Home', onNext: next, nextLabel: 'Continue to camera' }}>
      <GridPicker />
    </PageFrame>
  );
}
