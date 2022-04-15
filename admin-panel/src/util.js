import { useLocation, useParams } from 'react-router-dom';

export const useBasePath = () => {
    const location = useLocation();
    const params = useParams();

    return Object.entries(params).reduce(
        (path, [name, param]) => path.replace(`/${param}`, `/:${name}`),
        location.pathname,
    );
};