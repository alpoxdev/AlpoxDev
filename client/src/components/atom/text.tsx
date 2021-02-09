import styled from '@emotion/styled';
import { FontSize } from 'common/theme';

export const Text = styled.p<any>`
  color: ${(props: any) => props.theme.color.text};

  font-size: ${(props: any) => props.theme.fontSize.content};
  font-family: ${(props: any) => props.theme.fontFamily.primary};
  font-weight: 400;

  font-family: 'San Francisco';

  ${(props: any) => {
    const { fontSize } = props;
    if (fontSize === FontSize.title) {
      return `
			font-size: ${props.theme.fontSize.title};
			font-weight: bold;
			color: ${props.theme.color.text};
		`;
    }

    if (fontSize === FontSize.subtitle) {
      return `
			font-size: ${props.theme.fontSize.subtitle};
			font-weight: bold;
			color: ${props.theme.color.text};
		`;
    }

    if (fontSize === FontSize.content) {
      return `
			font-size: ${props.theme.fontSize.content};
			font-weight: normal;
			color: ${props.theme.color.text};
		`;
    }

    if (fontSize === FontSize.info) {
      return `
			font-size: ${props.theme.fontSize.info};
			font-weight: normal;
			color: ${props.theme.color.textInfo}
		`;
    }

    return `
		font-size: ${props.theme.fontSize.content};
		font-weight: normal;
		color: ${props.theme.color.text};
	`;
  }};
`;
