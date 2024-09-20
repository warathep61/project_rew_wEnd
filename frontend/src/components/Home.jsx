import React, { useEffect, useState } from "react";

export default function Home() {
  const [dataHero, setDataHero] = useState([]);
  const [massage, setMassage] = useState(false);
  const [switchButton, setSwitchButton] = useState(true);
  const [idUpdate, setIdUpdate] = useState();
  const [showHero, setShowHero] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    health: Number,
    mana: Number,
    attack_damage: Number,
    ability_power: Number,
    defense: Number,
    speed: Number,
    main_img: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
    img6: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/hero");
        const data = await response.json(); // ใช้ await เพื่อรับค่า JSON
        if (Array.isArray(data)) {
          setDataHero(data); // ตั้งค่า state ถ้าข้อมูลเป็น array
        } else {
          console.error("Received data is not an array:", data);
          setDataHero([]); // ตั้งค่าเป็น array เปล่าถ้าข้อมูลไม่ใช่ array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // ตรวจสอบสถานะของ response
      if (response.ok) {
        setMassage(true);

        // ตั้งเวลาให้ข้อความแจ้งเตือนหายไปและรีเฟรชหน้า
        const timer = setTimeout(() => {
          setMassage(false);
          window.location.reload(); // รีเฟรชหน้า
        }, 3000);

        // ล้าง timer เมื่อ component ถูกถอดออก
        return () => clearTimeout(timer);
      } else {
        console.error("Failed to add data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/hero/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // ตรวจสอบว่าการเรียก API สำเร็จหรือไม่
      if (response.ok) {
        setIdUpdate(id);
        const data = await response.json(); // ใช้ await เพื่อดึงข้อมูล JSON
        setFormData(data); // อัปเดต formData ด้วยข้อมูลจาก API
        setSwitchButton(false);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/hero/${idUpdate}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // ตรวจสอบว่าการเรียก API สำเร็จหรือไม่
      if (response.ok) {
        setMassage(true);
        const timer = setTimeout(() => {
          setMassage(false);
          setSwitchButton(true);
          window.location.reload();
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm("Do you want to delete it?");

    if (userConfirmed) {
      const response = await fetch(`http://127.0.0.1:8000/api/hero/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const data = await response.json();
        console.error(data.message); // แสดงข้อความข้อผิดพลาดจาก backend ถ้ามี
      }
    }
  };

  const handleView = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/hero/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setShowHero(true);
        const data = await response.json();
        setFormData(data);
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClose = () => {
    setShowHero(false);
    setFormData("")
    setSwitchButton(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 shadow-lg">
        <h1 className="text-2xl font-bold text-white">ROV</h1>
      </nav>
      <main className="flex-grow container mx-auto p-4">
        <div className="space-y-8">
          {/* ตารางที่ 1 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Heroes
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ชื่อฮีโร่
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ประเภทของฮีโร่
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ค่าพลังชีวิต
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      มานา
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ค่าพลังโจมตี
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ค่าพลังเวทย์
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ค่าป้องกัน
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      คความเร็วเคลื่อนที่
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataHero &&
                    dataHero.map((val, key) => (
                      <tr className="hover:bg-gray-50" key={key}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {val.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {val.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {val.health}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {val.mana}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {val.attack_damage}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {val.ability_power}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {val.defense}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {val.speed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleView(val.id)}
                            className="text-yellow-600 hover:text-yellow-900 mr-2"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(val.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(val.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ฟอร์มเพิ่มข้อมูล */}
          {showHero ? "" : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                เพิ่มรายละเอียดตัวละคร
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormData}
                    placeholder="ชื่อฮีโร่"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleFormData}
                    placeholder="ประเภทของฮีโร่"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="number"
                    name="health"
                    value={formData.health}
                    onChange={handleFormData}
                    placeholder="ค่าพลังชีวิต"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="number"
                    name="mana"
                    value={formData.mana}
                    onChange={handleFormData}
                    placeholder="มานา"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="number"
                    name="attack_damage"
                    value={formData.attack_damage}
                    onChange={handleFormData}
                    placeholder="ค่าพลังโจมตี"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="number"
                    name="ability_power"
                    value={formData.ability_power}
                    onChange={handleFormData}
                    placeholder="ค่าพลังเวทย์"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="number"
                    name="defense"
                    value={formData.defense}
                    onChange={handleFormData}
                    placeholder="ค่าป้องกันค่าป้องกัน"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="number"
                    name="speed"
                    value={formData.speed}
                    onChange={handleFormData}
                    placeholder="คความเร็วเคลื่อนที่คความเร็วเคลื่อนที่"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>
              </form>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                รูปและไอเทมของตัวละคร
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="main_img"
                    value={formData.main_img}
                    onChange={handleFormData}
                    placeholder="Main_img"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="text"
                    name="img1"
                    value={formData.img1}
                    onChange={handleFormData}
                    placeholder="img1"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="text"
                    name="img2"
                    value={formData.img2}
                    onChange={handleFormData}
                    placeholder="img2"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="text"
                    name="img3"
                    value={formData.img3}
                    onChange={handleFormData}
                    placeholder="img3"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="text"
                    name="img4"
                    value={formData.img4}
                    onChange={handleFormData}
                    placeholder="img4"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="text"
                    name="img5"
                    value={formData.img5}
                    onChange={handleFormData}
                    placeholder="img5"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                  <input
                    type="text"
                    name="img6"
                    value={formData.img6}
                    onChange={handleFormData}
                    placeholder="img6"
                    className="px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                  />
                </div>
              </form>
            </div>
          </div>
          )}
          
          {showHero ? "" : (
            <div>
              {massage ? (
            <h2 className="text-2xl font-semibold mb-4 text-green-800">
              Successfully
            </h2>
          ) : (
            ""
          )}
          {switchButton ? (
            <button
              onClick={handleAddData}
              className="w-full p-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Data
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="w-full p-2 text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Update Data
            </button>
          )}
            </div>
          )}
        </div>

        {showHero ? (
          <div className="bg-white shadow-md rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              ข้อมูลทั้งหมด
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ชื่อฮีโร่
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formData.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ประเภทของฮีโร่
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formData.type}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ค่าพลังชีวิต
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formData.health}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      มานา
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formData.mana}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ค่าพลังโจมตี
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formData.attack_damage}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ค่าพลังเวทย์
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formData.ability_power}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ค่าป้องกัน
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formData.defense}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      คความเร็วเคลื่อนที่
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formData.speed}
                    </p>
                  </div>
                </div>
                <button onClick={handleClose} className="bg-orange-400 text-white pt-1 pb-1 pl-3 pr-3">Close</button>
              </div>
              <div className="space-y-4">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={formData.main_img}
                    alt="Main Image"
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <img
                    src={formData.img1}
                    alt="Thumbnail 1"
                    className="object-cover rounded-md shadow-sm"
                  />
                  <img
                    src={formData.img2}
                    alt="Thumbnail 2"
                    className="object-cover rounded-md shadow-sm"
                  />
                  <img
                    src={formData.img3}
                    alt="Thumbnail 3"
                    className="object-cover rounded-md shadow-sm"
                  />
                  <img
                    src={formData.img4}
                    alt="Thumbnail 4"
                    className="object-cover rounded-md shadow-sm"
                  />
                  <img
                    src={formData.img5}
                    alt="Thumbnail 5"
                    className="object-cover rounded-md shadow-sm"
                  />
                  <img
                    src={formData.img6}
                    alt="Thumbnail 6"
                    className="object-cover rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
