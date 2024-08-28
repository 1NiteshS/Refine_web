import React from "react";
import { List, Table as AntdTable } from "antd"; // Import Table from antd
import { useList } from "@refinedev/core";
import { BaseRecord } from "@refinedev/core"; // Ensure you import BaseRecord if needed

const FoodList: React.FC = () => {
    // Use `useList` to fetch the data
    const { data, isLoading } = useList({
        resource: "foods",
    });

    // Extract the records from the data response
    const records = data?.data || []; // Adjust according to actual response structure

    return (
        <List>
            <AntdTable
                dataSource={records}
                loading={isLoading}
                rowKey="id" // Ensure you set a unique key for each row
            >
                <AntdTable.Column dataIndex="id" title="ID" />
                <AntdTable.Column dataIndex="name" title="Name" />
                <AntdTable.Column dataIndex="description" title="Description" />
                <AntdTable.Column
                    render={(text, record) => (
                        <a href={`/foods/edit/${record.id}`}>Edit</a>
                    )}
                    title="Actions"
                />
            </AntdTable>
        </List>
    );
};

export default FoodList;
