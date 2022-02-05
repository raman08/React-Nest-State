import { useTable, useSortBy, usePagination } from 'react-table';
import {
	Table as CTable,
	Thead,
	Tr,
	Th,
	chakra,
	Tbody,
	Td,
	Container,
	Box,
	Button,
	Select,
	Divider,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

import { useState, useEffect } from 'react';

const EditableCell = ({
	value: initialValue,
	row: { index },
	column: { id },
	updateMyData,
}) => {
	const [value, setValue] = useState(initialValue);

	const onChange = e => {
		setValue(e.target.value);
	};

	const onBlur = () => {
		updateMyData(index, id, value);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const defaultColumn = {
	Cell: EditableCell,
};

const Table = ({ columns, data, updateMyData, skipPageReset }) => {
	const tableInstanse = useTable(
		{
			columns,
			data,
			autoResestPage: !skipPageReset,
			defaultColumn,
			updateMyData,
		},
		useSortBy,
		usePagination
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = tableInstanse;

	return (
		<>
			<Container>
				<CTable {...getTableProps} variant={'striped'} type="cyan">
					<Thead>
						{headerGroups.map(headerGroup => (
							<Tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<Th
										{...column.getHeaderProps(
											column.getSortByToggleProps()
										)}
										isNumeric={column.isNumeric}
									>
										{column.render('Header')}
										<chakra.span pl="4">
											{column.isSorted ? (
												column.isSortedDesc ? (
													<TriangleDownIcon aria-label="sorted descending" />
												) : (
													<TriangleUpIcon aria-label="sorted ascending" />
												)
											) : null}
										</chakra.span>
									</Th>
								))}
							</Tr>
						))}
					</Thead>
					<Tbody {...getTableBodyProps()}>
						{page.map(row => {
							prepareRow(row);
							return (
								<Tr {...row.getRowProps()}>
									{row.cells.map(cell => (
										<Td
											{...cell.getCellProps()}
											isNumeric={cell.column.isNumeric}
										>
											{cell.render('Cell')}
										</Td>
									))}
								</Tr>
							);
						})}
					</Tbody>
				</CTable>

				<Box className="pagination" mt={'10'}>
					<Button
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
						margin={'0.5'}
					>
						{'<<'}
					</Button>
					<Button
						onClick={() => previousPage()}
						margin={'0.5'}
						disabled={!canPreviousPage}
					>
						{'<'}
					</Button>
					<Button
						onClick={() => nextPage()}
						disabled={!canNextPage}
						margin={'0.5'}
					>
						{'>'}
					</Button>
					<Button
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
						margin={'0.5'}
					>
						{'>>'}
					</Button>
					<span style={{ margin: '5px' }}>
						Page
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>
					</span>
					<Select
						size={'sm'}
						value={pageSize}
						onChange={e => {
							setPageSize(Number(e.target.value));
						}}
						margin="1"
					>
						{[10, 20].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</Select>
				</Box>
			</Container>
			<Divider />
		</>
	);
};

export default Table;
