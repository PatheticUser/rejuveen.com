import {useMemo} from 'preact/hooks';

import type {UxModeType} from '~/types/uxMode';
import {isMobileBrowser} from '~/utils/browser';

interface UseAdjustedUxModeProps {
  defaultUxMode: UxModeType;
  uxMode: UxModeType;
}

export const useAdjustedUxMode = ({
  defaultUxMode,
  uxMode,
}: UseAdjustedUxModeProps) => {
  const adjustedUxMode = useMemo(() => {
    const mobile = isMobileBrowser();

    const shouldUseDefault = uxMode === 'windoid' && mobile;

    return shouldUseDefault ? defaultUxMode : uxMode;
  }, [defaultUxMode, uxMode]);

  return adjustedUxMode;
};
