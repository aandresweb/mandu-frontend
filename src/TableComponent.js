import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Select } from "antd";

const { Option } = Select;
const { Search } = Input;

function TableComponent() {
	const [loading, setLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [filterColumn, setFilterColumn] = useState("");

	const requestData = () => {
		fetch("http://127.0.0.1:8000/api/divisiones")
			.then((response) => response.json())
			.then((data) => setDataSource(data))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		setLoading(true);
		requestData();
	}, []);

	const columns = [
		{
			title: "Nombre",
			dataIndex: "nombre",
			sorter: (a, b) => a.nombre.localeCompare(b.nombre),
		},
		{
			title: "División Superior",
			dataIndex: "division_superior",

			sorter: (a, b) => a.division_superior.localeCompare(b.division_superior),
			filters: [
				...dataSource.map((data) => {
					return {
						text: data.nombre,
						value: data.nombre,
					};
				}),
			],
			onFilter: (value, record) => {
				if (record.division_superior_data) {
					return record.division_superior_data.nombre === value;
				}

				return false;
			},

			render: (text, record) => {
				if (record.division_superior_data) {
					return record.division_superior_data.nombre;
				} else {
					return "No aplica";
				}
			},
		},
		{
			title: "Colaboradores",
			dataIndex: "colaboradores",
			sorter: (a, b) => a.colaboradores > b.colaboradores,
		},
		{
			title: "Subdivisiones",
			dataIndex: "subdivisiones",
			sorter: (a, b) => a.subdivisiones > b.subdivisiones,
		},

		{
			title: "Embajador",
			dataIndex: "embajador",
			sorter: (a, b) => a.embajador.localeCompare(b.embajador),
		},
	];

	const searchDivisiones = (e) => {
		let value = e.target.value;
		if (value != "") {
			let filteredDivisiones = dataSource;
			if (filterColumn != 0) {
				filteredDivisiones = dataSource.filter((data) => {
					return data[filterColumn].toLowerCase().includes(value.toLowerCase());
				});
			} else {
				filteredDivisiones = dataSource.filter((data) => {
					return (
						data.embajador.toLowerCase().includes(value.toLowerCase()) ||
						data.nombre.toLowerCase().includes(value.toLowerCase())
					);
				});
			}

			setDataSource(filteredDivisiones);
		} else {
			requestData();
		}
	};

	const filterColumnSelectChange = (value) => {
		setFilterColumn(value);
	};

	return (
		<>
			<div className="table-actions">
				<Select
					defaultValue=""
					style={{ width: 200 }}
					onChange={filterColumnSelectChange}
				>
					<Option value="">Columnas</Option>
					<Option value="nombre">Nombre</Option>
					<Option value="division_superior">Division superior</Option>
					<Option value="subdivisiones">Subdivisiones</Option>
					<Option value="colaboradores">Colaboradores</Option>
					<Option value="embajador">Embajador</Option>
				</Select>
				<Search
					placeholder="Buscar"
					onChange={searchDivisiones}
					style={{ width: 200 }}
				/>
			</div>
			<Table
				rowSelection={{
					hideSelectAll: true,
					selectedRowKeys,
					type: "checkbox",
					onSelect: (record, selected) => {
						if (selectedRowKeys.includes(record.id)) {
							setSelectedRowKeys(
								selectedRowKeys.filter((id) => id != record.id),
							);
						} else {
							setSelectedRowKeys([...selectedRowKeys, record.id]);
						}
					},
				}}
				bordered
				loading={loading}
				columns={columns}
				rowKey={(record) => record.id}
				dataSource={dataSource}
				size="small"
				pagination={{
					current: page,
					pageSize: pageSize,
					onChange: (page, pageSize) => {
						setPage(page);
						setPageSize(pageSize);
					},
				}}
			/>
		</>
	);
}

export default TableComponent;
