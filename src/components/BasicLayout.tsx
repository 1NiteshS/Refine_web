// src/components/BasicLayout.tsx
import React from "react";
import { Layout as AntLayout } from "antd";

const { Header, Content, Footer } = AntLayout;

const BasicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AntLayout style={{ minHeight: '100vh' }}>
        <Header className="header">
            <div className="logo" />
        </Header>
        <AntLayout>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2024 Your Company</Footer>
        </AntLayout>
    </AntLayout>
);

export default BasicLayout;
