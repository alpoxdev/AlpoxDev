import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';

const Footer = ({
  view = true,
  action,
}: {
  view?: boolean;
  action: () => void;
}): JSX.Element | null => {
  if (!view) return null;
  const [ref, inView] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView === true && typeof action === 'function') action();
  }, [typeof action, inView === true]);

  return <FooterWrapper ref={ref} />;
};

export default Footer;

const FooterWrapper = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 30px;
`;
