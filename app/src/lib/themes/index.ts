import JSON5 from 'json5';
import { z } from 'zod';

export type Theme = {
	id: string;
	name: string;
	author: string;
	desc?: string;
	base?: 'dark' | 'light';
	props: Record<string, string>;
};

export const themeSchema = z.object({
	id: z.string().optional(),
	name: z.string().optional(),
	author: z.string().optional(),
	desc: z.string().optional(),
	base: z.union([z.literal('dark'), z.literal('light')]),
	props: z.record(z.string())
});

export const baseDarkThemeString = `// ダークテーマのベーステーマ
// このテーマが直接使われることは無い
{
  id: 'dark',

  name: 'Dark',
  author: 'syuilo',
  desc: 'Default dark theme',
  kind: 'dark',

  props: {
    accent: '#86b300',
    accentDarken: ':darken<10<@accent',
    accentLighten: ':lighten<10<@accent',
    accentedBg: ':alpha<0.15<@accent',
    focus: ':alpha<0.3<@accent',
    bg: '#000',
    acrylicBg: ':alpha<0.5<@bg',
    fg: '#dadada',
    fgTransparentWeak: ':alpha<0.75<@fg',
    fgTransparent: ':alpha<0.5<@fg',
    fgHighlighted: ':lighten<3<@fg',
    fgOnAccent: '#fff',
    divider: 'rgba(255, 255, 255, 0.1)',
    indicator: '@accent',
    panel: ':lighten<3<@bg',
    panelHighlight: ':lighten<3<@panel',
    panelHeaderBg: ':lighten<3<@panel',
    panelHeaderFg: '@fg',
    panelHeaderDivider: 'rgba(0, 0, 0, 0)',
    panelBorder: '" solid 1px var(--divider)',
    acrylicPanel: ':alpha<0.5<@panel',
    windowHeader: ':alpha<0.85<@panel',
    popup: ':lighten<3<@panel',
    shadow: 'rgba(0, 0, 0, 0.3)',
    header: ':alpha<0.7<@panel',
    navBg: '@panel',
    navFg: '@fg',
    navHoverFg: ':lighten<17<@fg',
    navActive: '@accent',
    navIndicator: '@indicator',
    link: '#44a4c1',
    hashtag: '#ff9156',
    mention: '@accent',
    mentionMe: '@mention',
    renote: '#229e82',
    modalBg: 'rgba(0, 0, 0, 0.5)',
    scrollbarHandle: 'rgba(255, 255, 255, 0.2)',
    scrollbarHandleHover: 'rgba(255, 255, 255, 0.4)',
    dateLabelFg: '@fg',
    infoBg: '#253142',
    infoFg: '#fff',
    infoWarnBg: '#42321c',
    infoWarnFg: '#ffbd3e',
    switchBg: 'rgba(255, 255, 255, 0.15)',
    cwBg: '#687390',
    cwFg: '#393f4f',
    cwHoverBg: '#707b97',
    buttonBg: 'rgba(255, 255, 255, 0.05)',
    buttonHoverBg: 'rgba(255, 255, 255, 0.1)',
    buttonGradateA: '@accent',
    buttonGradateB: ':hue<20<@accent',
    switchOffBg: 'rgba(255, 255, 255, 0.1)',
    switchOffFg: ':alpha<0.8<@fg',
    switchOnBg: '@accentedBg',
    switchOnFg: '@accent',
    inputBorder: 'rgba(255, 255, 255, 0.1)',
    inputBorderHover: 'rgba(255, 255, 255, 0.2)',
    listItemHoverBg: 'rgba(255, 255, 255, 0.03)',
    driveFolderBg: ':alpha<0.3<@accent',
    wallpaperOverlay: 'rgba(0, 0, 0, 0.5)',
    badge: '#31b1ce',
    messageBg: '@bg',
    success: '#86b300',
    error: '#ec4137',
    warn: '#ecb637',
    codeString: '#ffb675',
    codeNumber: '#cfff9e',
    codeBoolean: '#c59eff',
    deckDivider: '#000',
    htmlThemeColor: '@bg',
    X2: ':darken<2<@panel',
    X3: 'rgba(255, 255, 255, 0.05)',
    X4: 'rgba(255, 255, 255, 0.1)',
    X5: 'rgba(255, 255, 255, 0.05)',
    X6: 'rgba(255, 255, 255, 0.15)',
    X7: 'rgba(255, 255, 255, 0.05)',
    X8: ':lighten<5<@accent',
    X9: ':darken<5<@accent',
    X10: ':alpha<0.4<@accent',
    X11: 'rgba(0, 0, 0, 0.3)',
    X12: 'rgba(255, 255, 255, 0.1)',
    X13: 'rgba(255, 255, 255, 0.15)',
    X14: ':alpha<0.5<@navBg',
    X15: ':alpha<0<@panel',
    X16: ':alpha<0.7<@panel',
    X17: ':alpha<0.8<@bg',
  },
}
`;
export const baseDarkThemeParsed: Theme = JSON5.parse(baseDarkThemeString);

export const baseDarkThemeCompiled = compile(baseDarkThemeParsed);

export const baseLightThemeString = `// ライトテーマのベーステーマ
// このテーマが直接使われることは無い
{
  id: 'light',

  name: 'Light',
  author: 'syuilo',
  desc: 'Default light theme',
  kind: 'light',

  props: {
    accent: '#86b300',
    accentDarken: ':darken<10<@accent',
    accentLighten: ':lighten<10<@accent',
    accentedBg: ':alpha<0.15<@accent',
    focus: ':alpha<0.3<@accent',
    bg: '#fff',
    acrylicBg: ':alpha<0.5<@bg',
    fg: '#5f5f5f',
    fgTransparentWeak: ':alpha<0.75<@fg',
    fgTransparent: ':alpha<0.5<@fg',
    fgHighlighted: ':darken<3<@fg',
    fgOnAccent: '#fff',
    divider: 'rgba(0, 0, 0, 0.1)',
    indicator: '@accent',
    panel: ':lighten<3<@bg',
    panelHighlight: ':darken<3<@panel',
    panelHeaderBg: ':lighten<3<@panel',
    panelHeaderFg: '@fg',
    panelHeaderDivider: 'rgba(0, 0, 0, 0)',
    panelBorder: '" solid 1px var(--divider)',
    acrylicPanel: ':alpha<0.5<@panel',
    windowHeader: ':alpha<0.85<@panel',
    popup: ':lighten<3<@panel',
    shadow: 'rgba(0, 0, 0, 0.1)',
    header: ':alpha<0.7<@panel',
    navBg: '@panel',
    navFg: '@fg',
    navHoverFg: ':darken<17<@fg',
    navActive: '@accent',
    navIndicator: '@indicator',
    link: '#44a4c1',
    hashtag: '#ff9156',
    mention: '@accent',
    mentionMe: '@mention',
    renote: '#229e82',
    modalBg: 'rgba(0, 0, 0, 0.3)',
    scrollbarHandle: 'rgba(0, 0, 0, 0.2)',
    scrollbarHandleHover: 'rgba(0, 0, 0, 0.4)',
    dateLabelFg: '@fg',
    infoBg: '#e5f5ff',
    infoFg: '#72818a',
    infoWarnBg: '#fff0db',
    infoWarnFg: '#8f6e31',
    switchBg: 'rgba(0, 0, 0, 0.15)',
    cwBg: '#b1b9c1',
    cwFg: '#fff',
    cwHoverBg: '#bbc4ce',
    buttonBg: 'rgba(0, 0, 0, 0.05)',
    buttonHoverBg: 'rgba(0, 0, 0, 0.1)',
    buttonGradateA: '@accent',
    buttonGradateB: ':hue<20<@accent',
    switchOffBg: 'rgba(0, 0, 0, 0.1)',
    switchOffFg: '@panel',
    switchOnBg: '@accent',
    switchOnFg: '@fgOnAccent',
    inputBorder: 'rgba(0, 0, 0, 0.1)',
    inputBorderHover: 'rgba(0, 0, 0, 0.2)',
    listItemHoverBg: 'rgba(0, 0, 0, 0.03)',
    driveFolderBg: ':alpha<0.3<@accent',
    wallpaperOverlay: 'rgba(255, 255, 255, 0.5)',
    badge: '#31b1ce',
    messageBg: '@bg',
    success: '#86b300',
    error: '#ec4137',
    warn: '#ecb637',
    codeString: '#b98710',
    codeNumber: '#0fbbbb',
    codeBoolean: '#62b70c',
    deckDivider: ':darken<3<@bg',
    htmlThemeColor: '@bg',
    X2: ':darken<2<@panel',
    X3: 'rgba(0, 0, 0, 0.05)',
    X4: 'rgba(0, 0, 0, 0.1)',
    X5: 'rgba(0, 0, 0, 0.05)',
    X6: 'rgba(0, 0, 0, 0.25)',
    X7: 'rgba(0, 0, 0, 0.05)',
    X8: ':lighten<5<@accent',
    X9: ':darken<5<@accent',
    X10: ':alpha<0.4<@accent',
    X11: 'rgba(0, 0, 0, 0.1)',
    X12: 'rgba(0, 0, 0, 0.1)',
    X13: 'rgba(0, 0, 0, 0.15)',
    X14: ':alpha<0.5<@navBg',
    X15: ':alpha<0<@panel',
    X16: ':alpha<0.7<@panel',
    X17: ':alpha<0.8<@bg',
  },
}
`;
export const baseLightThemeParsed: Theme = JSON5.parse(baseLightThemeString);

export const baseLightThemeCompiled = compile(baseLightThemeParsed);

import tinycolor from 'tinycolor2';

function compile(theme: Theme): Record<string, string> {
	function getColor(val: string): tinycolor.Instance {
		// ref (prop)
		if (val[0] === '@') {
			return getColor(theme.props[val.substring(1)]);
		}

		// ref (const)
		else if (val[0] === '$') {
			return getColor(theme.props[val]);
		}

		// func
		else if (val[0] === ':') {
			const parts = val.split('<');
			const func = parts.shift()?.substring(1);
			const arg = parseFloat(parts.shift() ?? '');
			const color = getColor(parts.join('<'));

			switch (func) {
				case 'darken':
					return color.darken(arg);
				case 'lighten':
					return color.lighten(arg);
				case 'alpha':
					return color.setAlpha(arg);
				case 'hue':
					return color.spin(arg);
				case 'saturate':
					return color.saturate(arg);
			}
		}

		// other case
		return tinycolor(val);
	}

	const props: Record<string, string> = {};

	for (const [k, v] of Object.entries(theme.props)) {
		if (k.startsWith('$')) continue; // ignore const
		if (k === 'panelBorder') continue; // ignore panelBorder
		props[k] = v.startsWith('"') ? v.replace(/^"\s*/, '') : genValue(getColor(v));
	}

	return props;
}

function genValue(c: tinycolor.Instance): string {
	return c.toRgbString();
}

export function applyTheme(theme: Theme) {
	if (!document) throw new Error('document is not defined');

	const colorSchema = theme.base === 'dark' ? 'dark' : 'light';

	// Deep copy
	const _theme = { ...theme };

	if (_theme.base) {
		const base = [baseLightThemeParsed, baseDarkThemeParsed].find((x) => x.id === _theme.base);
		if (base) _theme.props = Object.assign({}, base.props, _theme.props);
	}

	const props = compile(_theme);

	for (const [k, v] of Object.entries(props)) {
		document.documentElement.style.setProperty(`--${k}`, v.toString());
	}
}

export function parseTheme(rawTheme: string): Theme {
	const theme = JSON5.parse(rawTheme);
	if (!theme.base) throw new Error('base property is required');
	if (!theme.props) throw new Error('props property is required');
	return theme;
}

function parseAndApplyTheme(rawTheme: string): void {
	if (!document.documentElement) throw new Error('This should be called in browser environment');
	const theme = JSON5.parse(rawTheme);
	applyTheme(theme);
}
