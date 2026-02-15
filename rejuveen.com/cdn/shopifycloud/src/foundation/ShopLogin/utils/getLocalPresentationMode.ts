import type {PresentationMode} from '../types/state';

interface GetLocalPresentationModeParams {
  dismissed: boolean;
  originalPresentationMode: PresentationMode;
  userMatched?: boolean;
  userRecognized: boolean;
}

export function getLocalPresentationMode({
  dismissed,
  originalPresentationMode,
  userMatched,
  userRecognized,
}: GetLocalPresentationModeParams): PresentationMode {
  // Email matching always shows card (unless dismissed)
  if (userMatched && !dismissed) {
    return 'card';
  }

  // Original presentation mode determines behavior as the second layer.
  if (originalPresentationMode === 'button') {
    return 'button';
  }

  // Card presentation depends on recognition and dismissal
  return userRecognized && !dismissed ? 'card' : 'button';
}
