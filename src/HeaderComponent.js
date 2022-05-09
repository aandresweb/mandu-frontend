import React from "react";
import logo from "./img/logo.svg";
import { DownOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

function HeaderComponent() {
	return (
		<header className="header">
			<div className="header-wrapper">
				<div className="header-left">
					<ul className="header-menu">
						<li className="header-menu__item logo">
							<img src={logo}></img>
						</li>
						<li className="header-menu__item">
							<Button type="link" className="header-button">
								Dashboard
							</Button>
						</li>
						<li className="header-menu__item">
							<Button type="link" className="header-button active">
								Organización
							</Button>
						</li>
						<li className="header-menu__item">
							<Button type="link" className="header-button">
								<Space>
									Modelos
									<DownOutlined />
								</Space>
							</Button>
						</li>
						<li className="header-menu__item">
							<Button type="link" className="header-button">
								<Space>
									Seguimiento
									<DownOutlined />
								</Space>
							</Button>
						</li>
					</ul>
				</div>
				<div className="header-right">
					<ul className="header-menu"></ul>
				</div>
			</div>
		</header>
	);
}

export default HeaderComponent;
