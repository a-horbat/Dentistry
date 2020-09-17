import { useEffect } from 'react';

const root = document.getElementById('root');
export function useDisableScroll(disabled) {
  useEffect(() => {
    if (root && disabled) {
      //console.log('Disable');
      root.classList.add('disable-scroll');
    } else if (root) {
      //console.log('Enable');
      root.classList.remove('disable-scroll');
    }
  }, [disabled]);
}
