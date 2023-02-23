//import React, { ReactNode, } from 'react';
//import { v4 as uuidv4 } from 'uuid';
//import { BridgeRatingsDataFrameType, DfTableSchemaFieldType, DfTableDataType } from '../../types';

//export function buildBridgeRatingsDataFrameGrid(data: BridgeRatingsDataFrameType) {
//	let items:ReactNode[] = [];
//	data?.data?.schema.fields.map((headerRow: DfTableSchemaFieldType) => (
//		items.push(
//			<div key={uuidv4()} className="table-bridge-ratings-cell table-bridge-ratings-column-header">
//				<div className="table-bridge-ratings-item">{headerRow.name}</div>
//			</div>
//		)
//	))
//	data?.data?.data.map((column: DfTableDataType, index: number) => (
//		Object.entries(column as DfTableDataType).map(([_, value]) => (
//			items.push(
//				<div key={uuidv4()} className={`table-bridge-ratings-cell ${index % 2 === 0 ? 'bg-row-color-odd' : 'bg-row-color-even'}`}>
//					<div className="table-bridge-ratings-item">{value}</div>
//				</div>
//			)
//		))
//	))
//	return items;
//};

export function buildBridgeRatingsDataFrameGrid() {
	return "foo";
};
