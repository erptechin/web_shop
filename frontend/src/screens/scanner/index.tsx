"use client"
import Breadcrumbs from "../../components/Breadcrumbs";
import { Spin, Input } from "antd";
import { useFetchByLoad } from "../../contexts";
import { ViewData } from "../products/ViewData";
const resource = "products";

export default function Lists() {
  const { fetch, data, loading } = useFetchByLoad();
  const fetchData = (sku: any) => {
    fetch({ url: resource, query: JSON.stringify({ skip: 0, take: 1, sku }) })
  }

  return (
    <>
      <Breadcrumbs pageName="Scanner" />
      <div className="viewDetails">

        <div className="viewDetails">
          <Input autoFocus placeholder="Basic usage" onChange={(obj) => fetchData(obj.target.value)} />
        </div>

        {loading && (<div className="viewDetails" style={{ textAlign: "center" }}><Spin /></div>)}

        {(data && data?.data) && (<div className="viewDetails"><ViewData data={data.data[0]} /></div>)}

      </div>
    </>
  );
}