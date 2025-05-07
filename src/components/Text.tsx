import React from 'react';
import {
  Text as DefaultText,
  StyleSheet,
  TextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// Define custom props for typography and color options
type TextVariantProps = {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  body?: boolean;
  body2?: boolean;
  base?: boolean;
  base2?: boolean;
  base2Medium?: boolean;
  caption?: boolean;
  captionMedium?: boolean;
  caption2?: boolean;

  white?: boolean;
  black?: boolean;
  blue50?: boolean;
  blue100?: boolean;
  blue200?: boolean;
  blue300?: boolean;
  blue400?: boolean;
  blue500?: boolean;
  blue600?: boolean;
  blue700?: boolean;
  blue800?: boolean;
  blue900?: boolean;
  blue950?: boolean;

  n50?: boolean;
  n100?: boolean;
  n200?: boolean;
  n300?: boolean;
  n400?: boolean;
  n500?: boolean;
  n600?: boolean;
  n700?: boolean;
  n800?: boolean;
  n900?: boolean;
  n950?: boolean;
};

type CustomTextProps = TextProps &
  TextVariantProps & {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export default function Text({
                               h1,
                               h2,
                               h3,
                               h4,
                               h5,
                               h6,
                               body,
                               body2,
                               base,
                               base2,
                               base2Medium,
                               caption,
                               captionMedium,
                               caption2,

                               white,
                               black,
                               blue50,
                               blue100,
                               blue200,
                               blue300,
                               blue400,
                               blue500,
                               blue600,
                               blue700,
                               blue800,
                               blue900,
                               blue950,

                               n50,
                               n100,
                               n200,
                               n300,
                               n400,
                               n500,
                               n600,
                               n700,
                               n800,
                               n900,
                               n950,

                               children,
                               style,
                               ...props
                             }: CustomTextProps) {
  const { fonts, colors } = useTheme();

  const styles = StyleSheet.flatten([
    h1 && fonts.h1,
    h2 && fonts.h2,
    h3 && fonts.h3,
    h4 && fonts.h4,
    h5 && fonts.h5,
    h6 && fonts.h6,
    body && fonts.body,
    body2 && fonts.body2,
    base && fonts.base,
    base2 && fonts.base2,
    base2Medium && fonts.base2Medium,
    caption && fonts.caption,
    captionMedium && fonts.captionMedium,
    caption2 && fonts.caption2,

    white && { color: colors.white },
    black && { color: colors.black },
    blue50 && { color: colors.blue50 },
    blue100 && { color: colors.blue100 },
    blue200 && { color: colors.blue200 },
    blue300 && { color: colors.blue300 },
    blue400 && { color: colors.blue400 },
    blue500 && { color: colors.blue500 },
    blue600 && { color: colors.blue600 },
    blue700 && { color: colors.blue700 },
    blue800 && { color: colors.blue800 },
    blue900 && { color: colors.blue900 },
    blue950 && { color: colors.blue950 },

    n50 && { color: colors.n50 },
    n100 && { color: colors.n100 },
    n200 && { color: colors.n200 },
    n300 && { color: colors.n300 },
    n400 && { color: colors.n400 },
    n500 && { color: colors.n500 },
    n600 && { color: colors.n600 },
    n700 && { color: colors.n700 },
    n800 && { color: colors.n800 },
    n900 && { color: colors.n900 },
    n950 && { color: colors.n950 },

    style,
  ]);

  return (
    <DefaultText
      style={styles}
      {...props}
      allowFontScaling={true}
      adjustsFontSizeToFit={false}
      maxFontSizeMultiplier={1.2}
    >
      {children}
    </DefaultText>
  );
}
