"use client";
import MUIDataTable from "mui-datatables";
import { useState } from "react";
import * as XLSX from "xlsx";

const ExcelComponent = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const columns = [
    {
      name: "PROBABLE_MSISDN",
      label: "Probable MSISDN",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
    {
      name: "PACKAGE",
      label: "Package",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
    {
      name: "PATTERN",
      label: "Pattern",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
    {
      name: "PREFIX",
      label: "Prefix",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
    {
      name: "BTRC_PATTERN",
      label: "BTRC Pattern",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
  ];
  const expectedColumns = columns.map((col) => col.name);

  const readExcel = (file: any) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e: any) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        const headers: any = data[0];

        if (headers.every((header: any) => expectedColumns.includes(header))) {
          const jsonData = XLSX.utils.sheet_to_json(ws);
          resolve(jsonData);
        } else {
          reject(
            new Error("Excel file columns do not match expected columns.")
          );
        }
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise
      .then((data: any) => {
        setItems(data);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        alert("Column Name not matched");
        setItems([]);
      });
  };
  //   const readExcel = (file: any) => {
  //     const promise = new Promise((resolve, reject) => {
  //       const fileReader = new FileReader();
  //       fileReader.readAsArrayBuffer(file);
  //       fileReader.onload = (e: any) => {
  //         const bufferArray = e.target.result;
  //         const wb = XLSX.read(bufferArray, {
  //           type: "buffer",
  //         });
  //         const wsname = wb.SheetNames[0];
  //         const ws = wb.Sheets[wsname];
  //         const data = XLSX.utils.sheet_to_json(ws);
  //         console.log(data);
  //         resolve(data);
  //       };
  //       fileReader.onerror = (error) => {
  //         reject(error);
  //       };
  //     });
  //     promise.then((d: any) => {
  //       setItems(d);
  //     });
  //   };

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e: any) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
        <br></br>
        <br></br>
        <br></br>
      </div>
      {/* Data Table */}
      <div>
        <MUIDataTable title={"Employee List"} data={items} columns={columns} />
      </div>
    </div>
  );
};

export default ExcelComponent;
