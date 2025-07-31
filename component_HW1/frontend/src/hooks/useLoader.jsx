import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../store/loadingSlice';
import Loader from '../components/basic/Loader';

const useLoader = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.loading);

    return { loading, dispatch, startLoading, stopLoading };
}

export default useLoader;