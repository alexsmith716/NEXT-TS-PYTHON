import { createGlobalStyle, css } from 'styled-components';
import { colors } from './Colors';

const bodyTheme = css`
	color: ${(props): string => props.theme.app.textColor};
	background-color: ${(props): string => props.theme.app.backgroundColor};
`;

const spinnerTheme = css`
	border: 0.25em solid ${(props): string => props.theme.app.spinnerColor};
`;

export const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	body {
		padding-top: 56px;
		margin: 0;
		font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
		font-size: 16px;
		font-weight: 400;
		line-height: 1.5;
		text-align: left;
		${bodyTheme}
	}

	hr {
		box-sizing: content-box;
		height: 0;
		overflow: visible;
	}

	img {
		vertical-align: middle;
		border-style: none;
	}

	p {
		margin-top: 0;
		margin-bottom: 1rem;
	}

	pre {
		white-space: pre-wrap;
	}

	.time-container-grid {
		display: grid;
		grid-template-columns: repeat(3, auto);
		grid-gap: 5px;
	}

	.time-container-grid-styled {
		border: 2px solid #b0c4de;
		padding: 16px;
	}

	.formFieldError {
		border: 2px solid #dc3545;
	}

	.comment-grid-container {
		display: grid;
		row-gap: 10px;
	}

	.comment-grid-container-gist {
		display: grid;
		row-gap: 4px;
	}

	.table-bridge-ratings-wrapper {
		width: 100%;
		//margin: 0 auto;
	}

	.table-bridge-ratings-csv-repeat-5 {
		grid-template-columns: repeat(5, auto);
	}

	.table-bridge-ratings-csv-repeat-6 {
		grid-template-columns: repeat(6, auto);
	}

	.table-bridge-ratings-dataframe-repeat-9 {
		grid-template-columns: repeat(9, auto);
	}

	.table-bridge-ratings-display {
		display: grid;
		//display: inline-grid;
		border-top: 1px solid ${colors.graySix};
		border-left: 1px solid ${colors.graySix};
	}

	.table-bridge-ratings-cell {
		//width: 6.5vw;
		//height: 3vw;
		padding: 2px 4px 2px 4px;
		//border: 1px solid #009900;
		border-collapse: collapse;
		overflow: hidden;
		border-bottom: 1px solid ${colors.graySix};
		border-right: 1px solid ${colors.graySix};
	}

	.table-bridge-ratings-column-header {
		background-color: ${colors.grayEight};
		color: #fff;
		padding-top: 3px;
		padding-bottom: 3px;
	}

	.table-bridge-ratings-item {
		font-weight: bold;
		text-align: right;
		//margin-top: 0.5vw;
		font-size: .85vw;
	}

	.block-element-p {
		margin-top: 16px;
		margin-right: 16px;
		margin-bottom: 16px;
		margin-left: 16px;
	}

	.form-control {
		display: block;
		width: 100%;
		padding: 0.38rem 0.75rem;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: #212529;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: 0.25rem;
	}

	.container {
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
		margin-right: auto;
		margin-left: auto;
	}

	@media (min-width: 576px) {
		.container {
			max-width: 540px;
		}
	}

	@media (min-width: 768px) {
		.container {
			max-width: 720px;
		}
	}

	@media (min-width: 993px) {
		.container {
			max-width: 960px;
		}
	}

	@media (min-width: 1201px) {
		.container {
			max-width: 1140px;
		}
	}

	//todo make 'minmax' dynamic
	.row-grid-rickandmorty {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		column-gap: 5px;
	}

	.row-grid {
		display: grid;
		margin-right: -15px;
		margin-left: -15px;
	}

	.grid-two {
		grid-template-columns: repeat(6, 1fr);
	}

	.grid-six {
		grid-template-columns: repeat(2, 1fr);
	}

	@media screen and (max-width: 992px) {
		.grid-two {
			grid-template-columns: 1fr;
		}

		.grid-six {
			grid-template-columns: 1fr;
		}
	}

	.col-grid {
		position: relative;
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
	}

	.row-flex {
		display: flex;
		flex-wrap: wrap;
		margin-right: -15px;
		margin-left: -15px;
	}

	@media screen and (max-width: 992px) {
		.row-flex {
			display: inline-block;
		}
	}

	.card-container-grid {
		display: grid;
		grid-template-columns: repeat(3, auto);
		grid-gap: 1.5rem;
	}

	@media screen and (max-width: 992px) {
		.card-container-grid {
			grid-template-columns: 1fr;
		}
	}

	.sub-container {
		width: 100%;
		margin-right: auto;
		margin-left: auto;
	}

	.display-flex {
		display: flex;
	}

	.flex-wrap {
		flex-wrap: wrap;
	}
	
	.flex-nowrap {
		flex-wrap: nowrap;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.container-border-1-radius-1 {
		border: 1px solid ${colors.graySix};
		border-radius: 1px;
		background: ${colors.white};
	}

	.container-padding-2-border-1 {
		border: 1px solid ${colors.graySix};
		border-radius: 3px;
		background: ${colors.white};
	}

	.star-rating {
		gap: 4px;
		align-items: center;
		font-size: 14px;
		font-weight: 600;
	}

	.container-padding-border-1 {
		padding: 10px 10px;
		border: 1px solid #0d6efd;
		background: #ffe4b5;
	}

	.container-padding-border-radius-1 {
		padding: 10px 10px;
		border: 1px solid #090;
		border-radius: 3px;
	}

	.container-padding-border-radius-2 {
		padding: 10px 10px;
		border: 2px solid #b0c4de;
		border-radius: 3px;
	}

	.container-padding-4-radius-6 {
		padding: 4px;
		border-radius: 6px;
	}

	.container-padding-radius-10 {
		padding: 10px;
		border-radius: 10px;
	}

	.container-overflow-height-small {
		overflow: auto;
		height: 210px;
	}

	.width-fit-content {
		width: fit-content;
	}

	.align-items-start {
		align-items: flex-start;
	}

	.align-items-center {
		align-items: center;
	}

	.align-items-end {
		align-items: flex-end;
	}

	.align-items-stretch {
		align-items: stretch;
	}

	.align-items-baseline {
		align-items: baseline;
	}

	.align-self-start {
		align-self: flex-start;
	}

	.align-self-center {
		align-self: center;
	}

	.align-self-end {
		align-self: flex-end;
	}

	.justify-content-start {
		justify-content: flex-start;
	}

	.justify-content-end {
		justify-content: flex-end;
	}

	.justify-content-center {
		justify-content: center;
	}

	.justify-content-space-between {
		justify-content: space-between;
	}

	.justify-content-space-around {
		justify-content: space-around;
	}

	.align-content-start {
		align-content: flex-start;
	}

	.align-content-end {
		align-content: flex-end;
	}

	.align-content-center {
		align-content: center;
	}

	.align-content-space-between {
		align-content: space-between;
	}

	.align-content-space-around {
		align-content: space-around;
	}

	.align-content-stretch {
		align-content: stretch;
	}

	.h-100 {
		height: 100%;
	}

	.text-center {
		text-align: center;
	}

	.img-fluid {
		max-width: 100%;
		height: auto;
	}

	.rounded {
		border-radius: .25rem;
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		min-width: 0;
		background-color: #fff;
		background-clip: border-box;
		border: 1px solid rgba(0, 0, 0, 0.13);
		border-radius: 0.25rem;
	}

	.card-body {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		min-height: 1px;
		padding: 1.25rem;
	}

	.card-footer {
		border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
		padding: 0.75rem 1.25rem;
		background-color: rgba(0, 0, 0, 0.03);
		border-top: 1px solid rgba(0, 0, 0, 0.13);
	}

	.col-one,
	.col-two,
	.col-three,
	.col-four,
	.col-five,
	.col-six,
	.col-seven,
	.col-eight,
	.col-nine,
	.col-ten,
	.col-eleven,
	.col-twelve {
		position: relative;
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
	}

	.col-one {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 8.33%;
		max-width: 8.33%;
	}

	.col-two {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 16.67%;
		max-width: 16.67%;
	}

	.col-three {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 25%;
		max-width: 25%;
	}

	.col-four {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 33.33%;
		max-width: 33.33%;
	}

	.col-five {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 41.67%;
		max-width: 41.67%;
	}

	.col-six {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 50%;
		max-width: 50%;
	}

	.col-seven {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 58.33%;
		max-width: 58.33%;
	}

	.col-eight {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 66.67%;
		max-width: 66.67%;
	}

	.col-nine {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 75%;
		max-width: 75%;
	}

	.col-ten {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 83.33%;
		max-width: 83.33%;
	}

	.col-eleven {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 91.67%;
		max-width: 91.67%;
	}

	.col-twelve {
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: 100%;
		max-width: 100%;
	}

	@media screen and (max-width: 992px) {
		.col-one,
		.col-two,
		.col-three,
		.col-four,
		.col-five,
		.col-six,
		.col-seven,
		.col-eight,
		.col-nine,
		.col-ten,
		.col-eleven,
		.col-twelve {
			max-width: 100%;
		}
	}

	.mt-1 {
		margin-top: 0.10rem;
	}

	.mt-2 {
		margin-top: 0.75rem;
	}

	.mt-3 {
		margin-top: 1rem;
	}

	.mt-4 {
		margin-top: 1.5rem;
	}

	.mt-5 {
		margin-top: 3rem;
	}

	.mb-1 {
		margin-bottom: .25rem;
	}

	.mb-2 {
		margin-bottom: .5rem;
	}

	.mb-3 {
		margin-bottom: 1rem;
	}

	.mb-4 {
		margin-bottom: 1.5rem;
	}

	.mb-5 {
		margin-bottom: 3rem;
	}

	.ml-2 {
		margin-left: .5rem;
	}

	.mr-2 {
		margin-right: .5rem;
	}

	.m-2 {
		margin: 0.75rem;
	}

	.m-3 {
		margin: 1rem;
	}

	.m-4 {
		margin-bottom: 1.5rem;
	}

	.m-5 {
		margin-bottom: 3rem;
	}

	.pl-1 {
		padding-left: 0.25rem;
	}

	.pr-1 {
		padding-right: 0.25rem;
	}

	.pt-2 {
		padding-top: 0.75rem;
	}

	.pt-3 {
		padding-top: 1rem;
	}

	.pt-4 {
		padding-top: 1.5rem;
	}

	.pt-5 {
		padding-top: 3rem;
	}

	.pb-2 {
		padding-bottom: 0.75rem;
	}

	.pb-3 {
		padding-bottom: 1rem;
	}

	.pb-4 {
		padding-bottom: 1.5rem;
	}

	.pb-5 {
		padding-bottom: 3rem;
	}

	.p-0 {
		padding: 0;
	}

	.p-2 {
		padding: 0.75rem;
	}

	.p-3 {
		padding: 1rem;
	}

	.p-4 {
		padding: 1.5rem;
	}

	.p-5 {
		padding: 3rem;
	}

	.cursor-pointer {
		cursor: pointer;
	}

	.btn {
		display: inline-block;
		font-weight: 400;
		text-align: center;
		vertical-align: middle;
		user-select: none;
		cursor: pointer;
		padding: 0.38rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.25rem;
		color: #fff;
		border: 1px solid transparent;
		background-color: #0d6efd;
	}

	.btn-tiny {
		padding: 0.2rem 0.4rem;
		font-size: 0.78rem;
		line-height: 1;
		border-radius: 0.2rem;
	}

	.btn-sm {
		padding: 0.25rem 0.5rem;
		font-size: 0.88rem;
		line-height: 1.25;
		border-radius: 0.2rem;
	}

	.btn-md {
		padding: 0.38rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.25rem;
	}

	.btn-lg {
		font-size: 1.25rem;
	}

	.btn-primary {
		color: #fff;
		background-color: #0d6efd;
	}

	.btn-secondary {
		color: #fff;
		background-color: #6c757d;
	}

	.btn-success {
		color: #fff;
		background-color: #198754;
	}

	.btn-danger {
		color: #fff;
		background-color: #dc3545;
	}

	.btn-warning {
		color: #030303;
		background-color: #ffc107;
	}

	.btn-info {
		color: #fff;
		background-color: #0dcaf0;
	}

	.btn-light {
		color: #030303;
		background-color: #fcfcfc;
		border-color: #dbdbdb;
	}

	.disabled {
		pointer-events: none;
		opacity: 0.45;
	}

	.overflow-wrap-break-word {
		overflow-wrap: break-word;
	}

	.overflow-wrap-anywhere {
		overflow-wrap: anywhere;
	}

	.word-break-all {
		word-break: break-all;
	}

	.text-overflow-ellipsis-one {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.text-overflow-ellipsis {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.spinner-progress {
		pointer-events: none;
		position: absolute;
		z-index: 9999;
		top: 11px;
		right: 6px;
	}

	@keyframes spinner {
		to { transform: rotate(360deg); }
	}

	.spinner {
		position: fixed;
		display: inline-block;
		width: 2rem;
		height: 2rem;
		vertical-align: text-bottom;
		${spinnerTheme}
		border-right-color: transparent;
		border-radius: 50%;
		animation: spinner 0.75s linear infinite;
	}

	.spinner-sm {
		width: 1rem;
		height: 1rem;
		border-width: 0.2em;
	}

	.text-color-white {
		color: #fff;
	}

	.bg-progress-blue {
		opacity: 0.8;
		background-color: #17a2b8;
	}

	.bg-warn-red {
		opacity: 0.8;
		background-color: #dc3545;
	}

	.bg-lightskyblue-1 {
		background-color: #b0e2ff;
	}

	.bg-lavender {
		background-color: #e6e6fa;
	}

	.bg-syracuse-orange {
		background-color: ${colors.syracuseOrange};
	}

	.bg-rutgers-scarlet {
		background-color: ${colors.rutgersScarlet};
	}

	.bg-color-ivory {
		background-color: #fffff0;
	}

	.bg-color-yellow {
		background-color: #ff0;
	}

	.bg-color-purple {
		background-color: #9b30ff;
	}

	.bg-color-slategray {
		background-color: #708090;
	}

	.bg-color-darkseagreen-1 {
		background-color: #c1ffc1;
	}

	.bg-color-olivedrab-2 {
		background-color: #b3ee3a;
	}

	.bg-color-mediumorchid-1 {
		background-color: #e066ff;
	}

	.bg-color-turquoise-1 {
		background-color: #00f5ff;
	}

	.bg-color-darkgoldenrod-1 {
		background-color: #ffb90f;
	}

	.bg-color-lightcoral {
		background-color: #f08080;
	}

	.bg-color-mediumspringgreen {
		background-color: #00fa9a;
	}

	.bg-color-plum {
		background-color: #dda0dd;
	}

	.bg-color-banana {
		background-color: #e3cf57;
	}

	.bg-color-cadetblue {
		background-color: #8ee5ee;
	}

	.bg-row-color-even {
		background-color: ${colors.grayThree};
	}

	.bg-row-color-odd {
		background-color: ${colors.grayOne};
	}
`;
