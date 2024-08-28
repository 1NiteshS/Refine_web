import React from "react";
import { Typography, Spin } from "antd"; // Import Typography directly from antd
import { useOne } from "@refinedev/core";
import { BaseRecord } from "@refinedev/core"; // Ensure you import BaseRecord if needed

const { Title, Paragraph } = Typography;

const FoodShow: React.FC<{ id: string }> = ({ id }) => {
    const { data, isLoading } = useOne<BaseRecord>({
        resource: "foods",
        id,
    });

    // Handle loading state
    if (isLoading) return <Spin size="large" />;

    // Ensure data is not undefined before accessing properties
    const food = data?.data; // Access the actual data

    if (!food) return <div>No data found</div>; // Handle case where data is still undefined

    return (
        <div>
            <Title>{food.name}</Title>
            <Paragraph>{food.description}</Paragraph>
        </div>
    );
};

export default FoodShow;
