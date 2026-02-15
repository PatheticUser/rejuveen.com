import {useContext} from 'preact/hooks';

import {MonorailContext} from './context';

export const useMonorail = () => useContext(MonorailContext);
