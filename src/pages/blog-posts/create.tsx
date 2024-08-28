import { Create, useForm, useSelect } from "@refinedev/antd";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input, Select } from "antd";
import { useEffect } from "react";

export const BlogPostCreate = () => {
  const { formProps, saveButtonProps, form } = useForm({
    // Optional: You can set the initial values or handle other form configuration here
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });

  // Set initial value for createdAt to the current date and time
  useEffect(() => {
    if (form) {
      form.setFieldsValue({ createdAt: new Date().toISOString() });
    }
  }, [form]);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Content"}
          name="content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>
        <Form.Item
          label={"Category"}
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          initialValue={"draft"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"draft"}
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
              { value: "rejected", label: "Rejected" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
        {/* Hidden field for createdAt */}
        <Form.Item
          name={["createdAt"]}
          hidden
        >
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Create>
  );
};
