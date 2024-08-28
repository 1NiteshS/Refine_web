// import {
//   DateField,
//   DeleteButton,
//   EditButton,
//   List,
//   MarkdownField,
//   ShowButton,
//   useTable,
// } from "@refinedev/antd";
// import { type BaseRecord, useMany } from "@refinedev/core";
// import { Space, Table } from "antd";

// export const BlogPostList = () => {
//   const { tableProps } = useTable({
//     syncWithLocation: true,
//   });

//   const { data: categoryData, isLoading: categoryIsLoading } = useMany({
//     resource: "categories",
//     ids:
//       tableProps?.dataSource
//         ?.map((item) => item?.category?.id)
//         .filter(Boolean) ?? [],
//     queryOptions: {
//       enabled: !!tableProps?.dataSource,
//     },
//   });

//   return (
//     <List>
//       <Table {...tableProps} rowKey="id">
//         <Table.Column dataIndex="id" title={"ID"} />
//         <Table.Column dataIndex="title" title={"Title"} />
//         <Table.Column
//           dataIndex="content"
//           title={"Content"}
//           render={(value: any) => {
//             if (!value) return "-";
//             return <MarkdownField value={value.slice(0, 80) + "..."} />;
//           }}
//         />
//         <Table.Column
//           dataIndex={"category"}
//           title={"Category"}
//           render={(value) =>
//             categoryIsLoading ? (
//               <>Loading...</>
//             ) : (
//               categoryData?.data?.find((item) => item.id === value?.id)?.title
//             )
//           }
//         />
//         <Table.Column dataIndex="status" title={"Status"} />
//         <Table.Column
//           dataIndex={["createdAt"]}
//           title={"Created at"}
//           render={(value: any) => <DateField value={value} />}
//         />
//         <Table.Column
//           title={"Actions"}
//           dataIndex="actions"
//           render={(_, record: BaseRecord) => (
//             <Space>
//               <EditButton hideText size="small" recordItemId={record.id} />
//               <ShowButton hideText size="small" recordItemId={record.id} />
//               <DeleteButton hideText size="small" recordItemId={record.id} />
//             </Space>
//           )}
//         />
//       </Table>
//     </List>
//   );
// };


import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useMany } from "@refinedev/core";
import { Space, Table } from "antd";
import { useMemo } from "react";

// Define the type for your records
interface BlogPost extends BaseRecord {
  id: string;
  title: string;
  content: string;
  category: { id: string; title: string };
  status: string;
  createdAt: string; // ISO 8601 date string
}

export const BlogPostList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      tableProps?.dataSource
        ?.map((item) => (item as BlogPost)?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  // Memoize sorted data to avoid unnecessary re-renders
  const sortedDataSource = useMemo(() => {
    // Ensure dataSource is of type BlogPost[]
    const dataSource = tableProps?.dataSource as BlogPost[] | undefined;

    if (!dataSource) return [];

    // Check if createdAt field is present and valid
    console.log("Original Data Source:", dataSource);
    
    return dataSource
      .slice()
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        console.log("Sorting:", dateA, dateB);
        return dateB.getTime() - dateA.getTime(); // Newer dates come first
      });
  }, [tableProps?.dataSource]);

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        dataSource={sortedDataSource}
        // Ensure tableProps does not overwrite dataSource
        pagination={false} // Disable pagination if needed for debugging
      >
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="title" title={"Title"} />
        <Table.Column
          dataIndex="content"
          title={"Content"}
          render={(value: string) => {
            if (!value) return "-";
            return <MarkdownField value={value.slice(0, 80) + "..."} />;
          }}
        />
        <Table.Column
          dataIndex={"category"}
          title={"Category"}
          render={(value: { id: string }) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find((item) => item.id === value?.id)?.title
            )
          }
        />
        <Table.Column dataIndex="status" title={"Status"} />
        <Table.Column
          dataIndex={["createdAt"]}
          title={"Created at"}
          render={(value: string) => <DateField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BlogPost) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
