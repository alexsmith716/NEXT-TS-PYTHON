import React, { ReactNode, } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BridgeRatingsType } from '../../types';

export function bridgeRatingsCsvGridColumnHeader(csvTable: BridgeRatingsType) {
	let items:ReactNode[] = [];
	csvTable?.data?.split("\n")?.shift()?.split(",")?.map((columnHeader: string) => (
		items.push(
			<div key={uuidv4()} className="table-bridge-ratings-cell table-bridge-ratings-column-header">
				<div className="table-bridge-ratings-item">{columnHeader}</div>
			</div>
		)
	))
	return items;
};

export function bridgeRatingsCsvGridRowItems(csvTable: BridgeRatingsType) {
	let items:ReactNode[] = [];
	csvTable?.data?.split("\n")?.slice(1)?.map((column: string, index: number) => (
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
