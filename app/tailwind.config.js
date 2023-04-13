// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

const tailwindMisskeyTheme = plugin(undefined, {
	theme: {
		extend: {
			colors: {
				mk: {
					success: 'var(--success)',
					error: 'var(--error)',
					warn: 'var(--warn)',
					accent: {
						DEFAULT: 'var(--accent)',
						darken: 'var(--accentDarken)',
						lighten: 'var(--accentLighten)',
						glass: 'var(--accentedBg)',
						content: 'var(--fgOnAccent)',
						focus: 'var(--focus)'
					},
					base: {
						DEFAULT: 'var(--bg)',
						glass: 'var(--acrylicBg)',
						content: 'var(--fg)',
						'content-glass-weak': 'var(--fgTransparentWeak)',
						'content-glass': 'var(--fgTransparent)',
						'content-highlighted': 'var(--fgHighlighted)'
					},
					panel: {
						DEFAULT: 'var(--panel)',
						highlight: 'var(--panelHighlight)',
						header: 'var(--panelHeaderBg)',
						'header-content': 'var(--panelHeaderFg)',
						'header-divider': 'var(--panelHeaderDivider)',
						glass: 'var(--acrylicPanel)'
					},
					nav: {
						DEFAULT: 'var(--navBg)',
						content: 'var(--navFg)',
						'content-hover': 'var(--navHoverFg)',
						active: 'var(--navActive)',
						indicator: 'var(--navIndicator)'
					},
					scrollbar: {
						handle: 'var(--scrollbarHandle)',
						'handle-hover': 'var(--scrollbarHandleHover)'
					},
					info: {
						DEFAULT: 'var(--infoBg)',
						content: 'var(--infoFg)',
						warn: {
							DEFAULT: 'var(--infoWarnBg)',
							content: 'var(--infoWarnFg)'
						}
					},
					cw: {
						DEFAULT: 'var(--cwBg)',
						content: 'var(--cwFg)',
						hover: 'var(--cwHoverBg)'
					},
					button: {
						DEFAULT: 'var(--buttonBg)',
						hover: 'var(--buttonHoverBg)',
						'gradate-a': 'var(--buttonGradateA)',
						'gradate-b': 'var(--buttonGradateB)'
					},
					switch: {
						off: 'var(--switchOffBg)',
						'off-content': 'var(--switchOffFg)',
						on: 'var(--switchOnBg)',
						'on-content': 'var(--switchOnFg)'
					},
					input: {
						edge: 'var(--inputBorder)',
						'edge-hover': 'var(--inputBorderHover)'
					},
					misc: {
						header: 'var(--header)',
						windowHeader: 'var(--windowHeader)',
						popup: 'var(--popup)',
						shadow: 'var(--shadow)',
						switchBg: 'var(--switchBg)',
						divider: 'var(--divider)',
						indicator: 'var(--indicator)',
						link: 'var(--link)',
						hashtag: 'var(--hashtag)',
						mention: 'var(--mention)',
						mentionMe: 'var(--mentionMe)',
						renote: 'var(--renote)',
						modalBg: 'var(--modalBg)',
						dateLabelFg: 'var(--dateLabelFg)',
						listItemHoverBg: 'var(--listItemHoverBg)',
						driveFolderBg: 'var(--driveFolderBg)',
						wallpaperOverlay: 'var(--wallpaperOverlay)',
						badge: 'var(--badge)',
						messageBg: 'var(--messageBg)',
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
		}
	}
});

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [tailwindMisskeyTheme, require('@tailwindcss/forms')]
};
