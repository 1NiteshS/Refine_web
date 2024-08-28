import React from "react";
import { Form, Input, Button, Spin } from "antd"; // Import directly from antd
import { useOne, useUpdate } from "@refinedev/core";

const { TextArea } = Input;

const FoodEdit: React.FC<{ id: string }> = ({ id }) => {
    const [form] = Form.useForm();
    const { data, isLoading: isFetching } = useOne({
        resource: "foods",
        id,
    });
    const { mutate, isLoading: isSaving } = useUpdate({
        resource: "foods",
        id,
    });

    const onFinish = async (values: any) => {
        await mutate(values);
    };

    if (isFetching) return <Spin size="large" />;

    return (
        <div>
            <h1>Edit Food</h1>
            {isSaving ? (
                <Spin size="large" />
            ) : (
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={data}
                    onFinish={onFinish}
                >
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

export default FoodEdit;
