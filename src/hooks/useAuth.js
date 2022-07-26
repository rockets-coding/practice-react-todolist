import { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

const useAuth = () => useContext(AuthContext);
/**
 * #NOTE: ESLint
 * Unexpected block statement surrounding arrow body;
 * move the returned value immediately after the `=>`.
 */
// const useAuth = () => {
//   return useContext(AuthContext);
// };

export default useAuth;
