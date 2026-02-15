interface CloseIconProps {
  className?: string;
}

export function CloseIcon({className}: CloseIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10Zm7.707-3.707a1 1 0 0 0-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 1 0 1.414 1.414L10 11.414l2.293 2.293a1 1 0 0 0 1.414-1.414L11.414 10l2.293-2.293a1 1 0 0 0-1.414-1.414L10 8.586 7.707 6.293Z"
        clip-rule="evenodd"
      />
    </svg>
  );
}
