// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

const tailwindMisskeyTheme = plugin(undefined, {
	theme: {
		extend: {
			colors: {
				accent: 'var(--accent)',
				accentDarken: 'var(--accentDarken)',
				accentLighten: 'var(--accentLighten)',
				accentedBg: 'var(--accentedBg)',
				focus: 'var(--focus)',
				bg: 'var(--bg)',
				acrylicBg: 'var(--acrylicBg)',
				fg: 'var(--fg)',
				fgTransparentWeak: 'var(--fgTransparentWeak)',
				fgTransparent: 'var(--fgTransparent)',
				fgHighlighted: 'var(--fgHighlighted)',
				fgOnAccent: 'var(--fgOnAccent)',
				divider: 'var(--divider)',
				indicator: 'var(--indicator)',
				panel: 'var(--panel)',
				panelHighlight: 'var(--panelHighlight)',
				panelHeaderBg: 'var(--panelHeaderBg)',
				panelHeaderFg: 'var(--panelHeaderFg)',
				panelHeaderDivider: 'var(--panelHeaderDivider)',
				acrylicPanel: 'var(--acrylicPanel)',
				windowHeader: 'var(--windowHeader)',
				popup: 'var(--popup)',
				shadow: 'var(--shadow)',
				header: 'var(--header)',
				navBg: 'var(--navBg)',
				navFg: 'var(--navFg)',
				navHoverFg: 'var(--navHoverFg)',
				navActive: 'var(--navActive)',
				navIndicator: 'var(--navIndicator)',
				link: 'var(--link)',
				hashtag: 'var(--hashtag)',
				mention: 'var(--mention)',
				mentionMe: 'var(--mentionMe)',
				renote: 'var(--renote)',
				modalBg: 'var(--modalBg)',
				scrollbarHandle: 'var(--scrollbarHandle)',
				scrollbarHandleHover: 'var(--scrollbarHandleHover)',
				dateLabelFg: 'var(--dateLabelFg)',
				infoBg: 'var(--infoBg)',
				infoFg: 'var(--infoFg)',
				infoWarnBg: 'var(--infoWarnBg)',
				infoWarnFg: 'var(--infoWarnFg)',
				switchBg: 'var(--switchBg)',
				cwBg: 'var(--cwBg)',
				cwFg: 'var(--cwFg)',
				cwHoverBg: 'var(--cwHoverBg)',
				buttonBg: 'var(--buttonBg)',
				buttonHoverBg: 'var(--buttonHoverBg)',
				buttonGradateA: 'var(--buttonGradateA)',
				buttonGradateB: 'var(--buttonGradateB)',
				switchOffBg: 'var(--switchOffBg)',
				switchOffFg: 'var(--switchOffFg)',
				switchOnBg: 'var(--switchOnBg)',
				switchOnFg: 'var(--switchOnFg)',
				inputBorder: 'var(--inputBorder)',
				inputBorderHover: 'var(--inputBorderHover)',
				listItemHoverBg: 'var(--listItemHoverBg)',
				driveFolderBg: 'var(--driveFolderBg)',
				wallpaperOverlay: 'var(--wallpaperOverlay)',
				badge: 'var(--badge)',
				messageBg: 'var(--messageBg)',
				success: 'var(--success)',
				error: 'var(--error)',
				warn: 'var(--warn)',
				codeString: 'var(--codeString)',
				codeNumber: 'var(--codeNumber)',
				codeBoolean: 'var(--codeBoolean)',
				deckDivider: 'var(--deckDivider)',
				htmlThemeColor: 'var(--htmlThemeColor)',
				X2: 'var(--X2)',
				X3: 'var(--X3)',
				X4: 'var(--X4)',
				X5: 'var(--X5)',
				X6: 'var(--X6)',
				X7: 'var(--X7)',
				X8: 'var(--X8)',
				X9: 'var(--X9)',
				X10: 'var(--X10)',
				X11: 'var(--X11)',
				X12: 'var(--X12)',
				X13: 'var(--X13)',
				X14: 'var(--X14)',
				X15: 'var(--X15)',
				X16: 'var(--X16)',
				X17: 'var(--X17)'
			}
		}
	}
});

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [tailwindMisskeyTheme],
	daisyui: {
		themes: ['dark']
	}
};
