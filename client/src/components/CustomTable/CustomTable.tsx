import React from "react";
// import { render } from "react-dom";
import "antd/dist/antd.css";
// import { Table, TableProps, Tag } from 'antd';
import { Space, Table } from 'antd';
// import numeral from "numeral";

// const props = {
//   bordered: true,
//   loading: false,
//   pagination: { position: "bottom" },
//   size: "default",
//   title: undefined,
//   showHeader: true,
//   rowSelection: {},
//   scroll: { y: 240 }
// };

// export interface Props {
//     data: any;
//     columns: any;
//     loading: boolean;
//     pagination: any;
//     size: string;
//     title: string;
//     showHeader: boolean;
//     rowSelection: any;
//     scroll: any;
//   }


export const CustomTable = () => {

    const columns = [
        {
          title: "URL",
          dataIndex: "url",
          key: "url",
        },
        {
          title: "Short Code",
          dataIndex: "shortCode",
          key: "shortCode",
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          key: "createdAt",
        },
        {
          title: 'Action',
          key: 'action',
          render: () => (
            <Space size="middle">
              <a>Delete</a>
              {/* <a>{text} {record}</a> */}
            </Space>
          ),
        },
      ];
      const data = [
        {
          id: 17843849425012112,
          url: "http://www.google.com",
          shortCode: 8334323,
          createdAt: false,
          icon: "heart",
          isFavorite: true,
          isQuery: true
        },
        {
          id: 17841562600099448,
          url: "http://www.hotmail.com",
          shortCode: 1852562,
          createdAt: false,
          icon: "search",
          isFavorite: true,
          isQuery: false
        },
        {
          id: 17843830537003608,
          url: "http://www.yahoo.com",
          shortCode: 1718961,
          createdAt: false,
          icon: "search",
          isFavorite: false,
          isQuery: false
        },
        {
          id: 17841562825097072,
          url: "http://www.reddit.com",
          shortCode: 794771,
          createdAt: false,
          icon: "search",
          isFavorite: false,
          isQuery: false
        },
        {
          id: 17843887378016144,
          url: "http://www.producthunt.com",
          shortCode: 437050,
          createdAt: false,
          icon: "search",
          isFavorite: false,
          isQuery: true
        },
      ];
    return (
        <div>
          <Table columns={columns}
          pagination={{ position: ['bottomCenter'] }}
          dataSource={data} />
        </div>
      );
    };

