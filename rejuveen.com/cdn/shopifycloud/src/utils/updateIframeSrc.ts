export interface UpdateIframeSrcProps {
  iframe: HTMLIFrameElement | null;
  src: string;
}

export const updateIframeSrc = ({iframe, src}: UpdateIframeSrcProps) => {
  const parent = iframe?.parentNode;
  if (!parent || !iframe) {
    return;
  }
  parent.removeChild(iframe);
  iframe.setAttribute('src', '');
  iframe.setAttribute('src', src);
  parent.appendChild(iframe);
};
