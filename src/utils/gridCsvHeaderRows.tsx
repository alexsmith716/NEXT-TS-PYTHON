import React, { ReactNode, } from 'react';
import { v4 as uuidv4 } from 'uuid';

export function bridgeRatingsCsvGridColumnHeader(csvTable: any) {
	let items:ReactNode[] = [];
	const bd = csvTable?.data?.split("\n");
	const columnHeaders = bd.shift();
	columnHeaders.split(",").map((columnHeader: string) => (
		items.push(
			<div key={uuidv4()} className="table-bridge-ratings-cell table-bridge-ratings-column-header">
				<div className="table-bridge-ratings-item">{columnHeader}</div>
			</div>
		)
	))
	return items;
};

export function bridgeRatingsCsvGridRowItems(csvTable: any) {
	let items:ReactNode[] = [];
	const bd = csvTable?.data?.split("\n");
	bd.slice(1).map((column: string, index: number) => (
		column.split(",").map((rowItem,) => (
			items.push(
				<div key={uuidv4()} className={`table-bridge-ratings-cell ${index % 2 === 0 ? 'bg-row-color-odd' : 'bg-row-color-even'}`}>
					<div className="table-bridge-ratings-item">{rowItem}</div>
				</div>
			)
		))
	))
	return items;
};
