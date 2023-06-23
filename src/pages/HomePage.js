import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

// const people = [
//   {
//     name: "John Doe",
//     title: "Front-end Developer",
//     department: "Engineering",
//     email: "john@devui.com",
//     role: "Developer",
//     image:
//       "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
//   },
//   {
//     name: "Jane Doe",
//     title: "Back-end Developer",
//     department: "Engineering",
//     email: "jane@devui.com",
//     role: "CTO",
//     image:
//       "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
//   },
// ];

const HomePage = () => {
  const [empData, setEmpData] = useState();
  const [loading, setLoading] = useState(true);

  const getAllData = async () => {
    setLoading(true);
    try {
      const getPeople = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getallUsers`,
        {
          mode:"cors",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await getPeople.json();
      setEmpData(res);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getAllData();
  },[]);
  console.log(empData);

  return (
    <div>

    {loading ? (
        <Spinner />
      ) : empData.data.length === 0 ?
       (
        <div className="flex flex-col items-center justify-center w-[100%] h-screen gap-8">
          <div className=' text-3xl text-indigo-600'>No Employee Data in Database</div>
          <Link to={"/addemployee"}>
              <div>
                <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                  Add Employee
                </button>
              </div>
            </Link>
        </div>
      ) :
      (
      <section className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-white">
              Employees
            </h2>
            <p className="mt-1 text-sm text-gray-300">
              This is a list of all employees.
            </p>
          </div>
          <Link to={"/addemployee"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Employee
              </button>
            </div>
          </Link>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-400"
                      >
                        <span>Employee</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                      >
                        Title
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-400"
                      >
                        Role
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-700 bg-gray-900">
                    {empData?.data.map((person) => (
                      <tr key={person.name}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={person.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {person.name}
                              </div>
                              <div className="text-sm text-gray-300">
                                {person.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">
                            {person.title}
                          </div>
                          <div className="text-sm text-gray-300">
                            {person.department}
                          </div>
                        </td>

                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                          {person.role}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      )
    }
    </div>
  );
};

export default HomePage;
