import React from "react";
import { Form, Input, Button, Spin } from "antd"; // Import directly from antd
import { useCreate } from "@refinedev/core";

const { TextArea } = Input; // Destructure TextArea from Input

const FoodCreate: React.FC = () => {
    const [form] = Form.useForm();
    const { mutate, isLoading } = useCreate({
        resource: "foods",
    });

    const onFinish = async (values: any) => {
        await mutate(values);
    };

    return (
        <div>
            <h1>Create Food</h1>
            {isLoading ? (
                <Spin size="large" />
            ) : (
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter the name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default FoodCreate;
