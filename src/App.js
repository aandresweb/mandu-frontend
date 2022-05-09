import "./App.css";

import { Typography, Tabs } from "antd";

import TableComponent from "./TableComponent";
import HeaderComponent from "./HeaderComponent";

const { TabPane } = Tabs;
const { Title } = Typography;

function App() {
	return (
		<div className="App">
			<HeaderComponent />
			<div className="wrapper">
				<Title level={4} className="main-title">
					Organización
				</Title>

				<Tabs defaultActiveKey="1">
					<TabPane tab="Divisiones" key="1">
						<TableComponent></TableComponent>
					</TabPane>
					<TabPane tab="Colaboradores" key="2">
						-
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
}

export default App;
