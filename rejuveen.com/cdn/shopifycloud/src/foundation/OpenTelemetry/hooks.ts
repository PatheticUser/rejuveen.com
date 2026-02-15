import {useContext} from 'preact/hooks';

import {OpenTelemetryContext} from './context';

export const useOpenTelemetry = () => useContext(OpenTelemetryContext);
