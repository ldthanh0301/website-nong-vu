import React, { useEffect, useState } from "react";
import {  Tab, Tabs } from "react-bootstrap";
import TabNhanVien from "../../components/admin/account/TabNhanVien";
import TabNongDan from "../../components/admin/account/TabNongDan";

function TaiKhoan() {
  return (
    <div>
      <h3>Quản lý tài khoản</h3>
      <hr />
      <Tabs
        defaultActiveKey="accountNhanVien"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="accountNhanVien" title="Tài khoản nhân viên">
          <TabNhanVien></TabNhanVien>
        </Tab>
        <Tab eventKey="accountNongDan" title="Tài khoản nông dân">
          <TabNongDan></TabNongDan>
        </Tab>
      </Tabs>
    </div>
  );
}

export default TaiKhoan;
